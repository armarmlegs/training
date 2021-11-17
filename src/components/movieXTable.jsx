import React, { Component } from "react";
import Like from "./common/Like";
import TableBody from "./common/tableBody";
import TableHeader from "./common/tableHeader";

class MoviesXTable extends Component {
  columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: movie => <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />,
    },
    {
      key: "delete",
      content: movie => (
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => this.props.onDelete(movie)}
        >
          Delete
        </button>
      ),
    },
  ];
  render() {
    const { moviestar, sortColumn, onSort } = this.props;
    return (
      <table className="table table-dark">
        <TableHeader
          columns={this.columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />
        <TableBody data={moviestar} columns={this.columns} />
      </table>
    );
  }
}

// const MoviesXTable = (props) => {

//

// }

export default MoviesXTable;
