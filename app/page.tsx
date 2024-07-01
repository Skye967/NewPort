'use client'
import React, { Suspense, useEffect, useState } from "react";
import styles from '@/public/css/aboutMe.module.css'
import { logoImages } from "./constants/logo";
import Image from "next/image";
import dynamic from "next/dynamic";
import desktop from '@/public/port-images/desktop.png'
import { project1, project2 } from "./constants/projects";
import Navbar from "./componenets/Navbar";
import ProjectCard from "./componenets/ProjectCard";
import ContactSection from "./componenets/ContactSection";
import NavigationBar from "./componenets/SideNavBar";
import BouncingBalls from "./componenets/BouncingBalls";
import myself from "@/public/port-images/myself.jpeg"
import TypedText from "./componenets/TypedText";

const HomePage: React.FC = () => {

  const ParticlesBackground = dynamic(
    () => import('./componenets/ParticlesBackground'),
    {
      loading: () => <BouncingBalls />,
    }
  )

  return (
    <div className="relative w-full">
      <Navbar />
      <div id="home" className={`${styles.intro}`}>
        <TypedText />
        <Image
          src={myself}
          alt="Picture of the author"
          className={styles.particleB}
        />
        <Suspense fallback={<BouncingBalls />}>
          <ParticlesBackground />
        </Suspense>
      </div>
      <div className={`${styles.shadow}`}></div>
      <section id="aboutMe" className={styles.aboutMeWrapper}>
        <div className={styles.aboutMe}>
          <div>
            <h1 className={styles.aboutMeHeader}>About Me</h1>
            <h2 className={styles.subHeader}>Who I am and what I do</h2>
          </div>
          <div className={styles.flexWrap} >
            <div className="m-10  min-w-[400px]">
              <h3 className={styles.introduction}>
                Hello, I'm <span>S</span>kye <span>Grossman</span>
              </h3>
              <div className={styles.biographyContainer}>
                <span className={styles.biography}><span className={styles.tab}></span> I come from the island Maui, Hawaii, and I frequently enjoy cooking, fitness, and training Jiu-Jitsu. I had a fun upbringing growing up in the country side which involved caring for farm animals, building structures, and fixing equipment. When we weren't working we where fishing, riding our motorbikes, and we used to skip school when the surf was to good to pass up. <br></br> <span className={styles.tab}></span>My adult journey started with culinary school, where I earned my degree. The restaurant industry was great and full of fun, from working in bars and dives to catering and upscale restaurants. After some time, an opportunity in the towing industry came my way, and I took it. This phase of my life was full of unique experiences, from repossessions to off-road tow-outs and vehicle removals, all kinds of crazy situations. <br></br> <span className={styles.tab}></span>Eventually after enough tough situations, I sought a new path and turned to construction, where I gained valuable skills. However, I realized that it wasn't where I wanted my future. I discovered I had a keen interest in programming, having fun in creating and seeing technology come to life. To refine my skills, I attended an intensive 16-week coding bootcamp at Coding Dojo, coding 12 to 15 hours a day. This rigorous training whipped me into coding shape.<br></br> <span className={styles.tab}></span>Now, I have the privilege of working on and creating amazing software. Where I get to employ my own personal philosophy to continually improve, and innovate.<span className={styles.bioRed}>If you have any questions or just want to chat, feel free to get in touch.</span></span>
              </div>
            </div>
            <div className="flex justify-center items-center flex-col">
              <h4 className={styles.toolsHeader}>Tools and Technologies I'm familiar with:</h4>
              <div className={styles.toolsGrid}>
                {logoImages.map((tool, index) => (
                  <div key={index} className={`${styles.toolItem} bg-gray-100`}>
                    <div className={`${styles.toolImageContainer} `}>
                      <div className={`${styles.toolImage} flex items-center justify-center flex-col`}>
                        <div className={styles.tool}>
                          <Image
                            src={tool.src}
                            alt={`Picture of ${tool.name}`}
                            loading="lazy"
                            width={200}
                          />
                          <p className="text-gray-600">{tool.name}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className={`${styles.shadowUp}`}></div>
      <section className={styles.arrowSection}>
        <div className={styles.arrowContent}>
          <video className={styles.videoBackground} controls={false} autoPlay={true} loop={true} muted={true} preload="none" playsInline>
            <source src={"/video/milkyway.mp4"} type="video/mp4" />
          </video>
          <Image
            src={desktop}
            alt="Description of image"
          />
        </div>
      </section>
      <section id="projects" className={styles.projectsSection}>
        <h2 className={styles.projectsHeader}>Recent Projects</h2>
        <ProjectCard
          imageSrc={project1.imageSrc}
          description={project1.description}
          title={project1.title}
          tools={project1.tools}
          githubLink={project1.githubLink}
          websiteLink={project1.websiteLink}
        />
        <ProjectCard
          imageSrc={project2.imageSrc}
          description={project2.description}
          title={project2.title}
          tools={project2.tools}
          githubLink={project2.githubLink}
          websiteLink={project2.websiteLink}
        />
      </section>
      <div id="contact" className={styles.contactWrapper}>
        <ContactSection />
      </div>
      <NavigationBar />
    </div>
  );
};

export default HomePage;
