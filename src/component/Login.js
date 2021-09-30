import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
 
function Login() {

    const [pseudo, setPseudo] = useState('');
    const [enterChat, setEnterChat] = useState(false);

    const handleChange = (e) => {

        let newPseudo = e.target.value;
        setPseudo(newPseudo);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setEnterChat(true);
    }

    if (enterChat === true) {
        return <Redirect push to={`/pseudo/${pseudo}`} />
    }

    return (

        <div className="connexionBox">

            <form action="#" className="connexion" onSubmit={handleSubmit}>  

                <h1>Ma boite à recette</h1>

                <input type="text" 
                    value={pseudo}
                    onChange={handleChange}
                    placeholder="Pseudo" required
                    pattern='[A-Za-z-]{1,}' />

                <button type="submit">Go</button>
                <p>Pas de caractères spéciaux pour le pseudo</p>
            </form>
        </div>
    );
}

export default Login;