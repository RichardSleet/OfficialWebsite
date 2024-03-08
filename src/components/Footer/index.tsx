import clsx from "clsx";
import { CSSProperties, FC } from "react";
import Image from "next/image";
// 定义接口
export interface IImageItem {
  src: string;
  height: string;
  width: string;
}

export interface IFooterProps {
  style?: CSSProperties;
  className?: string;
  logoImage?: IImageItem;
  menuItems?: any[];
}

export const Footer: FC<IFooterProps> = (props) => {
  const { className, style, logoImage, menuItems } = props;
  return (
    <footer
      className={clsx("max-w relative mx-auto w-full pb-4 pt-12", className)}
    >
      <div
        className={clsx(
          "mx-auto flex max-w-7xl flex-col flex-wrap items-center justify-center lg:flex lg:flex-row",
        )}
      >
        <div className="flex h-40 w-40 items-center justify-center p-4">
          <Image className="" src="/logo.png" height={120} width={120} alt="logo"></Image>
        </div>
        <div className="text-brand-gray-opacity-15 flex min-w-min flex-1 flex-shrink-0 p-4 text-sm text-white">
          <div>
            {menuItems?.map((item) => {
              return <a href="/">{item}</a>;
            })}
          </div>
          <div className="text-center">
            Copyright © 2015-2022 National Geographic Partners, LLC. All rights
            reserved
          </div>
        </div>
        <div className="flex w-96 items-center justify-center gap-4 p-4">
          <div className="rounded bg-lime-500 p-2">
            <Image
              className="white"
              height="20"
              width="20"
              src="/wechat.svg"
              alt="wechat"
            />
          </div>
          <div className="rounded bg-black p-2">
            <Image height="20" width="20" src="/tiktok.svg" alt="tiktok" />
          </div>
          <div className="rounded bg-orange-500 p-2">
            <Image height="20" width="20" src="/weibo.svg" alt="weibo" />
          </div>
          <div className="rounded bg-sky-500 p-2">
            <Image height="20" width="20" src="/qq.svg" alt="qq" />
          </div>
        </div>
      </div>
    </footer>
  );
};
