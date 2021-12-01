import React, { Component } from "react";
import { getMovies, deleteMovie } from "../../data/movieServices";
import Page from "./Pagination";
import { Paginate } from "../../utils/paginate";
import ListGroup from "./listGroup";
import { getGenres } from "../../data/genreService";
import MoviesXTable from "../movieXTable";
import SearchBox from "./searchbox";
import _ from "lodash";
import { NavLink } from "react-router-dom";
import { toast } from 'react-toastify';
import auth from '../../data/authService'

class Movie extends Component {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    genres: [],
    searchQuery:"",
    selectedGenre:null,
    sortColumn: { path: "title", order: "asc" },
  };



  async componentDidMount() {
    const {data} = await getGenres();
    const genres = [{ name: "All Genres", _id: "" },...data];


    const {data : movies} = await getMovies()
    this.setState({ movies, genres });
  }

  handleDelete =  async movie => {
   
    const originalMovies = this.state.movies
    const movies = originalMovies.filter(m => m._id !== movie._id);
   
    this.setState({ movies });


    try {
      await deleteMovie(movie._id)
      
    } catch (error) {

      if (error.response && error.response.status === 404)
      toast.error('this movie has already been deleted')
      this.setState({movies : originalMovies})
    } 

    
   
    
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

  handleSelect = genre => {
    this.setState({ selectedGenre: genre,searchQuery:"", currentPage: 1 });
  };

  handleSearch = query => {
    this.setState({searchQuery :query, selectedGenre:null, currentPage: 1})

  }

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };


  getPageData = () => {
    const { pageSize, currentPage, movies, selectedGenre, sortColumn, searchQuery } =
      this.state;
    let filtered = movies;
    if(searchQuery) filtered =movies.filter(m=>m.title.toLowerCase().startsWith(searchQuery.toLocaleLowerCase()));
    else if  (selectedGenre && selectedGenre._id)
        filtered = movies.filter((m) => m.genre._id === selectedGenre._id);
       

    const sorted = _.orderBy(
      filtered,
      [sortColumn.sortedItem],
      [sortColumn.order]
    );
    const moviestar = Paginate(sorted, currentPage, pageSize);

    return {totalCount : filtered.length, data : moviestar}
  }




  render() {
    const count = this.state.movies.length;
    const { pageSize, currentPage, genres, sortColumn } =
      this.state;
      const {user} = this.props;
      

    const {totalCount, data : moviestar}  = this.getPageData();

    return (
      <div>
        <h1>Showing {totalCount} Movies in the database</h1>
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
         { auth.getCurrentUser() && <NavLink to="/movies/new">
          <button className="btn-primary">New Movie</button>
          </NavLink>}
          <SearchBox value = {this.searchQuery} onChange={this.handleSearch}/>
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
              itemCount={totalCount}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Movie;
