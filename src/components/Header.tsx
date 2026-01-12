import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import cognullLogo from "@/assets/cognull-logo.png";

const navItems = [
  { label: "Início", href: "#hero" },
  { label: "Sobre", href: "#about" },
  { label: "Serviços", href: "#services" },
  { label: "Equipe", href: "#team" },
  { label: "Diferenciais", href: "#differentials" },
  { label: "Contato", href: "#contact" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass-strong py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => scrollToSection("#hero")}
          className="flex items-center gap-3 group"
        >
          <img
            src={cognullLogo}
            alt="Cognull Logo"
            className="h-10 w-auto transition-transform duration-300 group-hover:scale-105"
          />
          <span className="font-display text-xl font-bold gradient-text hidden sm:block">
            COGNULL
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollToSection(item.href)}
              className="px-4 py-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden lg:block">
          <Button
            variant="hero"
            size="default"
            onClick={() => scrollToSection("#contact")}
          >
            Solicitar Orçamento
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden glass-strong mt-3 mx-4 rounded-xl p-4 animate-fade-in">
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="px-4 py-3 text-left text-muted-foreground hover:text-primary hover:bg-muted/50 rounded-lg transition-all duration-300"
              >
                {item.label}
              </button>
            ))}
            <Button
              variant="hero"
              className="mt-4"
              onClick={() => scrollToSection("#contact")}
            >
              Solicitar Orçamento
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
