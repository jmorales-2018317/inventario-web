import Link from 'next/link'

import { Button } from '@/components/ui/button'

export default function AuthCodeErrorPage() {
  return (
    <main className="flex min-h-full flex-1 flex-col items-center justify-center gap-6 bg-background px-4 py-16 text-center">
      <div className="max-w-md space-y-2">
        <h1 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
          No pudimos confirmar tu sesión
        </h1>
        <p className="text-sm text-muted-foreground">
          El enlace puede haber caducado o ya fue usado. Vuelve a iniciar sesión o
          solicita un correo nuevo desde Supabase Auth.
        </p>
      </div>
      <Button asChild size="lg">
        <Link href="/login">Volver al inicio de sesión</Link>
      </Button>
    </main>
  )
}
