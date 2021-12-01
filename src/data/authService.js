import http from "./httpServices";
import { apiUrl } from "../config.json";


const apiEndpoint = apiUrl + "/auth";


export async function  login (email, password) {
 const {data : jwt} = await http.post(apiEndpoint,{
        email,
        password
    });
    localStorage.setItem("token", jwt)
};

export function logout () {
    localStorage.removeItem('token');
}