import React from 'react';

export function Header() {
  return (
    <header className="w-full h-20 bg-blue-700 shadow-md flex items-center relative overflow-hidden rounded-b-xl">
      {/* Elemento de destaque visual: faixa diagonal sutil */}
      <div 
        className="absolute top-0 left-[-10%] w-[35%] h-full bg-blue-400 transform -skew-x-12 opacity-30 pointer-events-none" 
        aria-hidden="true"
      />
      
      <div className="container mx-auto px-6 md:px-12 flex justify-center md:justify-start items-center relative z-10">
        <div className="flex items-center group cursor-default select-none">
          <span className="text-white text-3xl font-extrabold tracking-tighter">
            Drive
          </span>
          <span className="text-blue-100 text-3xl font-light tracking-tight ml-0.5">
            Wise
          </span>
        </div>
      </div>
    </header>
  );
}