import styles from "./App.module.css"
import './App.css';
import NavBar from "./comonents/NavBar"
import Container from "react-bootstrap/Container"
import { Route, Switch } from 'react-router-dom'
import './api/axiosDefaults'
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import PostCreateForm from "./pages/posts/PostCreateForm";
import PostPage from "./pages/posts/PostPage";
import PostsPage from "./pages/posts/PostsPage";
import LocationPage from "./pages/locations/LocationPage";
import LocationsPage from "./pages/locations/LocationsPage";
import { useCurrentUser } from "./contexts/CurrentUserContext";



function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";



  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route exact path="/" render={() => <PostsPage />} />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/posts/create" render={() => <PostCreateForm/>} />
          <Route exact path="/posts/:id" render={() => <PostPage/>} />
          <Route exact path="/locations/:id" render={() => <LocationPage/>} />
          <Route exact path="/locations" render={() => <LocationsPage/>} />
          <Route
            exact
            path="/followed"
            render={() => (
              <LocationsPage
                message="No results found. Adjust the search keyword or follow a user."
                filter={`owner__followed__owner__profile=${profile_id}&`}
              />
            )}
          />
          <Route render={() => <h1>Page not found!</h1>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;