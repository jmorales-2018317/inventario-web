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

const signupSchema = z
  .object({
    email: z.string().email("Correo inválido"),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

type SignupValues = z.infer<typeof signupSchema>;

// ─── Signup Auth Form ─────────────────────────────────────────────────────────

export function SignupAuthForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupValues>({
    resolver: async (values) => {
      const result = signupSchema.safeParse(values);
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

  const onSubmit = async (values: SignupValues) => {
    // TODO: conectar con servicio de auth
    console.log("signup", values);
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
              Crea tu cuenta
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Comienza a gestionar tu inventario hoy
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
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                Contraseña
              </label>
              <Input
                type="password"
                placeholder="••••••••"
                autoComplete="new-password"
                {...register("password")}
              />
              <FieldError message={errors.password?.message} />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                Confirmar contraseña
              </label>
              <Input
                type="password"
                placeholder="••••••••"
                autoComplete="new-password"
                {...register("confirmPassword")}
              />
              <FieldError message={errors.confirmPassword?.message} />
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="size-4 animate-spin" />}
              Crear cuenta
            </Button>
          </form>
        </div>

        {/* Footer link */}
        <p className="mt-6 text-center text-sm text-muted-foreground">
          ¿Ya tienes cuenta?{" "}
          <Link
            href="/auth/login"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            Iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  );
}