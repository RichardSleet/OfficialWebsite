"use client";
import { FC } from "react";

export interface ISectionProps {
  style?: React.CSSProperties;
  className?: string;
  title?: string;
  titleAreaClassName?: string;
  subTitle?: string;
  desc?: string;
  descClassName?: string;
  children?: React.ReactNode;
}
export const Section: FC<ISectionProps> = (props) => {
  const {
    style,
    className,
    title,
    desc,
    subTitle,
    children,
    titleAreaClassName,
    descClassName,
  } = props;
  return (
    <section style={style} className={`w-full py-4 px-8 ${className}`}>
      <div className="mx-auto flex max-w-7xl flex-col items-start">
        <h2 className={`text-lg text ${titleAreaClassName}`}>
          {subTitle}
          <span className="mt-2 block text-3xl font-black">{title}</span>
        </h2>
        <p className={`bg-red mt-2 opacity-75 ${descClassName}`}>{desc}</p>
        {children}
      </div>
    </section>
  );
};
