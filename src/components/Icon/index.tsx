import React from 'react';
import deleteSrc from './assets/delete.svg';
import edit from './assets/edit.svg';
import menu from './assets/menu.svg';
import more from './assets/more.svg';
import share from './assets/share.svg';

import './index.css';

export type Type = 'delete' | 'edit' | 'menu' | 'more' | 'share';

export type IconProps = {
    type: Type;
    alt?: string;
    className?: string;
    width?: number;
    height?: number;
};

const mapper: {[key in Type]: string} = {
    delete: deleteSrc,
    edit,
    menu,
    more,
    share,
};

const Icon = ({alt = '', type, width, height, className = ''}: IconProps) => {
    return <img className={"Icon " + className} src={mapper[type]} alt={alt} width={width} height={height} />
};

export default Icon;
