import React from "react";
import Input from "./common/input";
import Joi from 'joi-browser'
import { join } from "lodash";


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

  schema ={
      username : Joi.string().min(3).required(),
      password : Joi.string().min(3).required()
  }

  validateProperty = (input) => {
    if (input.name === "username") {
      if (input.value.trim() === "") return "username is required";
    }
    if (input.name === "password") {
      if (input.value.trim() === "") return "password is required ";
    }
  };
  validate = () => {
const result = Joi.validate(this.state.account, this.schema, {abortEarly:false})
console.log(result)

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

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const account = { ...this.state.account };
    account[input.name] = input.value;

    this.setState({ account, errors });
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
