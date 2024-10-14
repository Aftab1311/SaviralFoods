import React from 'react';

import { Link } from 'react-router-dom';



const Hero = () => {
  return (
    <div className="relative h-[560px] md:min-h-screen flex items-center justify-center flex-col p-4 pt-40 md:mt-0 mb-36 md:mb-10">
      <div 
         className="absolute inset-0 bg-cover bg-center w-full h-[820px]"
         style={{ backgroundImage: "url('/images/heros.png')", backgroundSize: "cover", backgroundPosition: "center" }}
      ></div>
      <div  className="absolute inset-0 bg-black opacity-60 h-[660px] md:h-[820px]"></div>
      <div className="relative text-center text-white px-4 flex justify-center items-center flex-col max-w-4xl mx-auto">
        
        <h1 className="text-5xl  lg:text-[95px] font-extralight tracking-tight mb-2 sm:mb-4">
        Power Up Your <span className='font-bold tracking-tighter'>Health</span> <br/> with <span className='font-bold tracking-tighter'>Fresh</span> Goodness!
        </h1>
        <p className="text-xs sm:text-sm max-w-3xl mx-auto uppercase font-medium tracking-widest text-zinc-200 mt-6  mb-8 sm:mb-12">
        Fresh Atta, Farm-Fresh Ghee, and Natural Sattu & Oil <br/>Delivered to Your Door, Every Day!
        </p>

        <Link className='px-6 sm:px-8 py-2 rounded-full uppercase bg-white text-[#222] border-4 sm:border-[6px] border-[#86CDB5] text-sm sm:text-base hover:bg-[#86CDB5] font-medium tracking-tight transition duration-300 hover:text-white' to="/shop">Shop Now</Link>
      </div>
    </div>
  );
};

export default Hero;
