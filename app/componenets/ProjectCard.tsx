import React from 'react';
import Image, { StaticImageData } from 'next/image';
import styles from './css/ProjectCard.module.css';
import Link from 'next/link';

interface ProjectCardProps {
    imageSrc: StaticImageData;
    description: string;
    title: string;
    tools: {name: string,
        image: StaticImageData
    }[];
    githubLink: string;
    websiteLink: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ imageSrc, description, title, tools, githubLink, websiteLink }) => {
    return (
        <div className={styles.projectCard}>
            <div className={styles.leftColumn}>
                <Image src={imageSrc} alt={title} width={1000} height={1000} className={styles.projectImage} />
                <p className={styles.description}>{description}</p>
            </div>
            <div className={styles.rightColumn}>
                <h3 className={styles.title}>{title}</h3>
                <div className={styles.tools}>
                    {tools.map((tool, index) => (
                        <div key={index} className={styles.itemBorder}>
                            <div className={styles.item}>
                            <Image className={styles.toolImage}  src={tool.image} alt={title} width={100} height={100} />
                            <p>{tool.name}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className={styles.links}>
                    <Link className={styles.github} href={githubLink} target="_blank" rel="noopener noreferrer">GitHub</Link>
                    <Link className={styles.website} href={websiteLink} target="_blank" rel="noopener noreferrer">Website</Link>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
