import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:8000',
  headers: { Authorization: `JWT ${localStorage.getItem('accessToken')}` },

  baseURL: 'http://localhost:8000',
});
