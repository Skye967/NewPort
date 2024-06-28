import React from 'react';
import styles from './css/SideNavBar.module.css';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import Link from 'next/link';

const NavigationBar: React.FC = () => {
    return (
        <div className={styles.navbar}>
            <Link
                href="https://www.linkedin.com/in/skye-grossman/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.navLink}
            >
                <FaLinkedin />
            </Link>
            <Link
                href="https://github.com/Skye967"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.navLink}
            >
                <FaGithub />
            </Link>
            <Link href="#contact" className={styles.navLink}>
                <FaEnvelope />
            </Link>
        </div>
    );
};

export default NavigationBar;
