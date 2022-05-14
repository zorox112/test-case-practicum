import {useEffect, RefObject, useRef, useCallback} from 'react';

// Было запрещено использовать сторонние библиотеки,
// потому хотел добавить немного декларативности в код компонента,
// хуки написаны под компонент, потому файл создал здесь, а не в корне проекта

type UseEventListenerParams = {
    handler: (e: Event) => void;
    action: keyof HTMLElementEventMap;
    element?: RefObject<HTMLElement>;
    conditionActive?: boolean;
};

export const useEventListener = ({handler, action, element, conditionActive}: UseEventListenerParams) => {
    const savedHandler = useRef(handler);

    useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);

    useEffect(() => {
        const currentElement: HTMLElement | Window = element?.current || window;
        const currentAction = action;
        if (!currentElement) {
            return
        }
        const eventListener: typeof handler = event => savedHandler.current(event);

        const isNeedAddEventListener = conditionActive ?? true;

        if (isNeedAddEventListener) {
            currentElement.addEventListener(currentAction, eventListener);
        }

        return () => currentElement.removeEventListener(currentAction, eventListener);
    }, [element, action, conditionActive]);
};

type OnClickOutsideHandler = (event: Event) => void;

export const useOnClickOutside = <T extends HTMLElement>(container: RefObject<T>, handler: OnClickOutsideHandler) => {

    const onClickOutside = useCallback((e: Event) => {
        if (container.current && !container.current.contains(e.target as Node)) {
            handler(e);
        }
    }, [handler, container]);

    useEventListener({
        handler: onClickOutside,
        action: 'click',
    })
};


type HandlerIntersectionObserver = (intersectionObserverEntry: IntersectionObserverEntry) => void;

export const useIntersectionObserver = <T extends HTMLElement>(trigger: RefObject<T>, handler: HandlerIntersectionObserver) => {
    const savedHandler = useRef(handler);

    useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            savedHandler.current(entry);
        })
        if (trigger.current) {
            observer.observe(trigger.current);
        }

        return () => observer.disconnect();
    }, [trigger]);
};
