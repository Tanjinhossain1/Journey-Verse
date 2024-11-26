import React from 'react'
import { motion } from 'framer-motion'

const SVGLoader = () => {
  return (
    <motion.svg
      width="70"
      height="60"
      viewBox="0 0 100 100"
      initial="hidden"
      animate="visible"
    >
      <motion.circle
        cx="50"
        cy="50"
        r="75"
        stroke="#3B82F6"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: {
            pathLength: 1,
            opacity: 1,
            transition: {
              pathLength: { delay: 5, type: "spring", duration: 6, bounce: 0 },
              opacity: { delay: 1, duration: 1 }
            }
          }
        }}
      />
      <motion.circle
        cx="50"
        cy="50"
        r="65"
        stroke="#3B82F6"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: {
            pathLength: 1,
            opacity: 1,
            transition: {
              pathLength: { delay: 4, type: "spring", duration: 5, bounce: 0 },
              opacity: { delay: 1, duration: 1 }
            }
          }
        }}
      />
      <motion.circle
        cx="50"
        cy="50"
        r="55"
        stroke="#3B82F6"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: {
            pathLength: 1,
            opacity: 1,
            transition: {
              pathLength: { delay: 3, type: "spring", duration: 4, bounce: 0 },
              opacity: { delay: 1, duration: 1 }
            }
          }
        }}
      />
      <motion.circle
        cx="50"
        cy="50"
        r="45"
        stroke="#3B82F6"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: {
            pathLength: 1,
            opacity: 1,
            transition: {
              pathLength: { delay: 2, type: "spring", duration: 3, bounce: 0 },
              opacity: { delay: 1, duration: 1 }
            }
          }
        }}
      />
      <motion.circle
        cx="50"
        cy="50"
        r="35"
        stroke="#60A5FA"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: {
            pathLength: 1,
            opacity: 1,
            transition: {
              pathLength: { delay: 1, type: "spring", duration: 2, bounce: 0 },
              opacity: { delay: 0.5, duration: 0.01 }
            }
          }
        }}
      />
      <motion.circle
        cx="50"
        cy="50"
        r="25"
        stroke="#93C5FD"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: {
            pathLength: 1,
            opacity: 1,
            transition: {
              pathLength: { delay: 0.5, type: "spring", duration: 1, bounce: 0 },
              opacity: { delay: 0.8, duration: 0.01 }
            }
          }
        }}
      />
    </motion.svg>
  )
}

export default SVGLoader

