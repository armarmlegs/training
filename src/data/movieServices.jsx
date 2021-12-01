import http from "./httpServices";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + '/movies'

export function getMovies() {
  return http.get(apiEndpoint);
}

export function getMovie(movieId) {
  return http.get(apiEndpoint + '/'+ movieId);
}

export function saveMovie(movie) {
  if (movie._id) {
      const body = {...movie}
      delete body._id
   return  http.put(apiEndpoint + "/" + movie._id, body);
  }
  return http.post(apiUrl + "/movies", movie)

}

export function deleteMovie(movieId) {
  return http.delete(apiEndpoint + '/' + movieId);
}
