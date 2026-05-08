import { Hero } from "@components/sections/hero";
import { Navbar } from "@components/sections/navbar";
import { ModeToggle } from "@components/ui/mode-toggle";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col bg-background text-foreground">
      <Navbar trailing={<ModeToggle />} />
      <Hero className="max-sm:px-4 mx-auto" />
    </main>
  );
}
