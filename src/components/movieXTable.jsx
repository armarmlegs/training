import React, { Component } from "react";
import Like from "./common/Like";

import Table from "./common/table";

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
      <Table  data={moviestar} onSort={onSort} sortColumn={sortColumn} columns={this.columns} />
    );
  }
}

// const MoviesXTable = (props) => {

//

// }

export default MoviesXTable;
