import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BrainCircuit } from "lucide-react";

type WelcomeScreenProps = {
    onGuestLogin: (name: string) => void;
}

const WelcomeScreen = ({ onGuestLogin }: WelcomeScreenProps) => {
  const [name, setName] = useState("");

  const handleContinue = () => {
    if (name.trim()) {
      onGuestLogin(name.trim());
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <Card className="w-full max-w-sm shadow-lg rounded-2xl">
        <CardHeader className="text-center p-6">
           <div className="flex items-center justify-center gap-2 mb-4">
                <BrainCircuit className="h-8 w-8 text-primary" />
                <h1 className="text-3xl font-bold font-sans">
                    MyEduMate
                </h1>
            </div>
          <CardTitle className="text-xl font-bold font-sans">Learning, your way.</CardTitle>
          <CardDescription>Your learning companion, powered by AI.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 p-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-center block text-sm font-medium text-gray-700">Hey! What's your name?</Label>
            <Input 
              id="name" 
              placeholder="Enter your name" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              className="text-center"
            />
          </div>
          <Button 
            size="lg" 
            className="w-full rounded-xl" 
            onClick={handleContinue}
            disabled={!name.trim()}
          >
            Continue as Guest
          </Button>
        </CardContent>
        <CardFooter className="p-6">
          <p className="text-xs text-muted-foreground text-center w-full">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default WelcomeScreen;
