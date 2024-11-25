'use client'

import { motion } from 'framer-motion'
import { FaFacebookF, FaGithub, FaLinkedinIn, FaWhatsapp, FaTelegram } from 'react-icons/fa'
import { Mail } from 'lucide-react'
import { ReactNode } from 'react';

type ContactItemProps = {
    icon: ReactNode;
    label: string;
    value: string;
    href: string;
    delay?: number;
  };

const ContactItem = ({ icon, label, value, href, delay }:ContactItemProps) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-colors duration-300"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
  >
    {icon}
    <div>
      <p className="font-semibold">{label}</p>
      <p className="text-sm">{value}</p>
    </div>
  </motion.a>
)

export default function Contact() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-300">
      <motion.div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Contact Me
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <ContactItem
            icon={<Mail className="w-6 h-6" />}
            label="Email"
            value="tanjinhossain2003@gmail.com"
            href="mailto:tanjinhossain2003@gmail.com"
            delay={0.2}
          />
          <ContactItem
            icon={<FaWhatsapp className="w-6 h-6" />}
            label="WhatsApp / Phone"
            value="(+880) 1861557343"
            href="https://wa.me/8801861557343"
            delay={0.3}
          />
          <ContactItem
            icon={<FaTelegram className="w-6 h-6" />}
            label="Telegram"
            value="(+880) 1861557343"
            href="https://t.me/+8801861557343"
            delay={0.4}
          />
          <ContactItem
            icon={<FaFacebookF className="w-6 h-6" />}
            label="Facebook"
            value="Connect on Facebook"
            href="https://www.facebook.com/iloveyou.tanjin"
            delay={0.5}
          />
          <ContactItem
            icon={<FaGithub className="w-6 h-6" />}
            label="GitHub"
            value="Check my repositories"
            href="https://github.com/Tanjinhossain1"
            delay={0.6}
          />
          <ContactItem
            icon={<FaLinkedinIn className="w-6 h-6" />}
            label="LinkedIn"
            value="Professional network"
            href="https://www.linkedin.com/in/tanjin-hossain/"
            delay={0.7}
          />
        </div>
      </motion.div>
    </section>
  )
}

