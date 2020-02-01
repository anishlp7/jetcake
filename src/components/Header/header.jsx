import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector} from 'reselect'
import {selectCurrentUser } from '../../Redux/User/userSelector';
import { auth } from '../../firebase/firebase.utils.js';
import './header.scss';


const Header = ({currentUser}) => (
    <div className="header">
        <Link to='/' className='logo-container'>
            JetCake
        </Link>
        
           
            {
                currentUser ? 
                <div className='options'>
                    <Link className="option" to="/profile">Profile</Link> 
                    <div className="option" onClick={() => auth.signOut() }>Log Out</div>   
                </div>
                :
                <div className="options">
                <Link className="option" to="/signin">Sign In</Link>
                <Link className="option" to="/signup">Sign Up</Link>
                </div>
                
            }
        </div>
  

)

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
}) 

export default connect(mapStateToProps)(Header);