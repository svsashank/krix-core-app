
// AI Models
export const AI_MODELS = [
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    provider: 'OpenAI',
    description: 'Most advanced OpenAI model. Can solve difficult problems with greater accuracy.',
    capabilities: ['text', 'images', 'code'] as ('text' | 'images' | 'code' | 'audio')[],
    avatarColor: '#74aa9c',
  },
  {
    id: 'gpt-4-turbo',
    name: 'GPT-4 Turbo',
    provider: 'OpenAI',
    description: 'Improved version of GPT-4 with better performance and lower cost.',
    capabilities: ['text', 'images', 'code'] as ('text' | 'images' | 'code' | 'audio')[],
    avatarColor: '#6ad3b7',
  },
  {
    id: 'gpt-3.5-turbo',
    name: 'GPT-3.5 Turbo',
    provider: 'OpenAI',
    description: 'Fast and efficient model for most everyday tasks.',
    capabilities: ['text', 'code'] as ('text' | 'images' | 'code' | 'audio')[],
    avatarColor: '#19c37d',
  },
  {
    id: 'claude-3-opus',
    name: 'Claude 3 Opus',
    provider: 'Anthropic',
    description: 'Most powerful Claude model. Excels at complex reasoning, coding, and creative tasks.',
    capabilities: ['text', 'images', 'code'] as ('text' | 'images' | 'code' | 'audio')[],
    avatarColor: '#d292ff',
  },
  {
    id: 'claude-3-sonnet',
    name: 'Claude 3 Sonnet',
    provider: 'Anthropic',
    description: 'Balanced Claude model combining intelligence and speed.',
    capabilities: ['text', 'images', 'code'] as ('text' | 'images' | 'code' | 'audio')[],
    avatarColor: '#a76eff',
  },
  {
    id: 'claude-3-haiku',
    name: 'Claude 3 Haiku',
    provider: 'Anthropic',
    description: 'Fastest Claude model. Great for quick responses and lightweight tasks.',
    capabilities: ['text', 'images', 'code'] as ('text' | 'images' | 'code' | 'audio')[],
    avatarColor: '#8c52ff',
  },
  {
    id: 'gemini-pro',
    name: 'Gemini Pro',
    provider: 'Google',
    description: 'Google\'s advanced multimodal AI model with strong reasoning ability.',
    capabilities: ['text', 'code'] as ('text' | 'images' | 'code' | 'audio')[],
    avatarColor: '#3e5e8c',
  },
  {
    id: 'gemini-1.5-pro',
    name: 'Gemini 1.5 Pro',
    provider: 'Google',
    description: 'The latest Google model with improved reasoning and large context window.',
    capabilities: ['text', 'images', 'code'] as ('text' | 'images' | 'code' | 'audio')[],
    avatarColor: '#4285f4',
  },
  {
    id: 'grok-2-latest',
    name: 'Grok 2',
    provider: 'xAI',
    description: 'Latest Grok model from xAI, built for conversational AI with up-to-date knowledge.',
    capabilities: ['text', 'code'] as ('text' | 'images' | 'code' | 'audio')[],
    avatarColor: '#ff6b6b',
  },
  {
    id: 'llama-3-8b',
    name: 'Llama 3 (8B)',
    provider: 'Replicate',
    description: 'Meta\'s open source Llama 3 model with 8B parameters.',
    capabilities: ['text', 'code'] as ('text' | 'images' | 'code' | 'audio')[],
    avatarColor: '#1877f2',
  },
  {
    id: 'llama-3-70b',
    name: 'Llama 3 (70B)',
    provider: 'Replicate',
    description: 'Meta\'s large 70B parameter Llama 3 model with enhanced capabilities.',
    capabilities: ['text', 'code'] as ('text' | 'images' | 'code' | 'audio')[],
    avatarColor: '#0668e1',
  },
  {
    id: 'deepseek-coder',
    name: 'DeepSeek Coder',
    provider: 'Replicate',
    description: 'Specialized for code generation with 33B parameters.',
    capabilities: ['text', 'code'] as ('text' | 'images' | 'code' | 'audio')[],
    avatarColor: '#4ea5f5',
  }
];

export const DEFAULT_MODEL = AI_MODELS[0];
