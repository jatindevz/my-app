"use client";
import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { X,  Target, Github, ExternalLink } from 'lucide-react';

const ProjectComp = ({ handleOverlayClick, handleClose }) => {
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A dynamic online storefront enabling users to browse products, manage carts, and complete secure transactions with real-time inventory tracking and integrated payment gateways.",
      tags: ["Next.js", "Tailwind", "JavaScript"],
      github: "https://github.com/jatindevz/E-com_WebPage-FE",
      live: "https://e-com-web-page-fe.vercel.app/"
    },
    {
      id: 2,
      title: "AI Flashcard Generator",
      description: "An intelligent learning tool that instantly converts any text-based topic into interactive flashcards using drag-and-drop UI and real-time database storage.",
      tags: ["TypeScript", "OpenAi", "Tailwind", "React"],
      github: "https://github.com/jatindevz/ai-flashcard",
      live: "https://ai-flashcard-olive.vercel.app/"
    },
    {
      id: 3,
      title: "Metamorphosis",
      description: "A visual storytelling platform where users share life-changing moments, with data-driven insights and emotional arcs rendered using interactive charts and animations.",
      tags: [ "Express", "MongoDB", "React"],
      github: "https://github.com/jatindevz/metamorp-app",
      live: "https://metamorp-app.vercel.app/"
    },
    {
      id: 4,
      title: "EduSphere: Study Resource Hub",
      description: "A creative educational platform that uses AI and Stable Diffusion to generate custom visual study materials, designed to enhance understanding through image-based learning.",
      tags: ["Next.js", "Tailwind", "JavaScript"],
      github: "https://github.com/jatindevz/EduSphere",
      live: "https://edu-sphere-three.vercel.app/"
    }
  ];



  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = useCallback(() => {
    setActiveIndex(prev => (prev - 1 + projects.length) % projects.length);
  }, [projects.length]);

  const handleNext = useCallback(() => {
    setActiveIndex(prev => (prev + 1) % projects.length);
  }, [projects.length]);

  const activeProject = projects[activeIndex];

  return (
    <AnimatePresence>
      <section className="fixed inset-0 z-50 flex justify-center items-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
          onClick={handleOverlayClick}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className={twMerge(
            "relative z-50 w-full max-w-4xl rounded-2xl overflow-hidden",
            "bg-gradient-to-br from-zinc-900/80 to-zinc-800/90 backdrop-blur-xl",
            // "border border-zinc-700/30 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]",
            "shadow-2xl"
          )}
        >
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-zinc-800/50 hover:bg-zinc-700/50 transition-colors"
            aria-label="Close projects"
          >
            <X className="size-5 text-zinc-300" />
          </button>

          <div className="flex flex-col md:flex-row h-[80vh] max-h-[700px]">
            {/* Project showcase */}
            <div className="md:w-7/12 p-6 md:p-8 flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-teal-500/10 p-2 rounded-full">
                  <Target className="size-5 text-teal-400" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-zinc-100 to-zinc-300 bg-clip-text text-transparent">
                  Featured Projects
                </h2>
              </div>

              <div className="flex-1 flex flex-col">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeProject.id}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="flex-1 flex flex-col"
                  >
                    <div className="mb-6">
                      <h3 className="text-2xl md:text-3xl font-bold text-zinc-100 mb-2">
                        {activeProject.title}
                      </h3>
                      <p className="text-zinc-400 mb-6">
                        {activeProject.description}
                      </p>
                    </div>

                    <div className="mt-auto">
                      <div className="flex flex-wrap gap-2 mb-8">
                        {activeProject.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="px-3 py-1.5 bg-zinc-800 text-teal-400 rounded-full text-xs font-medium border border-teal-400/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-4">
                        <a
                          target="_blank"
                          href={activeProject.github}
                          className={twMerge(
                            "flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all",
                            "bg-zinc-800/50 border border-zinc-700/30 hover:bg-zinc-700/50",
                            "text-zinc-300 hover:text-white"
                          )}
                        >
                          <Github className="size-5" />
                          <span>GitHub Repository</span>
                        </a>
                        <a
                          target="_blank"
                          href={activeProject.live}
                          className={twMerge(
                            "flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all",
                            "bg-gradient-to-br from-teal-500 to-emerald-600 text-white",
                            "hover:from-teal-500/90 hover:to-emerald-600/90 hover:scale-[1.02]"
                          )}
                        >
                          <ExternalLink className="size-5" />
                          <span>Live Demo</span>
                        </a>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation controls */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-zinc-700/30">
                <div className="flex items-center gap-2 text-zinc-500 text-sm">
                  <span className="text-zinc-300 font-medium">{activeIndex + 1}</span>
                  <span>/</span>
                  <span>{projects.length}</span>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handlePrev}
                    className={twMerge(
                      "size-10 rounded-full flex items-center justify-center transition-all",
                      "bg-zinc-800/50 border border-zinc-700/30 hover:bg-zinc-700/50",
                      "text-zinc-300 hover:text-white"
                    )}
                    aria-label="Previous project"
                  >
                    ‹
                  </button>
                  <button
                    onClick={handleNext}
                    className={twMerge(
                      "size-10 rounded-full flex items-center justify-center transition-all",
                      "bg-gradient-to-br from-teal-500 to-emerald-600 text-white",
                      "hover:from-teal-500/90 hover:to-emerald-600/90 hover:scale-[1.03]"
                    )}
                    aria-label="Next project"
                  >
                    ›
                  </button>
                </div>
              </div>
            </div>

            {/* Project gallery */}
            <div className="md:w-5/12 bg-gradient-to-br from-zinc-900 to-zinc-800/80 p-6 md:p-8 flex flex-col">
              <div className="mb-6">
                <h3 className="text-lg font-medium text-zinc-300 mb-2">Project Gallery</h3>
                <p className="text-zinc-500 text-sm">
                  Screenshots and visual highlights
                </p>
              </div>

              <div className="flex-1 grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className={twMerge(
                      "bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 rounded-xl",
                      "border border-zinc-700/30 aspect-rect flex items-center justify-center hover:border-teal-400/20"
                    )}
                  >
                    <div className="bg-zinc-800/50 w-8 h-8 rounded-full flex items-center justify-center">
                      <span className="text-zinc-500 text-xs">Img</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-zinc-700/30">
                <div className="flex flex-col gap-2 h-[200px] overflow-y-auto scrollbar-container">
                  {projects.map((project, idx) => (
                    <button
                      key={project.id}
                      onClick={() => setActiveIndex(idx)}
                      className={twMerge(
                        "px-3 py-2.5 rounded-lg text-sm transition-all text-left",
                        idx === activeIndex
                          ? "bg-teal-500/10 text-teal-400  border-teal-400/20"
                          : "bg-zinc-800/30 text-zinc-400 hover:bg-zinc-700/50"
                      )}
                    >
                      {project.title}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </AnimatePresence>
  );
};

export default ProjectComp;