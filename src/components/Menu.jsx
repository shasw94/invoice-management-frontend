import React from 'react';
import { slide as MenuO } from 'react-burger-menu';

const Menu = () => {
    return (
        <MenuO>
            <a id="home" className="menu-item" href="/">Home</a>
            <a id="orders" className="menu-item" href="/orders">View Orders</a>
        </MenuO>
    )
}

export default Menu
