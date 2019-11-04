import React, {Component} from 'react'
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import $ from 'jquery';
import SessionManager from '../../components/session_manage';
import API from '../../components/api'
import * as Auth   from '../../components/auth';
import Axios from 'axios';
const mapStateToProps = state => ({ 
    ...state.auth,
});

const mapDispatchToProps = (dispatch) => ({
});
class Buycreditform extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {  
            number:'',
            pricePerCredit:'',
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
        this.fileUpload(this.state.file)
        // .then((response)=>{
        //   console.log(response.data);
        // })
    }
    onChange(e) {
        this.setState({file:e.target.files[0]})
    }
    fileUpload(file){
        // var headers = SessionManager.shared().getAuthorizationHeader();
        var headers= {
            "headers": {
                'Authorization': 'Bearer ' + Auth.getUserToken(),
                'Content-Type': 'multipart/form-data',
              }
        }
        Axios.post("https://brandnewkey.sohosted-vps.nl:44402/api/hundegger/Upload", file, headers)
        .then(result => {
            console.log('111222333', result)
        })
        .catch(err => {
            console.log(err.response);
        });
    }
    render(){   
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
                            <Form.Control type="file" name="number" required accept=".twsbdb" onChange={this.onChange} />
                        </Col>
                    </Form.Group>
                    <Form.Group style={{textAlign:"center"}}>
                        <Button type="submit" style={{width:"150px"}}>Upload</Button>
                        <Button type="button" style={{width:"150px"}}>Download</Button>
                    </Form.Group>
                </Form>
            </Modal.Body>
            </Modal>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Buycreditform);