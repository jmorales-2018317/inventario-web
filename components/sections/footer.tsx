import { LogoMark, defaultLogo, type LogoMarkLogo } from "@/components/logo-mark";
import { Button } from "@/components/ui/button";
type SocialLink = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

type FooterProps = {
  logo?: LogoMarkLogo;
};

const navLinks = [
  { href: "#", label: "Features" },
  { href: "#", label: "Blog" },
  { href: "#", label: "About" },
  { href: "#", label: "Contact" },
  { href: "#", label: "Licence" },
  { href: "#", label: "Privacy" },
];


const socialLinks: SocialLink[] = [];

export function Footer({ logo = defaultLogo }: FooterProps) {
  return (
    <footer className="w-full border-t border-border/60">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <LogoMark logo={logo} />
            </div>
            <div className="flex items-center">
              {socialLinks.map(({ href, label, icon }) => (
                <Button asChild key={label} size="icon-sm" variant="ghost">
                  <a aria-label={label} href={href}>
                    {icon}
                  </a>
                </Button>
              ))}
            </div>
          </div>

          <nav>
            <ul className="flex flex-wrap gap-4 font-medium text-muted-foreground text-sm md:gap-6">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a className="hover:text-foreground" href={link.href}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
