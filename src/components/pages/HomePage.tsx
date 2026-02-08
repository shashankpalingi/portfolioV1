// WI-HPI
import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Send, Mail, Linkedin, Instagram } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { BaseCrudService } from '@/lib/mock-service';
import { AboutMe, DesignPhilosophy, PortfolioProjects } from '@/entities';
import { ContainerScroll } from '@/components/ui/container-scroll-animation';

// --- Animation Components ---

const FadeIn: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({
  children,
  delay = 0,
  className = ""
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, delay: delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const ParallaxImage: React.FC<{ src: string; alt: string; className?: string }> = ({ src, alt, className }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="w-full h-full">
        <Image src={src} alt={alt} className="w-full h-full object-cover" />
      </motion.div>
    </div>
  );
};

// --- Main Component ---

export default function HomePage() {
  const navigate = useNavigate();
  const [aboutData, setAboutData] = useState<AboutMe | null>(null);
  const [philosophies, setPhilosophies] = useState<DesignPhilosophy[]>([]);
  const [projects, setProjects] = useState<PortfolioProjects[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Parallel fetching for speed
        const [aboutRes, philRes, projRes] = await Promise.all([
          BaseCrudService.getAll<AboutMe>('aboutme'),
          BaseCrudService.getAll<DesignPhilosophy>('designphilosophy'),
          BaseCrudService.getAll<PortfolioProjects>('portfolioprojects')
        ]);

        if (aboutRes.items.length > 0) setAboutData(aboutRes.items[0]);
        setPhilosophies(philRes.items.sort((a, b) => (a.orderNumber || 0) - (b.orderNumber || 0)));
        setProjects(projRes.items);

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Ticker items (static as per design, but could be dynamic)
  const tickerItems = [
    "Zhang", "Restaurant kid", "Digital world", "Fynbos", "Night owl",
    "More fynbos", "Even more fynbos", "The Black Axe!", "Product Designer"
  ];

  return (
    <div className="min-h-screen bg-[#212121] text-[#F2E3CF] font-sans selection:bg-[#E35342] selection:text-white overflow-x-hidden">

      {isLoading ? (
        <div className="min-h-screen flex items-center justify-center">
          <LoadingSpinner className="text-[#E35342]" />
        </div>
      ) : (
        <>

          {/* --- Hero Section --- */}
          <section className="relative bg-[#F2E3CF] overflow-hidden pt-8">
            <Header />

            {/* Spiderman Overlay - Adjust positioning here:
                top: vertical position from section top
                right: horizontal position from section right
                w: width of the image (e.g., w-[500px])
            */}
            <motion.img
              src="/chalk_images/spidyy.png"
              alt="Spiderman"
              className="absolute top-[-60px] right-[-26px] w-[400px] md:w-[300px] h-auto z-40 pointer-events-none origin-top-right transition-all duration-300"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                // We'll let it be mostly static or subtlely move
                // since syncing with the 3D tilt is complex
              }}
            />

            <ContainerScroll titleComponent={null}>
              <div className="relative h-full w-full grid md:grid-cols-2 gap-8 items-center p-8 md:p-16">
                <div className="space-y-6 text-left">
                  <div className="inline-block">
                    <span className="text-[#E35342] font-bold tracking-wider uppercase text-sm border border-[#E35342] px-3 py-1 rounded-full">
                      Product Designer
                    </span>
                  </div>

                  <h1 className="text-[#E35342] text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
                    Software should <br />
                    <span className="font-serif italic font-normal">feel</span> natural.
                  </h1>

                  <p className="text-[#E35342]/80 text-lg md:text-xl max-w-md leading-relaxed">
                    {aboutData?.bio || "Designer, thinker, and maker based in Cape Town. Crafting digital experiences that feel human, intuitive, and delightful."}
                  </p>

                  <div className="pt-4">
                    <Button
                      onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
                      className="bg-[#E35342] hover:bg-[#c44232] text-[#F2E3CF] rounded-full px-8 py-6 text-lg font-medium transition-all hover:scale-105 shadow-lg hover:shadow-[#E35342]/30"
                    >
                      See my work
                    </Button>
                  </div>
                </div>

                <div className="relative flex justify-center">
                  {aboutData?.profileImage ? (
                    <div className="relative transform rotate-3 hover:rotate-0 transition-all duration-500 w-full max-w-[300px] aspect-[4/5]">
                      <div className="absolute inset-0 bg-[#E35342] rounded-2xl translate-x-2 translate-y-2" />
                      <Image
                        src={aboutData.profileImage}
                        alt="Jackie Zhang"
                        className="relative w-full h-full object-cover rounded-2xl border-4 border-white shadow-xl grayscale hover:grayscale-0 transition-all duration-500"
                      />
                      {/* Tape effect */}
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 bg-white/40 backdrop-blur-sm rotate-2 shadow-sm" />
                    </div>
                  ) : (
                    <div className="w-64 h-64 bg-[#E35342]/10 rounded-full flex items-center justify-center border-2 border-dashed border-[#E35342]/30">
                      <span className="text-[#E35342] font-serif italic text-2xl">Illustration</span>
                    </div>
                  )}

                  {/* Decorative "Sticker" elements */}
                  <motion.div
                    animate={{ rotate: [0, 5, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-10 -right-10 w-32 h-32 bg-[#E35342] rounded-full opacity-10 blur-2xl"
                  />
                </div>
              </div>
            </ContainerScroll>
          </section>

          {/* --- Work Section (Scattered Grid) --- */}
          <section id="work" className="pt-10 pb-32 px-4 md:px-8 relative">
            <div className="container mx-auto max-w-6xl">
              <FadeIn className="mb-20 text-center">
                <h2 className="text-4xl md:text-6xl font-bold mb-6">Selected Work</h2>
                <p className="text-xl text-[#F2E3CF]/60 max-w-2xl mx-auto">
                  A collection of projects where clarity meets delight.
                </p>
              </FadeIn>

              <div className="grid md:grid-cols-2 gap-12 md:gap-24">
                {projects.map((project, index) => (
                  <div
                    key={project._id}
                    className={`${index % 2 === 1 ? 'md:mt-32' : ''} flex flex-col`}
                  >
                    <FadeIn delay={index * 0.1}>
                      <Link to={`/projects/${project._id}`} className="group block">
                        <div className="relative transition-all duration-500 ease-out group-hover:-translate-y-4 group-hover:rotate-1">
                          {/* Card "Device" Frame */}
                          <div className="bg-white p-2 md:p-3 rounded-[1.5rem] shadow-2xl overflow-hidden relative z-10">
                            <div className="aspect-[4/3] overflow-hidden rounded-[1rem] bg-gray-100 relative">
                              {project.projectImage ? (
                                <Image
                                  src={project.projectImage}
                                  alt={project.projectTitle || 'Project'}
                                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                                  No Image
                                </div>
                              )}

                              {/* Overlay on hover */}
                              <div className="absolute inset-0 bg-[#E35342]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <div className="bg-white text-[#E35342] px-6 py-3 rounded-full font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                  View Case Study <ArrowUpRight size={18} />
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Shadow/Depth element behind */}
                          <div className="absolute inset-0 bg-black/50 rounded-[1.5rem] translate-y-4 translate-x-4 -z-10 blur-xl opacity-50 transition-opacity group-hover:opacity-70" />
                        </div>

                        <div className="mt-8 text-center md:text-left px-4">
                          <h3 className="text-2xl md:text-3xl font-bold mb-2 group-hover:text-[#E35342] transition-colors">
                            {project.projectTitle}
                          </h3>
                          <p className="text-[#F2E3CF]/60 text-lg line-clamp-2">
                            {project.description}
                          </p>
                          <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
                            {project.clientName && (
                              <span className="text-xs font-bold uppercase tracking-wider border border-[#F2E3CF]/20 px-3 py-1 rounded-full text-[#F2E3CF]/60">
                                {project.clientName}
                              </span>
                            )}
                          </div>
                        </div>
                      </Link>
                    </FadeIn>
                  </div>
                ))}
              </div>

              <div className="mt-32 text-center">
                <Link to="/work">
                  <Button variant="outline" className="border-[#F2E3CF] text-[#F2E3CF] hover:bg-[#F2E3CF] hover:text-[#212121] rounded-full px-10 py-6 text-lg transition-all">
                    View All Projects
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* --- Philosophy Section --- */}
          <section className="py-32 bg-[#F2E3CF] text-[#212121] relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#212121] to-transparent opacity-20" />

            <div className="container mx-auto max-w-6xl px-4 relative z-10">
              <FadeIn>
                <h2 className="text-4xl md:text-6xl font-bold text-center mb-24 text-[#E35342]">
                  3 things I strongly believe in
                </h2>
              </FadeIn>

              <div className="space-y-32">
                {philosophies.map((item, index) => (
                  <div key={item._id} className={`flex flex-col md:flex-row gap-12 md:gap-24 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                    <div className="flex-1 w-full">
                      <FadeIn delay={0.2} className="relative group">
                        <div className="absolute inset-0 bg-[#E35342] rounded-2xl translate-x-3 translate-y-3 transition-transform group-hover:translate-x-5 group-hover:translate-y-5" />
                        <div className="relative rounded-2xl overflow-hidden border-4 border-[#212121] bg-white aspect-[4/3]">
                          {item.visualElement ? (
                            <Image
                              src={item.visualElement}
                              alt={item.title || 'Philosophy'}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                              <span className="text-6xl">✨</span>
                            </div>
                          )}
                        </div>
                      </FadeIn>
                    </div>

                    <div className="flex-1 space-y-6 text-center md:text-left">
                      <FadeIn delay={0.3}>
                        <span className="text-[#E35342] font-bold text-xl md:text-2xl block mb-2">
                          0{index + 1}.
                        </span>
                        <h3 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
                          {item.title}
                        </h3>
                        <p className="text-lg md:text-xl leading-relaxed text-[#212121]/80 font-medium">
                          {item.description}
                        </p>
                        {item.tagline && (
                          <div className="mt-8 inline-block bg-[#E35342]/10 px-6 py-3 rounded-lg transform -rotate-1">
                            <p className="text-[#E35342] font-serif italic text-xl">
                              "{item.tagline}"
                            </p>
                          </div>
                        )}
                      </FadeIn>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* --- Ticker Section --- */}
          <section className="py-20 bg-[#212121] overflow-hidden border-y border-[#F2E3CF]/10">
            <div className="relative w-full">
              <div className="flex whitespace-nowrap animate-scroll">
                {[...tickerItems, ...tickerItems, ...tickerItems].map((item, i) => (
                  <div key={i} className="inline-flex items-center mx-8 md:mx-12">
                    <span className="text-[#F2E3CF]/40 font-bold text-4xl md:text-6xl hover:text-[#E35342] transition-colors cursor-default">
                      {item}
                    </span>
                    <span className="ml-12 md:ml-24 text-[#E35342] text-2xl">✦</span>
                  </div>
                ))}
              </div>
            </div>
            <style>{`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-33.33%); }
          }
          .animate-scroll {
            animation: scroll 30s linear infinite;
          }
          .animate-scroll:hover {
            animation-play-state: paused;
          }
        `}</style>
          </section>

          {/* --- Contact / Footer Area --- */}
          <section className="py-32 px-4 md:px-8 relative overflow-hidden">
            <div className="container mx-auto max-w-4xl relative z-10">
              <FadeIn>
                <div className="bg-[#F2E3CF] rounded-[2rem] p-8 md:p-16 border-b-[12px] border-[#E35342] shadow-2xl">
                  <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                      <h2 className="text-[#E35342] text-4xl md:text-5xl font-bold leading-tight">
                        Let's build something <span className="font-serif italic">memorable</span>.
                      </h2>
                      <p className="text-[#212121]/70 text-lg">
                        Currently open for new opportunities and collaborations. Drop me a line if you'd like to chat.
                      </p>

                      <div className="flex gap-4">
                        <a href="mailto:hello@jackie.com" className="bg-[#E35342] text-[#F2E3CF] p-4 rounded-full hover:scale-110 transition-transform shadow-lg">
                          <Mail size={24} />
                        </a>
                        <a href="#" className="bg-[#212121] text-[#F2E3CF] p-4 rounded-full hover:scale-110 transition-transform shadow-lg">
                          <Linkedin size={24} />
                        </a>
                        <a href="#" className="bg-[#212121] text-[#F2E3CF] p-4 rounded-full hover:scale-110 transition-transform shadow-lg">
                          <Instagram size={24} />
                        </a>
                      </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-inner border-2 border-[#E35342]/10">
                      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                        <div>
                          <label className="block text-[#E35342] font-bold text-sm mb-2">Name</label>
                          <Input placeholder="Your name" className="bg-[#F2E3CF]/30 border-none text-[#212121] placeholder:text-[#212121]/40 h-12 rounded-xl focus-visible:ring-[#E35342]" />
                        </div>
                        <div>
                          <label className="block text-[#E35342] font-bold text-sm mb-2">Email</label>
                          <Input placeholder="hello@example.com" type="email" className="bg-[#F2E3CF]/30 border-none text-[#212121] placeholder:text-[#212121]/40 h-12 rounded-xl focus-visible:ring-[#E35342]" />
                        </div>
                        <div>
                          <label className="block text-[#E35342] font-bold text-sm mb-2">Message</label>
                          <Textarea placeholder="Tell me about your project..." className="bg-[#F2E3CF]/30 border-none text-[#212121] placeholder:text-[#212121]/40 min-h-[120px] rounded-xl resize-none focus-visible:ring-[#E35342]" />
                        </div>
                        <Button type="submit" className="w-full bg-[#E35342] hover:bg-[#c44232] text-[#F2E3CF] h-12 rounded-xl font-bold text-lg shadow-md hover:shadow-lg transition-all">
                          Send Message <Send size={18} className="ml-2" />
                        </Button>
                      </form>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Footer Links */}
            <div className="container mx-auto max-w-6xl mt-20 flex flex-col md:flex-row justify-between items-center text-[#F2E3CF]/40 text-sm">
              <p>© {new Date().getFullYear()} Jackie Zhang. All rights reserved.</p>
              <div className="flex gap-8 mt-4 md:mt-0">
                <Link to="/privacy" className="hover:text-[#F2E3CF] transition-colors">Privacy Policy</Link>
                <Link to="/terms" className="hover:text-[#F2E3CF] transition-colors">Terms of Use</Link>
              </div>
            </div>
          </section>

          <Footer />
        </>
      )}
    </div>
  );
}