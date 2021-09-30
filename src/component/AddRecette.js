import React, { useState } from 'react';

function AddRecette({ addRecette }) {

    const [status, setStatus] = useState({
        nom: '',
        image: '',
        ingredients: '',
        instructions: ''
    });

    const handleChange = e => {
        let {name, value} = e.target
        let newStatus = {...status};

        newStatus[name] = value;

        setStatus(newStatus);
    }

    const handleSubmit = e => {
        e.preventDefault();

        let recette = {...status};
        addRecette(recette);

        setStatus({
            nom: '',
            image: '',
            ingredients: '',
            instructions: ''
        });
    }

    return ( 
        <div className="card">
            <form className="admin-form ajouter-recette" onSubmit={handleSubmit}>

                <input 
                    value={status.nom} 
                    onChange={handleChange} 
                    type="text" name='nom' placeholder='Nom de la recette'/>
                <input 
                    value={status.image} 
                    onChange={handleChange} 
                    type="text" name='image' placeholder="nom de l'image"/>
                <textarea 
                value={status.ingredients} 
                onChange={handleChange}
                name='ingredients' rows='3' placeholder='Ingredients de la recette'></textarea>
                <textarea 
                value={status.instructions} onChange={handleChange}
                name='instructions' rows='15' placeholder='Instructions de la recette'></textarea>

                <button type="submit">Enregistrer</button>
            </form>
        </div>
    );
}

export default AddRecette;