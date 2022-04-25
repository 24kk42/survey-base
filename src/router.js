import React, { useCallback } from 'react';
import {
  Route,
  Redirect,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
import SessionHelper from './helpers/SessionHelper';
import Navbar from './components/Navbar/navbar';
import Dashboard from './pages/Dashboard/Dashboard';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import Activation from './pages/AccountActivated/AccountActivated';
import Forgot from './pages/ForgotPassword/ForgotPassword'
import ResetPassword from './pages/ResetPassword/ResetPassword'
import { LandingPage } from './pages/landingPage';
import LanguageHelper from './helpers/LanguageHelper';
import { getViewAuthorizationForAll } from './helpers/AuthorizationHelper';


const auth = [
  {
    path: "/SignIn",
    component: SignIn,
    exact: false,
  },
  {
    path: "/signup",
    component: SignUp,
    exact: false,
  },
  {
    path: "/forgot",
    component: Forgot,
    exact: false,
  },
  {
    path: "/reset",
    component: ResetPassword,
    exact: false,
  },
  {
    path: "/activation",
    component: Activation,
    exact: false,
  }
]

const publicRoutes = [
  {
    path: "/dashboard",
    component: Dashboard,
  },
];

function PrivateRoute({ children, ...rest }) {
  //const isLoggedIn = useSelector((state) => state.Auth.idToken);
  const isLoggedIn = SessionHelper.getIsLoggedIn();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoggedIn ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: '/signin',
                state: { from: location },
              }}
            />
          )
      }
    />
  );
}

export default function Routes() {
  const language = LanguageHelper.getLanguage();
  const user = SessionHelper.getUser();

  const [drawerList, setDrawerList] = React.useState([]);
  const [update, setUpdate] = React.useState(false);

  const populateDrawerList = useCallback(() => {
    if(user) {
      const roles = user.roles;
      const authorization = getViewAuthorizationForAll(roles);
      let drawerList = [
      // DASHBOARD
      { label: language.sidebar.dashboard, Path: "/dashboard" },
      // authorization.formTemplateTable && { label: language.sidebar.formtemplates, Path: "/formtemplates" },
      // authorization.unsuitTaskTable && { label: language.sidebar.nonCompianceTasks, Path: "/unsuitreports" }
      ];
      setDrawerList(drawerList);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language, user, update])

  const init = useCallback(() => {
    populateDrawerList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [populateDrawerList, update]);
  React.useEffect(() => {
    init();
  }, [init, user]);

  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={LandingPage}>
          </Route>
          {
            auth.map((route, index) => (
              <Route key={index} path={route.path} exact={route.exact}>
                <route.component update={update} setUpdate={setUpdate} />
              </Route>
            )
            )
          }
          <PrivateRoute path="/">
            {publicRoutes.map((route, index) => (
              <Route key={index} path={route.path} exact={route.exact}>
                <Navbar component={<route.component/>} drawerList={drawerList} />
              </Route>
            ))}
          </PrivateRoute>
        </Switch>
      </Router>
    </div>
  );
}
