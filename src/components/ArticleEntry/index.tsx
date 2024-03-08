"use client";
/**
 * lg:
 * md: 50%
 */
import React, { useEffect, useState, useRef } from "react";

interface IImageItem {
  src: string;
  alt?: string;
  height?: string;
  width?: string;
}

interface IArticleEntryItem {
  image: IImageItem;
  title: string;
  desc: string;
  linkName?: string;
}

interface IArticleGalleryProps {
  articles: IArticleEntryItem[];
  switchTimer: number; // 定义为毫秒
}

/**
 * 创建一个防抖函数
 * @param func 需要防抖的函数
 * @param wait 等待时间，即在多少毫秒后执行
 * @param immediate 是否立即执行
 * @returns 返回一个防抖后的函数
 */
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  immediate: boolean = false,
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return function (this: any, ...args: Parameters<T>) {
    const context = this;

    const later = () => {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    const callNow = immediate && !timeout;
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
}

// 文章入口集合画廊组件
const ArticleGallery: React.FC<IArticleGalleryProps> = (props) => {
  const { articles, switchTimer } = props;
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollerRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % articles.length);
    }, switchTimer);
    return () => clearInterval(timer);
  }, [articles.length, switchTimer]);

  // 定义如何根据索引获取 CSS 样式
  const getArticleClass = (index: number) => {
    if (index === currentIndex) return "scale-105";
    return "scale-95 opacity-50";
  };

  const getTranslateX = () => {
    if (typeof window === "undefined") {
      return;
    }
    const mql = window.matchMedia("(max-width:768px)");
    if (mql.matches) {
      return `translateX(-${currentIndex * 100}%)`;
    }
    return `translateX(-${currentIndex * 50}%)`;
  };

  return (
    <div className="hide-scrollbar w-full overflow-auto lg:overflow-visible">
      <div
        style={{ transform: getTranslateX() }}
        className={`flex w-full transition-transform duration-500 ease-in-out`}
        ref={scrollerRef}
      >
        {articles.map((article, index) => (
          <div
            key={index}
            className="min-w-[100%] flex-col items-center p-4 text-center md:min-w-[50%]"
          >
            <div
              key={index}
              className={`transition-transform duration-500 ease-in-out ${getArticleClass(index)}`}
            >
              <img
                src={article.image.src}
                alt={article.image.alt || ""}
                className="w-full rounded-lg object-cover"
              />
              <h2 className="text-lg font-bold text-white">{article.title}</h2>
              <p className="text-white">{article.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticleGallery;
