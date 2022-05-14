import React, {useState, useLayoutEffect, useRef, useCallback, ReactNode} from 'react';

import Icon from '../Icon';

import {OrientationX, OrientationY, MenuItem} from './types';
import {calcOrientation} from './utils';
import {useOnClickOutside, useIntersectionObserver, useEventListener} from './hooks';

import './index.css';

type DropdownProps = {
    children: ReactNode;
    menuItems: MenuItem[];
    classNames?: {
        root?: string;
        trigger?: string;
        menu?: string;
    };
};

const useEnhance = () => {

    const [isOpen, setOpen] = useState(false);
    const [isIntersecting, setIntersecting] = useState(true);
    const [orientationY, setOrientationY] = useState<OrientationY>('top');
    const [orientationX, setOrientationX] = useState<OrientationX>('left');
    const refDropdown = useRef<HTMLDivElement | null>(null);
    const refMenu = useRef<HTMLDivElement | null>(null);
    const refTrigger = useRef<HTMLButtonElement | null>(null);

    const updatePosition = useCallback(() => {
        if (isOpen && refMenu.current && refTrigger.current) {
            const {x, y} = calcOrientation({refMenu: refMenu.current, refTrigger: refTrigger.current});
            if (x) {
                setOrientationX(x);
            }
            if (y) {
                setOrientationY(y);
            }
        }
    }, [isOpen, setOrientationX, setOrientationY, refMenu, refTrigger]);
    const toggleOpen = useCallback(() => setOpen(open => !open), [setOpen]);
    const close = useCallback(() => setOpen(false), [setOpen]);

    useOnClickOutside(refDropdown, close);
    useIntersectionObserver(refTrigger, entry => setIntersecting(entry.isIntersecting));

    // Нет необхомости следить за updatePosition в useLayoutEffect,
    // тк ссылка всегда будет актуальная
    // eslint-disable-next-line
    useLayoutEffect(updatePosition, [isOpen]);
    useEventListener({
        handler: updatePosition,
        action: 'scroll',
        conditionActive: isOpen,
    });

    return {
        refDropdown,
        refTrigger,
        refMenu,
        orientationY,
        orientationX,
        toggleOpen,
        close,
        isOpenMenu: isOpen && isIntersecting
    };
};

const Dropdown = ({children, menuItems, classNames = {}}: DropdownProps) => {
    const {
        root = '',
        trigger = '',
        menu = '',
    } = classNames;

    const {refDropdown, refTrigger, refMenu, orientationY, orientationX, isOpenMenu, toggleOpen, close} = useEnhance();

    return <div className={`Dropdown ${root}`} ref={refDropdown}>
        <button className={`Dropdown__trigger ${trigger}`} onClick={toggleOpen} ref={refTrigger}>{children}</button>
        {isOpenMenu && <div
            ref={refMenu}
            className={`Dropdown__Menu Dropdown__Menu_OrientationY_${orientationY} Dropdown__Menu_OrientationX_${orientationX} ${menu}`}
        >
            {menuItems.map((menuItem: MenuItem, index: number) => {
                return <button
                    className="Dropdown__button"
                    onClick={() => {
                        menuItem.action();
                        close();
                    }}
                    key={menuItem.id ?? index}
                >
                    <span className="Dropdown__Text">{menuItem.title}</span>
                    <Icon width={20} height={20} className="Dropdown__Icon" type={menuItem.icon}/>
                </button>
            })}
        </div>}
    </div>
};

export default Dropdown;
