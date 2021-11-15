import React, { Component } from "react";
import { getMovies } from "../../data/fakeMovieService";
import Like from "./Like";
import Page from "./Pagination";

class Movie extends Component {
  state = {
    movies: getMovies(),
    pageSize: 4,
    currentPage: 1,
  };

  handleDelete = (movie) => {
    const supermovies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies: supermovies });
  };

  handleLike = (movie) => {
    const movieLiked = [...this.state.movies];
    const index = movieLiked.indexOf(movie);
    movieLiked[index] = { ...movieLiked[index] };
    movieLiked[index].liked = !movieLiked[index].liked;
    this.setState({ movies: movieLiked });
  };

  render() {
    const count = this.state.movies.length;
    const { pageSize, currentPage } = this.state;
    return (
      <div>
        <h1>Showing {count} Movies in the database</h1>
        <p> {count === 0 && "No movies in the database"}</p>

        <table className="table table-dark">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Genre</th>
              <th scope="col">Stock</th>
              <th scope="col">Rate</th>
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map((movie) => (
              <tr key={movie._id}>
                <th scope="row">{movie.title}</th>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => this.handleDelete(movie)}
                  >
                    Delete
                  </button>
                </td>
                <Like />

                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Movie;
