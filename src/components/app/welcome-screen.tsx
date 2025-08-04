import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit } from "lucide-react";

type WelcomeScreenProps = {
    onGuestLogin: () => void;
}

const WelcomeScreen = ({ onGuestLogin }: WelcomeScreenProps) => {
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
        <CardContent className="space-y-3 p-6">
          <Button size="lg" className="w-full rounded-xl" onClick={onGuestLogin}>Continue as Guest</Button>
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