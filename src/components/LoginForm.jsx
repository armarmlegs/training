import React from "react";
import Joi from "joi-browser";
import Form from "./common/Form";
import { login } from "../data/authService";

class LoginForm extends Form {

  state = {
    data: {
      username: "",
      password: "",
    },

    errors: {},
  };

  schema = {
    username: Joi.string().min(3).required().label("Username"),
    password: Joi.string().min(3).required().label("Password"),
  };

  //     if (input.name === "username") {
  //       if (input.value.trim() === "") return "username is required";
  //     }
  //     if (input.name === "password") {
  //       if (input.value.trim() === "") return "password is required ";
  //     }
  //   };

  // const { data } = this.state;
  // const errors = {};

  // if (data.username.trim() === "")
  //   errors.username = "username is required";

  // if (data.password.trim() === "")
  //   errors.password = "password is required";

  // return Object.keys(errors).length === 0 ? null : errors;

  doSubmit = async () => {


    try {
      const {data } = this.state;
     
      const {data : jwt } = await login(data.username, data.password)
      console.log(jwt)
      localStorage.setItem("token", jwt);
      this.props.history.push('/');
    } catch (error) {
      if(error.response && error.response.status === 400) {
        const errors = {...this.state.errors};
        errors.username = error.response.data;

        this.setState({ errors})
      }
      
    }
    //call server


    
  };

  render() {
    

    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
