import React, {Component} from 'react'
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import Sidebar from '../components/sidebar'
import Header from '../components/header'
import { Switch,Router, Route } from 'react-router-dom';
import User from '../pages/User/user_register'
import Settings from '../pages/Settings/setting'
import Dashboard from '../pages/Dashboard/dashboard'
import history from '../history';
import 'bootstrap/dist/css/bootstrap.min.css';
class Layout extends Component {
  
    render () {
      return (
          <Row>
            <Col sm={2}><Sidebar/></Col>
            <Col sm={10}>
            <Header/>
                <Router history={history}>
                  <Switch>
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/user" component={User} />
                    <Route path="/setting" component={Settings} />
                  </Switch>
                </Router>
            </Col>
          </Row>
      )
    };
  }
  export default Layout;
