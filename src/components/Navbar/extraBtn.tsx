import { FC, MouseEventHandler } from "react";
import Image from "next/image";
export interface IIconButtonItem {
    className?: string;
    src?: string;
    height?: number;
    width?: number;
    id: string;
    alt?: string;
    onClick: MouseEventHandler<HTMLImageElement>
}
export interface IExtraBtnProps {
    className?: string;
    btnList: IIconButtonItem[]
}
export const ExtraIconBtn: FC<IExtraBtnProps> = (props) => {
    const { className = '', btnList } = props;
    return <div className={`flex items-center whitespace-nowrap ${className}`}>
        {
            btnList.map((buttonItem) => {
                const { src, height, width, alt, className, onClick } = buttonItem;
                if (src && height && width && alt) {
                    return <Image key={buttonItem.id} className={className} src={src} height={height} width={width} alt={alt} onClick={onClick} />
                }
            })
        }
    </div>
}