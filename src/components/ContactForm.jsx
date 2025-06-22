"use client"
import React, { useCallback, useState } from 'react'
import { motion, AnimatePresence } from "framer-motion";
import { GithubIcon, LinkedinIcon, TwitterIcon, Mail, Phone, ArrowRight } from 'lucide-react';
import { BorderBeam } from "@/components/magicui/border-beam";
import {  twMerge } from "tailwind-merge";
import emailjs from '@emailjs/browser';
import { toast } from 'sonner';


// Social links component to reduce duplication
const SocialLink = ({ href, icon: Icon }) => (
    <a
        href={href}
        target='_blank'
        className="group relative p-2 rounded-lg bg-zinc-700/50 transition-colors"
    >
        <Icon className="text-zinc-300 hover:text-white transition-colors text-xl" />
        <BorderBeam
            duration={6}
            size={40}
            className="from-transparent via-red-500 to-transparent"
        />
        <BorderBeam
            duration={6}
            delay={4}
            size={40}
            className="from-transparent via-blue-500 to-transparent"
        /><BorderBeam
            duration={6}
            size={40}
            delay={6}
            className="from-transparent via-green-500 to-transparent"
        />
        
    </a>
);

// Contact info item component
const ContactInfoItem = ({ icon: Icon, title, value }) => (
    <div className="flex items-center space-x-4">
        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-teal-500/10 border border-teal-400/20">
            <Icon className="w-6 h-6 text-teal-400" />
        </div>
        <div>
            <p className="font-semibold text-zinc-200">{title}</p>
            <p className="text-zinc-400">{value}</p>
        </div>
    </div>
);

const ContactForm = React.memo(({ handleOverlayClick }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const sendEmail = async (e) => {
        e.preventDefault();

        try {
            const result = await emailjs.send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,         // Replace with your EmailJS service ID
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,        // Replace with your EmailJS template ID
                {   
                    title : "Contact Form Submission From Portfolio",
                    name: formData.name,
                    from_email: formData.email,
                    message: formData.message,
                },
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY         // Replace with your EmailJS public key
            );

            console.log('Email successfully sent!', result.text);
            toast.custom((t) => (
                <div
                    className={`bg-zinc-800 text-white p-4 rounded-lg shadow-lg border border-teal-500 w-80 transition-all ${t.visible ? 'animate-enter' : 'animate-leave'
                        }`}
                >
                    <p className="font-semibold text-lg">Thanks!</p>
                    <p className="text-sm text-zinc-300">Your message has been sent successfully.</p>
                </div>
            ));

            // Reset the form or show a success message
            setFormData({ name: '', email: '', message: '' });

        } catch (error) {
            toast.error("Failed to send email. Please try again later.");
            
            // Handle error UI here
        }
    };


    // Memoized input handler
    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }, []);

    return (
        <AnimatePresence>
            <section id="contact" className="pt-8 pb-10 px-4 fixed inset-0 z-50 flex justify-center items-center text-zinc-100">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-zinc-900/90 backdrop-blur-sm"
                    onClick={handleOverlayClick}
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="relative z-50 mx-4 w-full max-w-4xl"
                >
                    <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                        {/* Left Column */}
                        <div className={twMerge(
                            "space-y-8 p-6 rounded-2xl",
                            // "bg-zinc-800/50 backdrop-blur-sm",
                            "border border-zinc-700/30 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]"
                        )}>
                            <div>
                                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
                                    Let's Work Together
                                </h3>
                                <p className="text-zinc-400 leading-relaxed">
                                    I'm always interested in new opportunities and exciting projects.
                                    Feel free to reach out for collaborations, questions, or just to say hello.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <ContactInfoItem
                                    icon={Mail}
                                    title="Email"
                                    value="jatinpatildev.z@gmail.com"
                                />
                                <ContactInfoItem
                                    icon={Phone}
                                    title="Phone"
                                    value="+91 899 946 5621"
                                />
                            </div>

                            <div className="flex space-x-4">
                                <SocialLink href="https://github.com/jatindevz" icon={GithubIcon} />
                                <SocialLink href="https://x.com/jatinnvw" icon={TwitterIcon} />
                                <SocialLink href="https://www.linkedin.com/in/jatin-patil-31075b259/" icon={LinkedinIcon} />
                            </div>
                        </div>

                        {/* Form Column */}
                        <div className={twMerge(
                            "p-6 rounded-2xl",
                            "bg-zinc-800/50 backdrop-blur-sm",
                            // "border border-zinc-700/30 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]"
                        )}>
                            <form className="space-y-6" onSubmit={sendEmail}>
                                <FormInput
                                    id="name"
                                    name="name"
                                    label="Name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                />
                                <FormInput
                                    id="email"
                                    name="email"
                                    label="Email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                                <FormTextArea
                                    id="message"
                                    name="message"
                                    label="Message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                />
                                <button
                                    type="submit"
                                    className={twMerge(
                                        "w-full bg-gradient-to-br from-teal-500 to-emerald-600 text-white",
                                        "px-8 py-3 rounded-lg font-semibold hover:scale-[1.02] transform transition-all duration-300",
                                        "flex items-center justify-center gap-2 group"
                                    )}
                                >
                                    Send Message
                                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                                </button>
                            </form>
                        </div>
                    </div>
                </motion.div>
            </section>
        </AnimatePresence>
    )
});

// Reusable input component
const FormInput = ({ id, name, label, type = 'text', value, onChange }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium mb-2 text-zinc-300">{label}</label>
        <input
            type={type}
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            required
            className={twMerge(
                "w-full px-4 py-3 rounded-lg focus:outline-none transition-colors",
                "bg-zinc-800/30 border border-zinc-700/50 focus:border-teal-400",
                "text-zinc-100 placeholder:text-zinc-500"
            )}
        />
    </div>
);

// Reusable textarea component
const FormTextArea = ({ id, name, label, value, onChange }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium mb-2 text-zinc-300">{label}</label>
        <textarea
            id={id}
            name={name}
            rows="5"
            value={value}
            onChange={onChange}
            required
            className={twMerge(
                "w-full px-4 py-3 rounded-lg focus:outline-none transition-colors resize-none",
                "bg-zinc-800/30 border border-zinc-700/50 focus:border-teal-400",
                "text-zinc-100 placeholder:text-zinc-500"
            )}
        ></textarea>
    </div>
);

export default ContactForm;