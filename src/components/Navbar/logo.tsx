import Image from "next/image";
import { FC } from "react";

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
  return (
    <div className={`overflow-hidden flex ${className}`}>
      <Image
        style={imgStyle}
        className="object-contain"
        src={src}
        width={width}
        height={height}
        alt="Dream Tech"
      ></Image>
    </div>
  );
};
