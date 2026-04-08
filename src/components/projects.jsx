import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import realtimeOsImage from '../assets/realtimeos.png';
import roovimage from '../assets/roov.png';
import aichatbot from '../assets/aichatbot.png';
import expense from '../assets/expense.png';
import nudge from '../assets/nudge.png';
import { image } from 'framer-motion/client';

const projectsData = [
  {
    title: "NUDGE ",
    description: "Not just an app, but a quiet guide in the chaos of daily life—NUDGE gently steers users back on track, one reminder at a time.",
    tech: ["Kotlin", "Java", "Android SDK", "REST APIs", "Jetpack Compose"],
    image: nudge,
    features: [
      "Designed a living reminder system with intelligent scheduling and custom triggers",
      "Wove motivational quotes into the experience, turning notifications into moments of clarity",
      "Optimized background services for fluid performance and reduced friction",
      "Crafted a minimal, intuitive interface that feels natural, not overwhelming"
    ],
    github: "https://github.com/madhvpruthi/NUDGE",
    live: null
  },
  {
    title: "ROOV ",
    description: "A digital space where searching for a home becomes smooth, visual, and almost effortless.",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Cloudinary", "Multer"],
image: roovimage,
    features: [
      "Engineered a full-stack platform with powerful search and filtering capabilities",
      "Built a secure admin system to manage listings with precision and ease",
      "Enabled seamless multi-image uploads with optimized cloud storage",
      "Deployed a reliable backend ensuring speed, stability, and real-time responsiveness",
      "Designed immersive property views that invite users to explore, not just browse"
    ],
    github: "https://github.com/madhvpruthi/ROOV",
    live: "https://roov.netlify.app"
  },
  {
    title: "Java Expense Tracker",
    description: "A straightforward, no-distraction tool that brings clarity to personal finances.",
    tech: ["Java", "Swing UI", "OOP"],
    image: expense,
    features: [
      "Developed a clean desktop interface for effortless expense tracking",
      "Structured transactions into meaningful categories for better financial awareness",
      "Built with strong object-oriented principles for maintainability and clarity",
      "Delivered a lightweight, offline-first experience that just works"
    ],
    github: "https://github.com/madhvpruthi/java_exepense_tracker",
    live: null
  },
  {
    title: "AI Travel Expense Chatbot",
    description: "Where conversation replaces complexity—track your expenses as naturally as you speak.",
    tech: ["Python", "NLP", "API Integration"],
    image: aichatbot,
    features: [
      "Created an intelligent chatbot capable of understanding natural language inputs",
      "Automated expense categorization, removing manual effort from the process",
      "Generated personalized insights to guide smarter spending decisions",
      "Designed a responsive conversational flow that feels intuitive and human"
    ],
    github: "https://github.com/madhvpruthi/Ai-Travel-Chatbot",
    live: null
  },
  {
    title: "Real-Time OS Simulator ",
    description: "A system built with discipline, where timing is everything and efficiency is survival.",
    tech: ["JavaScript", "Google Fit API", "Embedded Systems"],
    image: realtimeOsImage,
    features: [
      "Simulated a lightweight real-time operating system for wearable environments",
      "Implemented efficient scheduling and memory handling mechanisms",
      "Integrated live health data for real-time monitoring and accuracy",
      "Reduced CPU load through optimized data processing techniques"
    ],
    github: "https://github.com/JATIN-JAY/RealTimeOsForWearableDevices",
    live: null
  }
];

export default function Projects() {
  return (
    <section id="projects" className="min-h-screen flex flex-col items-center relative px-6 z-10 w-full pt-16 pb-24 overflow-hidden">
      <div className="max-w-6xl mx-auto w-full flex flex-col items-center relative gap-16 z-20">
        
        {/* Header Section */}
        <div className="text-center flex flex-col items-center relative z-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 shadow-sm mb-6 bg-white/50 backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-gray-800"></span>
            <span className="text-xs font-bold tracking-widest uppercase text-gray-800">Creation Showcase</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 tracking-tight text-gray-900 pb-2"
            style={{ fontFamily: "'Clash Display', sans-serif" }}
          >
            Featured Projects
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="text-base md:text-lg lg:text-xl text-gray-500 max-w-2xl font-medium leading-relaxed"
          >
Selected works that reflect my approach to problem-solving, system design, and clean engineering.
          </motion.p>
        </div>


        <div className="relative w-full max-w-5xl mx-auto mt-16">
          

          <div className="absolute left-1/2 top-4 bottom-4 w-px bg-gray-300 -translate-x-1/2 hidden md:block"></div>

          <div className="flex flex-col gap-24 md:gap-32 w-full mt-4">
            {projectsData.map((project, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div key={project.title} className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-20 w-full group/project ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  

                  <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-[3px] border-gray-900 rounded-full z-20 hidden md:block transform transition-transform duration-500 group-hover/project:scale-150"></div>


                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? -50 : 50, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
                    className="w-full md:w-1/2 relative"
                  >
                    <div className="relative overflow-hidden rounded-xl shadow-lg border border-gray-200 bg-white transition-all duration-500 group-hover/project:shadow-2xl group-hover/project:-translate-y-2">
                       <img src={project.image} alt={project.title} className="w-full h-auto object-cover transform transition-transform duration-700 group-hover/project:scale-105" />
                       <div className="absolute inset-0 bg-black/5 opacity-0 group-hover/project:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                    </div>
                  </motion.div>


                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? 50 : -50, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
                    className={`w-full md:w-1/2 flex flex-col relative z-20 ${isEven ? 'md:items-start text-left' : 'md:items-end text-left md:text-right'}`}
                  >
                    <h3 className="text-3xl md:text-5xl font-black text-black mb-4 leading-tight" style={{ fontFamily: "'Clash Display', sans-serif" }}>
                      {project.title}
                    </h3>
                    
                    <p className="text-lg text-gray-600 leading-relaxed mb-8 font-medium max-w-lg">
                      {project.description}
                    </p>

                    <div className={`flex flex-wrap gap-2 mb-8 ${isEven ? 'justify-start' : 'md:justify-end'}`}>
                      {project.tech.map((t) => (
                        <span key={t} className="px-3 py-1 bg-white border border-gray-300 rounded-md text-[13px] font-bold text-gray-800 tracking-wide shadow-sm">
                          {t}
                        </span>
                      ))}
                    </div>

                    <ul className="flex flex-col gap-3 w-full mb-10 max-w-lg">
                      {project.features.map((feature, i) => (
                        <li key={i} className={`flex w-full ${isEven ? 'justify-start text-left' : 'md:justify-end text-left md:text-right'}`}>
                           <span className="text-gray-600 font-medium leading-relaxed">
                            <span className="text-gray-400 mr-2">•</span>{feature}
                           </span>
                        </li>
                      ))}
                    </ul>


                    <div className={`flex flex-wrap gap-4 ${isEven ? 'justify-start' : 'md:justify-end'}`}>
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-2.5 bg-black text-white rounded-full font-medium text-sm hover:bg-gray-800 hover:-translate-y-1 transition-all shadow-md hover:shadow-lg">
                          <FaGithub className="text-lg" />
                        </a>
                      )}
                      {project.live && (
                        <a href={project.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-2.5 bg-white border border-gray-300 text-black rounded-full font-medium text-sm hover:bg-gray-50 hover:-translate-y-1 transition-all shadow-sm hover:shadow-md">
                          <FaExternalLinkAlt className="text-sm" />
                          Live
                        </a>
                      )}
                    </div>

                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}