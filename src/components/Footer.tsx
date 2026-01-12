import cognullLogo from "@/assets/cognull-logo.png";
import { Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 border-t border-border/50">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-muted/30 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <img
              src={cognullLogo}
              alt="Cognull"
              className="h-14 w-auto"
            />
            <span className="font-display text-2xl font-bold gradient-text">
              COGNULL
            </span>
          </div>

          {/* Tagline */}
          <p className="text-muted-foreground max-w-md">
            Transformando ideias em soluções digitais inteligentes. 
            Tecnologia, inovação e qualidade.
          </p>

          {/* Divider */}
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          {/* Copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-2 text-sm text-muted-foreground">
            <span>© {currentYear} Cognull. Todos os direitos reservados.</span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1">
              Feito com <Heart className="w-4 h-4 text-destructive fill-destructive" /> em Brasil
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
