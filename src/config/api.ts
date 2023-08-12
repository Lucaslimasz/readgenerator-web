import axios from "axios";

export const api = axios.create({
  baseURL: 'https://readme-generator-steel.vercel.app/api/v1'
})