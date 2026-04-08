import { useState, useEffect } from "react";
import Lenis from 'lenis';
import { AnimatePresence, motion } from "framer-motion";


import Hero from "./components/hero";
import Skills from "./components/skills";
import Projects from "./components/projects";
import Contact from "./components/contact";
import Background3D from "./components/background3d";
import Certificates from "./components/certificates";
import ParticlesBackground from "./components/particlebackground";
//import IntroScreen from "./components/introscreen";
import { FaCode, FaServer, FaCertificate } from "react-icons/fa";

function App() {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState("home"); 
  const [contactInView, setContactInView] = useState(false); 

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.05,
      wheelMultiplier: 0.5, 
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        { (
          <motion.div 
            key="app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative min-h-screen"
          >


            <div className="fixed inset-0 -z-20">

              <Background3D shapeState={currentPage} />
            </div>


            <main className="relative z-10 pb-32">
              <AnimatePresence mode="wait">
                {currentPage === "home" && (
                  <motion.div
                    key="home"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  >
                    <Hero />
                    <Contact setContactInView={setContactInView} />
                  </motion.div>
                )}

                {currentPage === "skills" && (
                  <motion.div
                    key="skills"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="min-h-screen flex flex-col"
                  >
                    <div className="w-full relative">
                      <div>
                        <Skills />
                      </div>
                    </div>
                    <Contact setContactInView={setContactInView} />
                  </motion.div>
                )}

                {currentPage === "projects" && (
                  <motion.div
                    key="projects"
                    initial={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
                    transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
                    className="min-h-screen flex flex-col"
                  >
                    <div className="w-full relative">
                      <div>
                        <Projects />
                      </div>
                    </div>
                    <Contact setContactInView={setContactInView} />
                  </motion.div>
                )}

                {currentPage === "certificates" && (
                  <motion.div
                    key="certificates"
                    initial={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
                    transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
                    className="min-h-screen flex flex-col"
                  >
                    <div className="w-full relative">
                      <div>
                        <Certificates />
                      </div>
                    </div>
                    <Contact setContactInView={setContactInView} />
                  </motion.div>
                )}
              </AnimatePresence>
            </main>


            <AnimatePresence>
              {!contactInView && (
                <motion.div 
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 40 }} 
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="fixed bottom-4 md:bottom-8 flex flex-row justify-center gap-2 sm:gap-6 w-full px-2 md:px-4 z-40 max-w-full overflow-x-auto no-scrollbar"
                >
                  <button 
                    onClick={() => setCurrentPage(currentPage === "skills" ? "home" : "skills")}
                    className={`group flex items-center justify-center gap-2 md:gap-3 px-4 py-2.5 md:px-6 md:py-3 border border-gray-300 backdrop-blur-md rounded-full shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-sm md:text-base font-medium flex-shrink-0 ${currentPage === "skills" ? "bg-black text-white border-transparent" : "bg-white/80 text-gray-700 hover:bg-white hover:text-black"}`}
                  >
                    <FaCode className={`text-base md:text-lg transition-colors duration-300 ${currentPage === "skills" ? "text-gray-300" : "text-gray-400 group-hover:text-black"}`} />
                    {currentPage === "skills" ? "Home" : "Skills"}
                  </button>

                  <button 
                    onClick={() => setCurrentPage(currentPage === "projects" ? "home" : "projects")}
                    className={`group flex items-center justify-center gap-2 md:gap-3 px-4 py-2.5 md:px-6 md:py-3 border border-gray-300 backdrop-blur-md rounded-full shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-sm md:text-base font-medium flex-shrink-0 ${currentPage === "projects" ? "bg-black text-white border-transparent" : "bg-white/80 text-gray-700 hover:bg-white hover:text-black"}`}
                  >
                    <FaServer className={`text-base md:text-lg transition-colors duration-300 ${currentPage === "projects" ? "text-gray-300" : "text-gray-400 group-hover:text-black"}`} />
                    {currentPage === "projects" ? "Home" : "Projects"}
                  </button>

                  <button 
                    onClick={() => setCurrentPage(currentPage === "certificates" ? "home" : "certificates")}
                    className={`group flex items-center justify-center gap-2 md:gap-3 px-4 py-2.5 md:px-6 md:py-3 border border-gray-300 backdrop-blur-md rounded-full shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-sm md:text-base font-medium flex-shrink-0 ${currentPage === "certificates" ? "bg-black text-white border-transparent" : "bg-white/80 text-gray-700 hover:bg-white hover:text-black"}`}
                  >
                    <FaCertificate className={`text-base md:text-lg transition-colors duration-300 ${currentPage === "certificates" ? "text-gray-300" : "text-gray-400 group-hover:text-black"}`} />
                    {currentPage === "certificates" ? "Home" : "Certificates"}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;