// src/pages/AboutPage.jsx
import { motion } from "framer-motion";
import { Users, Lightbulb, Target, Rocket } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen font-sans text-gray-100 bg-gradient-to-b from-sky-500 via-blue-700 to-blue-950 relative overflow-hidden">

      {/* Hero Section */}
      <section className="h-[70vh] flex flex-col justify-center items-center text-center px-6 relative">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-white via-blue-200 to-sky-400 bg-clip-text text-transparent drop-shadow-2xl"
        >
          About Tech2Gether
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-6 text-lg md:text-xl max-w-2xl text-blue-100"
        >
          We are a passionate team dedicated to building modern digital
          solutions that connect technology with people.
        </motion.p>
      </section>

      {/* Who We Are Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-blue-900 to-blue-950">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h2
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl font-bold mb-6 text-white"
          >
            Who We Are
          </motion.h2>
          <p className="text-blue-200 max-w-3xl mx-auto text-lg leading-relaxed">
            At <span className="font-semibold text-sky-300">Tech2Gether</span>,
            we believe in combining innovation, creativity, and technology
            to design experiences that inspire. Our mission is to empower
            businesses and individuals with cutting-edge web solutions,
            impactful designs, and seamless user experiences.
          </p>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-blue-950 to-black">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl font-bold mb-16 text-white"
          >
            Our Core Values
          </motion.h2>

          <div className="grid md:grid-cols-4 gap-10">
            {[
              {
                icon: <Users className="w-12 h-12 text-sky-300" />,
                title: "Collaboration",
                desc: "We grow by working together and valuing diverse ideas.",
              },
              {
                icon: <Lightbulb className="w-12 h-12 text-yellow-300" />,
                title: "Innovation",
                desc: "We embrace creativity and bring fresh ideas to life.",
              },
              {
                icon: <Target className="w-12 h-12 text-red-400" />,
                title: "Excellence",
                desc: "We strive for quality and precision in everything we do.",
              },
              {
                icon: <Rocket className="w-12 h-12 text-green-300" />,
                title: "Growth",
                desc: "We aim to make an impact that scales with the future.",
              },
            ].map((value, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 40 }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-lg hover:shadow-2xl"
              >
                <div className="mb-4 flex justify-center">{value.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {value.title}
                </h3>
                <p className="text-blue-200 text-sm">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 px-6 bg-gradient-to-b from-black via-blue-950 to-blue-900 relative">
        <div className="max-w-3xl mx-auto text-center relative">
          <motion.h2
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl font-bold mb-6 text-white"
          >
            Join Us on Our Journey
          </motion.h2>
          <p className="text-blue-300 mb-10 max-w-xl mx-auto">
            At Tech2Gether, we’re always looking for like-minded partners,
            collaborators, and visionaries who want to build the future with us.
          </p>
          <a
            href="#contact"
            className="inline-block bg-gradient-to-r from-sky-400 via-blue-500 to-blue-700 text-white font-semibold px-10 py-4 rounded-full shadow-lg hover:scale-110 transition"
          >
            Work With Us
          </a>
        </div>
      </section>
    </div>
  );
}
