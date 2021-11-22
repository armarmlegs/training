import React from "react";
import Form from "./common/Form";
import Joi from "joi-browser";
import { getGenres } from "../data/fakeGenreService";
import { getMovie, saveMovie } from "../data/fakeMovieService";

class MovieForm extends Form {
  state = {
    data: {
      _id: "",
      title: "",
      numberInStock: "",
      dailyRentalRate: "",
      genreId: "",
    },
    errors: {},
    genres: [],
  };

  schema = {
    _id: Joi.string(), 
    title: Joi.string().required().label("Title"),
    numberInStock: Joi.number().min(0).max(100).required().label("In Stock"),
    dailyRentalRate: Joi.number().min(0).max(10).required().label("Rate"),
    genreId: Joi.string().required().label("Genre"),
  };

  componentDidMount() {
    const genres = getGenres();
    this.setState({ genres });

    const movieId = this.props.match.params.id;

    if (movieId === "new") return;

    const movie = getMovie(movieId);
    console.log(movie);
    if (!movie) return this.props.history.replace("/notFound");
    this.setState({ data : this.mapToViewModel(movie) })
  } 

  mapToViewModel(movie) {
    console.log(movie)
      return {
        _id: movie._id,
        title: movie.title,
        numberInStock: movie.numberInStock,
        dailyRentalRate: movie.dailyRentalRate,
        genreId: movie.genre._id
      }
      

  }

  doSubmit = () => {
    //call server
    saveMovie(this.state.data);
    this.props.history.push("/movies");

    console.log("saved");
  };

  render() {
    return (
      <div>
        <div>
          <h1>New Movie</h1>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("title", "Title")}
            {this.renderInput("numberInStock", "In Stock")}
           {this.renderSelect('genreId', 'Genre', this.state.genres)}
            {this.renderInput("dailyRentalRate", "Ratings")}
            {this.renderButton("Save")}
          </form>
        </div>
      </div>
    );
  }
}

export default MovieForm;

// const MovieForm = ({ match, history }) => {
//     return (
//         <h1>hello new world</h1>

//     );
//   };

// <div>
//   <h1>Movie Forms -  {match.params.title} - {match.params.id}</h1>
//   <button className="btn-primary" onClick={() => history.push('/movies') }>Save</button>
// </div>
