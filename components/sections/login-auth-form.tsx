"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { Boxes, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FieldError } from "@/components/auth/field-error";
import { GoogleButton } from "@/components/auth/google-button";
import { Divider } from "@/components/auth/divider";

// ─── Schema ──────────────────────────────────────────────────────────────────

const loginSchema = z.object({
  email: z.string().email("Correo inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

type LoginValues = z.infer<typeof loginSchema>;

// ─── Login Auth Form ──────────────────────────────────────────────────────────

export function LoginAuthForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: async (values) => {
      const result = loginSchema.safeParse(values);
      if (result.success) return { values: result.data, errors: {} };
      return {
        values: {},
        errors: result.error.issues.reduce((acc, issue) => {
          const path = issue.path[0] as string;
          acc[path] = { message: issue.message, type: issue.code };
          return acc;
        }, {} as Record<string, { message: string; type: string }>),
      };
    },
  });

  const onSubmit = async (values: LoginValues) => {
    // TODO: conectar con servicio de auth
    console.log("login", values);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center gap-3">
          <Link
            href="/"
            className="flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground"
          >
            <Boxes className="size-6" />
          </Link>
          <div className="text-center">
            <h1 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
              Bienvenido de vuelta
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Ingresa tus datos para continuar
            </p>
          </div>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <GoogleButton />
          <Divider />

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                Correo electrónico
              </label>
              <Input
                type="email"
                placeholder="tu@correo.com"
                autoComplete="email"
                {...register("email")}
              />
              <FieldError message={errors.email?.message} />
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="text-sm font-medium text-foreground">
                  Contraseña
                </label>
                <Link
                  href="#"
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <Input
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
                {...register("password")}
              />
              <FieldError message={errors.password?.message} />
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="size-4 animate-spin" />}
              Iniciar sesión
            </Button>
          </form>
        </div>

        {/* Footer link */}
        <p className="mt-6 text-center text-sm text-muted-foreground">
          ¿No tienes cuenta?{" "}
          <Link
            href="/auth/signup"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            Crear cuenta
          </Link>
        </p>
      </div>
    </div>
  );
}