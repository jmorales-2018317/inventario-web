import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Boxes } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type HeroImage = {
  src: string;
  alt: string;
  srcDark?: string;
  width?: number;
  height?: number;
};

type HeroButton = {
  text: string;
  url: string;
  icon?: React.ReactNode;
};

type HeroButtons = {
  primary?: HeroButton;
  secondary?: HeroButton;
};

export type HeroProps = {
  heading?: string;
  description?: string;
  buttons?: HeroButtons;
  image?: HeroImage;
  byline?: string;
  className?: string;
  icon?: React.ReactNode;
};

const defaults: Required<Omit<HeroProps, "className" | "buttons">> & {
  buttons: HeroButtons;
} = {
  heading: "Gestiona tu inventario sin complicaciones",
  description:
    "Controla productos, existencias y movimientos desde un solo lugar. Crea tu inventario en segundos y mantén tu negocio bajo control.",
  buttons: {
    primary: {
      text: "Comenzar",
      url: "/inventario",
    },
  },
  image: {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/modern/saas-hero/saas-hero-1-16x9.png",
    srcDark:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/modern/saas-hero/saas-hero-1-16x9-dark.png",
    alt: "Vista previa del panel de inventario",
    width: 1920,
    height: 1080,
  },
  byline: "Diseñado para equipos pequeños y comercios en crecimiento",
  icon: <Boxes className="size-6" />,
};

export function Hero({
  icon = defaults.icon,
  heading = defaults.heading,
  description = defaults.description,
  buttons = defaults.buttons,
  image = defaults.image,
  byline = defaults.byline,
  className,
}: HeroProps) {
  const { width = 1920, height = 1080 } = image;

  return (
    <section className={cn("overflow-hidden py-20 max-sm:py-10", className)}>
      <div className="container mx-auto">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-5">
            <span className="mx-auto flex size-16 items-center justify-center rounded-full border md:size-20">
              {icon}
            </span>

            <h1 className="font-heading mx-auto max-w-xl text-center text-3xl font-semibold tracking-tight text-pretty md:text-5xl lg:max-w-3xl lg:text-6xl">
              {heading}
            </h1>

            <p className="mx-auto max-w-5xl text-balance text-center text-muted-foreground md:text-xl">
              {description}
            </p>

            <div className="flex flex-col items-center gap-3 pt-3 pb-10 sm:flex-row sm:justify-center">
              {buttons?.primary && (
                <Button size="lg" asChild>
                  <Link href={buttons.primary.url}>
                    {buttons.primary.text}
                    {buttons.primary.icon ?? <ArrowRight className="size-4" />}
                  </Link>
                </Button>
              )}

              {buttons?.secondary && (
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="w-full sm:w-auto"
                >
                  <Link href={buttons.secondary.url}>
                    {buttons.secondary.text}
                    {buttons.secondary.icon}
                  </Link>
                </Button>
              )}
            </div>

            {byline && (
              <div className="text-center text-sm text-muted-foreground">
                {byline}
              </div>
            )}
          </div>

          {image.srcDark ? (
            <>
              <Image
                src={image.src}
                alt={image.alt}
                width={width}
                height={height}
                priority
                className="mx-auto aspect-3/4 h-auto max-h-[524px] w-full max-w-5xl rounded-lg border border-border object-cover object-top-left md:aspect-video md:object-top dark:hidden"
              />
              <Image
                src={image.srcDark}
                alt={image.alt}
                width={width}
                height={height}
                priority
                className="mx-auto hidden aspect-3/4 h-auto max-h-[524px] w-full max-w-5xl rounded-lg border border-border object-cover object-top-left md:aspect-video md:object-top dark:block"
              />
            </>
          ) : (
            <Image
              src={image.src}
              alt={image.alt}
              width={width}
              height={height}
              priority
              className="mx-auto aspect-3/4 h-auto max-h-[524px] w-full max-w-5xl rounded-lg border border-border object-cover object-top-left md:aspect-video md:object-top"
            />
          )}
        </div>
      </div>
    </section>
  );
}
