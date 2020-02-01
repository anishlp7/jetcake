import React from "react";


import { firestore }  from '../../firebase/firebase.utils';
import "./profile.scss";

class Profile extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            users:[]
        }
    }

    componentDidMount() {
        var docRef = firestore.collection("users").doc("hZJdLxOgLTYZqqADwKOc0lS2pWq1");

        docRef.get().then(function(doc) {
            if (doc.exists) {
                let users =  doc.data();
                let newState = [];
                    newState.push(users);
                    console.log(newState)
                    return newState;
                // console.log("Document data:", doc.data());
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            } 
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
}

  render() {
    return (
      <div className="profile-container">
        <p>WelCome to the Profile page</p>
        {
            this.state.users.map((user) => {
                return (
                    
                    <div className="new-mail">
                        <h2>{user.email}</h2>
                    </div>    
                )
            })
        }
      </div>
    );
  }
}

export default Profile;
