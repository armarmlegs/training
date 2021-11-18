import React, { Component } from "react";
import { getMovies } from "../../data/fakeMovieService";
import Page from "./Pagination";
import { Paginate } from "../../utils/paginate";
import ListGroup from "./listGroup";
import { getGenres } from "../../data/fakeGenreService";
import MoviesXTable from "../movieXTable";
import _ from "lodash";

class Movie extends Component {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    genres: [],
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    const genres = [{ name: "All Genres", _id: "" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  handleDelete = (movie) => {
    const supermovies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies: supermovies });
  };

  handleLike = (movie) => {
    const moviCopies = [...this.state.movies];
    const index = moviCopies.indexOf(movie);
    moviCopies[index] = { ...moviCopies[index] };
    moviCopies[index].liked = !moviCopies[index].liked;
    this.setState({ movies: moviCopies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSelect = (item) => {
    this.setState({ selectedGenre: item, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };
  render() {
    const count = this.state.movies.length;
    const { pageSize, currentPage, movies, genres, selectedGenre, sortColumn } =
      this.state;

    const filtered =
      selectedGenre && selectedGenre._id
        ? movies.filter((m) => m.genre._id === selectedGenre._id)
        : movies;

    const sorted = _.orderBy(
      filtered,
      [sortColumn.sortedItem],
      [sortColumn.order]
    );
    const moviestar = Paginate(sorted, currentPage, pageSize);
    return (
      <div>
        <h1>Showing {filtered.length} Movies in the database</h1>
        <p> {count === 0 && "No movies in the database"}</p>
        <div className="row">
          <div className="col3">
            <ListGroup
              items={genres}
              onItemSelect={this.handleSelect}
              selectedItem={this.state.selectedGenre}
            />
          </div>
          <div className="col">
            <MoviesXTable
              moviestar={moviestar}
              sortColumn={sortColumn}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
            />
            <Page
              currentPage={currentPage}
              pageSize={pageSize}
              itemCount={filtered.length}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Movie;
