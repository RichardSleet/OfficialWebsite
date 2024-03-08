"use client";
import React from "react";

// 定义接口
export interface IImageItem {
  src: string;
  height: string | number;
  width: string | number;
}

export interface ICardProps {
  className?: string;
  image: IImageItem;
  title: string;
  desc: string;
  buttonName?: string;
  style?: React.CSSProperties;
}

// 卡片组件
const Card: React.FC<ICardProps> = ({
  style,
  className,
  image,
  title,
  desc,
  buttonName,
}) => {
  return (
    <div
      className={`flex flex-col items-center overflow-hidden rounded border border-border-opacity-custom-15 ${className}`}
    >
      <img className="w-full" src={image.src} alt={""} />
      <div className="px-6 py-4">
        <div className="mb-2 text md:text-xl text-center font-bold text-white">{title}</div>
        <p className="text-base text-gray-400">{desc}</p>
      </div>
      <div className="px-6 pb-4 pt-4">
        <button className="rounded border-2 border-brand-light px-4 py-2 font-bold text-brand-light">
          {buttonName}
        </button>
      </div>
    </div>
  );
};

export default Card;
