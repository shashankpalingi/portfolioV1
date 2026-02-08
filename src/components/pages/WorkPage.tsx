import { useEffect, useRef, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';
import { BaseCrudService } from '@/lib/mock-service';
import { PortfolioProjects } from '@/entities';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Calendar, User } from 'lucide-react';
import { format } from 'date-fns';

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

export default function WorkPage() {
  const [projects, setProjects] = useState<PortfolioProjects[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await BaseCrudService.getAll<PortfolioProjects>('portfolioprojects');
        setProjects(result.items);
      } catch (error) {
        console.error('Error fetching projects:', error);
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
              Selected Work
            </h1>
            <p className="text-foreground/70 font-paragraph text-xl text-center max-w-2xl mx-auto">
              A collection of projects that showcase design thinking, user empathy, and impactful solutions
            </p>
          </AnimatedElement>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          {isLoading ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <LoadingSpinner />
            </div>
          ) : projects.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <AnimatedElement key={project._id} delay={index * 100}>
                  <div className="group bg-background/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
                    {project.projectImage && (
                      <div className="aspect-video overflow-hidden relative">
                        <Image
                          src={project.projectImage}
                          alt={project.projectTitle || 'Project'}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-foreground font-heading text-xl md:text-2xl mb-3 group-hover:text-primary transition-colors duration-200">
                        {project.projectTitle}
                      </h3>

                      <div className="flex flex-wrap gap-4 mb-4 text-sm">
                        {project.clientName && (
                          <div className="flex items-center gap-2 text-primary font-paragraph">
                            <User size={16} />
                            <span>{project.clientName}</span>
                          </div>
                        )}
                        {project.projectDate && (
                          <div className="flex items-center gap-2 text-foreground/60 font-paragraph">
                            <Calendar size={16} />
                            <span>
                              {format(new Date(project.projectDate), 'MMM yyyy')}
                            </span>
                          </div>
                        )}
                      </div>

                      <p className="text-foreground/70 font-paragraph leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                  </div>
                </AnimatedElement>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-foreground/60 font-paragraph text-lg">No projects available yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <AnimatedElement>
            <div className="bg-accent rounded-3xl p-12 border-4 border-primary text-center">
              <h2 className="text-primary font-heading text-3xl md:text-4xl mb-4">
                Interested in collaborating?
              </h2>
              <p className="text-primary/80 font-paragraph text-lg mb-8">
                Let&apos;s create something meaningful together
              </p>
              <a
                href="/connect"
                className="inline-block bg-primary text-accent font-heading px-8 py-4 rounded-full hover:bg-primary/90 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Get in Touch
              </a>
            </div>
          </AnimatedElement>
        </div>
      </section>

      <Footer />
    </div>
  );
}
