import React from "react";
import Form from "./common/Form";
import Joi from "joi-browser";
import { register } from "../data/userService";

class RegisterForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
      name: "",
    },

    errors: {},
  };

  schema = {
    username: Joi.string().min(3).required().email().label("Username"),
    password: Joi.string().min(3).required().label("Password"),
    name: Joi.string().required().label("Name"),
  };

  doSubmit = async () => {
    try {
      await register(this.state.data);
    } catch (error) {
      if (error.response && error.response.status === 400) {
          console.log('hello')
        const errors = { ...this.state.errors };
        errors.username = "already in use"
       
        this.setState({ errors });
      }
    }
    //call server

   
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
