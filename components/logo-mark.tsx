"use client";

import Image from "next/image";
import { Boxes } from "lucide-react";

import { SmartLink } from "@/components/smart-link";
import { cn } from "@/lib/utils";

export type LogoMarkLogo = {
  url: string;
  src?: string;
  alt: string;
  title: string;
  className?: string;
  /** Render inline (works without configuring next/image domains) */
  inline?: boolean;
};

export const defaultLogo: LogoMarkLogo = {
  url: "/",
  alt: "Inventario",
  title: "Inventario",
  inline: true,
};

export function LogoMark({ logo }: { logo: LogoMarkLogo }) {
  return (
    <SmartLink href={logo.url} className="flex items-center gap-2">
      {logo.src && !logo.inline ? (
        <Image
          src={logo.src}
          alt={logo.alt}
          width={32}
          height={32}
          className={cn("max-h-8 w-auto dark:invert", logo.className)}
        />
      ) : (
        <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <Boxes className="size-4" />
        </span>
      )}
      <span className="font-heading text-lg font-semibold tracking-tight">
        {logo.title}
      </span>
    </SmartLink>
  );
}
