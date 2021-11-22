import Movie from "./components/common/MovieTable";
import Navbar from "./components/navbar";
import { Route, Switch } from "react-router";
import Rentals from "./components/rentals";
import Customers from "./components/customers";
import NotFound from "./components/common/notFound";
import MovieForms from "./components/movieForms";
import LoginForm from './components/LoginForm';
import RegisterForm from "./components/registerForm";
import "./App.css";

function App() {
  return (
    <div>
      <Navbar />
      <main className="container">
        <Switch>
       
        <Route path="/movies/:title/:id?" component={MovieForms} />
        <Route path="/movies/new" component={MovieForms} />
        <Route  path="/movies" component={Movie} />
        <Route  path="/login" component={LoginForm} />
        <Route  path="/register" component={RegisterForm} />

          <Route path="/customers" component={Customers} />
          <Route path="/rentals" component={Rentals} />

          
          <Route exact path="/" component={Movie} />
          <Route path="*" component={NotFound} />
        </Switch>
      </main>
    </div>
  );
}

export default App;
