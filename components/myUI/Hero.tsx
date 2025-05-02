"use client";
import { InputContext } from '@/context/InputContext';
import React, { useContext, useEffect, useRef, useState } from 'react';
import Typed from 'typed.js';

const Hero = () => {
  const typedRef = useRef(null);
  const [inputValue, setInputValue] = useState('');
  const [floatingStyles, setFloatingStyles] = useState<{ width: string; height: string; top: string; left: string; animation: string; animationDelay: string; }[]>([]);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {input, setInput} = useContext(InputContext);

  const onGenerate = (i: string) => {
    setInput({
      role: 'user',
      content: i
    })
  }

  useEffect(() => {
    const styles = Array.from({ length: 10 }).map(() => ({
      width: `${Math.random() * 10 + 5}px`,
      height: `${Math.random() * 10 + 5}px`,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      animation: `float ${Math.random() * 10 + 10}s linear infinite`,
      animationDelay: `${Math.random() * 5}s`
    }));
    setFloatingStyles(styles);
  }, []);

  useEffect(() => {
    const options = {
      strings: [
        'Ask Lovella anything...',
        'Build a todo app',
        'Make a social media app',
        'Create a fitness tracker',
        'An e-commerce site',
        'Make a recipe app'
      ],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 1500,
      startDelay: 500,
      loop: true,
      showCursor: true,
      cursorChar: '',
      smartBackspace: true,
    };

    const typed = new Typed(typedRef.current, options);

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div className='flex flex-col items-center justify-center px-4 text-center'>
      <div className='max-w-4xl mx-auto'>
        <h1 className='mb-6 text-3xl font-extrabold text-white md:text-5xl lg:text-7xl mt-28 md:mt-16'>
          Build something <span className='text-pink-400'>💖 Cherishable</span>
        </h1>
        
        <p className='mb-10 text-xl font-medium text-gray-300 md:text-2xl'>
          Idea to app in seconds, with your personal full stack engineer
        </p>
        
        <div className='relative w-full max-w-2xl mx-auto'>
          <input
            type='text'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className='w-full px-6 py-5 text-lg text-white bg-gray-800 border-2 border-gray-700 rounded-xl focus:outline-none focus:ring-4 focus:ring-pink-500 focus:border-transparent placeholder-gray-500 transition-all duration-300 hover:border-gray-600'
            placeholder=' '
          />
          <span
            ref={typedRef}
            className={`absolute top-9 left-6 -translate-y-1/2 text-gray-400 pointer-events-none text-lg ${
              inputValue ? 'opacity-0' : ''
            }`}
          />
          
          <button onClick={()=>onGenerate(inputValue)} className='absolute disabled:hover:scale-none disabled:cursor-no-drop disabled:bg-gray-600 cursor-pointer right-2 top-9 -translate-y-1/2 px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105' disabled={!inputValue}>
            Build It
          </button>
        </div>
        
        <div className='mt-8 text-gray-400 hidden md:flex flex-wrap gap-2 justify-center'>
          {['Create a weather app', 'Build a Twitter clone', 'Design a portfolio'].map((prompt, index) => (
            <span
              onClick={() => onGenerate(prompt)}
              key={index}
              className='px-4 py-2 text-sm cursor-pointer hover:bg-gray-600 hover:transition-all bg-gray-800 border border-gray-700 rounded-full text-gray-300 transition-all'
            >
              {prompt}
            </span>
          ))}
        </div>
      </div>
      
      <div className='absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none'>
        {floatingStyles.map((style, i) => (
          <div
            key={i}
            className='absolute rounded-full bg-white opacity-10'
            style={style}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
