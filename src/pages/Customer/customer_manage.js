import React, {Component} from 'react'
import { Form,Row } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import Addcustomerform from './addcustomer_form';
import Updatecustomerform from './updatecustomer_form';
import Viewcustomerform from './viewcustomer_form';
import $ from 'jquery';
import SessionManager from '../../components/session_manage';
import API from '../../components/api'
import Axios from 'axios';
import { BallBeat } from 'react-pure-loaders';
import { getUserToken } from '../../components/auth';
import * as authAction  from '../../actions/authAction';
import { trls } from '../../components/translate';
import Sweetalert from 'sweetalert'

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
    authLoginAs: (params) =>
              dispatch(authAction.fetchLoginAsData(params)),
});
class Customermanage extends Component {
    _isMounted = false
    constructor(props) {
        super(props);
        this.state = {  
            customerData:[],
            updateCustomerData:[],
            viewCustomerData: [],
            loading:true
        };
    }

    componentDidMount() {
        this._isMounted=true
        this.getCustomerData()
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    getCustomerData () {
        var headers = SessionManager.shared().getAuthorizationHeader();
        Axios.get(API.GetCustomerData+"?excludeInactiveCustomer=true&pageNumber=1&pageSize=10", headers)
        .then(result => {
            Axios.get(API.GetCustomerData+"?excludeInactiveCustomer=true&pageNumber=1&pageSize="+result.data.totalCount, headers)
            .then(result => {
                if(this._isMounted){
                    this.setState({customerData:result.data.data})
                    this.setState({loading:false})
                }
            });
        });
    }

    userUpdate = (value) => {
        this.setState({updateCustomerData: value})
        this.setState({modalupdateShow: true})
    }

    viewUserData = (value) => {
        this.setState({viewCustomerData: value})
        this.setState({modalviewShow: true})
    }

    userDelete = () => {
        var settings = {
            "url": API.DeactivateCustomer+this.state.userId,
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
                "Authorization": "Bearer "+getUserToken(),
        }
        }
        $.ajax(settings).done(function (response) {
        })
        .then(response => {
            Sweetalert("Success!"+trls('The_ustomer_has_been_deleted'), {
                icon: "success",
            });
            this.getCustomerData();
        });
    }

    userDeleteConfirm = (event) => {
        this.setState({userId:event.currentTarget.id})
        Sweetalert({
            title: "Are you sure?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                this.userDelete();
                
            } else {
                
            }
          });
    }
    render () {
        let customerData=this.state.customerData;
        return (
            <div className="order_div">
                <div className="content__header content__header--with-line">
                    <h2 className="title">{trls('Customer')}</h2>
                </div>
                <div className="orders">
                    <div className="orders__filters justify-content-between">
                        <Form inline style={{width:"100%"}}>
                            <Button variant="primary" onClick={()=>this.setState({modaladdShow:true})}><i className="fas fa-plus" style={{paddingRight:5}}/>{trls('Add_Customer')}</Button> 
                            <Addcustomerform
                                show={this.state.modaladdShow}
                                onHide={() => this.setState({modaladdShow: false})}
                                onGetCustomerData={() => this.getCustomerData()}
                            />  
                            <Updatecustomerform
                                show={this.state.modalupdateShow}
                                onHide={() => this.setState({modalupdateShow: false})}
                                updateCustomerData={this.state.updateCustomerData}
                                onGetCustomerData={() => this.getCustomerData()}
                            /> 
                            <Viewcustomerform
                                show={this.state.modalviewShow}
                                onHide={() => this.setState({modalviewShow: false})}
                                viewCustomerData={this.state.viewCustomerData}
                            />
                        </Form>
                    </div>
                    <div className="table-responsive credit-history">
                        <table className="place-and-orders__table table table--striped prurprice-dataTable"  >
                            <thead>
                            <tr>
                                <th>{trls('CustomerName')}</th>
                                <th>{trls('Address')}</th>
                                <th>{trls('ZipCode')}</th>
                                <th>{trls('City')}</th>
                                <th>{trls('Country')}</th>
                                <th>{trls('AvailableCredits')}</th>
                                <th>{trls('Active')}</th>
                                <th>{trls('Action')}</th>
                            </tr>
                            </thead>
                            {customerData &&(<tbody >
                                {
                                    customerData.map((data,i) =>(
                                    <tr id={i} key={i}>
                                        <td>{data.name}</td>
                                        <td>{data.address}</td>
                                        <td>{data.zipCode}</td>
                                        <td>{data.city}</td>
                                        <td>{data.country}</td>
                                        <td>{data.availableCredits}</td>
                                        {data.isActive?(
                                            <td style={{display: "flex"}}>
                                                <i className="fas fa-circle active-icon"></i><div>Active</div>
                                            </td>
                                            ):
                                            <td style={{display: "flex"}}>
                                                <i className="fas fa-circle inactive-icon"></i><div>Inactive</div>
                                            </td>
                                        }
                                        <td >
                                            <Row style={{justifyContent:"center"}}>
                                                <i id={data.id} className="fas fa-trash-alt statu-item" onClick={this.userDeleteConfirm}></i>
                                                <i id={data.id} className="fas fa-edit statu-item" onClick={()=>this.userUpdate(data)}></i>
                                                <i id={data.id} className="fas fa-eye statu-item" onClick={()=>this.viewUserData(data)}></i>
                                            </Row>
                                        </td>
                                    </tr>
                                ))
                                }
                            </tbody>)}
                        </table>
                        {this.state.loading&&(
                            <div className="col-md-4 offset-md-4 col-xs-12 loading" style={{textAlign:"center"}}>
                                <BallBeat
                                    color={'#222A42'}
                                    loading={this.state.loading}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
        };
  }
    
  export default connect(mapStateToProps, mapDispatchToProps)(Customermanage);
