import { useMemo } from "react";
import { ContainerScroll } from "./ContainerScroll";
import { useThemeClasses } from "./ThemeAware";
import himage from "../assets/heropic.png";
import Threads from './Threads';

export default function HeroSection() {
  const themeClasses = useThemeClasses();
  const { threadsColor, linesBackgroundColor } = themeClasses;

  // Convert hex color to RGB array for OGL's Color constructor
  const hexToRgbArray = (hex) => {
    if (!hex) return [0, 0, 0]; // Default to black if no color is provided
    let c = hex.substring(1).split('');
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = '0x' + c.join('');
    return [(c >> 16) & 255 / 255, (c >> 8) & 255 / 255, c & 255 / 255];
  };

  const threadsRgb = useMemo(() => hexToRgbArray(threadsColor), [threadsColor]);

  return (
    <div className={`relative flex flex-col overflow-hidden ${themeClasses.primary}`}>
      <div 
        className="absolute inset-0 z-0" 
        style={{ backgroundColor: linesBackgroundColor, transform: 'translateY(-20%)' }}
      >
        <Threads color={threadsRgb} />
      </div>
      <div className="relative z-10">
        <ContainerScroll
          titleComponent={
            <>
              <h1 className={`text-4xl font-semibold ${themeClasses.text}`}>
                Transform Your <br />
                <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Digital Vision
                </span>
              </h1>
              <p className={`text-xl md:text-2xl ${themeClasses.textSecondary} mt-6 max-w-4xl mx-auto leading-relaxed`}>
                From startup MVPs to enterprise solutions and stunning e-commerce platforms
               
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  Startups & Small Business
                </span>
                <span className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                  Enterprise Solutions
                </span>
                <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  E-commerce & Creative
                </span>
              </div>
            </>
          }
        >
          <img
            src={himage}
            alt="Modern web development and digital solutions"
            className="mx-auto rounded-2xl object-cover h-full w-full object-left-top"
            draggable={false}
          />
        </ContainerScroll>
      </div>
    </div>
  );
}