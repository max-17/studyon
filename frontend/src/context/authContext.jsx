import { createContext, useEffect, useState } from 'react';

import axios from '../axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      // You can await here
      try {
        const response = await axios('/auth/users/me/', {
          headers: { Authorization: `JWT ${localStorage.getItem('accessToken')}` },
        });
        setAuth({ ...response.data });
        // console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    // console.log({ auth: auth });
  }, []);

  return <AuthContext.Provider value={{ user: auth, setUser: setAuth }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
