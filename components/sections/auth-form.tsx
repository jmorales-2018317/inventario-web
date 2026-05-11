"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { Boxes, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// ─── Schemas ────────────────────────────────────────────────────────────────

const loginSchema = z.object({
  email: z.string().email("Correo inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

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

type LoginValues = z.infer<typeof loginSchema>;
type SignupValues = z.infer<typeof signupSchema>;

// ─── Sub-components ─────────────────────────────────────────────────────────

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-xs text-destructive">{message}</p>;
}

function GoogleButton() {
  return (
    <button
      type="button"
      className="flex w-full items-center justify-center gap-3 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/30"
    >
      {/* Google SVG icon */}
      <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
        <path
          d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z"
          fill="#4285F4"
        />
        <path
          d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z"
          fill="#34A853"
        />
        <path
          d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z"
          fill="#FBBC05"
        />
        <path
          d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z"
          fill="#EA4335"
        />
      </svg>
      Continuar con Google
    </button>
  );
}

function Divider() {
  return (
    <div className="relative my-4">
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t border-border" />
      </div>
      <div className="relative flex justify-center text-xs">
        <span className="bg-card px-2 text-muted-foreground">o continúa con</span>
      </div>
    </div>
  );
}

// ─── Input ───────────────────────────────────────────────────────────────────

function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

// ─── Login Form ──────────────────────────────────────────────────────────────

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (values: LoginValues) => {
    // TODO: conectar con servicio de auth
    console.log("login", values);
  };

  return (
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
  );
}

// ─── Signup Form ─────────────────────────────────────────────────────────────

function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupValues>({ resolver: zodResolver(signupSchema) });

  const onSubmit = async (values: SignupValues) => {
    // TODO: conectar con servicio de auth
    console.log("signup", values);
  };

  return (
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
  );
}

// ─── Auth Form (main export) ─────────────────────────────────────────────────

type AuthFormProps = {
  mode: "login" | "signup";
};

export function AuthForm({ mode }: AuthFormProps) {
  const isLogin = mode === "login";

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
              {isLogin ? "Bienvenido de vuelta" : "Crea tu cuenta"}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {isLogin
                ? "Ingresa tus datos para continuar"
                : "Comienza a gestionar tu inventario hoy"}
            </p>
          </div>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <GoogleButton />
          <Divider />
          {isLogin ? <LoginForm /> : <SignupForm />}
        </div>

        {/* Footer link */}
        <p className="mt-6 text-center text-sm text-muted-foreground">
          {isLogin ? (
            <>
              ¿No tienes cuenta?{" "}
              <Link
              // Endpoint for next/link, so we can use the Link component instead of <a>
                href="/auth/signup"
                className="font-medium text-foreground underline-offset-4 hover:underline"
              >
                Crear cuenta
              </Link>
            </>
          ) : (
            <>
              ¿Ya tienes cuenta?{" "}
              <Link
              // Endpoint for next/link, so we can use the Link component instead of <a>
                href="/auth/login"
                className="font-medium text-foreground underline-offset-4 hover:underline"
              >
                Iniciar sesión
              </Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
}