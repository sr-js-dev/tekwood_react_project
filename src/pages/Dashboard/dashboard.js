import React, {Component} from 'react'
import { connect } from 'react-redux';
import SessionManager from '../../components/session_manage';
import API from '../../components/api'
import Buycreditform from './buycredit_form'
import Getfileform from './getfile_form'
import Axios from 'axios';
import * as Auth   from '../../components/auth';
import { trls } from '../../components/translate';
const mapStateToProps = state => ({ 
    ...state.auth,
});

const mapDispatchToProps = (dispatch) => ({
});
class Dashboard extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {  
            userCredits:'',
            credithistory: []
        };
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    componentDidMount() {
        this.getCreditsByuserId()
        this.getCreditsHistory()
    }
    getCreditsByuserId = () => {
        var headers = SessionManager.shared().getAuthorizationHeader();
        Axios.get(API.GetUserDataById+Auth.getUserId(), headers)
        .then(result => {
            this.setState({userCredits:result.data.availableCredits})
        });
    }
    getCreditsHistory = () => {
        var headers = SessionManager.shared().getAuthorizationHeader();
        Axios.get(API.GetCreditsHistory, headers)
        .then(result => {
            this.setState({credithistory:result.data.data})
            console.log('111', this.state.credithistory)
        });
    }
    formatDate = (startdate) =>{
        var dd = new Date(startdate).getDate();
        var mm = new Date(startdate).getMonth()+1; 
        var yyyy = new Date(startdate).getFullYear();
        var formatDate = '';
        if(dd<10) 
        {
            dd='0'+dd;
        } 

        if(mm<10) 
        {
            mm='0'+mm;
        } 
        formatDate = dd+'-'+mm+'-'+yyyy;
        return formatDate;
    }
    render(){   
        return (
            <div>
                <div className="content__header content__header--with-line">
                    <h2 className="title">{trls('Dashboard')}</h2>
                </div>
                <div className="dashboard__top dashboard_">
                    <div className="dashboard__top-long-wrap">
                        <div className="dashboard__top-long">
                            <div>
                                <h6 className="dashboard__top-long-title">{trls('Buy_Credits')}</h6>
                            </div>
                            <div className="dashboard__top-long-img">
                                <img src={require("../../assets/images/icon-payment-white.svg")} style={{cursor: "pointer"}} alt="payment" onClick={()=>this.setState({modalShow:true})}/>
                            </div>
                        </div>
                        <div className="dashboard__top-long">
                            <div>
                                <h6 className="dashboard__top-long-title">{trls('Get_File')}</h6>
                            </div>
                            <div className="dashboard__top-long-img">
                                <img src={require("../../assets/images/icon-cart-white.svg")} style={{cursor: "pointer"}} alt="cart" onClick={()=>this.setState({modalShowFile:true})}/>
                            </div>
                        </div>
                    </div>
                    <div className="dashboard__top-small-wrap">
                        <div className="dashboard__top-small">
                            <div className="dashboard__top-small-header">
                                <img src={require("../../assets/images/icon-exclamation.svg")} alt="exclamation"/>
                                <span>{trls('Available_Credits')}</span>
                            </div>
                            <div className="dashboard__top-small-value">{trls('Credits')}: {this.state.userCredits} </div>
                        </div>
                    </div>
                </div>
                <h6 style={{fontWeight:"bold"}}>{trls('Credit_History')}</h6>
                <div className="table-responsive credit-history">
                    <table className="place-and-orders__table table table--striped prurprice-dataTable">
                        <thead>
                        <tr>
                            <th>{trls('CreatedDate')}</th>
                            <th>{trls('Creditsreductedoradded')}</th>
                            <th>{trls('Download_Link')}</th>
                            <th>{trls('View_Link')}</th>
                        </tr>
                        </thead>
                            {this.state.credithistory &&(<tbody >
                                {
                                    this.state.credithistory.map((data,i) =>(
                                    <tr id={i} key={i}>
                                        <td>{this.formatDate(data.createdDate)}</td>
                                        <td>{data.creditReductedOrAdded}</td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                ))
                                }
                            </tbody>)}
                    </table>
                </div>   
                <Buycreditform
                    show={this.state.modalShow}
                    onHide={() => this.setState({modalShow: false})}
                />
                <Getfileform
                    show={this.state.modalShowFile}
                    onHide={() => this.setState({modalShowFile: false})}
                    onGetCradit={this.getCreditsByuserId}
                />
            </div>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);