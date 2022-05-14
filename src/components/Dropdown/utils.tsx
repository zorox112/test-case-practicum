import {OrientationX, OrientationY} from './types';

type CalcOrientationParams = {
    refTrigger: HTMLButtonElement;
    refMenu: HTMLDivElement;
};

type CalcOrientationRes = {
    x: OrientationX | null;
    y: OrientationY | null;
};

export const calcOrientation = ({refTrigger, refMenu}: CalcOrientationParams): CalcOrientationRes => {
    const {
        clientWidth: windowClientWidth,
        clientHeight: windowClientHeight,
    } = document.documentElement;
    const {
        clientWidth: triggerClientWidth,
        clientHeight: triggerClientHeight,
    } = refTrigger;
    const {
        clientWidth: menuClientWidth,
        clientHeight: menuClientHeight,
    } = refMenu;


    const {
        x: triggerClientX,
        y: triggerClientY,
    } = refTrigger.getBoundingClientRect();
    
    let y: OrientationY | null = null;
    let x: OrientationX | null = null;

    if (triggerClientY + triggerClientHeight + menuClientHeight <= windowClientHeight) {
        y = 'bottom';
    } else if (triggerClientY - menuClientHeight >= 0) {
        y = 'top';
    } else {
        y = null;
    }

    if (triggerClientX + menuClientWidth <= windowClientWidth) {
        x = 'right';
    } else if (triggerClientX + triggerClientWidth - menuClientWidth >= 0) {
        x = 'left';
    } else {
        x = null;
    }

    return {x, y};
}
