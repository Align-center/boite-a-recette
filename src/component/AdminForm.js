import React from 'react';

function AdminForm({ recettes, updateRecette, id: key, deleteRecette }) {

    const recette = recettes[key];

    const handleChange = (e, key) => {
        let { name, value} = e.target;
        let newRecette = recettes[key];

        newRecette[name] = value;

        updateRecette(key, newRecette);
    }

    // const handleClick = () => {
    //     deleteRecette(key);
    // }

    return ( 
        <div className="card">
            <form className="admin-form">

                <input 
                    value={recette.nom} 
                    onChange={e => handleChange(e, key)} 
                    type="text" name='nom' placeholder='Nom de la recette'/>
                <input 
                    value={recette.image} 
                    onChange={e => handleChange(e, key)} 
                    type="text" name='image' placeholder="nom de l'image"/>
                <textarea 
                value={recette.ingredients} 
                onChange={e => handleChange(e, key)}
                name='ingredients' rows='3' placeholder='Ingredients de la recette'></textarea>
                <textarea 
                value={recette.instructions} onChange={e => handleChange(e, key)}
                name='instructions' rows='15' placeholder='Instructions de la recette'></textarea>

            </form>
            <button onClick={() => deleteRecette(key)} >Supprimer</button>
        </div>
    );
}

export default AdminForm;