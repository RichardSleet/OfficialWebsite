import { FC, useState } from "react";

export interface IMenuItem {
    text: string;
    href?: string;
    // children?: IMenuItem[];
}

export interface IDropdownMenuProps {
    className?: string;
    subMenuGropuClassName?: string;
    subMenuItemClassName?: string;
    text: string;
    href?: string;
    subMenuItems?: IMenuItem[];
}

export const DropdownMenu: FC<IDropdownMenuProps> = (props) => {
    const { className = '', subMenuGropuClassName, subMenuItemClassName, text, subMenuItems, href } = props;
    const [isShown, setIsShown] = useState(false);
    if (href && (!subMenuItems || subMenuItems?.length === 0)) {
        return <a className={`px-4 py-2 inline-block ${className}`} href={href}>{text}</a>
    }

    // 显示下拉菜单
    const showDropdown = () => {
        setIsShown(true);
    };

    // 隐藏下拉菜单
    const hideDropdown = () => {
        setIsShown(false);
    };

    return (
        <div className="relative" onMouseEnter={showDropdown} onMouseLeave={hideDropdown}>
            <div className={`px-4 py-2 ${className}`}>
                {text}
            </div>
            {subMenuItems && (
                <ul style={{ opacity: isShown ? 1 : 0 }} className={`absolute pt-2 w-48 bg-white shadow-md rounded z-50 ${subMenuGropuClassName}`}>
                    {
                        subMenuItems.map?.(subMenuItem => {
                            return <li key={subMenuItem.text} className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${subMenuItemClassName}`}>
                                <a href={subMenuItem.href}>{subMenuItem.text}</a>
                            </li>
                        })
                    }
                </ul>
            )}
        </div>
    );
};

export interface IMenuProps {
    className?: string;
    menuItems: IMenuItem[];
}
export const Menu: FC<IMenuProps> = (props) => {
    const { className = '', menuItems } = props;
    return <ul className={`hidden lg:flex items-center gap-1 flex-1 justify-end mr-4${className}`}>
        {
            menuItems.map((menuItem: IMenuItem, index: number) => {
                return <li className="whitespace-nowrap h-full" key={menuItem.text}>
                    <DropdownMenu className="hover:text-blue-600" key={menuItem.text} text={menuItem.text} href={menuItem.href} subMenuItems={menuItem.children}></DropdownMenu>
                </li>
            })
        }
    </ul>
}

export const MobileMenu: FC<IMenuProps> = (props) => {
    const { className, menuItems } = props;
    // 状态用于控制 details 的开关状态
    const [isTeamsOpen, setTeamsOpen] = useState(false);
    const [isAccountOpen, setAccountOpen] = useState(false);

    return (
        <ul className={`flex flex-col lg:hidden ${className}`}>
            {
                menuItems.map(menuItem => {
                    return <li className="mx-6 border-gray-200 border-t">
                        <a className="block px-2 py-4 text-base" href={menuItem.href}>
                            {menuItem.text}
                        </a>
                    </li>
                })
            }
        </ul>
    );
}