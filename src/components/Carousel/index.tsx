"use client";
/**
 * 响应式 :
 * logo: 240px, 剩余部分为导航内容
 */
import React, { useState, useEffect, useRef, ReactChildren } from "react";
import Image from "next/image";

interface IImageItem {
  className?: string;
  src: string;
  height: number;
  width: number;
}

interface ICarouselProps {
  style?: React.CSSProperties;
  className?: string;
  innerStyle?: React.CSSProperties;
  innerClassName?: string;
  images: IImageItem[];
  interval?: number;
  children?: React.ReactNode;
}

export const Carousel: React.FC<ICarouselProps> = (props) => {
  const {
    style = {},
    innerStyle = {},
    images,
    interval = 3000,
    className = "",
    children,
  } = props;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [prevTranslate, setPrevTranslate] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slider = sliderRef.current;
    slider!.style.transform = `translateX(${currentTranslate}px)`;

    if (!isDragging) {
      const transitionEnd = () => {
        slider!.style.transition = "";
        slider!.removeEventListener("transitionend", transitionEnd);
      };

      slider!.style.transition = "transform 0.3s ease-out";
      slider!.addEventListener("transitionend", transitionEnd);
    }
  }, [currentTranslate, isDragging]);

  // useEffect(() => {
  //     const autoPlay = setInterval(() => {
  //         goToNext();
  //     }, interval);
  //     return () => clearInterval(autoPlay);
  // }, [currentIndex]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) {
      const currentX = e.touches[0].clientX;
      const moveX = currentX - startX;
      if (
        (currentIndex === images.length - 1 && moveX < 0) ||
        (currentIndex === 0 && moveX > 0)
      ) {
        /** 最开始和最后就不能再滑动了 */
        return;
      }
      setCurrentTranslate(prevTranslate + moveX);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    const movedBy = currentTranslate - prevTranslate;
    if (movedBy < -100 && currentIndex < images.length - 1) {
      goToNext();
    } else if (movedBy > 100 && currentIndex > 0) {
      goToPrev();
    } else {
      setCurrentTranslate(prevTranslate);
    }
  };

  const goToNext = () => {
    if (currentIndex >= images.length - 1) {
      setCurrentIndex(0);
      setPrevTranslate(0);
      setCurrentTranslate(0);
    } else {
      const newTranslate = prevTranslate - sliderRef.current!.clientWidth;
      setCurrentIndex(currentIndex + 1);
      setPrevTranslate(newTranslate);
      setCurrentTranslate(newTranslate);
    }
  };

  const goToPrev = () => {
    if (currentIndex <= 0) {
      const newTranslate = -(
        sliderRef.current!.clientWidth *
        (images.length - 1)
      );
      setCurrentIndex(images.length - 1);
      setPrevTranslate(newTranslate);
      setCurrentTranslate(newTranslate);
    } else {
      const newTranslate = prevTranslate + sliderRef.current!.clientWidth;
      setCurrentIndex(currentIndex - 1);
      setPrevTranslate(newTranslate);
      setCurrentTranslate(newTranslate);
    }
  };

  return (
    <div
      className={`max-w relative overflow-hidden ${className}`}
      style={{ touchAction: "none", ...style }}
    >
      <div
        ref={sliderRef}
        style={innerStyle}
        className="flex min-h-full transition-transform duration-300 ease-out lg:fixed lg:left-0 lg:right-0 lg:top-0"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className={`min-h-full w-full min-w-full ${image.className ?? ""}`}
          >
            <Image
              className="h-full w-full object-cover object-center"
              src={image.src}
              alt="carousel pic"
              height={image.height}
              width={image.width}
            />
          </div>
        ))}
      </div>
      <button
        className="absolute left-0 top-1/2 -translate-y-1/2 transform bg-gray-800 bg-opacity-30 p-2 text-white"
        onClick={goToPrev}
      >
        <Image
          className="fill-current text-white"
          src="/left.svg"
          width={24}
          height={24}
          alt="right indictor"
        ></Image>
      </button>
      <button
        className="absolute right-0 top-1/2 -translate-y-1/2 transform bg-gray-800 bg-opacity-30 p-2 text-white"
        onClick={goToNext}
      >
        <Image
          className="fill-current text-white"
          src="/right.svg"
          width={24}
          height={24}
          alt="left indictor"
        ></Image>
      </button>
      {children}
    </div>
  );
};
