import React, { ReactNode } from "react";
import Nav from "../../components/nav/Nav";

interface NavWrapperProps {
  children: ReactNode;
}

const NavWrapper = ({ children }: NavWrapperProps) => {
  return (
    <div className="flex flex-col md:flex-row h-full items-center md:items-stretch relative neuehaas-font w-full">
      <main
        className={`flex flex-col items-center space-y-4 md:space-y-16 w-full relative z-30 w-full`}
      >
        {children}
      </main>
      <Nav />
    </div>
  );
};

export default NavWrapper;
