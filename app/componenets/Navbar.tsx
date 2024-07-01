import React, { useState } from 'react';
import Link from 'next/link';
import styles from './css/Navbar.module.css';
import { Arizonia } from "next/font/google";
import logo from '@/public/port-images/sgLogo.jpg'
import Image from 'next/image';

const arizonia = Arizonia({ subsets: ["latin"], weight: ['400'] });

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className={`${styles.nav} bg-black text-white py-4`}>
            <div className="container mx-auto flex justify-between items-center">
                <Image
                    src={logo}
                    alt="Picture of the author"
                    className={styles.logo}
                />
                {/* <div className={`${styles.name} ${arizonia.className}`}>
                    Skye Grossman
                </div> */}
                <div className={styles.linksContainer}>
                    <div className={`flex flex-wrap ${styles.menuLinks}`}>
                        <Link className={`${styles.customLink}`} href="#home" prefetch={true}>
                            Home
                        </Link>
                        <Link className={`${styles.customLink}`} href="#aboutMe" prefetch={true}>
                            About
                        </Link>
                        <Link className={`${styles.customLink}`} href="#projects" prefetch={true}>
                            Projects
                        </Link>
                        <Link className={`${styles.customLink}`} href="#contact" prefetch={true}>
                            Contact
                        </Link>
                        <Link className={`${styles.customLink}`} href="https://docs.google.com/document/d/1eho-4QWcmMxeYAx798CfIZ9w4sB-DpGcB8Eq3TiEij8/edit?usp=sharing" prefetch={true}>
                            Resume
                        </Link>
                    </div>
                    <div className={`${styles.hamburger} ${isOpen ? styles.open : ''}`} onClick={toggleMenu}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                {isOpen && (
                    <div className={styles.dropdownMenu}>
                        <Link className={`${styles.customLink}`} href="#home" prefetch={true}>
                            Home
                        </Link>
                        <Link className={`${styles.customLink}`} href="#aboutMe" prefetch={true}>
                            About
                        </Link>
                        <Link className={`${styles.customLink}`} href="#projects" prefetch={true}>
                            Projects
                        </Link>
                        <Link className={`${styles.customLink}`} href="#contact" prefetch={true}>
                            Contact
                        </Link>
                        <Link className={`${styles.customLink}`} href="https://docs.google.com/document/d/1eho-4QWcmMxeYAx798CfIZ9w4sB-DpGcB8Eq3TiEij8/edit?usp=sharing" prefetch={true}>
                            Resume
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar;
