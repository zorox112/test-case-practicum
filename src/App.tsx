import React from 'react';

import Dropdown from './components/Dropdown';
import {MenuItem} from './components/Dropdown/types';
import Icon from './components/Icon';

import './App.css';

const menuItems: MenuItem[] = [
    {
        title: 'Поделиться в социальных сетях социальных сетях', icon: 'share', action: () => {
            console.log('Жмяк 1');
        }, id: 'share'
    },
    {
        title: 'Редактировать страницу', icon: 'edit', action: () => {
            console.log('Жмяк 2');
        }, id: 'edit'
    },
    {
        title: 'Удалить страницу', icon: 'delete', action: () => {
            console.log('Жмяк 3');
        }, id: 'delete'
    },
];

const menuItems2: MenuItem[] = [
    {
        title: 'Поделиться в социальных сетях', icon: 'share', action: () => {
            console.log('Жмяк 4');
        }, id: 'share'
    },
];

const App = () => {
    return (
        <div className="App">
            <div className="App__Title">
                Проскроль в центр блока <br/>
                Я сделал так, чтобы показать, <br/>
                как работает компонет со скроллом
            </div>
            <Dropdown menuItems={menuItems}>
                <Icon type="menu" width={40} height={40}/>
            </Dropdown>
            <Dropdown menuItems={menuItems2}>
                <Icon type="more"/>
            </Dropdown>
        </div>
    );
};

export default App;
