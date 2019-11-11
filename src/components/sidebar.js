import React, {Component} from 'react'
import '../assets/css/style.min.css';
import '../assets/css/selectric.css';
import * as Auth from './auth';
import  { Link } from 'react-router-dom'
import { trls } from './translate';
import { connect } from 'react-redux';
const mapStateToProps = state => ({ 
    ...state.auth,
});

const mapDispatchToProps = (dispatch) => ({

});

class Sidebar extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }
    changeItem = () => {
        this.setState({flag:1})
    }
    render () {
      let role = Auth.getUserRole();
      return (
        <div>
            <aside className="sidebar">
                <a href="/" className="sidebar__logo"><img src='https://www.tekwoods.nl/wordpress/wp-content/uploads/Logo_TW_RGB-1-300x100.png' alt="appzmakerz"></img></a>
                <nav className="menu">
                    <ul className="menu__list">
                        <li id="0" className="menu__item" onClick={this.changeItem}>
                            <Link to="./dashboard" className={window.location.pathname === "/dashboard" ? 'menu__link menu__link--active' : 'menu__link menu__link'}>
                                <span className="menu__link-img-wrap">
                                    <img src={require("../assets/images/icon-dashboard.svg")} alt="Dashboard"/>
                                </span>
                                <span>{trls('Dashboard')}</span>
                            </Link>
                        </li>
                        <li className="menu__separator"></li>
                        { role === "Administrator" ? (
                            <div>
                                <li id="1" className="menu__item" onClick={this.changeItem}>
                                    <Link to={'/user'} className={window.location.pathname === "/user" || window.location.pathname === "/product-detail" ? 'menu__link menu__link--active' : 'menu__link menu__link'}>
                                        <span className="menu__link-img-wrap">
                                            <img src={require("../assets/images/icon-orders.svg")} alt="User"/>
                                        </span>
                                        <span>{trls('Users')}</span>
                                    </Link>
                                </li>
                                <li id="2" className="menu__item" onClick={this.changeItem}>
                                    <Link to={'/setting'} className={window.location.pathname === "/setting" || window.location.pathname === "/sales-order-detail" ? 'menu__link menu__link--active' : 'menu__link menu__link'} >
                                        <span className="menu__link-img-wrap">
                                            <img src={require("../assets/images/icon-orders.svg")} alt="Orders"/>
                                        </span>
                                        <span>{trls('Settings')}</span>
                                    </Link>
                                </li>
                            </div>
                        ) : <div/>
                        }
                    </ul>
                </nav>
            </aside>
        </div>
      )
    };
  }
  export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
