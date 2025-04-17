
import React, { useState } from 'react';
import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp, Calendar, Clock, BookText, FileText } from 'lucide-react';
import { format } from 'date-fns';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

// Mock data for sessions
const mockSessions = [
  {
    id: '1',
    date: new Date(2025, 3, 15, 14, 30),
    duration: 25,
    mood: 'good',
    summary: 'Discussed work stress and explored mindfulness techniques. Identified triggers for anxiety and developed coping strategies.',
    journal: 'I feel more centered after this session. The breathing exercise really helped calm my thoughts.',
    topics: ['Anxiety', 'Work Stress', 'Mindfulness']
  },
  {
    id: '2',
    date: new Date(2025, 3, 10, 10, 0),
    duration: 18,
    mood: 'okay',
    summary: 'Explored relationship dynamics with family. Recognized patterns of communication that could be improved.',
    journal: 'I need to practice setting boundaries more clearly. The suggestions about "I" statements make a lot of sense.',
    topics: ['Family', 'Communication', 'Boundaries']
  },
  {
    id: '3',
    date: new Date(2025, 3, 5, 19, 15),
    duration: 32,
    mood: 'great',
    summary: 'Celebrated progress on personal goals. Discussed future aspirations and developed action steps.',
    journal: 'I\'m proud of how far I\'ve come. Breaking down my goals into smaller steps makes them feel more achievable.',
    topics: ['Goals', 'Progress', 'Planning']
  }
];

// Mapping for mood emoji
const moodEmojis: Record<string, string> = {
  'terrible': '😥',
  'bad': '😟',
  'okay': '😐',
  'good': '🙂',
  'great': '😁'
};

const PastSessionsList = () => {
  const [expandedSessions, setExpandedSessions] = useState<Record<string, boolean>>({});

  const toggleSession = (id: string) => {
    setExpandedSessions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="max-w-3xl mx-auto w-full">
      <div className="space-y-4">
        {mockSessions.map(session => (
          <Card key={session.id} className="border-cloud-200 overflow-hidden transition-all duration-200 hover:shadow-md">
            <Collapsible
              open={expandedSessions[session.id]}
              onOpenChange={() => toggleSession(session.id)}
              className="w-full"
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-skyhug-500" />
                      {format(session.date, 'EEEE, MMMM d, yyyy')}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <Clock className="h-3.5 w-3.5" />
                      {format(session.date, 'h:mm a')} • {session.duration} minutes
                    </CardDescription>
                  </div>
                  <div className="flex items-center">
                    <span className="text-2xl mr-2" aria-label={`Mood: ${session.mood}`}>
                      {moodEmojis[session.mood]}
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {session.topics.map(topic => (
                    <Badge key={topic} variant="secondary" className="bg-cloud-100">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              
              <CollapsibleTrigger asChild>
                <CardFooter className="py-3 border-t flex justify-center cursor-pointer hover:bg-muted/30">
                  <Button variant="ghost" size="sm" className="gap-1">
                    {expandedSessions[session.id] ? (
                      <>
                        <ChevronUp className="h-4 w-4" />
                        <span>Hide details</span>
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-4 w-4" />
                        <span>View details</span>
                      </>
                    )}
                  </Button>
                </CardFooter>
              </CollapsibleTrigger>
              
              <CollapsibleContent>
                <CardContent className="bg-cloud-50/50 pt-4 px-5">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium flex items-center gap-1.5 mb-2 text-skyhug-700">
                        <BookText className="h-4 w-4" />
                        Session Summary
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {session.summary}
                      </p>
                    </div>
                    
                    {session.journal && (
                      <div>
                        <h4 className="text-sm font-medium flex items-center gap-1.5 mb-2 text-skyhug-700">
                          <FileText className="h-4 w-4" />
                          Your Journal
                        </h4>
                        <div className="bg-white p-3 border rounded-md border-cloud-200 text-sm italic text-muted-foreground">
                          "{session.journal}"
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PastSessionsList;
