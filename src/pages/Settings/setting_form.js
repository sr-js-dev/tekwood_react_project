import React, {Component} from 'react'
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import SessionManager from '../../components/session_manage';
import API from '../../components/api'
import Axios from 'axios';
import { trls } from '../../components/translate';
const mapStateToProps = state => ({ 
    ...state.auth,
});

const mapDispatchToProps = (dispatch) => ({
});
class Settingform extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {  
        };
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    componentDidMount() {
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const clientFormData = new FormData(event.target);
        const data = {};
        for (let key of clientFormData.keys()) {
            data[key] = clientFormData.get(key);
        }
        var params = {
            "pricePerCredit":data.price,
            "creditPerTimber":data.timber,
            "creditPerPlate":data.plate
        }
        var headers = SessionManager.shared().getAuthorizationHeader();
        Axios.post(API.PostSetting, params, headers)
        .then(result => {
            this.props.onGetSetting()
            this.props.onHide();
        })
        .catch(err => {
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
                    {trls('Add_Settings')}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="container product-form" onSubmit = { this.handleSubmit }>
                    <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="4">
                            {trls('Price_per_credit')}  
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" name="price" required placeholder={trls('Price_per_credit')}/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="4">
                            {trls('Timber_tag')}   
                        </Form.Label>
                        <Col sm="8" >
                            <Form.Control type="text" name="timber" required placeholder={trls('Timber_tag')}/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="4">
                            {trls('Plate_tag')}    
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" name="plate" required placeholder={trls('Plate_tag')}/>
                        </Col>
                    </Form.Group>
                    <Form.Group style={{textAlign:"center"}}>
                        <Button type="submit" style={{width:"100px"}}>{trls('Save')}</Button>
                    </Form.Group>
                </Form>
            </Modal.Body>
            </Modal>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Settingform);