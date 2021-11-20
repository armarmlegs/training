import React from "react";
import Input from "./common/input";
class LoginForm extends React.Component {
  //   username = React.createRef();
  //access the DOM
  state = {
    account: {
      username: "",
      password: "",
    },

    errors: {},
  };

  validate = () => {
    const { account } = this.state;
    const errors = {};

    if (account.username.trim() === "")
      errors.username = "username is required";

    if (account.password.trim() === "")
      errors.password = "password is required";

    return Object.keys(errors).length === 0 ? null : errors;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();


    this.setState({ errors: errors || {} });

    if (errors) return;
    console.log("submited");
    //call server
  };

  handleChange = (e) => {
      const error = this.validateProperty(e)

    const account = { ...this.state.account };
    account[e.currentTarget.name] = e.currentTarget.value;

    this.setState({ account });
  };

  render() {
    const { account, errors } = this.state;

    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            onChange={this.handleChange}
            value={account.username}
            label="username"
            id="username"
            error={errors.username}
          />
          <Input
            name="password"
            onChange={this.handleChange}
            value={account.password}
            label="password"
            id="password"
            error={errors.password}
          />

          <button className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
