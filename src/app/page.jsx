// src/app/profile/page.jsx
"use client";
import { Particles } from "@/components/magicui/particles";
import React, { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { twMerge } from "tailwind-merge";
import {
  X, ArrowRight, Mail, Target, Github, Twitter, Youtube, Linkedin
} from 'lucide-react';
import { ShinyButton } from "@/components/magicui/shiny-button";
import ContactForm from "@/components/ContactForm";
import ProjectComp from "@/components/ProjectComp";
import { AuroraText } from "@/components/magicui/aurora-text";




export default function RevealBento() {
  const [open, setOpen] = useState(false);
  const [projectBoxOpen, setProjectBoxOpen] = useState(false);

  return (

    <div className="min-h-screen bg-dark-bg px-4 py-6 text-zinc-100">
      <Particles className="absolute inset-0 z-10" />
      <Logo />
      <motion.div
        initial="initial"
        animate="animate"
        transition={{ staggerChildren: 0.05 }}
        className="mx-auto grid max-w-4xl grid-flow-dense grid-cols-12 gap-4"
      >

        <HeaderBlock open={open} setOpen={setOpen} />
        <AboutBlock />
        <SocialsBlock />
        <ProjectsBlock projectBoxOpen={projectBoxOpen} setProjectBoxOpen={setProjectBoxOpen} />
      </motion.div>
      <ContactDialog open={open} onClose={() => setOpen(false)} />
      <ProjectDialog projectBoxOpen={projectBoxOpen} onClose={() => setProjectBoxOpen(false)} />
    </div>
  );
};

const Block = React.memo(({ className, ...rest }) => (



  <motion.div
    variants={{
      initial: { scale: 0.5, y: 50, opacity: 0 },
      animate: { scale: 1, y: 0, opacity: 1 }
    }}
    transition={{
      type: "spring",
      mass: 3,
      stiffness: 400,
      damping: 50
    }}
    className={twMerge(
      "col-span-4 rounded-xl bg-zinc-800/50 backdrop-blur-sm p-6",
      "border border-zinc-700/30 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]",
      className
    )}
    {...rest}
    />

));



const HeaderBlock = ({ open, setOpen }) => {

  return (
    <Block className="col-span-12 row-span-2 md:col-span-6 bg-gradient-to-br from-zinc-800/50 to-zinc-900/50">
      <div className="flex items-center gap-4 mb-6">
        <img
          src="https://api.dicebear.com/8.x/lorelei-neutral/svg?seed=John"
          alt="Jatin's avatar"
          className="size-16 rounded-full border-2 border-teal-400/30 shadow-lg"
          width={64}
          height={64}
        />
        <div className="bg-teal-500/10 px-3 py-1 rounded-full border border-teal-400/20">
          <p className="text-teal-400 text-sm font-medium">Available for work</p>
        </div>
      </div>

      <h1 className="mb-4 text-4xl font-bold leading-tight bg-gradient-to-r from-zinc-100 to-zinc-300 bg-clip-text text-transparent">
        Hi, I'm Jatin
      </h1>
      <p className="text-lg text-zinc-400 mb-8">
        I build modern web experiences with React & Next.js
      </p>

      <ContactButton onClick={() => setOpen(true)} />
    </Block>
  );
};

const ContactButton = React.memo(({ onClick }) => (

  <ShinyButton onClick={onClick}>
    <div
      className="flex items-center gap-2 text-teal-400 hover:text-teal-300 transition-colors group cursor-pointer"
      aria-label="Contact me"
    >
      <span className="font-medium group-hover:underline">Contact me</span>
      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
    </div>
  </ShinyButton>
));
const ProjectButton = React.memo(({ onClick }) => (
  <a
    onClick={onClick}
    className="flex items-center gap-2 text-teal-400 hover:text-teal-300 transition-colors group cursor-pointer"
    aria-label="Contact me"
  >
    <span className="font-medium group-hover:underline">See my Work</span>
    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
  </a>
));

const ContactDialog = React.memo(({ open, onClose }) => {
  const handleOverlayClick = useCallback((e) => {
    if (e.target === e.currentTarget) onClose();
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <ContactForm handleOverlayClick={handleOverlayClick} />
      )}
    </AnimatePresence>
  );
});
const ProjectDialog = React.memo(({ projectBoxOpen, onClose }) => {
  const handleClose = () => {
    onClose();
  }
  
  const handleOverlayClick = useCallback((e) => {
    if (e.target === e.currentTarget) onClose();
  }, [onClose]);

  return (
    <AnimatePresence>
      {projectBoxOpen && (
        <ProjectComp handleOverlayClick={handleOverlayClick} handleClose={handleClose} />
      )}
    </AnimatePresence>
  );
});

const SocialsBlock = () => {
  const socials = [
    {
      name: "Twitter",
      handle: "@jatinnvw",
      icon: Twitter,
      className: "bg-gradient-to-br from-blue-500/20 to-cyan-400/10",
      iconColor: "text-blue-400",
      herfs: "https://x.com/jatinnvw"
    },
    {
      name: "GitHub",
      handle: "@jatindevz",
      icon: Github,
      className: "bg-gradient-to-br from-zinc-700/20 to-zinc-800/10",
      iconColor: "text-zinc-300",
      herfs: "https://github.com/jatindevz"
    },
    {
      name: "LinkedIn",
      handle: "jatin-patil",
      icon: Linkedin,
      className: "bg-gradient-to-br from-blue-700/20 to-indigo-500/10",
      iconColor: "text-blue-400",
      rotate: "-1.5deg",
      herfs: "https://www.linkedin.com/in/jatin-patil-31075b259/"
    }
  ];

  return (
    <>
      {socials.map((social, index) => (
        <Block
          key={social.name}
          whileHover={{ rotate: social.rotate || "1.5deg", scale: 1.03 }}
          className={`col-span-6 md:col-span-2 ${social.className}`}
        >
          <a href={social.herfs} target="_blank" className="h-full flex flex-col justify-between">
            <social.icon className={`size-8 mb-4 ${social.iconColor}`} />
            <div>
              <p className="font-medium">{social.name}</p>
              <p className="text-sm text-zinc-500">{social.handle}</p>
            </div>
          </a>
        </Block>
      ))}
    </>
  );
};

const AboutBlock = React.memo(() => (
  <Block className="col-span-12 bg-gradient-to-br from-zinc-800/50 to-zinc-900/50">
    <p className="text-lg mb-4 font-medium">About Me</p>
    <p className="text-zinc-400 leading-relaxed">
      I specialize in creating modern web experiences using React, Next.js, and modern CSS frameworks.
      With over 5 years of experience, I focus on building performant, accessible applications with
      delightful interactions.
    </p>
    <p className=" text-zinc-400 leading-relaxed">
      When I'm not coding, you'll find me exploring new technologies, contributing to open-source
      projects, or mentoring aspiring developers. I believe in continuous learning and pushing the
      boundaries of what's possible with code.
    </p>
  </Block>
));

const ProjectsBlock = React.memo(({ setProjectBoxOpen }) => (
  <Block className="col-span-12 md:col-span-6 flex flex-col bg-gradient-to-br from-emerald-700/20 to-teal-500/10">
    <div className="flex-1 flex flex-col items-center justify-center gap-2">
      <div className="bg-teal-500/10 p-3 rounded-full mb-2">
        <Target className="size-6 text-teal-400" />
      </div>
      <ProjectButton onClick={() => { setProjectBoxOpen(true) }} />
    </div>
  </Block>
));

const Logo = React.memo(() => (
  <div className="mx-auto mb-8 w-12 h-12 rounded-lg bg-gradient-to-br from--500 to--600 flex items-center justify-center">
    <span className="text-zinc-950 font-bold text-xl"><AuroraText>J</AuroraText></span>
  </div>
));