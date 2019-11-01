import React, {Component} from 'react'
import '../assets/css/style.min.css';
import '../assets/css/selectric.css';
class Header extends Component {
    render () {
      return (
        <div>
           <header className="header">
                <div className="header__burger-btn">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <a href="/" className="header__logo-mob">
                    <img src={require("../assets/images/appmakerz.svg")} alt="logo"/>
                </a>
                <div className="header__controls">
                    <input type="text" className="header__search" placeholder="Search"/>
                    <div className="header__buttons">
                        <button className="header__btn">
                            <img src={require("../assets/images/icon-settings.svg")} alt="Settings"/>
                            <span>Settings</span>
                        </button>
                        <button className="header__btn">
                            <img src={require("../assets/images/icon-letter.svg")} alt="Messages"/>
                            <span>Messages</span>
                        </button>
                        <button className="header__btn">
                            <img src={require("../assets/images/icon-bell.svg")} alt="Notifications"/>
                            <span>Notifications</span>
                        </button>
                    </div>
                </div>
                <div className="header__user">
                    <span className="header__user-name">
                        Johan Boerema
                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.37087 5.37085L9.8464 0.89532C10.0512 0.690497 10.0512 0.358422 9.8464 0.153599C9.64158 -0.0511995 9.3095 -0.0511995 9.10468 0.153599L5 4.25828L0.895344 0.153598C0.690521 -0.0511999 0.358447 -0.0511999 0.153624 0.153598C0.0511999 0.255997 -1.70582e-08 0.390247 -2.29254e-08 0.524471C-2.87925e-08 0.658696 0.0511999 0.792945 0.153624 0.895344L4.62915 5.37088C4.83398 5.57568 5.16605 5.57568 5.37087 5.37085Z"
            fill="#2DAFE5"/>
    </svg>
                    </span>
                    <img src={require("../assets/images/avatar.jpg")} alt="User avatar" className="header__user-img"/>
                </div>
            </header>
        </div>
      )
    };
  }
  export default Header;
