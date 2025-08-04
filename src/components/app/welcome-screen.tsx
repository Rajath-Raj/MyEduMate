import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit } from "lucide-react";
import Image from "next/image";

type WelcomeScreenProps = {
    onGuestLogin: () => void;
}

const WelcomeScreen = ({ onGuestLogin }: WelcomeScreenProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-sm shadow-lg">
        <CardHeader className="text-center">
           <div className="flex items-center justify-center gap-2 mb-4">
                <BrainCircuit className="h-8 w-8 text-primary" />
                <h1 className="text-3xl font-bold">
                    MyEduMate
                </h1>
            </div>
          <CardTitle className="text-2xl font-bold">Learning, your way.</CardTitle>
          <CardDescription>Your learning companion, powered by AI.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button className="w-full" onClick={onGuestLogin}>Continue as Guest</Button>
          <Button variant="outline" className="w-full">Sign in with Email</Button>
          <Button variant="outline" className="w-full">Sign in with Google</Button>
        </CardContent>
        <CardFooter>
          <p className="text-xs text-muted-foreground text-center w-full">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default WelcomeScreen;
