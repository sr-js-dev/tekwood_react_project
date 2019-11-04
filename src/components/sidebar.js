import React, {Component} from 'react'
import '../assets/css/style.min.css';
import '../assets/css/selectric.css';
import  { Link } from 'react-router-dom'
class Sidebar extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }
      
    render () {
      return (
        <div>
            <aside className="sidebar">
                <a href="/" className="sidebar__logo"><img src='https://www.tekwoods.nl/wordpress/wp-content/uploads/Logo_TW_RGB-1-300x100.png' alt="appzmakerz"></img></a>
                <nav className="menu">
                    <ul className="menu__list">
                        <li id="0" className="menu__item">
                            <Link to="./dashboard" className={window.location.pathname === "/dashboard" ? 'menu__link menu__link--active' : 'menu__link menu__link'}>
                                <span className="menu__link-img-wrap">
                                    <img src={require("../assets/images/icon-dashboard.svg")} alt="Dashboard"/>
                                </span>
                                <span>Dashboard</span>
                            </Link>
                        </li>
                        <li className="menu__separator"></li>
                        <li id="1" className="menu__item">
                            <Link to={'/user'} className={window.location.pathname === "/user" || window.location.pathname === "/product-detail" ? 'menu__link menu__link--active' : 'menu__link menu__link'}>
                                <span className="menu__link-img-wrap">
                                    <img src={require("../assets/images/icon-orders.svg")} alt="User"/>
                                </span>
                                <span>Users</span>
                            </Link>
                        </li>
                        <li id="2" className="menu__item">
                            <Link to={'/setting'} className={window.location.pathname === "/setting" || window.location.pathname === "/sales-order-detail" ? 'menu__link menu__link--active' : 'menu__link menu__link'} >
                                <span className="menu__link-img-wrap">
                                    <img src={require("../assets/images/icon-orders.svg")} alt="Orders"/>
                                </span>
                                <span>Settings</span>
                            </Link>
                        </li>
                        {/* <li id="3" className="menu__item">
                            <Link to={'/purchase-order'} className={window.location.pathname === "/purchase-order" || window.location.pathname === "/purchase-order-detail" ? 'menu__link menu__link--active' : 'menu__link menu__link'} >
                                <span className="menu__link-img-wrap">
                                    <img src={require("../assets/images/icon-orders.svg")} alt="Orders"/>
                                </span>
                                <span>Purchase Order</span>
                            </Link>
                        </li> */}
                    </ul>
                </nav>
            </aside>
        </div>
      )
    };
  }
  export default Sidebar;
