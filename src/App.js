import React from 'react';
import Header from './components/Header/header';
import Homepage from './components/Homepage/homepage'
import Signin from './components/SignIn/signin';
import Signup from './components/SignUp/signup';
import Profile from './components/Profile/profile'
import './App.css';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { auth,createUserProfileDocument } from './firebase/firebase.utils';
import {setCurrentUser} from './Redux/User/UserAction';
import { createStructuredSelector} from 'reselect';
import { selectCurrentUser } from './Redux/User/userSelector';


import ParticlesOpt from './particles/particles';
import Particles from 'react-particles-js';

class App extends React.Component {

  unsubscribeFromAuth = null;

    
  componentDidMount(){
    const {setCurrentUser} = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged( async userAuth => {
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);
        
        userRef.onSnapshot(snapshot => {
          setCurrentUser({
            currentUser:{
              id:snapshot.id,
              ...snapshot.data()
            }
          });
        });
       
      } else {
        setCurrentUser(userAuth)
      }


    })
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render(){
  return (
    <div className="App">
    <Particles className="particles" params={ParticlesOpt} />
      <Header />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
        <Route path="/profile" component={Profile} />
      </Switch>
    </div>
  );
}
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});


export default connect(mapStateToProps,mapDispatchToProps)(App);
