"use client";

import {
  ClipboardList,
  Layers,
  LineChart,
  LifeBuoy,
  Menu,
  PackageSearch,
  Truck,
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LogoMark, defaultLogo, type LogoMarkLogo } from "@/components/logo-mark";
import { SmartLink } from "@/components/smart-link";
import { cn } from "@/lib/utils";

type NavMenuItem = {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: NavMenuItem[];
};

type NavAuth = {
  login: { title: string; url: string };
  signup: { title: string; url: string };
};

export type NavbarProps = {
  className?: string;
  logo?: LogoMarkLogo;
  menu?: NavMenuItem[];
  auth?: NavAuth;
  /** Slot opcional al lado de los botones de auth (p. ej. ModeToggle) */
  trailing?: React.ReactNode;
};

const defaultMenu: NavMenuItem[] = [
  { title: "Inicio", url: "/" },
  {
    title: "Productos",
    url: "/inventario",
    items: [
      {
        title: "Catálogo",
        description: "Lista, busca y filtra todos tus productos",
        icon: <PackageSearch className="size-5 shrink-0" />,
        url: "/inventario",
      },
      {
        title: "Categorías",
        description: "Organiza el inventario por familias y atributos",
        icon: <Layers className="size-5 shrink-0" />,
        url: "/inventario/categorias",
      },
      {
        title: "Movimientos",
        description: "Entradas, salidas y ajustes de existencias",
        icon: <ClipboardList className="size-5 shrink-0" />,
        url: "/inventario/movimientos",
      },
      {
        title: "Proveedores",
        description: "Gestiona contactos, plazos y compras",
        icon: <Truck className="size-5 shrink-0" />,
        url: "/inventario/proveedores",
      },
    ],
  },
  {
    title: "Recursos",
    url: "#",
    items: [
      {
        title: "Reportes",
        description: "Indicadores de stock, rotación y costos",
        icon: <LineChart className="size-5 shrink-0" />,
        url: "/reportes",
      },
      {
        title: "Soporte",
        description: "Centro de ayuda y contacto con el equipo",
        icon: <LifeBuoy className="size-5 shrink-0" />,
        url: "/soporte",
      },
    ],
  },
  { title: "Precios", url: "/precios" },
];

const defaultAuth: NavAuth = {
  login: { title: "Iniciar sesión", url: "/login" },
  signup: { title: "Crear cuenta", url: "/signup" },
};

export function Navbar({
  className,
  logo = defaultLogo,
  menu = defaultMenu,
  auth = defaultAuth,
  trailing,
}: NavbarProps) {
  return (
    <section
      className={cn(
        "sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 py-3 backdrop-blur supports-backdrop-filter:bg-background/60",
        className
      )}
    >
      <div className="container mx-auto px-4">
        <nav className="hidden items-center justify-between lg:flex">
          <div className="flex items-center gap-6">
            <LogoMark logo={logo} />
            <NavigationMenu>
              <NavigationMenuList>
                {menu.map((item) => renderMenuItem(item))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div className="flex items-center gap-2">
            {trailing}
            <Button asChild variant="outline" size="lg">
              <SmartLink href={auth.login.url}>{auth.login.title}</SmartLink>
            </Button>
            <Button asChild size="lg">
              <SmartLink href={auth.signup.url}>{auth.signup.title}</SmartLink>
            </Button>
          </div>
        </nav>

        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <LogoMark logo={logo} />
            <div className="flex items-center gap-2">
              {trailing}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" aria-label="Abrir menú">
                    <Menu className="size-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent className="overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>
                      <LogoMark logo={logo} />
                    </SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-6 p-4">
                    <Accordion
                      type="single"
                      collapsible
                      className="flex w-full flex-col gap-4"
                    >
                      {menu.map((item) => renderMobileMenuItem(item))}
                    </Accordion>

                    <div className="flex flex-col gap-3">
                      <Button asChild variant="outline">
                        <SmartLink href={auth.login.url}>
                          {auth.login.title}
                        </SmartLink>
                      </Button>
                      <Button asChild>
                        <SmartLink href={auth.signup.url}>
                          {auth.signup.title}
                        </SmartLink>
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function renderMenuItem(item: NavMenuItem) {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent className="bg-popover text-popover-foreground">
          <ul className="grid w-80 gap-1 p-1">
            {item.items.map((subItem) => (
              <li key={subItem.title}>
                <NavigationMenuLink asChild>
                  <SubMenuLink item={subItem} />
                </NavigationMenuLink>
              </li>
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink asChild>
        <SmartLink
          href={item.url}
          className="bg-transparent group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:text-accent-foreground"
        >
          {item.title}
        </SmartLink>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
}

function renderMobileMenuItem(item: NavMenuItem) {
  if (item.items) {
    return (
      <AccordionItem
        key={item.title}
        value={item.title}
        className="border-b-0"
      >
        <AccordionTrigger className="py-0 text-base font-semibold hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          {item.items.map((subItem) => (
            <SubMenuLink key={subItem.title} item={subItem} />
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <SmartLink
      key={item.title}
      href={item.url}
      className="text-base font-semibold"
    >
      {item.title}
    </SmartLink>
  );
}

function SubMenuLink({ item }: { item: NavMenuItem }) {
  return (
    <SmartLink
      href={item.url}
      className="flex min-w-72 flex-row gap-4 rounded-md p-3 leading-none transition-colors outline-none select-none hover:bg-muted hover:text-accent-foreground"
    >
      {item.icon && <div className="text-foreground">{item.icon}</div>}
      <div>
        <div className="text-sm font-semibold">{item.title}</div>
        {item.description && (
          <p className="mt-1 text-sm leading-snug text-muted-foreground">
            {item.description}
          </p>
        )}
      </div>
    </SmartLink>
  );
}
