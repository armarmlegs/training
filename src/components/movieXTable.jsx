import React, {Component} from 'react'
import Like from './common/Like';

class MoviesXTable extends Component {
    raiseSort  = sortedItem => {
        const sortColumn = { ...this.props.sortColumn };
        if (sortColumn.sortedItem === sortedItem)
          sortColumn.order = (sortColumn.order === "asc") ? "desc" : "asc";
          else {
            sortColumn.sortedItem = sortedItem
            sortColumn.order = "asc"
          }
          this.props.onSort(sortColumn)
    }
    render() { 
        const {moviestar, onLike, onDelete} = this.props;
        return ( 
            <table className="table table-dark">
            <thead>
              <tr>
                <th onClick={() =>this.raiseSort('title')} scope="col">Title</th>
                <th onClick={() =>this.raiseSort('genre.name')} scope="col">Genre</th>
                <th onClick={() =>this.raiseSort('numberInStock')} scope="col">Stock</th>
                <th onClick={() =>this.raiseSort('dailyRentalRate')} scope="col">Rate</th>
                <th scope="col">Delete</th>
                <th scope="col">Like</th>
              </tr>
            </thead>
            <tbody>
              {moviestar.map((movie) => (
                <tr key={movie._id}>
                  <th scope="row">{movie.title}</th>
                  <td>{movie.genre.name}</td>
                  <td>{movie.numberInStock}</td>
                  <td>{movie.dailyRentalRate}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => onDelete(movie)}
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <Like
                      liked={movie.liked}
                      onClick={() => onLike(movie)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
         );
    }
}
 


// const MoviesXTable = (props) => {
    
//     
    
// }
 
export default MoviesXTable;