import "./App.css";
import Movie from "./components/common/MovieTable";
import Navbar from "./components/navbar";
import { Route, Routes} from "react-router";
import Rentals from './components/rentals';
import Customers from "./components/customers";
import NotFound from "./components/common/notFound";

function App() {
  return (
    <div>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/customers" element={<Customers />} />
          <Route path="/rentals" element={<Rentals />} />
          <Route path="/notFound" element={<NotFound />} />
          <Route exact path="/movies" element={<Movie />} />
          <Route exact path="/" element={<Movie />} />
          <Route  path='*' element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
