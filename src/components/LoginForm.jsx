import React from "react";
import Joi from "joi-browser";
import Form from "./common/Form";

class LoginForm extends Form {
  //   username = React.createRef();
  //access the DOM
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

  doSubmit = () => {
    //call server

    console.log("submited");
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
