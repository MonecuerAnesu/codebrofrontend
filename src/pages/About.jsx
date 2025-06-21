import React from 'react';
import { Link } from 'react-router-dom';
import elshaImage from '../assets/Elsha.png'; // ✅ Import image

function About() {
  return (
    <div className="bg-black text-white min-h-screen px-6 py-10 flex flex-col items-center">
      {/* Hero Section */}
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-green-400 animate-pulse">About Elshaddai</h1>
        <p className="text-gray-300 text-lg leading-relaxed">
          I'm <strong>Elshaddai Anesu Mugugu</strong>, a passionate software engineer from a small village in Zimbabwe 🇿🇼, building world-class digital solutions. My journey began without much, but with grit, vision, and the power of code, I'm turning dreams into platforms like <strong>CodeBro</strong>.
        </p>
        <p className="mt-4 text-gray-400">
          My mission is simple: <em>"Empower others through tech, no matter where they come from."</em> Whether it's portfolios, business dashboards, or full-stack apps — I build with purpose, performance, and people in mind.
        </p>
      </div>

      {/* Profile Image Section */}
      <div className="relative mt-10">
        <div className="rounded-full overflow-hidden w-40 h-40 md:w-56 md:h-56 border-4 border-green-500 shadow-lg transform hover:scale-105 transition duration-700 animate-bounce">
          <img
            src={elshaImage}
            alt="Elshaddai"
            className="w-full h-full object-cover"
          />
        </div>
        <p className="text-center text-gray-500 mt-2 text-sm italic">The face behind CodeBro</p>
      </div>

      {/* Tech Stack or Links */}
      <div className="mt-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">Let’s Build the Future</h2>
        <p className="text-gray-400 mb-4">
          Reach me through my social media, explore my work, or hire me for your next project.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <a
            href="https://github.com/MonecuerAnesu"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 px-4 py-2 rounded hover:bg-gray-700 transition"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/elshaddai-anesu-mugugu-44693b33a/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 px-4 py-2 rounded hover:bg-gray-700 transition"
          >
            LinkedIn
          </a>
          <a
            href="mailto:socialmediametaplatform@gmail.com"
            className="bg-green-500 px-4 py-2 rounded hover:bg-green-600 transition"
          >
            Email Me
          </a>
          <Link
            to="/portfolio"
            className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            View Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}

export default About;
