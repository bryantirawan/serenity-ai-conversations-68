
import React, { useState } from 'react';
import { BookText, Cloud, Sun, Repeat, Brain, Target } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const prompts = [
  { icon: <Cloud className="w-4 h-4" />, text: "What felt heavy today?", emoji: "🌥️" },
  { icon: <Sun className="w-4 h-4" />, text: "What made you smile?", emoji: "🌞" },
  { icon: <Repeat className="w-4 h-4" />, text: "What's a pattern you're noticing in yourself?", emoji: "🔄" },
  { icon: <Brain className="w-4 h-4" />, text: "What thought do you want to let go of?", emoji: "🧠" },
  { icon: <Target className="w-4 h-4" />, text: "What's one thing you're proud of?", emoji: "🎯" },
];

const FloatingJournalButton = () => {
  const { toast } = useToast();
  const [selectedPrompt, setSelectedPrompt] = useState<string>("");

  const handlePromptSelect = (promptText: string) => {
    setSelectedPrompt(promptText);
  };

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
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Not sure what to write? Try one of these prompts:</p>
            <div className="flex flex-wrap gap-2">
              {prompts.map((prompt) => (
                <Button
                  key={prompt.text}
                  variant="outline"
                  size="sm"
                  className={`flex items-center gap-1.5 ${
                    selectedPrompt === prompt.text ? 'bg-skyhug-50 border-skyhug-200' : ''
                  }`}
                  onClick={() => handlePromptSelect(prompt.text)}
                >
                  {prompt.icon}
                  <span className="mr-1">{prompt.emoji}</span>
                  {prompt.text}
                </Button>
              ))}
            </div>
          </div>
          <Textarea
            placeholder={selectedPrompt || "Write your thoughts here..."}
            className="min-h-[200px] resize-none"
          />
          <Button onClick={handleSaveEntry} className="w-full">Save Entry</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FloatingJournalButton;
