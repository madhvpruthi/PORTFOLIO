import React from 'react';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaAward } from 'react-icons/fa';

const certificatesData = [
  {
    title: "Deep Learning",
    issuer: "NPTEL",
    description: "Successfully completed and certified in Deep Learning, mastering neural networks, optimization algorithms, and advanced ML architectures.",
    tags: ["Neural Networks", "Python", "ML Architectures"],
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=2000",
    link: "https://archive.nptel.ac.in/content/noc/NOC25/SEM1/Ecertificates/106/noc25-ee16/Course/NPTEL25EE16S64750095404511245.pdf"
  },
  {
    title: "Java Maestro : Developing GUI",
    issuer: "LPU",
    description: "Certified expertise in modern Java GUI development, encompassing object-oriented design and robust interactive application building.",
    tags: ["Java", "GUI Development", "OOP"],
    image: "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?auto=format&fit=crop&q=80&w=2000",
    link: "https://files.lpu.in/umsweb/skilldevcourse/SkillDevelopmentCertificates/12314273_834_20_08_2025.pdf"
  },
  {
    title: "Master Gen AI",
    issuer: "Infosys",
    description: "A comprehensive certification exploring the capabilities of Generative AI, natural language processing, and cutting-edge LLMs.",
    tags: ["Generative AI", "LLMs", "NLP"],
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=2000",
    link: "https://udemy-certificate.s3.amazonaws.com/pdf/UC-5a03cc23-20f7-447d-a53e-c6d1b71cec68.pdf"
  }
];

export default function Certificates() {
  return (
    <section id="certificates" className="min-h-screen flex flex-col items-center relative px-6 z-10 w-full pt-20 pb-32 overflow-hidden">
      <div className="max-w-[70rem] mx-auto w-full flex flex-col items-start relative gap-16 z-20">
        
        <div className="w-full relative z-20 flex flex-col items-start md:items-center text-left md:text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full shadow-sm mb-8 bg-white border border-gray-200"
          >
            <span className="w-2 h-2 rounded-full bg-black"></span>
            <span className="text-[10px] font-black tracking-[0.2em] uppercase text-black">Verifications</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="text-6xl md:text-[6rem] font-thin uppercase tracking-tighter text-[#0f172a] leading-none mb-6"
          >
            CERTIFICATES
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="text-lg md:text-xl text-gray-500 max-w-2xl font-light leading-relaxed md:mx-auto"
          >
              A record of continuous learning and technical refinement.
          </motion.p>
        </div>


        <div className="w-full flex flex-col gap-24 mt-10">
          {certificatesData.map((cert, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <div key={cert.title} className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-20 w-full group/cert`}>
                

                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className="w-full md:w-1/2 relative"
                >
                  <div className="relative overflow-hidden rounded-3xl bg-[#f8fafc] border border-gray-100 transition-all duration-700 shadow-[0_8px_30px_rgb(0,0,0,0.04)] group-hover/cert:shadow-[0_20px_50px_rgb(0,0,0,0.08)] group-hover/cert:-translate-y-2 flex items-center justify-center p-8 group/card" style={{ height: '360px' }}>

                     <div className="absolute top-0 right-0 w-64 h-64 bg-slate-200/50 rounded-full blur-3xl group-hover/card:bg-slate-300/50 transition-all duration-1000 transform translate-x-1/3 -translate-y-1/3"></div>
                     <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-200/50 rounded-full blur-3xl group-hover/card:bg-slate-300/50 transition-all duration-1000 transform -translate-x-1/3 translate-y-1/3"></div>
                     

                     <div className="relative z-10 flex flex-col items-center justify-center text-center w-full h-full">
                        <span className="text-[10rem] md:text-[14rem] font-black text-slate-100 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 tracking-tighter uppercase select-none group-hover/card:scale-110 transition-transform duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]">
                           {cert.issuer.substring(0, 1)}
                        </span>
                        <h2 className="relative text-3xl md:text-5xl font-black uppercase tracking-[0.2em] text-[#0f172a] group-hover/card:scale-105 transition-transform duration-700 ease-out z-10">
                           {cert.issuer}
                        </h2>
                     </div>

                     <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-sm flex items-center gap-2 z-20">
                         <FaAward className="text-black" />
                         <span className="font-extrabold text-xs tracking-widest uppercase text-black">Issuer</span>
                     </div>
                  </div>
                </motion.div>


                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className={`w-full md:w-1/2 flex flex-col ${isEven ? 'items-start text-left' : 'items-start md:items-end text-left md:text-right'}`}
                >
                  <h3 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-black mb-6 uppercase leading-[1.1]">
                    {cert.title}
                  </h3>
                  
                  <p className="text-[15px] md:text-base text-gray-600 leading-relaxed font-light max-w-[400px] mb-8">
                    {cert.description}
                  </p>

                  <div className={`flex flex-wrap gap-2 mb-10 ${isEven ? 'justify-start' : 'justify-start md:justify-end'}`}>
                    {cert.tags.map((t) => (
                      <span key={t} className="px-4 py-1.5 bg-gray-100 rounded-full text-[11px] font-black uppercase text-gray-800 tracking-widest">
                        {t}
                      </span>
                    ))}
                  </div>

                  {cert.link && (
                    <a href={cert.link} target="_blank" rel="noopener noreferrer" className="group/btn relative inline-flex items-center gap-3 px-8 py-4 bg-black text-white rounded-full font-bold text-xs uppercase tracking-widest transition-all duration-300 hover:bg-transparent hover:text-black hover:shadow-none border-2 border-black overflow-hidden">
                      <FaExternalLinkAlt className="relative z-10" />
                      <span className="relative z-10">DOCUMENT</span>
                      <div className="absolute inset-0 bg-white translate-y-[100%] group-hover/btn:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.19,1,0.22,1)]"></div>
                    </a>
                  )}

                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
