'use client'
import React, { Suspense, useEffect, useState } from "react";
import styles from '@/public/css/aboutMe.module.css'
import { logoImages } from "./constants/logo";
import Image from "next/image";
import dynamic from "next/dynamic";
import desktop from '@/public/port-images/desktop.png'
import { project1, project2 } from "./constants/projects";
import Navbar from "./componenets/Navbar";
import ParticlesBackground from "./componenets/ParticlesBackground";
import ProjectCard from "./componenets/ProjectCard";
import ContactSection from "./componenets/ContactSection";
import NavigationBar from "./componenets/SideNavBar";
import BouncingBalls from "./componenets/BouncingBalls";
import myself from "@/public/port-images/myself.jpeg"

const HomePage: React.FC = () => {
  
  const ParticlesBackground = dynamic(
    () => import('./componenets/ParticlesBackground'),
    {
      loading: () => <BouncingBalls/>,
    }
  )

  return (
    <div className="relative w-full">
      <Navbar />
      <div id="home" className={`${styles.intro}`}>
        <Image
          src={myself}
          alt="Picture of the author"
          className={styles.particleB}
        />
        <Suspense fallback={<BouncingBalls/>}>
          <ParticlesBackground />
        </Suspense>
      </div>
      <div className={`${styles.shadow}`}></div>
      <section id="aboutMe" className={styles.aboutMeWrapper}>
        <div className={styles.aboutMe}>
          <h1 className={styles.aboutMeHeader}>About Me</h1>
          <h2 className={styles.subHeader}>Who I am and what I do</h2>
          <h3 className={styles.introduction}>
            Hello, I'm <span>S</span>kye <span>Grossman</span>
          </h3>
          <div className={styles.biographyContainer}>
            <span className={styles.biography}>I am a full stack software developer from Maui, Hawaii with an extensive background in the restaurant, towing, and construction industries. As a software developer with hands on experience in designing, developing, deploying and maintaining many consumer facing web applications. Please do not hesitate to get in touch with me if you have any questions.<span className={styles.bioRed}>I look forward to working with you.</span> </span>
          </div>
          <h4 className={styles.toolsHeader}>Tools and Technologies I'm familiar with</h4>
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
      </section>
      <div className={`${styles.shadowUp}`}></div>
      <section className={styles.arrowSection}>
        <div className={styles.arrowContent}>
          <video className={styles.videoBackground} autoPlay loop muted>
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
      {/* <NavigationBar /> */}
    </div>
  );
};

export default HomePage;
