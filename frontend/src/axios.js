import axios from 'axios';

export default axios.create({
<<<<<<< HEAD
  baseURL: 'http://localhost:8000',
  headers: { Authorization: `JWT ${localStorage.getItem('accessToken')}` },
=======
    baseURL: 'http://localhost:8000',
>>>>>>> bf85c6042b51f32c313570aff81a4d9b44e89503
});
