import React from "react";


const MovieForm = ({ match, history }) => {
  return (
    <div>
      <h1>Movie Forms -  {match.params.title} - {match.params.id}</h1>
      <button className="btn-primary" onClick={() => history.push('/movies') }>Save</button>
    </div>
  );
};

export default MovieForm;
