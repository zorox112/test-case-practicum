import React from 'react';

import Dropdown from './components/Dropdown';
import {MenuItem} from './components/Dropdown/types';
import Icon from './components/Icon';

import './App.css';

const menuItems: MenuItem[] = [
  {title: 'Поделиться в социальных сетях социальных сетях', icon: 'share', action: () => {}, id: 'share'},
  {title: 'Редактировать страницу', icon: 'edit', action: () => {}, id: 'edit'},
  {title: 'Удалить страницу', icon: 'delete', action: () => {}, id: 'delete'},
];

const menuItems2: MenuItem[] = [
    {title: 'Поделиться в социальных сетях', icon: 'share', action: () => {}, id: 'share'},
];

const App = () => {
  return (
      <div className="App">
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
