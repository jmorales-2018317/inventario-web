import { Hero } from "@components/sections/hero";
import { Navbar } from "@components/sections/navbar";
import { Footer } from "@components/sections/footer";
import { ModeToggle } from "@components/ui/mode-toggle";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col bg-background text-foreground">
      <Navbar trailing={<ModeToggle />} />
      <Hero className="max-sm:px-4 mx-auto" />
      <Footer />
    </main>
  );
}
