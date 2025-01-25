import React from "react";
import { ButtonProps } from "../@types/types";
import Link from "next/link";

const Button: React.FC<ButtonProps> = ({
  text,
  classNames,
  link,
  clickFun,
}) => {
  return (
    <>
      {link ? (
        <Link
          href={link}
          className={`bg-black w-full px-4 text-center cursor-pointer hover:bg-transparent border-2 border-black hover:text-black transition-all duration-300 ease-in-out ${classNames}`}
        >
          {text}
        </Link>
      ) : (
        <button
          onClick={clickFun}
          className={`bg-black w-full px-4 text-center cursor-pointer hover:bg-transparent border-2 border-black hover:text-black transition-all duration-300 ease-in-out ${classNames}`}
        >
          {text}
        </button>
      )}
    </>
  );
};

export default Button;
