import { Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-background border-t border-foreground/10 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="text-foreground font-heading text-lg">
            jackiezhang.co.za
          </div>

          {/* Contact */}
          <div className="flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors duration-200">
            <Mail size={18} />
            <a href="mailto:hello@jackiezhang.co.za" className="font-paragraph">
              hello@jackiezhang.co.za
            </a>
          </div>

          {/* Copyright */}
          <div className="text-foreground/60 font-paragraph text-sm">
            © 2026 jackiezhang.co.za
          </div>
        </div>
      </div>
    </footer>
  );
}
