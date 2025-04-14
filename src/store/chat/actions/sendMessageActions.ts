
import { v4 as uuidv4 } from 'uuid';
import { ChatStore } from '../types';
import { AIModel } from '@/types';
import { extractUrls } from '@/utils/urlUtils';
import { supabase } from '@/integrations/supabase/client';

export const createSendMessageAction = (
  set: (state: Partial<ChatStore>) => void,
  get: () => ChatStore
) => {
  return async (content: string, images: string[] = [], files: string[] = []) => {
    const { currentConversationId, conversations, selectedModel, generateResponse, setProcessingUrls } = get();
    
    if (!currentConversationId) {
      setProcessingUrls("Error: No active conversation found");
      setTimeout(() => setProcessingUrls(null), 3000);
      return;
    }
    
    const userId = localStorage.getItem('userId') || undefined;
    const timestamp = new Date();
    const messageId = uuidv4();
    
    // Extract URLs from user message
    const urls = extractUrls(content);
    let enhancedContent = content;
    let webContentFiles: string[] = [];

    // If URLs are found, try to fetch their content
    if (urls.length > 0) {
      // Show URL processing in the chat UI
      setProcessingUrls(`Found ${urls.length} URL(s) in your message. Fetching content...`);
      
      try {
        // Use our edge function to fetch webpage content with BeautifulSoup/cheerio
        const { data: scrapedData, error: scrapingError } = await supabase.functions.invoke('fetch-webpage', {
          body: { urls }
        });

        if (scrapingError) {
          console.error('Error fetching webpage content:', scrapingError);
          setProcessingUrls(`Could not fetch content from URLs: ${scrapingError.message}`);
          setTimeout(() => setProcessingUrls(null), 4000);
        } else if (scrapedData && scrapedData.webContent) {
          // For each fetched URL, create a "file" with the webpage content
          Object.entries(scrapedData.webContent).forEach(([url, content]) => {
            if (content) {
              webContentFiles.push(`URL: ${url}\n${content}`);
              
              // Update the processing message with success
              setProcessingUrls(`Successfully extracted content from ${url}`);
            }
          });
          
          // Clear the processing message after a brief delay
          setTimeout(() => setProcessingUrls(null), 2000);
        }
      } catch (error) {
        console.error('Error invoking fetch-webpage function:', error);
        setProcessingUrls('Could not fetch webpage content due to an error');
        setTimeout(() => setProcessingUrls(null), 4000);
      }
    }
    
    // Combine original files with web content files
    const allFiles = [...files, ...webContentFiles];
    
    // For debugging: Log what's being sent to the model
    console.log('Sending message to model:', {
      content,
      modelId: selectedModel.id,
      modelProvider: selectedModel.provider,
      imagesCount: images.length,
      filesCount: allFiles.length,
      urlsFound: urls.length,
      filesPreview: allFiles.length > 0 ? allFiles.map(f => f.substring(0, 100) + '...') : []
    });
    
    // Add user message
    set({
      conversations: conversations.map((conv) => {
        if (conv.id === currentConversationId) {
          // Debug logging to ensure files are being properly added
          if (allFiles && allFiles.length > 0) {
            console.log(`Adding ${allFiles.length} files to message ${messageId}`);
            console.log(`First file content starts with: ${allFiles[0].substring(0, 150)}...`);
          }
          
          if (images && images.length > 0) {
            console.log(`Adding ${images.length} images to message ${messageId}`);
          }
          
          return {
            ...conv,
            messages: [
              ...conv.messages,
              {
                id: messageId,
                content: enhancedContent,
                role: 'user' as const,
                model: selectedModel,
                timestamp,
                images,
                files: allFiles
              }
            ],
            updatedAt: timestamp
          };
        }
        return conv;
      })
    });
    
    // Add a slight delay before generating the AI response to improve UX
    setTimeout(() => {
      // Generate AI response
      generateResponse();
    }, 100);
  };
};
