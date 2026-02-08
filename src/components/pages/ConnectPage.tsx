import { useEffect, useRef, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/lib/mock-service';
import { AboutMe } from '@/entities';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Mail, MapPin, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const AnimatedElement: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({ children, className, delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.classList.add('is-visible');
          }, delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`${className || ''} opacity-0 translate-y-8 transition-all duration-700 ease-out`}
      style={{
        opacity: 0,
      }}
    >
      <style>{`
        .is-visible {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
      {children}
    </div>
  );
};

export default function ConnectPage() {
  const [aboutData, setAboutData] = useState<AboutMe | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await BaseCrudService.getAll<AboutMe>('aboutme');
        if (result.items.length > 0) {
          setAboutData(result.items[0]);
        }
      } catch (error) {
        console.error('Error fetching about data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', message: '' });

      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-24 px-4 bg-gradient-to-b from-background to-background/95">
        <div className="container mx-auto max-w-4xl">
          <AnimatedElement>
            <h1 className="text-foreground font-heading text-5xl md:text-7xl mb-6 text-center">
              Let&apos;s Connect
            </h1>
            <p className="text-foreground/70 font-paragraph text-xl text-center max-w-2xl mx-auto">
              Have a project in mind? Want to collaborate? I&apos;d love to hear from you.
            </p>
          </AnimatedElement>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          {isLoading ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <LoadingSpinner />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Information */}
              <AnimatedElement>
                <div className="space-y-8">
                  <div>
                    <h2 className="text-foreground font-heading text-3xl mb-6">
                      Get in Touch
                    </h2>
                    <p className="text-foreground/70 font-paragraph text-lg leading-relaxed">
                      Whether you have a question, a project idea, or just want to say hello,
                      feel free to reach out. I&apos;m always open to discussing new opportunities
                      and creative collaborations.
                    </p>
                  </div>

                  <div className="space-y-6">
                    {aboutData?.contactEmail && (
                      <div className="flex items-start gap-4 group">
                        <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary/20 transition-colors duration-300">
                          <Mail className="text-primary" size={24} />
                        </div>
                        <div>
                          <h3 className="text-foreground font-heading text-lg mb-1">Email</h3>
                          <a
                            href={`mailto:${aboutData.contactEmail}`}
                            className="text-foreground/70 font-paragraph hover:text-primary transition-colors duration-200"
                          >
                            {aboutData.contactEmail}
                          </a>
                        </div>
                      </div>
                    )}

                    <div className="flex items-start gap-4 group">
                      <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary/20 transition-colors duration-300">
                        <MapPin className="text-primary" size={24} />
                      </div>
                      <div>
                        <h3 className="text-foreground font-heading text-lg mb-1">Location</h3>
                        <p className="text-foreground/70 font-paragraph">
                          Cape Town, South Africa
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 group">
                      <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary/20 transition-colors duration-300">
                        <Clock className="text-primary" size={24} />
                      </div>
                      <div>
                        <h3 className="text-foreground font-heading text-lg mb-1">Timezone</h3>
                        <p className="text-foreground/70 font-paragraph">
                          GMT +2:00
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedElement>

              {/* Contact Form */}
              <AnimatedElement delay={200}>
                <div className="bg-accent rounded-3xl p-8 border-4 border-primary">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-primary font-heading text-lg mb-2">
                        Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-background/50 border-primary/30 text-foreground focus:border-primary"
                        placeholder="Your name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-primary font-heading text-lg mb-2">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-background/50 border-primary/30 text-foreground focus:border-primary"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-primary font-heading text-lg mb-2">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full bg-background/50 border-primary/30 text-foreground focus:border-primary resize-none"
                        placeholder="Tell me about your project..."
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary text-accent font-heading text-lg py-6 rounded-full hover:bg-primary/90 transition-all duration-300 hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <LoadingSpinner />
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          <Send size={20} />
                          Send Message
                        </span>
                      )}
                    </Button>

                    {submitSuccess && (
                      <div className="bg-primary/20 text-primary font-paragraph p-4 rounded-lg text-center">
                        Message sent successfully! I&apos;ll get back to you soon.
                      </div>
                    )}
                  </form>
                </div>
              </AnimatedElement>
            </div>
          )}
        </div>
      </section>

      {/* Additional CTA */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <AnimatedElement>
            <div className="bg-gradient-to-br from-primary/5 to-accent/20 rounded-3xl p-12 text-center">
              <h2 className="text-foreground font-heading text-3xl md:text-4xl mb-4">
                Looking for my work?
              </h2>
              <p className="text-foreground/70 font-paragraph text-lg mb-8">
                Check out my portfolio to see what I&apos;ve been working on
              </p>
              <a
                href="/work"
                className="inline-block bg-primary text-accent font-heading px-8 py-4 rounded-full hover:bg-primary/90 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                View Portfolio
              </a>
            </div>
          </AnimatedElement>
        </div>
      </section>

      <Footer />
    </div>
  );
}
