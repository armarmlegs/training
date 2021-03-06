import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    const options = {
      abortEarly: false,
    };
    const { error } = Joi.validate(this.state.data, this.schema, options);

    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;

    return errors;

    // const { data } = this.state;
    // const errors = {};

    // if (data.username.trim() === "")
    //   errors.username = "username is required";

    // if (data.password.trim() === "")
    //   errors.password = "password is required";

    // return Object.keys(errors).length === 0 ? null : errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);

    return error ? error.details[0].message : null;
  };

  //     if (input.name === "username") {
  //       if (input.value.trim() === "") return "username is required";
  //     }
  //     if (input.name === "password") {
  //       if (input.value.trim() === "") return "password is required ";
  //     }
  //   };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();

    this.setState({ errors: errors || {} });

    if (errors) return;

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  };

  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;
    return (
      <Input
        name={name}
        onChange={this.handleChange}
        value={data[name]}
        label={label}
        id={name}
        error={errors[name]}
        type={type}
      />
    );
  }

  renderButton(label) {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  }

  renderSelect(name, label, option) {
    const { data, errors } = this.state;
    return (
      <Select
        name={name}
        onChange={this.handleChange}
        value={data[name]}
        label={label}
        id={name}
        option={option}
        error={errors[name]}
      />
    );
  }
}

export default Form;
