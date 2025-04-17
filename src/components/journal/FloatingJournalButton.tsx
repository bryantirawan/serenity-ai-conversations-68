
import React from 'react';
import { BookText } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const FloatingJournalButton = () => {
  const { toast } = useToast();

  const handleSaveEntry = () => {
    toast({
      title: "Journal Entry Saved",
      description: "Your thoughts have been recorded.",
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed right-6 top-20 z-50 h-12 w-12 rounded-full shadow-lg bg-white hover:bg-skyhug-50 border-skyhug-200"
        >
          <BookText className="h-6 w-6 text-skyhug-500" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Journal Entry</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <Textarea
            placeholder="Write your thoughts here..."
            className="min-h-[200px] resize-none"
          />
          <Button onClick={handleSaveEntry} className="w-full">Save Entry</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FloatingJournalButton;
