import React from 'react';

function Card({ details }) {

    const ingredients = details.ingredients.split(',');
    const instructions = details.instructions.split('\n');

    const requireImage = path => {
        try {
            return require(`../img/${path}`).default;
        } catch (err) {
            return require('../img/default.jpeg').default;
        }
    }

    return ( 
        <div className='card'>
            <div className="image">
                <img src={requireImage(details.image)} alt={details.nom} />
            </div>
            <div className="recette">
                <h2>{details.nom}</h2>
                <ul className="liste-ingredients">
                    {ingredients.map(ingredient => <li key={ingredient}>{ingredient}</li>)}
                </ul>
                <ol className="liste-instructions">
                    {instructions.map(instruction => <li key={instruction}>{instruction}</li>)}
                </ol>
            </div>
        </div>
     );
}

export default Card;