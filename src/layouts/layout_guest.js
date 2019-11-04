import React, {Component} from 'react'
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import Sidebar from '../components/sidebar'
import Header from '../components/header'
import { Route, Switch,Router } from 'react-router-dom';
import User from '../pages/User/user_register'
import Settings from '../pages/Settings/setting'
import history from '../history';
import 'bootstrap/dist/css/bootstrap.min.css';
window.localStorage.setItem('AWT', true);
class Layout extends Component {
  
    render () {
      return (
          <Row>
            <Col sm={2}><Sidebar/></Col>
            <Col sm={10}>
            <Header/>
                <Router history={history}>
                  <Switch>
                  <Route path="/user" component={User} />
                  <Route path="/setting" component={Settings} />
                  {/* <Route path="/sales-order" component={Salesorder} /> */}
                  {/* <Route path="/sales-order-detail" component={Salesorderdetail} /> */}
                  {/* <Route path="/purchase-order" component={Purchaseorder} /> */}
                  {/* <Route path="/purchase-order-detail" component={Purchaseorderdetail} /> */}
                  />
                  </Switch>
                </Router>
            </Col>
          </Row>
      )
    };
  }
  export default Layout;
