import { FaGithub } from "react-icons/fa";

const Nav = () => (
  <div className={`absolute w-full z-50`}>
    <div className="backdrop-blur-xl fixed top-0 w-full h-10 px-6 py-10 z-50" />
    <div className="fixed top-0 w-full h-10 flex flex-row items-center justify-between px-6 py-10 space-x-5 z-50">
      <div className="flex items-center justify-center text-textWhite/60">
        <h1 className="text-3xl font-bold bg-gradient-to-l from-[#3BC3A4] to-[#1F9C8D] bg-clip-text text-transparent">
          Resume Analyzer
        </h1>
      </div>
      <a
        href="https://www.google.com"
        target="_blank"
        rel="noopener noreferrer"
        className="cursor-pointer relative rounded px-5 py-2.5 overflow-hidden group bg-[#3BC3A4] relative hover:bg-gradient-to-r hover:from-[#3BC3A4] hover:to-[#1F9C8D] text-white hover:ring-2 hover:ring-offset-2 hover:ring-[#3BC3A4] transition-all ease-out duration-300"
      >
        <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
        <span className="relative font-bold text-white flex flex-row items-center justify-center space-x-2">
          <FaGithub size={23} color="#FFFFFF" />
          <p className="tracking-wider">Github</p>
        </span>
      </a>
    </div>
  </div>
);

export default Nav;
