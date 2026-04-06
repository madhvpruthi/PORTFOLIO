import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function IntroScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
   
    const timer = setTimeout(() => {
      onComplete();
    }, 4000);  // Automatically dismiss the intro screen after 4 seconds


    const duration = 2500;
    const interval = 40;
    let currentStep = 0;
    const steps = duration / interval;

    const loader = setInterval(() => {
      currentStep++;
      setProgress(Math.min(Math.floor((currentStep / steps) * 100), 100));
    }, interval);


    const handleSkip = () => onComplete();
    window.addEventListener('click', handleSkip);

    return () => {
      clearTimeout(timer);
      clearInterval(loader);
      window.removeEventListener('click', handleSkip);
    };
  }, [onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#fafafa] cursor-pointer overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(20px)", scale: 1.05 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
    >

      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>


      <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-gray-300 opacity-50"></div>
      <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-gray-300 opacity-50"></div>

      <div className="relative z-10 flex flex-col items-center w-full px-6 text-center">
        

        <motion.div 
          initial={{ opacity: 0, letterSpacing: "0em" }}
          animate={{ opacity: 1, letterSpacing: "0.3em" }}
          transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
          className="text-[10px] md:text-xs font-semibold text-gray-400 mb-8 uppercase"
        >
          Initializing Portfolio Experience
        </motion.div>


        <div className="flex font-black text-[#0f172a] uppercase leading-none tracking-tighter text-[20vw] md:text-[12vw] drop-shadow-xl mix-blend-multiply">
          {"MADHAV".split("").map((char, index) => {
            const delays = [0.1, 1.4, 0.5, 2.1, 0.8, 1.1];
            const durations = [2.5, 3.2, 2.1, 3.8, 2.6, 3.0];
            return (
              <motion.div
                key={`wrap-${index}`}
                initial={{ opacity: 0, y: 40, filter: "blur(15px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.9, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.span
                  className="inline-block"
                  animate={{ opacity: [1, 0.15, 1] }}
                  transition={{
                    duration: durations[index],
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: delays[index] + 0.8, // Wait for entrance animation to finish
                    ease: "easeInOut"
                  }}
                >
                  {char}
                </motion.span>
              </motion.div>
            );
          })}
        </div>


        <motion.div 
          className="flex flex-col items-center w-full max-w-[200px] mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <div className="flex justify-between w-full mb-3 text-[9px] font-bold tracking-widest text-gray-500 uppercase">
            <span>Loading Assets</span>
            <span className="text-[#0f172a] tabular-nums font-black">{progress}%</span>
          </div>
          <div className="w-full h-[3px] bg-gray-200 overflow-hidden relative">
            <motion.div 
              className="absolute top-0 left-0 bottom-0 bg-[#0f172a]"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear", duration: 0.05 }}
            />
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}