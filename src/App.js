import Movie from "./components/common/MovieTable";
import Navbar from "./components/navbar";
import { Route, Switch } from "react-router";
import { ToastContainer } from "react-toastify";
import Rentals from "./components/rentals";
import Customers from "./components/customers";
import NotFound from "./components/common/notFound";
import MovieForms from "./components/movieForms";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/registerForm";
import Logout from "./components/logout";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { Component } from "react";
import jwtDecode from "jwt-decode";

class App extends Component {
  state = {};

  componentDidMount() {
    try {
      console.log("hello");
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      console.log(user);
      this.setState({ user });
    } catch (error) {}
  }

  render() {
    return (
      <div>
        <ToastContainer />
        <Navbar user={this.state.user} />
        <main className="container">
          <Switch>
            <Route path="/movies/:id" component={MovieForms} />
            {/* <Route path="/movies/new" component={MovieForms} /> */}
            <Route path="/movies" component={Movie} />
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route exact path="/" component={Movie} />
            <Route path="*" component={NotFound} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
