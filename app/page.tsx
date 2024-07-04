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
import { Yatra_One, Carter_One } from 'next/font/google'
import hexagon from "@/public/port-images/bioBackground.webp"

const yatraOne = Yatra_One({
  weight: '400',
  subsets: ['latin'],
})

const carterOne = Carter_One({
  weight: '400',
  subsets: ['latin'],
})

const HomePage: React.FC = () => {

  const ParticlesBackground = dynamic(
    () => import('./componenets/ParticlesBackground'),
    {
      loading: () => <BouncingBalls />,
    }
  )

  return (
    <div className="relative w-full overflow-hidden">
      <Navbar />
      <div className=" bg-white">
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
      </div>
      <div className={`${styles.shadow}`}></div>
      <section id="aboutMe" className={styles.aboutMeWrapper}>
        <div className={styles.hexagonPattern}>
          {/* <Image
            src={hexagon}
            alt="Picture of the author"
            layout="fill"
            objectFit="cover"
            sizes="100vw"
          /> */}
          hello
          
        <div className={styles.aboutMe}>
          <div className="flex justify-center items-center align-middle flex-col">
            <h1 className={`${styles.aboutMeHeader} ${yatraOne.className}`}>About Me</h1>
            <h2 className={`${styles.subHeader} ${yatraOne.className}`}>Who I am and what I do</h2>
          </div>
          <div className={`${styles.flexWrap} `} >
            <div className="m-10  min-w-[350px] flex flex-col justify-center items-center ">
              <h3 className={styles.introduction}>
                Hello, I'm <span>S</span>kye <span>Grossman</span>
              </h3>
              <div className={styles.biographyContainer}>
                <span className="ml-10"></span><span className={styles.biography}>Maui, HI born & raised. Critical thinker, problem solver, former chef, and avid jiu-jitsu practitioner. I had a fun growing up on the island's country side with so much to do and explore. We used to skip school when the surf was to good to pass up. I always had good work ethic, usually bulding or fixing things, I became a jack of all trades at an early age.</span><br></br> <span className="ml-10"></span><span className={styles.biography}> I was always interested in making good food, so I started with culinary school where I earned my degree and became a Chef. The restaurant industry was a playground of fun opportunities, from working in bars and dives to catering and upscale restaurants. After some time, a unique opportunity in the towing industry came my way, and I seized it. This phase of my life was full of unique experiences, from repossessions to off-road tow-outs and vehicle removals, all kinds of challenging situations.</span><br></br> <span className="ml-10"></span><span className={styles.biography}>Eventually I sought a new path and turned to construction, where I gained valuable skills. However, I realized that it wasn't where I wanted my future. I discovered I had a keen interest in programming, having fun in creating and seeing technology come to life. To refine my skills, I attended an intensive 16-week coding bootcamp at Coding Dojo, coding 12 to 15 hours a day. This rigorous training whipped me into coding shape. Now, I have the privilege of working on and creating amazing software using my unique experiences to to solve real world problems. Now I get to employ my own personal philosophy to continually improve, and innovate.</span><span className={styles.bioRed}>If you have any questions or just want to chat, feel free to get in touch. Mahalo!</span>
              </div>
            </div>
            <div className="w-full border flex justify-center align-middle flex-col">
              <h4 className={`${styles.toolsHeader} ${yatraOne.className}`}>Skills</h4>
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
        </div>
      </section>
      <div className={`${styles.shadowUp}`}></div>
      <section className={styles.arrowSection}>
        <div className={styles.arrowContent}>
          <video className={styles.videoBackground} controls={false} autoPlay={true} loop={true} muted={true} preload="none" playsInline>
            <source src={"/video/milkyway.mp4"} type="video/mp4" />
          </video>
          <h2 className={`${styles.projectsHeader} ${carterOne.className}`}>My Recent Work</h2>
          <Image
            src={desktop}
            alt="Description of image"
          />
        </div>
      </section>
      <section id="projects" className={styles.projectsSection}>
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
      <div className={styles.contactShadow}>
        <div id="contact" className={styles.contactWrapper}>
          <ContactSection />
        </div>
      </div>
      <NavigationBar />
    </div>
  );
};

export default HomePage;
