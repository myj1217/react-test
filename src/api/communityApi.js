import axios from "axios";
import { API_SERVER_HOST } from "./todoApi";
import jwtAxios from "../util/jwtUtil";

const host = `${API_SERVER_HOST}/comboard`;

export const comPost = async (product) => {
    const header = { headers: { "Content-Type": "multipart/form-data" } };
  
    
    const res = await jwtAxios.post(`${host}/register`, product, header);
  
    return res.data;
  };

  export const comList = async (pageParam) => {
    const { page, size } = pageParam;
  
    const res = await axios.get(`${host}/`, {
      params: { page: page, size: size },
    });
  
    return res.data;
  };