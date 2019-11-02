import React from 'react';

class ListErrors extends React.Component {
  
  render() {
    console.log('112233')
    const errors = this.props.errors;
    console.log(errors)
    if (errors) {
      return (
        <ul className="error-messages" style={{marginTop:"-29px"}}>
          {
            errors
            }
        </ul>
      );
    } else {
      return null;
    }
  }
}
export default ListErrors;
