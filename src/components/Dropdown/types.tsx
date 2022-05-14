import {ReactNode} from 'react';
import {Type} from '../Icon';

export type OrientationY = 'top' | 'bottom';
export type OrientationX = 'right' | 'left';
export type MenuItem = {
    // Уникальный идентификатор пункта меню
    id?: string;
    // Текст пункта меню
    title: ReactNode;
    // Иконка для пункта меню
    icon: Type;
    // Функция, которая будет запущена при клике на элемент меню
    action: () => void;
};