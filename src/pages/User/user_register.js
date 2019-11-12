import React, {Component} from 'react'
import { Form,Row } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import Adduserform from './adduserform';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import $ from 'jquery';
import SessionManager from '../../components/session_manage';
import API from '../../components/api'
import Axios from 'axios';
import { BallBeat } from 'react-pure-loaders';
import { getUserToken } from '../../components/auth';
import { trls } from '../../components/translate';
const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
    
});
class Product extends Component {
    _isMounted = false
    constructor(props) {
        super(props);
        this.state = {  
            userData:[],
            flag:'',
            userUpdateData:[],
            loading:true
        };
      }
    componentDidMount() {
        this._isMounted=true
        this.getUserData()
    }
    componentWillUnmount() {
        this._isMounted = false
    }
    getUserData () {
        var headers = SessionManager.shared().getAuthorizationHeader();
        Axios.get(API.GetUserData, headers)
        .then(result => {
            if(this._isMounted){
                this.setState({userData:result.data.data})
                this.setState({loading:false})
            }
                
        });
    }
    userUpdate = (event) => {
        let userID=event.currentTarget.id;
        var settings = {
            "url": API.GetUserDataById+event.currentTarget.id,
            "method": "GET",
            "headers": {
                "Content-Type": "application/json",
                "Authorization": "Bearer "+getUserToken(),
        }
        }
        $.ajax(settings).done(function (response) {
        })
        .then(response => {
            this.setState({userUpdateData: response})
            this.setState({modalShow:true, mode:"update",userID:userID, flag:true})
        });
    }
    viewUserData = (event) => {
        var settings = {
            "url": API.GetUserDataById+event.currentTarget.id,
            "method": "GET",
            "headers": {
                "Content-Type": "application/json",
                "Authorization": "Bearer "+getUserToken(),
        }
        }
        $.ajax(settings).done(function (response) {
        })
        .then(response => {
            this.setState({userUpdateData: response})
            this.setState({modalShow:true, mode:"view", flag:true})
        });
    }
    userDelete = (event) => {
        var settings = {
            "url": API.DeactivateUser+this.state.userId,
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
                "Authorization": "Bearer "+getUserToken(),
        }
        }
        $.ajax(settings).done(function (response) {
        })
        .then(response => {
            this.getUserData();
        });
    }
    userDeleteConfirm = (event) => {
        this.setState({userId:event.currentTarget.id})
        confirmAlert({
            title: trls("Confirm"),
            message: trls("Are_you_sure"),
            buttons: [
              {
                label: trls("Delete"),
                onClick: () => {
                   this.userDelete()
                }
              },
              {
                label: trls("Cancel"),
                onClick: () => {}
              }
            ]
          });
    }
    render () {
        let userData=this.state.userData;
        return (
            <div className="order_div">
                <div className="content__header content__header--with-line">
                    <h2 className="title">{trls('Users')}</h2>
                </div>
                <div className="orders">
                    <div className="orders__filters justify-content-between">
                        <Form inline style={{width:"100%"}}>
                            <Button variant="primary" onClick={()=>this.setState({modalShow:true, mode:"add", flag:false})}>{trls('Add_User')}</Button> 
                            <Adduserform
                                show={this.state.modalShow}
                                mode={this.state.mode}
                                onHide={() => this.setState({modalShow: false})}
                                onGetUser={() => this.getUserData()}
                                userUpdateData={this.state.userUpdateData}
                                userID={this.state.userID}
                            />  
                        </Form>
                    </div>
                    <div className="table-responsive credit-history">
                        <table className="place-and-orders__table table table--striped prurprice-dataTable"  >
                            <thead>
                            <tr>
                                <th>{trls('FirstName')}</th>
                                <th>{trls('LastName')}</th>
                                <th>{trls('Email')}</th>
                                <th>{trls('Active')}</th>
                                <th>{trls('State')}</th>
                            </tr>
                            </thead>
                            {userData &&(<tbody >
                                {
                                    userData.map((data,i) =>(
                                    <tr id={i} key={i}>
                                        <td>{data.firstName}</td>
                                        <td>{data.lastName}</td>
                                        <td>{data.email}</td>
                                        <td><Form.Check inline name="Intrastat" type="checkbox" disabled defaultChecked={data.isActive} id="Intrastat" /></td>
                                        <td >
                                            <Row style={{width:"10px"}}>
                                                <div>
                                                <img src={require("../../assets/images/icon-cancelled.svg")}id={data.id} className="statu-item" alt="cancelled" onClick={this.userDeleteConfirm}/>
                                                </div>
                                                <img src={require("../../assets/images/icon-draft.svg")} id={data.id} className="statu-item" onClick={this.userUpdate} alt="Draft"/>
                                                <img src={require("../../assets/images/icon-open-box.svg")} id={data.id} className="statu-item" onClick={this.viewUserData} alt="Draft"/>
                                            </Row>
                                        </td>
                                    </tr>
                                ))
                                }
                            </tbody>)}
                        </table>
                        <div className="col-md-4 offset-md-4 col-xs-12 loading" style={{textAlign:"center"}}>
                            <BallBeat
                                color={'#222A42'}
                                loading={this.state.loading}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
        };
  }
    
  export default connect(mapStateToProps, mapDispatchToProps)(Product);
