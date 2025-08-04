import { BrainCircuit } from "lucide-react";

export default function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BrainCircuit className="h-7 w-7 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight text-foreground font-headline">
            MyEduMate
          </h1>
        </div>
      </div>
    </header>
  );
}
