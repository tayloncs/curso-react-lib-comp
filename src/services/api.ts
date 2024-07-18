import axios from "axios";

const apiUrl = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
});

export async function submitApi(data: any) {}

export async function fetchPokedex(params: { limit: number; offset: number }) {
  try {
    const response = await apiUrl.get(`pokemon?limit=${params.limit}&offset=${params.offset}`);
    return response.data;
  } catch (error) {
    console.log("error :", error);
  }
}

export async function fecthPokemon(name: string) {
  try {
    const response = await apiUrl.get(`pokemon/${name}`);
    return response.data;
  } catch (error) {
    console.log("error :", error);
  }
}
