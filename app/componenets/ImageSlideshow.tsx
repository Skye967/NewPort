'use client'

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './css/slideshow.module.css'
import bigThree from '@/public/port-images/bigThree.png'
import codeBlur from '@/public/port-images/codeBlur.jpg'
import codeTiles from '@/public/port-images/codeTiles.avif'
import easyHat from '@/public/port-images/easyHat.png'
import javascript from '@/public/port-images/javascript.jpg'
import javscriptHoody from '@/public/port-images/javascriptHoody.png'
import lapTop from '@/public/port-images/lapTop.jpg'
import prettyCodeHoody from '@/public/port-images/prettyCodeHoody.png'
import programmerGreyTshirt from '@/public/port-images/programmerGreyTshirt.png'
import programmerTshirt from '@/public/port-images/programmerTshirt.png'
import tagHat from '@/public/port-images/tagHat.png'

const images = [
    easyHat,
    bigThree,
    programmerTshirt,
    codeBlur,
    prettyCodeHoody,
    codeTiles,
    programmerGreyTshirt,
    javascript,
    javscriptHoody,
    lapTop,
    tagHat
    // Add more images as needed
];

const ImageSlideshow: React.FC = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 9000); // 12 seconds for the complete cycle
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className={`${styles.slideshow}`}>
            {images.map((image, index) => (
                <Image
                    priority={true}
                    key={index}
                    src={image}
                    alt="Picture of the author"
                    className={`${styles.slideshowImage} ${index === currentImageIndex ? `${styles.active}` : ''}`}

                />
            ))}
        </div>
    );
};

export default ImageSlideshow;
