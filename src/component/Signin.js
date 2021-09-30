import React from 'react';

function Signin({ authenticate }) {
    return ( 
        <div className='login'>
            <h2>Connecte toi pour créer tes recettes</h2>
            <button 
                className="face-button"
                onClick={authenticate} > Me connecter avec Google
            </button>
        </div>
    );
}

export default Signin;