import { motion } from "framer-motion"
import { FaCode, FaServer, FaCertificate, FaGithub, FaLinkedin, FaMousePointer, FaPaperPlane, FaCloudSun } from "react-icons/fa"
import { useState, useEffect } from "react"

export default function Hero({ onNavigate }) {
  const [hoveredWord, setHoveredWord] = useState(null);
  const [isPruthiBlurred, setIsPruthiBlurred] = useState(true);

  // top left part time part
  const [timeStr, setTimeStr] = useState("");
  const [dateStr, setDateStr] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' }));
      setDateStr(now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }));
    };
    updateDateTime();
    const interval = setInterval(updateDateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen relative w-full overflow-hidden flex flex-col justify-center font-sans bg-transparent">

      {/* TOP LEFT: DATE & TIME */}
      <div className="absolute top-8 left-4 sm:left-6 md:top-12 md:left-12 flex flex-col text-[10px] sm:text-xs md:text-sm text-gray-500 tracking-wide font-light z-20">
        <span>IND {timeStr} • {dateStr}</span>

      </div>

      {/* TOP RIGHT: doamin*/}
      <div className="absolute top-8 right-4 sm:right-6 md:top-12 md:right-12 z-20">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="group relative flex items-center gap-1.5 sm:gap-3 px-3 py-1.5 sm:px-5 sm:py-2 md:px-6 md:py-2.5 rounded-full bg-white/80 backdrop-blur-md border border-gray-900 overflow-hidden cursor-crosshair shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-shadow duration-500"
        >
          <div className="absolute inset-0 bg-gray-900 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] z-0"></div>
          <span className="relative z-10 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gray-900 group-hover:bg-emerald-400 group-hover:shadow-[0_0_8px_rgba(52,211,153,0.8)] transition-all duration-500"></span>
          <span className="relative z-10 text-[8px] sm:text-[10px] md:text-[11px] font-black tracking-widest sm:tracking-[0.25em] uppercase text-gray-900 group-hover:text-white transition-colors duration-500 whitespace-nowrap">
            Software • Android
          </span>
        </motion.div>
      </div>

      {/* LEFT: side line--the 4 buttons  */}
      <div className="absolute bottom-6 md:bottom-auto left-1/2 -translate-x-1/2 md:translate-x-0 md:left-2 lg:left-8 md:top-1/2 md:-translate-y-1/2 flex flex-row md:flex-col items-center gap-1.5 md:gap-2 p-1 md:p-1.5 z-30 bg-white/30 backdrop-blur-xl border border-white/60 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.06)]">
        
        {/* Hire Me button */}
        <button
          onClick={() => {
            const section = document.getElementById("contact")
            if (section) section.scrollIntoView({ behavior: "smooth" })
          }}
          className="relative bg-gradient-to-br from-[#0f172a] to-[#334155] text-white w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center hover:scale-[1.12] transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(15,23,42,0.3)] group overflow-visible"
          aria-label="Hire Me"
        >
          <span className="absolute left-full ml-4 md:ml-6 px-3 py-1.5 bg-[#0f172a] text-white text-[10px] font-semibold uppercase tracking-widest rounded-md opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 whitespace-nowrap pointer-events-none md:block hidden shadow-xl before:content-[''] before:absolute before:top-1/2 before:-translate-y-1/2 before:-left-1 before:border-4 before:border-transparent before:border-r-[#0f172a] z-40">
            Hire Me
          </span>
          <FaPaperPlane className="text-xs md:text-sm group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-300" />
        </button>

        {/* Separator a small light line before the resume button */}
        <div className="w-[1px] h-6 md:h-[1px] md:w-8 bg-gradient-to-b md:bg-gradient-to-r from-transparent via-gray-400/40 to-transparent md:my-1 opacity-80"></div>

        {/* Resume₹ button */}
        <a
          href="https://drive.google.com/file/d/1lX9nZzhwSiv5RVA60xDJuAFa5H287ljQ/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="relative bg-white/60 hover:bg-white text-gray-700 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center hover:scale-[1.12] transition-all duration-300 shadow-sm hover:shadow-[0_4px_15px_rgba(0,0,0,0.05)] group"
          aria-label="Resume"
        >
          <span className="absolute left-full ml-4 md:ml-6 px-3 py-1.5 bg-white text-gray-900 text-[10px] font-semibold uppercase tracking-widest rounded-md opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 whitespace-nowrap pointer-events-none md:block hidden shadow-xl border border-gray-100 before:content-[''] before:absolute before:top-1/2 before:-translate-y-1/2 before:-left-1 before:border-4 before:border-transparent before:border-r-white z-40">
            Resume
          </span>
          <span className="text-[9px] md:text-[11px] font-bold uppercase tracking-widest group-hover:text-blue-600 transition-colors">CV</span>
        </a>

        {/* GitHub button */}
        <a
          href="https://github.com/madhvpruthi"
          className="relative bg-white/60 hover:bg-[#181717] text-gray-700 hover:text-white w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center hover:scale-[1.12] transition-all duration-300 shadow-sm hover:shadow-[0_0_15px_rgba(24,23,23,0.3)] group"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <span className="absolute left-full ml-4 md:ml-6 px-3 py-1.5 bg-[#181717] text-white text-[10px] font-semibold uppercase tracking-widest rounded-md opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 whitespace-nowrap pointer-events-none md:block hidden shadow-xl before:content-[''] before:absolute before:top-1/2 before:-translate-y-1/2 before:-left-1 before:border-4 before:border-transparent before:border-r-[#181717] z-40">
            GitHub
          </span>
          <FaGithub className="text-sm md:text-base transition-colors" />
        </a>

        {/* LinkedIn button */}
        <a
          href="https://linkedin.com/in/madhavpruthi"
          className="relative bg-white/60 hover:bg-[#0077b5] text-gray-700 hover:text-white w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center hover:scale-[1.12] transition-all duration-300 shadow-sm hover:shadow-[0_0_15px_rgba(0,119,181,0.4)] group"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <span className="absolute left-full ml-4 md:ml-6 px-3 py-1.5 bg-[#0077b5] text-white text-[10px] font-semibold uppercase tracking-widest rounded-md opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 whitespace-nowrap pointer-events-none md:block hidden shadow-xl before:content-[''] before:absolute before:top-1/2 before:-translate-y-1/2 before:-left-1 before:border-4 before:border-transparent before:border-r-[#0077b5] z-40">
            LinkedIn
          </span>
          <FaLinkedin className="text-sm md:text-base transition-colors" />
        </a>
      </div>

      {/* main part */}
      <div className="max-w-7xl mx-auto w-full px-6 flex flex-col items-center justify-center relative z-10 pt-16 md:pt-0">

        
        <div className="flex flex-col items-center w-full relative h-full">

          <div className="w-full max-w-5xl mx-auto flex flex-col mt-12 md:mt-0 xl:mr-12">

            {/* ROW 1: first name aur bio part */}
            <div className="flex flex-col md:flex-row items-end justify-between w-full relative z-10 ">

              {/* FIRST NAME left side shift */}
              <div
                className="relative inline-block cursor-crosshair select-none md:-ml-8 lg:-ml-16 md:-translate-y-6 md:translate-x-6"
                onMouseEnter={() => setHoveredWord('first')}
                onMouseLeave={() => setHoveredWord(null)}
              >
                {hoveredWord === 'first' && (
                  <motion.div
                    layoutId="figma-box"
                    className="absolute inset-0 border-[1.5px] border-[#3b82f6] z-20 pointer-events-none "
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <div className="absolute -top-[15px] -left-[1.5px] bg-[#3b82f6] text-white px-1.5 py-[1px] text-[8px] font-bold uppercase rounded-sm shadow-sm">
                      Text
                    </div>
                    <div className="absolute -top-1 -left-1 w-2 h-2 bg-white border border-[#3b82f6] rounded-sm"></div>
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-white border border-[#3b82f6] rounded-sm"></div>
                    <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white border border-[#3b82f6] rounded-sm"></div>
                    <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-white border border-[#3b82f6] rounded-sm"></div>
                    
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white border border-[#3b82f6] rounded-sm"></div>
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white border border-[#3b82f6] rounded-sm"></div>
                    <div className="absolute top-1/2 -translate-y-1/2 -left-1 w-2 h-2 bg-white border border-[#3b82f6] rounded-sm"></div>
                    <div className="absolute top-1/2 -translate-y-1/2 -right-1 w-2 h-2 bg-white border border-[#3b82f6] rounded-sm"></div>

                    <div className="absolute -bottom-8 -right-4 flex flex-col items-center">
                      <FaMousePointer className="text-[#a855f7] text-lg absolute -top-4 -left-3 transform -rotate-12 drop-shadow-md z-30" />
                      <div className="bg-[#a855f7] text-white px-2 py-[2px] text-[10px] font-medium rounded-full shadow-md whitespace-nowrap ml-4 ">
                        You
                      </div>
                    </div>
                  </motion.div>
                )}
                <h1 className="text-[25vw] sm:text-[20vw] md:text-[14vw] font-thin text-[#0f172a] uppercase leading-none tracking-tight">
                  MADHAV
                </h1>
              </div>


              {/* DESKTOP BIO (Hidden on mobile) */}
              <div
                className="hidden md:block relative max-w-[260px] z-20 cursor-crosshair p-3 pb-8 mr-8 mb-8 -translate-y-12 translate-x-8"
                onMouseEnter={() => setHoveredWord('bio')}
                onMouseLeave={() => setHoveredWord(null)}
              >
                {hoveredWord === 'bio' && (
                  <motion.div
                    layoutId="figma-box"
                    className="absolute inset-0 border-[1.5px] border-[#3b82f6] z-20 pointer-events-none"
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <div className="absolute -top-[15px] -left-[1.5px] bg-[#3b82f6] text-white px-1.5 py-[1px] text-[8px] font-bold uppercase rounded-sm shadow-sm">
                      Text
                    </div>
                    <div className="absolute -top-1 -left-1 w-2 h-2 bg-white border border-[#3b82f6] rounded-sm"></div>
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-white border border-[#3b82f6] rounded-sm"></div>
                    <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white border border-[#3b82f6] rounded-sm"></div>
                    <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-white border border-[#3b82f6] rounded-sm"></div>

                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white border border-[#3b82f6] rounded-sm"></div>
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white border border-[#3b82f6] rounded-sm"></div>
                    <div className="absolute top-1/2 -translate-y-1/2 -left-1 w-2 h-2 bg-white border border-[#3b82f6] rounded-sm"></div>
                    <div className="absolute top-1/2 -translate-y-1/2 -right-1 w-2 h-2 bg-white border border-[#3b82f6] rounded-sm"></div>

                    <div className="absolute bottom-2 -right-8 flex flex-col items-center ">
                      <FaMousePointer className="text-[#a855f7] text-lg absolute -top-4 -left-3 transform -rotate-12 drop-shadow-md z-30" />
                      <div className="bg-[#a855f7] text-white px-2 py-[2px] text-[10px] font-medium rounded-full shadow-md whitespace-nowrap ml-4">
                        Madhav
                      </div>
                    </div>
                  </motion.div>
                )}
                <p className="text-gray-500 text-sm md:text-[13px] font-light leading-relaxed ">
                  <strong className="font-semibold text-gray-700">Software & Android Developer.</strong> Architecting elegant digital experiences. I specialize in building robust mobile applications and scalable systems that leave a lasting impact.
                </p>
              </div>

            </div>

            <div className="flex justify-start md:justify-end w-full relative z-0 mt-4 md:-mt-12 lg:-mt-16">
              <div
                className="relative inline-block cursor-crosshair select-none md:ml-12 lg:ml-24"
                onMouseEnter={() => setHoveredWord('last')}
                onMouseLeave={() => setHoveredWord(null)}
              >
                {hoveredWord === 'last' && (
                  <motion.div
                    layoutId="figma-box"
                    className="absolute inset-0 border-[1.5px] border-[#3b82f6] z-20 pointer-events-none"
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <div className="absolute -top-1 -left-1 w-2 h-2 bg-white border border-[#3b82f6] rounded-sm"></div>
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-white border border-[#3b82f6] rounded-sm"></div>
                    <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white border border-[#3b82f6] rounded-sm"></div>
                    <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-white border border-[#3b82f6] rounded-sm"></div>
                    {/* Middle Handles */}
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white border border-[#3b82f6] rounded-sm"></div>
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white border border-[#3b82f6] rounded-sm"></div>
                    <div className="absolute top-1/2 -translate-y-1/2 -left-1 w-2 h-2 bg-white border border-[#3b82f6] rounded-sm"></div>
                    <div className="absolute top-1/2 -translate-y-1/2 -right-1 w-2 h-2 bg-white border border-[#3b82f6] rounded-sm"></div>

                    <button
                      className="absolute -bottom-4 right-0 flex gap-1 bg-[#3b82f6] px-1.5 py-0.5 rounded-sm items-center shadow-sm pointer-events-auto hover:bg-blue-600 transition-colors cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setIsPruthiBlurred(prev => !prev);
                      }}
                      title="Toggle Blur"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-white opacity-80"></div>
                      <div className="w-4 h-1.5 rounded-full bg-white"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-white opacity-80"></div>
                    </button>

                    <div className="absolute -top-6 -right-10 flex flex-col items-center">
                      <FaMousePointer className="text-[#a855f7] text-lg absolute -bottom-3 -left-3 transform -rotate-12 drop-shadow-md z-30" />
                      <div className="bg-[#a855f7] text-white px-2 py-[2px] text-[10px] font-medium rounded-full shadow-md whitespace-nowrap ml-4">
                        Madhav
                      </div>
                    </div>
                  </motion.div>
                )}
                
                <h1 className={`text-[25vw] sm:text-[20vw] md:text-[14vw] font-thin text-[#0f172a] uppercase leading-none tracking-tight transition-all duration-700 ${isPruthiBlurred ? 'blur-[10px] opacity-90' : 'blur-0 opacity-100'}`}>
                  PRUTHI
                </h1>
              </div>
            </div>

            {/* MOBILE BIO (Hidden on desktop) */}
            <div
              className="block md:hidden relative w-full sm:max-w-[280px] mx-auto mt-8 z-20 cursor-crosshair p-3 pb-8"
              onMouseEnter={() => setHoveredWord('bio')}
              onMouseLeave={() => setHoveredWord(null)}
            >
              {hoveredWord === 'bio' && (
                <motion.div
                  layoutId="figma-box"
                  className="absolute inset-0 border-[1.5px] border-[#3b82f6] z-20 pointer-events-none"
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <div className="absolute -top-[15px] -left-[1.5px] bg-[#3b82f6] text-white px-1.5 py-[1px] text-[8px] font-bold uppercase rounded-sm shadow-sm">
                    Text
                  </div>
                  <div className="absolute -top-1 -left-1 w-2 h-2 bg-white border border-[#3b82f6] rounded-sm"></div>
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-white border border-[#3b82f6] rounded-sm"></div>
                  <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white border border-[#3b82f6] rounded-sm"></div>
                  <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-white border border-[#3b82f6] rounded-sm"></div>

                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white border border-[#3b82f6] rounded-sm"></div>
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white border border-[#3b82f6] rounded-sm"></div>
                  <div className="absolute top-1/2 -translate-y-1/2 -left-1 w-2 h-2 bg-white border border-[#3b82f6] rounded-sm"></div>
                  <div className="absolute top-1/2 -translate-y-1/2 -right-1 w-2 h-2 bg-white border border-[#3b82f6] rounded-sm"></div>

                  <div className="absolute bottom-2 -right-8 flex flex-col items-center ">
                    <FaMousePointer className="text-[#a855f7] text-lg absolute -top-4 -left-3 transform -rotate-12 drop-shadow-md z-30" />
                    <div className="bg-[#a855f7] text-white px-2 py-[2px] text-[10px] font-medium rounded-full shadow-md whitespace-nowrap ml-4">
                      Madhav
                    </div>
                  </div>
                </motion.div>
              )}
              <p className="text-gray-500 text-sm font-light leading-relaxed text-center sm:text-left">
                <strong className="font-semibold text-gray-700">Software & Android Developer.</strong> Architecting elegant digital experiences. I specialize in building robust mobile applications and scalable systems that leave a lasting impact.
              </p>
            </div>

          </div>
        </div>

      </div>

    </section>
  )
}