import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const SkillCard = ({ skill, index }) => {
  const ref = useRef(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);
  
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
    setMousePos({ x: (mouseX / width) * 100, y: (mouseY / height) * 100 });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, scale: 0.9, y: 30, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: (index % 12) * 0.05, ease: [0.21, 0.47, 0.32, 0.98] }}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      className={`group relative p-6 md:p-8 rounded-[1.5rem] bg-white/40 backdrop-blur-2xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_30px_60px_rgb(6,182,212,0.04)] hover:border-cyan-300/30 hover:bg-white/60 transition-all duration-500 overflow-hidden flex flex-col justify-between items-start ${skill.colSpan} ${skill.rowSpan} cursor-crosshair`}
    >

      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gray-100/40 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform translate-x-8 -translate-y-8 group-hover:translate-x-0 group-hover:translate-y-0 z-0 pointer-events-none"></div>


      <motion.div 
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 mix-blend-multiply"
        style={{
          background: isHovered ? `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(6,182,212,0.04) 0%, transparent 60%)` : 'transparent'
        }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      

      <div className="relative z-10 w-full mb-6 transform-gpu transition-transform duration-500 group-hover:translate-z-12 group-hover:scale-[1.02]">
        

        <div className="mb-6 inline-flex">
          <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/50 border border-gray-900/5 text-[10px] md:text-[11px] font-bold text-gray-600 uppercase tracking-widest shadow-sm group-hover:bg-cyan-50/60 group-hover:text-cyan-700 group-hover:border-cyan-200/50 transition-all duration-300 backdrop-blur-md">
            <div className="w-1.5 h-1.5 rounded-full bg-gray-400 group-hover:bg-cyan-500 mr-2 transition-colors duration-300 shadow-[0_0_8px_rgba(6,182,212,0.4)]"></div>
            {skill.category}
          </span>
        </div>
        
        <h3 className="text-2xl md:text-3xl font-extrabold text-gray-800 tracking-tight leading-tight group-hover:text-gray-900 transition-colors duration-300">
          {skill.name}
        </h3>
      </div>
      
      <div className="relative z-10 w-full mt-auto transform-gpu transition-transform duration-500 group-hover:translate-z-8 pr-8">
        <p className="text-[14px] md:text-[15px] leading-relaxed text-gray-500 font-medium group-hover:text-gray-700 transition-colors duration-300 line-clamp-3">
          {skill.desc}
        </p>
      </div>


      <div className="absolute bottom-6 right-6 opacity-0 translate-x-4 translate-y-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500 ease-out z-10 text-cyan-500/80 pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transform transition-transform duration-700 group-hover:rotate-90">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </div>
      

      <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-cyan-400/10 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 blur-3xl pointer-events-none transform group-hover:scale-150 z-0"></div>
    </motion.div>
  );
};

export default function Skills() {
  const skills = [
    { name: "React", category: "Frontend Core", desc: "Interactive single-page web applications.", colSpan: "md:col-span-2 lg:col-span-2", rowSpan: "md:row-span-1" },
    { name: "Node.js", category: "Backend Runtime", desc: "Scalable backend server solutions.", colSpan: "md:col-span-1 lg:col-span-1", rowSpan: "md:row-span-2" },
    { name: "Tailwind CSS", category: "Styling", desc: "Utility-first rapid UI development.", colSpan: "md:col-span-1 lg:col-span-1", rowSpan: "md:row-span-1" },
    
    { name: "Kotlin", category: "Mobile Dev", desc: "Modern Android application development.", colSpan: "md:col-span-2 lg:col-span-1", rowSpan: "md:row-span-1" },
    { name: "Docker", category: "Infrastructure", desc: "Containerized deployment environments.", colSpan: "md:col-span-1 lg:col-span-2", rowSpan: "md:row-span-1" },
    
    { name: "MongoDB", category: "NoSQL DB", desc: "Flexible NoSQL data storage.", colSpan: "md:col-span-1 lg:col-span-1", rowSpan: "md:row-span-2" },
    { name: "Selenium", category: "QA Automation", desc: "Automated browser UI testing.", colSpan: "md:col-span-2 lg:col-span-1", rowSpan: "md:row-span-1" },
    { name: "App Development", category: "Mobile Core", desc: "Native quality mobile experiences.", colSpan: "md:col-span-1 lg:col-span-2", rowSpan: "md:row-span-1" },
    
    { name: "REST API", category: "Architecture", desc: "Scalable web service designs.", colSpan: "md:col-span-2 lg:col-span-2", rowSpan: "md:row-span-1" },
    { name: "C++", category: "Systems", desc: "High-performance systems programming.", colSpan: "md:col-span-1 lg:col-span-1", rowSpan: "md:row-span-1" },
    { name: "MySQL", category: "Relational DB", desc: "Relational database schema engineering.", colSpan: "md:col-span-1 lg:col-span-1", rowSpan: "md:row-span-1" },
    
    { name: "Postman", category: "Testing Tools", desc: "API testing and documentation.", colSpan: "md:col-span-2 lg:col-span-1", rowSpan: "md:row-span-1" },
    { name: "API Integration", category: "Web Services", desc: "Connecting distinct third-party services.", colSpan: "md:col-span-1 lg:col-span-2", rowSpan: "md:row-span-1" },
    { name: "Appium", category: "Mobile QA", desc: "Automated mobile app testing.", colSpan: "md:col-span-1 lg:col-span-1", rowSpan: "md:row-span-2" },
    
    { name: "Java", category: "Enterprise", desc: "Enterprise-grade robust applications.", colSpan: "md:col-span-1 lg:col-span-1", rowSpan: "md:row-span-1" },
    { name: "Cloudinary", category: "Media Cloud", desc: "Cloud media and images.", colSpan: "md:col-span-2 lg:col-span-2", rowSpan: "md:row-span-1" },
    
    { name: "Apache JMeter", category: "Performance Analysis", desc: "Load and performance testing.", colSpan: "md:col-span-1 lg:col-span-3", rowSpan: "md:row-span-1" },
    { name: "Multer", category: "File Uploads", desc: "Handling multipart file uploads.", colSpan: "md:col-span-1 lg:col-span-1", rowSpan: "md:row-span-1" },
    { name: "C", category: "Low-Level", desc: "Low-level core logic engineering.", colSpan: "md:col-span-1 lg:col-span-1", rowSpan: "md:row-span-1" }
  ];

  return (
    <section id="skills" className="min-h-screen flex flex-col items-center justify-center relative px-6 z-10 w-full pt-16 pb-24 group/section overflow-hidden">
      


      <div className="max-w-6xl mx-auto w-full flex flex-col items-center relative gap-16 z-20">
        

        <div className="text-center flex flex-col items-center relative z-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 border border-gray-200/40 shadow-sm backdrop-blur-xl mb-6 hover:shadow-cyan-100/50 hover:bg-white/80 transition-all cursor-crosshair group/badge"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.5)] group-hover/badge:scale-125 transition-transform"></span>
            <span className="text-xs font-bold tracking-widest uppercase text-gray-600 group-hover/badge:text-gray-900 transition-colors">Digital Arsenal</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-gray-900 via-gray-800 to-gray-500 pb-2"
          >
            My Skills
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="text-lg md:text-xl text-gray-500 max-w-2xl font-medium leading-relaxed"
          >
            An extensive breakdown of the precise technologies, frameworks, and programming languages I use to craft scalable web and mobile experiences.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-flow-dense gap-4 md:gap-6 w-full max-w-5xl z-20 perspective-[2000px]">
          {skills.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}