import React from "react";

import FormInput from "../form-input/form-input";
import CustomButton from '../custom-button/custom-button'
import "./signin.scss";
import { SignInWithGoogle,auth } from "../../firebase/firebase.utils";

class Signin extends React.Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: ""
    };
  }

  handleSubmit =  async event => {
    event.preventDefault();

    const {email,password } = this.state;

    try {
      await auth.signInWithEmailAndPassword(email,password);
      this.setState({ email: "", password: "" });
    } catch (error) {
      console.log(error.message)
    } 
  };

  handleChange = event => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="sign-in">
        <h1>Sign In</h1>
       
        <div className="form-align">
        <form className="form-signin" onSubmit={this.handleSubmit}>
          <FormInput
            label="Email"
            type="email"
            name="email"
            value={this.state.email}
            handleChange={this.handleChange}
            required
          />
          <FormInput
            label="Password"
            type="password"
            name="password"
            value={this.state.password}
            handleChange={this.handleChange}
            required
          />
          <div className="buttons">
              <CustomButton type="submit" >Sign In</CustomButton>
              <CustomButton onClick={SignInWithGoogle} isGoogleSignIn>Sign In With Google</CustomButton>
          </div>
        </form>
        </div>
      </div>
    );
  }
}

export default Signin;
