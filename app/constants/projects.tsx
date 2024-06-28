

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
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
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
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
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