import React, {Component} from 'react'
import { connect } from 'react-redux';
import SessionManager from '../../components/session_manage';
import API from '../../components/api'
import Buycreditform from './buycredit_form'
import Getfileform from './getfile_form'
import Axios from 'axios';
import * as Auth   from '../../components/auth';
import { trls } from '../../components/translate';
import queryString from 'query-string'
import { BallBeat } from 'react-pure-loaders';
import { Container, Row, Col } from 'react-bootstrap';
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
            credithistory: [],
            loading:true,
            userInfor: '',
            customerData: []
        };
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    componentDidMount() {
        let search = window.location.search;
        let query = queryString.parse(search);
        this.setState({paymentmessage:query.status })
        this.getCreditsByuserId()
        this.getCreditsHistory()
    }
    getCreditsByuserId = () => {
        var headers = SessionManager.shared().getAuthorizationHeader();
        Axios.get(API.GetUserDataById+Auth.getUserId(), headers)
        .then(result => {
            this.setState({userCredits:result.data.customer.availableCredits})
            this.setState({userInfor: result.data.firstName+' '+result.data.lastName})
            this.setState({customerData: result.data.customer})

        });
        this.getCreditsHistory();
    }
    getCreditsHistory = () => {
        var headers = SessionManager.shared().getAuthorizationHeader();
        Axios.get(API.GetCreditsHistory, headers)
        .then(result => {
            this.getHistoryData(result.data.data);
        });
    }
    getHistoryData = (value) =>{
        let tempe = value;
        let historyData = [];
        let filedetail = [];
        tempe.map((data, index) => {
            filedetail = data.hundeggerFileDetails;
            filedetail.map((datafile, index) => {
                if(datafile.key==="ProjectName"){
                    data.projectname = datafile.value
                }
                if(datafile.key==="OrderNumber"){
                    data.ordernumber = datafile.value
                }
                if(datafile.key==="GroupName"){
                    if(datafile.value==="[unattached]"){
                        data.groupname=''
                    }else{
                        data.groupname = datafile.value
                    }
                }
                if(datafile.key==="AppVersion"){
                    data.appversion = datafile.value
                }
            return datafile;
            })
            historyData.push(data);
        return data;
        })
        this.setState({credithistory:historyData})
        this.setState({loading:false})
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
    downHundeggerFile = (data) => {
        window.location = API.DownLoadFile+data.hundeggerFileReferenceId+"/"+data.transactionType
    }
    render(){   
        let customerData = this.state.customerData;
        return (
            <Container>
                <div className="dashboard-header content__header content__header--with-line">
                    <h2 className="title">{trls('Dashboard')}</h2>
                    { this.state.paymentmessage === "Success" ? (
                        <div className="alert alert-success" style={{marginTop:10}}>
                            <strong>{trls('Success')}</strong> {trls('Success_m')}
                        </div>
                    ) : <div/>
                    }
                    { this.state.paymentmessage === "Expired" ? (
                        <div className="alert alert-success" style={{marginTop:10}}>
                            <strong>{trls('Expired')}</strong> {trls('Expired_m')}
                        </div>
                    ) : <div/>
                    }
                    { this.state.paymentmessage === "Cancelled" ? (
                        <div className="alert alert-success" style={{marginTop:10}}>
                            <strong>{trls('Cancelled')}</strong> {trls('Cancelled_m')}
                        </div>
                    ) : <div/>
                    }
                    { this.state.paymentmessage === "Failure" ? (
                        <div className="alert alert-success" style={{marginTop:10}}>
                            <strong>{trls('Failure')}</strong> {trls('Failure_m')}
                        </div>
                    ) : <div/>
                    }
                </div>
                <Row>
                    <Col sm={4}>
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
                    </Col>
                    <Col sm={4}>
                        <Row className="dashboard__top-small">
                            <div className="dashboard__top-small-header">
                                <img src={require("../../assets/images/icon-exclamation.svg")} alt="exclamation"/>
                                <span>{trls('Available_Credits')}</span>
                            </div>
                            <div className="dashboard__top-small-value">{trls('Credits')}: {this.state.userCredits} </div>
                        </Row>
                    </Col>
                    <Col sm={4}>
                        <Row className="dashboard__top-small company-info-credit">
                            <div className="dashboard__top-small-header company-info-title">
                                <div><span>{trls('Company')}</span></div>
                                <div style={{paddingTop: 7}}>
                                    {customerData.name}<br/>{customerData.address}<br/>{customerData.zipCode} {customerData.city}
                                </div>
                            </div>
                        </Row>
                        <Row className="dashboard__top-small user-info-credit">
                            <div style={{fontWeight: 700, marginTop: "-14px", display:'flex'}}>
                                <span>{trls('User')}: </span><div style={{fontWeight: 100, marginLeft: 10}}>{this.state.userInfor}</div>
                                
                            </div>
                        </Row>
                    </Col>
                </Row>
                <Row style={{padding:15, marginTop:30}}>
                    <h6 style={{fontWeight:"bold"}}>{trls('Credit_History')}</h6>
                    <div className="table-responsive credit-history">
                        <table className="place-and-orders__table table table--striped prurprice-dataTable">
                            <thead>
                            <tr>
                                <th style={{width:"10%"}}></th>
                                <th>{trls('CreateDate')}</th>
                                <th>{trls('Credits')}</th>
                                <th>{trls('OrderNumber')}</th>
                                <th>{trls('ProjectName')}</th>
                                <th>{trls('GroupName')}</th>
                                <th>{trls('AppVersion')}</th>
                                <th>{trls('Type_data_file')}</th>
                                <th>{trls('Download_Link')}</th>
                            </tr>
                            </thead>
                                {this.state.credithistory &&(<tbody >
                                    {
                                        this.state.credithistory.map((data,i) =>(
                                        <tr id={i} key={i}>
                                            {data.transactionType===1&&(
                                                <td></td>
                                            )}
                                            {data.transactionType===0&&(
                                                 <td style={{color:'red'}}>{trls('Purchase_credits')}</td>
                                            )}
                                            {data.transactionType===2 &&(
                                                 <td style={{color:'red'}}>{trls('Bouns_credits')}</td>
                                            )}
                                            <td>{this.formatDate(data.createdDate)}</td>
                                            <td>{data.creditReductedOrAdded}</td>
                                            {data.ordernumber ?(
                                                <td>{data.ordernumber}</td>
                                            ):(
                                                <td></td>
                                            )}
                                            {data.projectname ?(
                                                <td>{data.projectname}</td>
                                            ):(
                                                <td></td>
                                            )}
                                            {data.groupname ?(
                                                <td>{data.groupname}</td>
                                            ):(
                                                <td></td>
                                            )}
                                            {data.appversion ?(
                                                <td>{data.appversion}</td>
                                            ):(
                                                <td></td>
                                            )}
                                            {data.isHundeggerNcPaymentCompleted&&(
                                                <td style={{color:"#3945E4"}}>Hundegger zaagmachine</td>
                                            )}
                                            {data.isHundeggerNcHamPaymentCompleted&&(
                                                <td style={{color:"#3945E4"}}>SCM CNC plates freesmachine</td>
                                            )}
                                            {!data.isHundeggerNcHamPaymentCompleted&&!data.isHundeggerNcPaymentCompleted&&(
                                                <td></td>
                                            )}
                                            {data.creditReductedOrAdded<0 ?(
                                                <td>
                                                    <div id={data.hundeggerFileReferenceId} name={data.transactionType} style={{cursor: "pointer", color:'#004388', fontSize:"13px", fontWeight:'bold', textDecoration:"underline"}} onClick={()=>this.downHundeggerFile(data)}>File Download</div>
                                                </td>
                                            ):(
                                                <td></td>
                                            )}
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
                </Row>
                <Buycreditform
                    show={this.state.modalShow}
                    onHide={() => this.setState({modalShow: false})}
                />
                <Getfileform
                    show={this.state.modalShowFile}
                    onHide={() => this.setState({modalShowFile: false})}
                    availableCredits={this.state.userCredits}
                    onGetCradit={this.getCreditsByuserId}
                    onGetCraditHistory={this.getCreditsByuserId}
                />
            </Container>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);