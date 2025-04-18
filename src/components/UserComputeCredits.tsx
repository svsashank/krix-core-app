import React, { useEffect, useState } from 'react';
import { Zap } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { toast } from '@/components/ui/use-toast';

const UserComputeCredits = () => {
  const [totalCredits, setTotalCredits] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserCredits = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          console.log("Fetching credits for user:", session.user.id);
          
          // Use a raw query since the types don't recognize our new table yet
          const { data, error } = await supabase
            .from('user_compute_credits')
            .select('total_credits')
            .eq('user_id', session.user.id)
            .maybeSingle();
          
          if (error) {
            console.error('Error fetching user compute credits:', error);
            setError(error.message);
            toast({
              title: "Error",
              description: "Failed to load credits data",
              variant: "destructive",
            });
          } else if (!data) {
            console.log("No credits record found for user, creating one with 0 credits");
            
            // Create a new record if none exists - with error handling for race conditions
            try {
              const { error: insertError } = await supabase
                .from('user_compute_credits')
                .insert([
                  { user_id: session.user.id, total_credits: 0 }
                ]);
                
              if (insertError) {
                // If there's a duplicate key error, it means another request created the record
                // between our check and insert. In this case, try to fetch again.
                if (insertError.code === '23505') { // Postgres duplicate key error code
                  console.log("Duplicate key detected, another request likely created the record. Fetching again.");
                  const { data: retryData, error: retryError } = await supabase
                    .from('user_compute_credits')
                    .select('total_credits')
                    .eq('user_id', session.user.id)
                    .maybeSingle();
                    
                  if (retryError) {
                    console.error('Error in retry fetch:', retryError);
                    setError("Failed to initialize credits record");
                    toast({
                      title: "Error",
                      description: "Failed to initialize credits record",
                      variant: "destructive",
                    });
                  } else {
                    console.log("Successfully fetched existing credit record on retry");
                    setTotalCredits(retryData?.total_credits || 0);
                  }
                } else {
                  console.error('Error creating user compute credits record:', insertError);
                  setError("Failed to initialize credits record");
                  toast({
                    title: "Error",
                    description: "Failed to initialize credits record",
                    variant: "destructive",
                  });
                }
              } else {
                console.log("Created new credit record with 0 credits");
                setTotalCredits(0);
              }
            } catch (err) {
              console.error('Exception creating credit record:', err);
              setError("Failed to initialize credits record");
            }
          } else {
            console.log("Fetched total credits:", data.total_credits || 0);
            setTotalCredits(data.total_credits || 0);
          }
        }
      } catch (error) {
        console.error('Error fetching user credits:', error);
        setError(error instanceof Error ? error.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserCredits();

    // Set up a subscription to listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(() => {
      fetchUserCredits();
    });

    // Set up a subscription to listen for changes on the user_compute_credits table
    const channel = supabase
      .channel('user-credits-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_compute_credits'
        },
        (payload) => {
          console.log('Credits updated:', payload);
          fetchUserCredits();
        }
      )
      .subscribe();

    return () => {
      authListener.subscription.unsubscribe();
      supabase.removeChannel(channel);
    };
  }, []);

  if (isLoading) {
    return <div className="flex items-center gap-1 text-xs text-muted-foreground">
      <Zap size={14} className="text-amber-500" />
      <span>Loading...</span>
    </div>;
  }

  if (error) {
    return <div className="flex items-center gap-1 text-xs text-red-500">
      <Zap size={14} className="text-amber-500" />
      <span>Error loading credits</span>
    </div>;
  }

  if (totalCredits === null) {
    return null;
  }

  // Round total credits to nearest integer
  const roundedCredits = Math.round(totalCredits);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
            <Zap size={14} className="text-amber-500" />
            <span>Total: {roundedCredits.toLocaleString()} CR</span>
          </div>
        </TooltipTrigger>
        <TooltipContent side="top">
          <div className="space-y-1">
            <p className="font-medium flex items-center gap-1.5">
              <Zap size={14} className="text-amber-500" />
              {roundedCredits.toLocaleString()} Total Compute Credits Used
            </p>
            <p className="text-xs">
              This represents your total compute usage across all conversations.
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default UserComputeCredits;
