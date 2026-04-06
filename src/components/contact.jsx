import { FaEnvelope, FaPaperPlane, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

function Contact({ setContactInView }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.15, 
  });

  useEffect(() => {
    if (setContactInView) {
      setContactInView(inView);
    }
  }, [inView, setContactInView]);

  return (
    <>
      <section id="contact" ref={ref} className="pt-32 pb-16 relative z-8 flex flex-col items-center justify-center min-h-[70vh] overflow-hidden">
        
        <div className="w-full mx-auto flex flex-col items-center relative z-10">
          
          <motion.div 
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-center w-full px-6 mb-12"
          >
            <h2 className="text-sm md:text-xl font-black tracking-[0.2em] text-gray-900 mb-8 uppercase flex items-center justify-center gap-4">
              <span className="w-12 h-px bg-gray-900"></span>
              Let's build something extraordinary
              <span className="w-12 h-px bg-gray-900"></span>
            </h2>
          </motion.div>

          <div className="w-full overflow-hidden relative py-10 group bg-white/30 backdrop-blur-sm border-y border-white/40 shadow-[0_0_40px_rgba(0,0,0,0.03)] cursor-pointer" onClick={() => window.location.href="mailto:madhavpruthi@icloud.com"}>
            <motion.div 
              animate={{ x: [0, -1035] }}  
              transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
              className="flex whitespace-nowrap items-center hover:text-indigo-600 transition-colors duration-500"
            >
              {[...Array(4)].map((_, i) => (
                <h1 key={i} className="text-[12vw] md:text-[8vw] leading-none font-black text-black tracking-tighter uppercase px-8">
                  MADHAVPRUTHI@ICLOUD.COM <span className="text-indigo-500/30 mx-4">•</span>
                </h1>
              ))}
            </motion.div>

            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="bg-black text-white px-6 py-3 rounded-full font-medium tracking-widest text-sm shadow-xl transform scale-90 group-hover:scale-100 transition-transform duration-300">
                Click to Email
              </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="mt-20 flex flex-col sm:flex-row flex-wrap justify-between items-end w-full max-w-7xl px-6 gap-10 relative z-10"
          >

            <div className="flex flex-col items-center sm:items-start gap-4">
              <div className="flex gap-6 sm:gap-10 text-lg sm:text-xl font-black tracking-tighter uppercase">
   
                <a 
                  href="https://linkedin.com/in/madhavpruthi"
                  target="_blank"
                  rel="noreferrer"
                  className="group relative text-gray-900 hover:text-indigo-600 transition-all duration-300"
                >
                  LinkedIn
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
                </a>
 
                <a 
                  href="https://github.com/madhvpruthi"
                  target="_blank"
                  rel="noreferrer"
                  className="group relative text-gray-900 hover:text-indigo-600 transition-all duration-300"
                >
                  GitHub
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
                </a>


                <a 
                  href="https://www.instagram.com/madhav._pruthi"
                  target="_blank"
                  rel="noreferrer"
                  className="group relative text-gray-900 hover:text-indigo-600 transition-all duration-300"
                >
                  Instagram
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
                </a>

              </div>

              <button 
                onClick={() => setIsModalOpen(true)}
                className="group flex gap-6 sm:gap-10 text-lg sm:text-xl font-black tracking-tighter text-gray-900 uppercase transition-all duration-300 hover:text-indigo-600">
                <span className="relative">
                  Start a Conversation!
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
                </span>
              </button>
            </div>

            <div className="text-gray-400 font-bold tracking-widest text-sm uppercase">
              © {new Date().getFullYear()} MADHAV PRUTHI
            </div>
          </motion.div>

        </div>
      </section>
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/10 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="relative w-full max-w-lg p-10 overflow-hidden rounded-[2.5rem] bg-white/70 backdrop-blur-3xl border border-white/80 shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
            >

              <div className="absolute -top-32 -left-32 w-64 h-64 bg-indigo-300/40 rounded-full blur-[80px] pointer-events-none"></div>
              <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-pink-300/30 rounded-full blur-[80px] pointer-events-none"></div>


              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 transition-colors p-3 bg-gray-900/5 hover:bg-gray-900/10 rounded-full backdrop-blur-md"
              >
                <FaTimes />
              </button>

              <h3 className="text-3xl font-black text-gray-900 uppercase tracking-tight mb-2 relative z-10">Get In Touch</h3>
              <p className="text-sm font-medium text-gray-500 mb-8 max-w-xs relative z-10">Drop me a line and I'll get back to you as soon as possible.</p>

              <form className="flex flex-col gap-5 text-sm font-medium relative z-10" 
              onSubmit={async (e) => {
                e.preventDefault();


                const data = {
                  access_key: import.meta.env.VITE_WEB3FORMS_KEY,
                  name: e.target.name.value,
                  email: e.target.email.value,
                  phone: e.target.phone.value,
                  message: e.target.message.value,
                };

                try {
                  const submitButton = e.target.querySelector('button[type="submit"]');
                  const originalText = submitButton.innerText;
                  submitButton.innerText = "SENDING...";

                  const response = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      "Accept": "application/json"
                    },
                    body: JSON.stringify(data),
                  });

                  if (response.ok) {
                    setIsModalOpen(false);

                    e.target.reset();
                    submitButton.innerText = originalText;
                  } else {
                    submitButton.innerText = "ERROR - TRY AGAIN";
                    setTimeout(() => { submitButton.innerText = originalText; }, 3000);
                  }
                } catch (error) {
                  console.error("Error submitting form:", error);
                }
              }}
              >
                <div className="flex flex-col gap-1.5 text-left">
                  <label className="uppercase tracking-widest text-[10px] text-gray-400 ml-1 font-bold">Name</label>
                  <input type="text" name="name" required placeholder="Your Name" className="w-full bg-white/60 backdrop-blur-md border border-gray-200/60 rounded-xl px-5 py-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 focus:bg-white/90 transition-all font-medium" />
                </div>
                
                <div className="flex flex-col gap-1.5 text-left">
                  <label className="uppercase tracking-widest text-[10px] text-gray-400 ml-1 font-bold">Email</label>
                  <input type="email" name="email" required placeholder="hello@example.com" className="w-full bg-white/60 backdrop-blur-md border border-gray-200/60 rounded-xl px-5 py-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 focus:bg-white/90 transition-all font-medium" />
                </div>

                <div className="flex flex-col gap-1.5 text-left">
                  <label className="uppercase tracking-widest text-[10px] text-gray-400 ml-1 font-bold">Phone</label>
                  <input type="tel" name="phone" placeholder="+1 (234) 567-8900" className="w-full bg-white/60 backdrop-blur-md border border-gray-200/60 rounded-xl px-5 py-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 focus:bg-white/90 transition-all font-medium" />
                </div>

                <div className="flex flex-col gap-1.5 text-left">
                  <label className="uppercase tracking-widest text-[10px] text-gray-400 ml-1 font-bold">Message</label>
                  <textarea name="message" required placeholder="What's on your mind?" rows="3" className="w-full bg-white/60 backdrop-blur-md border border-gray-200/60 rounded-xl px-5 py-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 focus:bg-white/90 transition-all resize-none font-medium"></textarea>
                </div>

                <button type="submit" className="mt-6 w-full bg-gray-900 text-white font-black uppercase tracking-[0.2em] py-5 rounded-xl shadow-xl shadow-gray-900/10 hover:shadow-indigo-500/20 hover:bg-indigo-600 hover:scale-[1.02] transition-all duration-300">
                  Send Message
                </button>
              </form>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Contact;