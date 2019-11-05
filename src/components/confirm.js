import React, {Component} from 'react'
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
const mapStateToProps = state => ({ 
    ...state.auth,
});

const mapDispatchToProps = (dispatch) => ({
});
class Confirm extends Component {
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
    render(){   
        console.log('1123123', this.props)
        return (
            <Modal
                show={this.props.show}
                onHide={this.props.onHide}
            >
                <Modal.Header>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you approve for the CreditsNeededToBuyFile</Modal.Body>
                <Modal.Footer>
                    <Button className="modal_button" variant="secondary">
                        Cancel
                    </Button>
                    <Button className="modal_button" variant="primary">
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Confirm);