import { useEffect, useRef, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';
import { BaseCrudService } from '@/integrations';
import { AboutMe } from '@/entities';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

const AnimatedElement: React.FC<{children: React.ReactNode; className?: string; delay?: number}> = ({ children, className, delay = 0 }) => {
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

export default function AboutPage() {
  const [aboutData, setAboutData] = useState<AboutMe | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-24 px-4 bg-gradient-to-b from-background to-background/95">
        <div className="container mx-auto max-w-4xl">
          <AnimatedElement>
            <h1 className="text-foreground font-heading text-5xl md:text-7xl mb-6 text-center">
              About Me
            </h1>
            <p className="text-foreground/70 font-paragraph text-xl text-center max-w-2xl mx-auto">
              Designer, thinker, and maker based in Cape Town
            </p>
          </AnimatedElement>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          {isLoading ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <LoadingSpinner />
            </div>
          ) : aboutData ? (
            <div className="space-y-16">
              <AnimatedElement>
                <div className="bg-accent rounded-3xl p-8 md:p-12 border-4 border-primary">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    {aboutData.profileImage && (
                      <div className="rounded-2xl overflow-hidden shadow-2xl">
                        <Image 
                          src={aboutData.profileImage}
                          alt={aboutData.name || 'Profile'}
                          className="w-full h-auto hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div>
                      <h2 className="text-primary font-heading text-3xl md:text-4xl mb-4">
                        {aboutData.name}
                      </h2>
                      <p className="text-primary/90 font-paragraph text-lg leading-relaxed">
                        {aboutData.bio}
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedElement>

              <AnimatedElement delay={200}>
                <div className="bg-background/50 rounded-3xl p-8 md:p-12 shadow-xl">
                  <h3 className="text-foreground font-heading text-2xl md:text-3xl mb-6">
                    Professional Approach
                  </h3>
                  <p className="text-foreground/80 font-paragraph text-lg leading-relaxed">
                    {aboutData.professionalApproachText}
                  </p>
                </div>
              </AnimatedElement>

              <AnimatedElement delay={400}>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-primary/10 rounded-2xl p-6 hover:bg-primary/20 transition-colors duration-300">
                    <h4 className="text-primary font-heading text-xl mb-3">Location</h4>
                    <p className="text-foreground font-paragraph">Cape Town, South Africa</p>
                    <p className="text-foreground/70 font-paragraph text-sm mt-1">GMT +2:00</p>
                  </div>
                  <div className="bg-primary/10 rounded-2xl p-6 hover:bg-primary/20 transition-colors duration-300">
                    <h4 className="text-primary font-heading text-xl mb-3">Focus</h4>
                    <p className="text-foreground font-paragraph">Product Design</p>
                    <p className="text-foreground/70 font-paragraph text-sm mt-1">User Experience</p>
                  </div>
                  <div className="bg-primary/10 rounded-2xl p-6 hover:bg-primary/20 transition-colors duration-300">
                    <h4 className="text-primary font-heading text-xl mb-3">Philosophy</h4>
                    <p className="text-foreground font-paragraph">Software should feel easy</p>
                    <p className="text-foreground/70 font-paragraph text-sm mt-1">Clarity & Impact</p>
                  </div>
                </div>
              </AnimatedElement>

              {aboutData.contactEmail && (
                <AnimatedElement delay={600}>
                  <div className="text-center bg-gradient-to-br from-primary/5 to-accent/20 rounded-3xl p-12">
                    <h3 className="text-foreground font-heading text-2xl md:text-3xl mb-4">
                      Let&apos;s Connect
                    </h3>
                    <p className="text-foreground/70 font-paragraph mb-6">
                      Interested in working together? Get in touch.
                    </p>
                    <a 
                      href={`mailto:${aboutData.contactEmail}`}
                      className="inline-block bg-primary text-accent font-heading px-8 py-4 rounded-full hover:bg-primary/90 transition-all duration-300 hover:scale-105 shadow-lg"
                    >
                      {aboutData.contactEmail}
                    </a>
                  </div>
                </AnimatedElement>
              )}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-foreground/60 font-paragraph text-lg">No about information available.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
