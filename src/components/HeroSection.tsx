import Link from 'next/link'
import React from 'react'
import { Spotlight } from './ui/Spotlight'
import { Button } from "./ui/moving-border";

const HeroSection = () => {
  return (
    <div
    className='h-screen md:h-screen  w-full rounded-md flex flex-col items-center justify-center  relative overflow-hidden mx-auto py-10 md:py-0'
    >
        
         <Spotlight
        className="-top-40 left-0 md:-top-10  md:left-60"
        fill="white"
      />
        <div className='p-4 mt-20 relative z-10 w-full text-center h-2/3'>
            <h1
            className=' text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to bg-neutral-400'
            >Master the art of music</h1>
            <p
            className='mt-4 font-normal text-base md:text-lg text-neutral-300 max-w-lg mx-auto'
            >Dive into our comprehensive musci courses and transform your musical journey today. Whether you are a beginner or looking to refine your skills, join us to unlock your true potential.</p>
            <div className='mt-4'>
                <Link href={"/courses"}>
                    <Button
                    borderRadius='1.75rem'
                    className='bg-white dark:bg-black text-black dark:text-white border-neutral-200 dark:border-slate-800'
                    >
                      Explore courses</Button>
                </Link>
            </div>
        </div>


    </div>
  )
}

export default HeroSection