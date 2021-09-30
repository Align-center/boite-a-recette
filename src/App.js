import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import './App.css';

import Header from './component/Header';
import Admin from './component/Admin';
import Card from './component/Card';
import exampleRecettes from './recettes';
import database from './base';

function App() {

  const params = useParams();
  const pseudo = params.pseudo;
  const [recettes, setRecettes] = useState(() => {
    let initVal;
    
    database.ref(`/${pseudo}/recettes`).on('value', snapshot => {
      if (snapshot.val())
        initVal = snapshot.val();
    });

    return initVal || {};
  });

  useEffect(() => {

    database.ref(`/${pseudo}/recettes`).on('value', snapshot => {

      if (snapshot.val())
        setRecettes(snapshot.val());
    });
  }, [pseudo]);

  useEffect(() => {

    if (Object.keys(recettes).length !== 0) {

      database.ref(`/${pseudo}/recettes`).set(recettes);
    }
  }, [recettes, pseudo]);

  const addRecette = recette => {
    let newRecettes = {...recettes};

    newRecettes[`recette-${Date.now()}`] = recette;

    setRecettes(newRecettes);
  } 

  const updateRecette = (key, updatedRecette) => {
    let newRecettes = {...recettes};

    newRecettes[key] = updatedRecette;

    setRecettes(newRecettes);
  } 

  const deleteRecette = key => {
    let newRecettes = {...recettes};
    delete newRecettes[key];

    setRecettes(newRecettes);
  }

  const handleLoadExamples = () => {
    setRecettes(exampleRecettes);
  }

  const recettesList = Object.keys(recettes).map(key => (
    <Card key={key} details={recettes[key]} />
  ));

  return (
    <div className='box'>
      <Header pseudo={pseudo} />
      <div className='cards'>
        {recettesList}
      </div>
      <Admin 
        pseudo={pseudo}
        recettes={recettes}
        handleLoadExamples={handleLoadExamples} 
        addRecette={addRecette} 
        updateRecette={updateRecette} 
        deleteRecette={deleteRecette} />
    </div>
  );
}

export default App;
