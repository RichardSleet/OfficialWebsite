"use client";
import Image from "next/image";
import { FC, useEffect, useState } from "react";

export interface ILogoProps {
  className: string;
  imgStyle?: React.CSSProperties;
  src: string;
  width: number;
  height: number;
}

// after line css after:content-[' '] after:w-px after:h-full after:bg-gray-200 after:border after:border-gray-200
export const Logo: FC<ILogoProps> = (props) => {
  const { className = "", width, height, src, imgStyle } = props;
  let [localStyleState, setLocalStyleState] = useState<any>({});
  useEffect(() => {
    setLocalStyleState(imgStyle);
  }, [imgStyle]);
  return (
    <div className={`flex items-center justify-center overflow-hidden ${className}`}>
      <img
        style={localStyleState}
        className="object-contain"
        src={src}
        width={width}
        height={height}
        alt="Dream Tech"
      ></img>
    </div>
  );
};
