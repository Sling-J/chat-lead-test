import React from 'react';
import style from './header.module.sass';
import Logo from '../../images/chatlead.png';
import {Link} from 'react-router-dom';
import Menu from '../../images/menu.png';

const Header = (props) => {

    return (
        <div className={style.mainContainer}>
            <img src={Logo} alt={'logo'} />
            <Link to={'/bots'} className={style.link}>Боты</Link>
            <img src={Menu} alt={'menu'} />
        </div>
    )
};

export default Header;