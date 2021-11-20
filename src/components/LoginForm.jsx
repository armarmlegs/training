import React from "react";
class LoginForm extends React.Component {

    handleSubmit = e => {
       e.preventDefault();
        console.log('submited')
       //call server
    }
  render() {
    return (
      
        <div>
            <h1>Login</h1>
            <form onSubmit={this.handleSubmit}  >
                <div className="form-group"><label htmlFor="username">Username<input id='username' type="text" className="form-control" /></label></div>
                <div className="form-group"><label htmlFor="password">Password<input id='password' type="text" className="form-control" /></label></div>
                <button className="btn btn-primary">Submit</button>
            </form>
        </div>
      
    );
  }
}

export default LoginForm;
