import Link from "next/link";
import { Button } from "@components/ui/button";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-8 bg-background px-6 py-16 text-foreground">
      <div className="flex max-w-xl flex-col items-center gap-4 text-center">
        <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
          Gestiona tu inventario sin complicaciones
        </h1>
        <p className="max-w-md text-sm text-muted-foreground sm:text-base">
          Controla productos, existencias y movimientos desde un solo lugar.
          Empieza creando tu primer artículo en segundos.
        </p>
      </div>

      <Button asChild size="lg">
        <Link href="/inventario">Comenzar</Link>
      </Button>
    </main>
  );
}
