import { Redirect, Route } from 'react-router-dom';

const isAccessAllowed = () => {
  let accessToken = localStorage.getItem('accessToken');
  return accessToken ? true : false;
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAccessAllowed() ? <Component {...props} /> : <Redirect to="/gists/1" />
      }
    />
  );
};

export default PrivateRoute;
