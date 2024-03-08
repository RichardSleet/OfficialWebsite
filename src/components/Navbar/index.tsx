"use client";
/**
 * 响应式 lg: 窄屏导航和宽屏导航
 * logo: 240px, 剩余部分为导航内容
 */
import { FC, MouseEventHandler, useState } from "react";
import { Logo } from "./logo";
import { Menu, MobileMenu } from "./menu";
import { ExtraIconBtn } from "./extraBtn";

export interface INavbarProps {
  style?: React.CSSProperties;
  innerStyle?: React.CSSProperties;
  className?: string;
  innerClassName?: React.CSSProperties;
  logoStyle?: React.CSSProperties;
  menuItems: any[];
}

export const Navbar: FC<INavbarProps> = (props) => {
  const { logoStyle, innerStyle, style, className, menuItems } = props;
  const [mobileNavShown, setMobileNavShown] = useState(false);
  const onClickMenu: MouseEventHandler<HTMLImageElement> = () => {
    setMobileNavShown((prev) => !prev);
  };
  const extraButtonItems = [
    {
      id: "menu",
      className: "flex lg:hidden",
      height: 24,
      width: 24,
      src: "/menu.svg",
      alt: "menu",
      onClick: onClickMenu,
    },
  ];
  return (
    <nav style={style} className={`mx-auto min-w-min flex-col ${className}`}>
      <div
        style={innerStyle}
        className="mx-auto flex max-w-7xl items-center px-3"
      >
        {/* left area logo */}
        <Logo
          imgStyle={logoStyle}
          className="flex h-full w-60 flex-shrink-0"
          width={180}
          height={100}
          src="/top-white-logo.png"
        />
        {/* center menu */}
        <Menu className="mr-4" menuItems={menuItems} />
        {/* right extra */}
        <ExtraIconBtn
          className="ml-auto mr-4 flex-shrink-0 text-right"
          btnList={extraButtonItems}
        />
      </div>
      {/* mobile nav */}
      {mobileNavShown && <MobileMenu menuItems={menuItems} />}
    </nav>
  );
};
