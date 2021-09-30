import React, { Fragment, useEffect, useState } from 'react';

import AddRecette from './AddRecette';
import AdminForm from './AdminForm';
import Signin from './Signin';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import database,{ firebaseApp } from '../base'

function Admin({ handleLoadExamples, addRecette, recettes, updateRecette, deleteRecette, pseudo }) {

    useEffect(() => {

        firebase.auth().onAuthStateChanged(user => {

            if (user) 
                handleAuth({ user });
        });
    }, []);

    const [state, setState] = useState({
        uid: null,
        chef: null
    });

    const handleAuth = async authData => {

        var dbPart = await database.ref(`/${pseudo}`).once('value').then(snapshot => {

            return snapshot.val();
        });

        if (dbPart === null)
            dbPart = false;

        if (!dbPart.chef) {

            await database.ref(`/${pseudo}/chef`).set(authData.user.uid);
        } 

        setState({
            uid : authData.user.uid,
            chef: dbPart.chef || authData.user.uid
        });
    }

    const authenticate = () => {
        
        var auth = firebaseApp.auth();
        var googleProvider = new firebase.auth.GoogleAuthProvider();

        auth.signInWithPopup(googleProvider)
            .then(handleAuth);
    }

    const signOut = async () => {
        console.log('Déconnexion...');
        await firebase.auth().signOut();

        let newState = {...state};

        newState.uid = null

        setState(newState);
    }

    const logOut = <button onClick={signOut} >Se déconnecter</button>

    if (!state.uid) {
        return <Signin authenticate={authenticate} />
    }

    if (state.uid !== state.chef) {
        return (
            <Fragment>

                <p>Vous n'êtes pas le chef de cette boîte.</p>
                {logOut}
            </Fragment>
        )
    }

    return ( 
        <div className="cards">
            
            <AddRecette addRecette={addRecette} />

            { Object.keys(recettes).map(key => (
                
                <AdminForm 
                    key={key} 
                    id={key}
                    updateRecette={updateRecette} 
                    deleteRecette={deleteRecette}
                    recettes={recettes} />
            ))}
            <footer>
               {logOut} 
                <button onClick={handleLoadExamples}>
                    Importer
                </button>
            </footer>
        </div>
    );
}

export default Admin;