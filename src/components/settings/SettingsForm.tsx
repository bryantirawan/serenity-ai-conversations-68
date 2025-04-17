
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Switch } from '@/components/ui/switch';
import { User, Trash2, Save, Lock } from 'lucide-react';

const SettingsForm = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  
  // Form state
  const [name, setName] = useState(user?.name || '');
  const [preferredTherapistName, setPreferredTherapistName] = useState('Dr. Sky');
  const [genderPreference, setGenderPreference] = useState('neutral');
  const [voicePreference, setVoicePreference] = useState('soft-female');
  const [localStorageOnly, setLocalStorageOnly] = useState(true);
  
  const handleSaveSettings = () => {
    // In a real app, this would save to a backend
    // For now, just show a success message
    toast({
      title: 'Settings saved',
      description: 'Your profile settings have been updated.',
    });
  };
  
  const handleDeleteData = () => {
    // In a real app, this would delete user data
    toast({
      title: 'Data deleted',
      description: 'All your data has been deleted. You will be logged out.',
      variant: 'destructive',
    });
    
    // Simulate logout after data deletion
    setTimeout(() => {
      logout();
    }, 1500);
  };
  
  return (
    <div className="space-y-8">
      {/* Profile Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Your Profile
          </CardTitle>
          <CardDescription>
            Manage your personal information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="Your name"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              value={user?.email || ''} 
              disabled 
              placeholder="Your email"
              className="opacity-70"
            />
            <p className="text-xs text-muted-foreground">
              Your email cannot be changed.
            </p>
          </div>
        </CardContent>
      </Card>
      
      {/* Therapist Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>Therapist Preferences</CardTitle>
          <CardDescription>
            Customize your therapy experience
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="therapist-name">Preferred name for AI therapist</Label>
            <Input 
              id="therapist-name" 
              value={preferredTherapistName} 
              onChange={(e) => setPreferredTherapistName(e.target.value)} 
              placeholder="Dr. Sky"
            />
          </div>
          
          <div className="space-y-2">
            <Label>Gender preferences (optional)</Label>
            <RadioGroup value={genderPreference} onValueChange={setGenderPreference} className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="female" />
                <Label htmlFor="female" className="cursor-pointer">Female</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id="male" />
                <Label htmlFor="male" className="cursor-pointer">Male</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="neutral" id="neutral" />
                <Label htmlFor="neutral" className="cursor-pointer">Gender Neutral</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-2 pt-2">
            <Label>Voice Options (for future)</Label>
            <RadioGroup value={voicePreference} onValueChange={setVoicePreference} className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="soft-female" id="soft-female" />
                <Label htmlFor="soft-female" className="cursor-pointer">Soft Female</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="calm-male" id="calm-male" />
                <Label htmlFor="calm-male" className="cursor-pointer">Calm Male</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="neutral-voice" id="neutral-voice" />
                <Label htmlFor="neutral-voice" className="cursor-pointer">Gender Neutral Voice</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>
      
      {/* Security Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Security
          </CardTitle>
          <CardDescription>
            Control your data and privacy settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="storage">Local storage only</Label>
              <p className="text-sm text-muted-foreground">
                Keep all your data on this device only
              </p>
            </div>
            <Switch 
              id="storage" 
              checked={localStorageOnly} 
              onCheckedChange={setLocalStorageOnly} 
            />
          </div>
          
          <div className="pt-4">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="w-full sm:w-auto">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete My Data
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your
                    data and remove your account from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteData}>
                    Yes, delete my data
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-end">
        <Button onClick={handleSaveSettings} className="px-6">
          <Save className="mr-2 h-4 w-4" />
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default SettingsForm;
