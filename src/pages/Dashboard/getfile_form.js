import React, {Component} from 'react'
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import SessionManager from '../../components/session_manage';
import * as authAction  from '../../actions/authAction';
import API from '../../components/api'
import $ from 'jquery';
import * as Auth   from '../../components/auth';
import ListErrors from '../../components/listerrors';
import { trls } from '../../components/translate';
import Axios from 'axios';
const mapStateToProps = state => ({ 
    ...state.auth,
});

const mapDispatchToProps = (dispatch) => ({
    postUploadError: (params) =>
        dispatch(authAction.dataServerFail(params)),
    removeState: () =>
        dispatch(authAction.blankdispatch()),
});
class Getfileform extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {  
            number:'',
            pricePerCredit:'',
            downHundeggerFileList:[],
            creditsNeededToBuyFileHundeggerNc:'',
            creditsNeededToBuyFileHundeggerNcHam:'',
            referenceId:'',
            uploadflag:0,
            downloadflag:false,
            approve: false,
            ncCheckflag: false,
            ncHamCheckflag: false,
            ncapproveflag: "",
            ncHamapproveflag: ""
        };
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.fileUpload = this.fileUpload.bind(this)
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    componentDidMount() {
        this._isMounted = true;
    }
    onFormSubmit(e){
        e.preventDefault() // Stop form submit
    }
    onChange(e) {
        this.setState({filename: e.target.files[0].name})
        this.setState({file:e.target.files[0]})
        this.props.removeState();
        this.fileUpload(e.target.files[0])
        this.setState({uploadflag:1})
    }
    getHundegger = () => {
        var headers = SessionManager.shared().getAuthorizationHeader();
        Axios.get(API.GetHundeggerFile+this.state.referenceId, headers)
        .then(result => {
            if(this._isMounted){
                this.setState({downHundeggerFileList:result.data.hundeggerFileDetails});
            }
        })
        .catch(err => {
        });
    }
    completePayment = () => {
        let params=[];
        if(this.state.ncCheckflag && this.state.ncHamapproveflag){
            params = {
                referenceId: this.state.referenceId,
                HundeggerTypes: [0,1]
            }
        }else if(!this.state.ncCheckflag && this.state.ncHamapproveflag){
            params = {
                referenceId: this.state.referenceId,
                HundeggerTypes: [1]
            }
        }else if(this.state.ncCheckflag && !this.state.ncHamapproveflag){
            params = {
                referenceId: this.state.referenceId,
                HundeggerTypes: [0]
            }
        }
        var headers = SessionManager.shared().getAuthorizationHeader();
        Axios.post(API.CompletePayment, params, headers)
        .then(result => {
            this.setState({downloadflag:true})
            this.setState({confirmshow:true})
            this.getHundegger();
        })
        .catch(err => {
        });
    }
    downHundeggerFile = () => {
            let hundeggerType='';
            if(this.state.ncCheckflag){
                hundeggerType=0
            }else if(this.state.ncHamapproveflag){
                hundeggerType=1
            }
            let params = this.state.referenceId+"/"+hundeggerType;
            window.location = API.DownLoadFile+params
            this.props.onHide();
            this.props.onGetCradit();
            this.props.onGetCraditHistory();
            this.setState({approve:false})
            this.setState({downloadflag:false})
            this.setState({creditsNeededToBuyFileHundeggerNc: ''})
            this.setState({creditsNeededToBuyFileHundeggerNcHam: ''})
            this.setState({filename:''})
            this.setState({ncHamCheckflag:false})
            this.setState({ncCheckflag:false})
    }
    fileUpload(file){
        var formData = new FormData();
        formData.append('file', file);// file from input
        var headers = {
            "headers": {
                "Authorization": "Bearer "+Auth.getUserToken(),
            }
        }
        Axios.post(API.PostHundeggerFile, formData, headers)
        .then(result => {
            this.setState({creditsNeededToBuyFileHundeggerNc:result.data.creditsNeededToBuyHundeggerNc})
            this.setState({creditsNeededToBuyFileHundeggerNcHam:result.data.creditsNeededToBuyHundeggerNcHam})
            this.setState({referenceId:result.data.referenceId});
            this.setState({uploadflag:0})
            this.setState({approve:true})
        })
        .catch(err => {
        });
    }
    openUploadFile = () =>{
        $('#inputFile').show();
        $('#inputFile').focus();
        $('#inputFile').click();
        $('#inputFile').hide();
    }
    nchandleChange = () =>{
        if(!this.state.ncCheckflag){
            this.setState({ncCheckflag:true})
            this.setState({ncHamCheckflag:false})
            this.setState({ncapproveflag:1})
        }else{
            this.setState({ncCheckflag:false})
            this.setState({ncapproveflag:""})
        }
    }
    nchamhandleChange = () =>{
        if(!this.state.ncHamCheckflag){
            this.setState({ncHamCheckflag:true})
            this.setState({ncCheckflag:false})
            this.setState({ncHamapproveflag:1})
        }else{
            this.setState({ncHamCheckflag:false})
            this.setState({ncHamapproveflag:""})
        }
    }
    render(){   
        let hundeggerFileDetails=this.state.downHundeggerFileList;
        return (
            <Modal
                show={this.props.show}
                onHide={this.props.onHide}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {trls('Get_File')}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="container product-form credit-form" onSubmit = { this.onFormSubmit }>
                    <Form.Group as={Row}  controlId="formPlaintextPassword">
                        <Form.Label column sm="4">
                            {trls('Upload_File')}
                        </Form.Label>
                        <Col sm="4">
                            <Button type="button" style={{width:"auto", height:"35px", fontSize:"14px"}} onClick={this.openUploadFile}>{trls('Choose_File')}</Button>
                            <Form.Label style={{color:"#0903FB", paddingLeft:"10px"}}>
                                <u>{this.state.filename}</u>
                            </Form.Label>
                            <input id="inputFile" type="file"  required accept=".twsbdb" onChange={this.onChange} style={{display: "none"}} />
                        </Col>
                        <Col sm="4">
                            {this.state.approve && (this.state.ncHamCheckflag || this.state.ncCheckflag) && (
                                <Button type="button" style={{height:"35px", fontSize:"14px"}} onClick={this.completePayment}>{trls('Approve')}
                                </Button>
                           )}
                        </Col>
                    </Form.Group>
                    <ListErrors errors={this.props.error} />
                    <Form.Group as={Row} controlId="formPlaintextPasswordw">
                        <Form.Check type="checkbox" name="nc" label={trls('CreditsNeededToBuyFileHundeggerNc')} style={{fontSize:"14px",marginLeft:"40px"}} checked={this.state.ncCheckflag} onChange={this.nchandleChange} />
                        { this.state.uploadflag===1 ?(
                            <span style={{color:"#0903FB",fontWeight:"bold",marginLeft:"35px"}}>  Uploading...</span>
                        ) : <span style={{color:"#0903FB",fontWeight:"bold",marginLeft:"35px"}}>  {this.state.creditsNeededToBuyFileHundeggerNc}</span>
                        } 
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Check type="checkbox" name="ncham" label={trls('CreditsNeededToBuyFileHundeggerNcHam')} style={{fontSize:"14px",marginLeft:"40px"}} checked={this.state.ncHamCheckflag} onChange={this.nchamhandleChange}/>
                        { this.state.uploadflag===1 ?(
                            <span style={{color:"#0903FB",fontWeight:"bold",marginLeft:"5px"}}>  Uploading...</span>
                        ) : <span style={{color:"#0903FB",fontWeight:"bold",marginLeft:"5px"}}>  {this.state.creditsNeededToBuyFileHundeggerNcHam}</span>
                        } 
                    </Form.Group>
                        { this.state.downloadflag ?(
                            <Form.Group as={Row} controlId="formPlaintextPassword" className={hundeggerFileDetails.length!==0 ? 'file-table' : ''}>
                                <div className="table-responsive aprove-Hundegger">
                                    <table className="place-and-orders__table table table--striped prurprice-dataTable"  >
                                        <thead>
                                        <tr>
                                            <th>{trls('Key')}</th>
                                            <th>{trls('Value')}</th>
                                        </tr>
                                        </thead>
                                        {hundeggerFileDetails &&(<tbody >
                                            {
                                                hundeggerFileDetails.map((data,i) =>(
                                                <tr id={i} key={i}>
                                                    <td>{data.key}</td>
                                                    <td>{data.value}</td>
                                                </tr>
                                            ))
                                            }
                                        </tbody>)}
                                    </table>
                                </div>
                            </Form.Group>
                        ) : <div></div>
                        } 
                    { this.state.downloadflag ?(
                         <Form.Group style={{textAlign:"center"}}>
                           <Button type="button" style={{width:"150px"}} onClick={this.downHundeggerFile}>Download</Button>
                        </Form.Group>
                    ) : <div></div>
                    } 
                </Form>
            </Modal.Body>
            </Modal>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Getfileform);