import React, {Component} from 'react'
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import SessionManager from '../../components/session_manage';
import * as authAction  from '../../actions/authAction';
import API from '../../components/api'
import $ from 'jquery';
import * as Auth   from '../../components/auth';
import ListErrors from '../../components/listerrors';
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
class Buycreditform extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {  
            number:'',
            pricePerCredit:'',
            downHundeggerFileList:[],
            creditsNeededToBuyFile:'',
            referenceId:'',
            uploadflag:0
            
        };
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.fileUpload = this.fileUpload.bind(this)
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    componentDidMount() {
    }
    onFormSubmit(e){
        e.preventDefault() // Stop form submit
    }
    onChange(e) {
        this.setState({file:e.target.files[0]})
        this.props.removeState();
        this.fileUpload(e.target.files[0])
        this.setState({uploadflag:1})
    }
    getHundegger = () => {
        var headers = SessionManager.shared().getAuthorizationHeader();
        Axios.get(API.GetHundeggerFile+this.state.referenceId, headers)
        .then(result => {
            this.setState({downHundeggerFileList:result.data.hundeggerFileDetails});
        })
        .catch(err => {
        });
    }
    completePayment = () => {
            var settings = {
                "url": API.CompletePayment+this.state.referenceId,
                "method": "POST",
                "headers": {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer "+Auth.getUserToken(),
            }
            }
            $.ajax(settings).done(function (response) {
            })
            .then(response => {
                this.getHundegger();
            })
            .catch(err => {
                this.props.postUploadError(err.responseJSON.Error)
            });
    }
    downHundeggerFile = () => {
        let filelist = this.state.downHundeggerFileList;
        filelist.map((data, index) => {
            window.open(API.DownLoadFile+this.state.referenceId); 
            return data;
        })
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
            this.setState({creditsNeededToBuyFile:result.data.creditsNeededToBuyFile})
            this.setState({referenceId:result.data.referenceId});
            this.setState({uploadflag:0})
        })
        .catch(err => {
        });
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
                    Get File
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="container product-form credit-form" onSubmit = { this.onFormSubmit }>
                    <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="4">
                            Upload File    
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="file"  required accept=".twsbdb" onChange={this.onChange} />
                        </Col>
                    </Form.Group>
                    <ListErrors errors={this.props.error} />
                    <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="6" style={{fontSize:"14px",marginLeft:"10px"}}>
                            CreditsNeededToBuyFile: 
                            { this.state.uploadflag===1 ? (
                                <span style={{color:"#0903FB",fontWeight:"bold"}}>  Uploading...</span>
                            ) : <span style={{color:"#0903FB",fontWeight:"bold"}}>  {this.state.creditsNeededToBuyFile}</span>
                            }  
                        </Form.Label>
                        <Col sm="6">
                            <button className="btn-small place-and-orders__add-row-btn payment" onClick={this.completePayment}>Add row</button>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextPassword" className={hundeggerFileDetails.length!==0 ? 'file-table' : ''}>
                        <div className="table-responsive">
                            <table className="place-and-orders__table table table--striped prurprice-dataTable"  >
                                <thead>
                                <tr>
                                    <th>Key</th>
                                    <th>Value</th>
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
                    <Form.Group style={{textAlign:"center"}}>
                        <Button type="button" style={{width:"150px"}} onClick={this.downHundeggerFile}>Download</Button>
                    </Form.Group>
                </Form>
            </Modal.Body>
            </Modal>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Buycreditform);