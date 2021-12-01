import Movie from "./components/common/MovieTable";
import Navbar from "./components/navbar";
import { Redirect, Route, Switch } from "react-router";
import { ToastContainer } from "react-toastify";
import Rentals from "./components/rentals";
import Customers from "./components/customers";
import NotFound from "./components/common/notFound";
import MovieForms from "./components/movieForms";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/registerForm";
import Logout from "./components/logout";
import auth from "./data/authService";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/common/protectRoute";
import "./App.css";
import { Component } from "react";
import MoviesXTable from "./components/movieXTable";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <div>
        <ToastContainer />
        <Navbar user={user} />
        <main className="container">
          <Switch>
            <ProtectedRoute
              path="/movies/:id"
             component={MovieForms}
             user = {user}
            />

            <ProtectedRoute
              path="/movies"
              component={Movie}
              user = {user}
            />
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
