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

handleLike(movie){
  console.log('clickity clax', movie)
  const moviCopies = [...this.state.movies];
  const index = moviCopies.indexOf(movie);
  moviCopies[index] = {...moviCopies[index]};
  moviCopies[index].liked = !moviCopies[index].liked
  this.setState({ movies : moviCopies})
}

handlePageChange() {
  console.log('ignition')
}




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
              <th scope="col">Delete</th>
              <th scope="col">Like</th>
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
                <td>
                  <Like liked={movie.liked} onLiked={() =>this.handleLike(movie)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Page pageSize={pageSize} itemCount={count} onPageChange={this.handlePageChange}/>
      </div>
    );
  }
}

export default Movie;
