import React from "react";
import Form from "./common/Form";
import Joi  from "joi-browser";
import { getGenres } from "../data/fakeGenreService";



class MovieForm extends Form {
    state = {
        data :{
            Title:"",
            InStock:"",
            Rate:"",
            GenreId:""
        },
        errors:{},
        genres : []
    };

    schema = {
        Title: Joi.string().required().label("Title"),
        InStock: Joi.number().min(0).max(100).required().label("In Stock"),
        Rate: Joi.number().min(0).max(10).required().label("Rate"),
        
    };

    doSubmit = () => {
        //call server
    
        console.log("saved");
      };

    render() { 
        return (<div>
            <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("Title", "Title")}
          {this.renderInput("InStock", "In Stock")}
          {this.renderInput("Rate", "Ratings")}
          {this.renderButton("Save")}
        </form>
      </div>
        </div>);
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