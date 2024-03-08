"use client";
import clsx from "clsx";
import { Navbar } from "@/components/Navbar";
import { Carousel } from "@/components/Carousel";
import { Footer } from "@/components/Footer";
import { Section } from "@/components/Section";
import Card from "@/components/Card";
import ArticleEntry from "@/components/ArticleEntry";
import React, { CSSProperties, useState } from "react";

enum ColorTheme {
  BlackAndWhite = "BlackAndWhite",
}

const websiteConfig = {
  colorTheme: ColorTheme.BlackAndWhite,
  navbarData: [
    {
      text: "首页",
      href: "/",
    },
    {
      text: "立即报名",
      href: "/",
    },
    {
      text: "了解畅想科技营",
      href: "/",
    },
    {
      text: "加入我们",
      href: "/",
    },
  ],
  carouselImages: [
    {
      src: "/c1.jpg",
      width: 1620,
      height: 1080,
    },
    {
      src: "/c2.jpg",
      width: 1620,
      height: 1080,
    },
    {
      src: "/c3.jpg",
      width: 1620,
      height: 1080,
    },
  ],
  sectionOne: {
    title: "让每一次飞行，都触摸天空的心跳。",
    subTitle: "新乡人的航模俱乐部",
    desc: "不论您是初学者还是资深飞手，我们都能为您带来前所未有的飞行体验，激发您对天空的无限想象。一起探索更广阔的天空，让梦想飞得更高",
  },
  sectionTwo: {
    title: "畅想航模，孩子的天空也有大梦想。",
    subTitle: "畅想航模启迪孩子们的梦想",
    desc: "让孩子的梦想翱翔。我们的航模专为激发幼儿的想象与创造力设计，在飞行的乐趣中，孩子们学习科学原理，探索无限天空，种下成长的种子",
  },
  cardList: [
    {
      title: "第一季：星梯",
      desc: "宇宙时空之旅：位置的世界",
      buttonName: "去B站观看",
      linkName: "去B站观看",
      image: {
        src: "/c1.jpg",
        width: 1620,
        height: 1080,
      },
    },
    {
      title: "第二季：星梯",
      desc: "宇宙时空之旅：位置的世界",
      buttonName: "去B站观看",
      linkName: "去B站观看",
      image: {
        src: "/c2.jpg",
        width: 1620,
        height: 1080,
      },
    },
    {
      title: "第一季：星梯",
      desc: "宇宙时空之旅：位置的世界",
      buttonName: "去B站观看",
      linkName: "去B站观看",
      image: {
        src: "/c3.jpg",
        width: 1620,
        height: 1080,
      },
    },
    {
      title: "第一季：星梯",
      desc: "宇宙时空之旅：位置的世界",
      buttonName: "去B站观看",
      linkName: "去B站观看",
      image: {
        src: "/c3.jpg",
        width: 1620,
        height: 1080,
      },
    },
    {
      title: "第二季：星梯",
      desc: "宇宙时空之旅：位置的世界",
      buttonName: "去B站观看",
      linkName: "去B站观看",
      image: {
        src: "/c2.jpg",
        width: 1620,
        height: 1080,
      },
    },
    {
      title: "第一季：星梯",
      desc: "宇宙时空之旅：位置的世界",
      buttonName: "去B站观看",
      linkName: "去B站观看",
      image: {
        src: "/c3.jpg",
        width: 1620,
        height: 1080,
      },
    },
  ],
};

const ColorThemeConfig = {
  [ColorTheme.BlackAndWhite]: {
    sectionOneTheme: {
      className: "bg-gradient-to-b from-black to-[#141414]",
      titleAreaClassName: "text-white",
      descClassName: "text-white",
    },
    sectionTwoTheme: {
      className: "bg-gradient-to-b from-[#141414] to-[#282828]",
      titleAreaClassName: "text-white",
      descClassName: "text-white",
    },
    footerTheme: {
      className: "bg-[#141414]",
    },
  },
};

export default function Home() {
  const {
    navbarData,
    carouselImages,
    sectionOne,
    sectionTwo,
    cardList,
    colorTheme,
  } = websiteConfig;
  const { sectionOneTheme, sectionTwoTheme, footerTheme } =
    ColorThemeConfig[colorTheme];
  const [scrollY, setScrollY] = useState(0);

  // 监听页面滚动事件
  React.useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    // 组件卸载时移除事件监听
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navbarStyle = {
    transition: "background-color 0.3s",
    backgroundColor:
      scrollY > 100 ? "white" : `rgba(255, 255, 255, ${scrollY / 100})`,
    // 其他需要的样式可以在这里添加
  };
  const innerNavStyle = {
    transition: "height 0.3s color 0.3s",
    color:
      scrollY > 100
        ? "rgba(0,0,0)"
        : `rgba(${(1 - scrollY / 100) * 255},${(1 - scrollY / 100) * 255},${(1 - scrollY / 100) * 255})`,
    height:
      scrollY > 100
        ? "4rem"
        : `${Number(7 - (scrollY / 100) * 3).toFixed(2)}rem`,
  };
  let layerStyle: CSSProperties = {
    position: "fixed",
    visibility:
      typeof window !== "undefined" && scrollY > window.innerHeight
        ? "visible"
        : "hidden",
    background:
      typeof window !== "undefined" && scrollY > window.innerHeight
        ? "black"
        : "transpant",
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
  };
  let logoStyle = {};
  if (
    (typeof window !== "undefined" &&
      window.matchMedia("(max-width:768px)").matches) ||
    scrollY > 100
  ) {
    logoStyle = {
      filter: "drop-shadow(180px 0 #6699cc)",
      transform: "translateX(-100%)"
    };
  }

  return (
    <>
      <Navbar
        menuItems={navbarData}
        innerStyle={innerNavStyle}
        style={navbarStyle}
        className="lg:fixed lg:left-0 lg:right-0 lg:top-0 lg:z-20 lg:bg-transparent"
        logoStyle={logoStyle}
      ></Navbar>
      <Carousel
        className="h-[40vh] md:h-[80vh] lg:left-0 lg:right-0 lg:top-0 lg:h-[100vh]"
        images={carouselImages}
        interval={3000}
      >
        <div style={layerStyle}></div>
      </Carousel>
      <Section
        className={clsx(
          "relative z-10 overflow-hidden",
          sectionOneTheme.className,
        )}
        titleAreaClassName={sectionOneTheme.titleAreaClassName}
        descClassName={sectionOneTheme.descClassName}
        title={sectionOne.title}
        desc={sectionOne.desc}
        // subTitle={sectionOne.subTitle}
      >
        <div className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {cardList.map((card) => {
            return (
              <Card
                title={card.title}
                desc={card.desc}
                buttonName={card.buttonName}
                image={card.image}
              />
            );
          })}
        </div>
      </Section>
      <Section
        className={clsx(
          "relative z-10 lg:overflow-hidden",
          sectionTwoTheme.className,
        )}
        titleAreaClassName={sectionTwoTheme.titleAreaClassName}
        descClassName={sectionTwoTheme.descClassName}
        title={sectionTwo.title}
        desc={sectionTwo.desc}
        // subTitle={sectionTwo.subTitle}
      >
        <ArticleEntry
          articles={cardList as any}
          switchTimer={3000}
        ></ArticleEntry>
      </Section>
      <Footer
        className={clsx(
          "border-border-opacity-custom-15 -mb-10 border-t-8",
          footerTheme.className,
        )}
      ></Footer>
    </>
  );
}
