

import css from '@/public/port-logo-images/css.png'
import javascript from '@/public/port-logo-images/javascript.png'
import next from '@/public/port-logo-images/next.png'
import react from '@/public/port-logo-images/react.png'
import supabase from '@/public/port-logo-images/supabase.png'
import tailwind from '@/public/port-logo-images/tailwind.png'
import typescript from '@/public/port-logo-images/typescript.png'
import vercel from '@/public/port-logo-images/vercel.png'
import prisma from '@/public/port-logo-images/prisma.png'
import pocketChef from '@/public/port-images/pocketChefForm.png'
import kalaniCommerce from '@/public/port-images/KalaniShop.png'


// interface ProjectCardProps {
//     imageSrc: string;
//     description: string;
//     title: string;
//     tools: {name: string,
//         image: string
//     }[];
//     githubLink: string;
//     websiteLink: string;
// }

export const project1 = {
    imageSrc: pocketChef,
    description: 'PocketChef is an innovative way you approach cooking, solving the issue of thinking of something to cook with the limited ingredients inside your kitchen. Built with a modern tech stack including TypeScript, React.js, Next.js, TailwindCSS, CSS, and OpenAI. Simply enter the ingredients you have or wish to use, optionally select a diet type and meal type, and PocketChef will generate a variety of recipes complete with images. The app leverages the power of OpenAI to create unique and delicious recipes tailored to your preferences. Additionally, PocketChef showcases advanced parallax effects and GSAP animations, making the user interface more appealing and engaging. Built this to help the average home cook, PocketChef is your ultimate kitchen companion, helping you make the most out of your ingredients and discover interesting recipes from your own kitchen.',
    title: 'PocketChef',
    tools: [
        {name: 'Javascript', image: javascript},
        {name: 'Next.js', image: next},
        {name:'React', image: react},
        {name: 'Typescript', image: typescript},
        {name: 'TailwindCSS', image: tailwind},
        {name: 'CSS', image: css},
        {name: 'Vercel', image: vercel}
    ],
    githubLink: 'https://github.com/Skye967/PocketChef',
    websiteLink: 'https://pocketchef.vercel.app/'
}

export const project2 = {
    imageSrc: kalaniCommerce,
    description: 'This e-commerce web application offers a smooth comprehensive shopping experience. Showcasing a modern approach to api and database techniques, reducing development time by half without sacrificing quality. Users can effortlessly log in using GoogleOauth, ensuring a secure and seamless authentication process. The app features robust cart and checkout functionality. Additionally, it includes a dynamic dashboard for users to track their orders and manage their account details. The integration with Stripe ensures smooth and secure payment transactions. This e-commerce solution is designed to provide a modern, efficient, and user-friendly platform for both buyers and sellers.',
    title: 'Kalani-Commerce',
    tools: [
        {name: 'Javascript', image: javascript},
        {name: 'Next.js', image: next},
        {name:'React', image: react},
        {name: 'Typescript', image: typescript},
        {name: 'TailwindCSS', image: tailwind},
        {name: 'CSS', image: css},
        {name: 'Vercel', image: vercel},
        {name: 'Prisma', image: prisma},
        {name: 'Supabase', image: supabase},
    ],
    githubLink: 'https://github.com/Skye967/Kalani-Commerce',
    websiteLink: 'https://kalani-commerce-indol.vercel.app/'
}