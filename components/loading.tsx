"use client"

import { motion } from "framer-motion"

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-50">
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex space-x-2">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-4 h-4 rounded-full bg-techBlue"
              animate={{
                y: ["0%", "-50%", "0%"],
              }}
              transition={{
                duration: 0.6,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                delay: index * 0.2,
              }}
            />
          ))}
        </div>
        <p className="mt-4 text-white font-medium">Loading...</p>
      </motion.div>
    </div>
  )
}

export default Loading
