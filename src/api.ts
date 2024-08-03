import axios from 'axios';

const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZjkzZTk4ODlmZGJjNTQ4MTdmMTU4ZGMwOWMwZDM0NCIsIm5iZiI6MTcyMjMzODQ0MS40NTQwOTksInN1YiI6IjY2YThjYTE1ZTVkNTc0MGU4MDFhOTNlMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.d1W-MzxCMLsdsJ4wLWy4bA22mx-yw9inwmNjhsbpeSk';

const apiClient = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
});

export const fetchMovies = (page: number, itemsPerPage: number) =>
  apiClient.get(`/movie/popular`, {
    params: {
      page,
      api_key: API_KEY,
      language: 'en-US',
      page_size: itemsPerPage,
    }
  });

export const fetchCategories = () =>
  apiClient.get(`/genre/movie/list`, {
    params: {
      api_key: API_KEY,
      language: 'en-US'
    }
  });
