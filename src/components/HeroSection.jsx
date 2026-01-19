import { ContainerScroll } from "./ContainerScroll";
import { useThemeClasses } from "./ThemeAware";
import himage from "../assets/heropic.png";

export default function HeroSection() {
  const themeClasses = useThemeClasses();
  
  return (
    <div className={`flex flex-col overflow-hidden ${themeClasses.primary}`}>
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
              From startup MVPs to enterprise solutions and stunning e-commerce platforms - 
              we build digital experiences that drive growth and engage users.
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
  );
}