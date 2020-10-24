import React,  { FunctionComponent, useState}  from 'react';
import { Jumbotron, Button } from 'reactstrap';


   


const SearchBar: FunctionComponent<{}> = () => {

  
    return (
        <Jumbotron className="mt-5">  
      <form className="container">  
      <div className="row">
          
              <div className="col-sm text-center">
      <select className="form-control">
          <option value="grapefruit">Liste ds activités</option>
          <option value="lime">Course à pieds</option>
          <option value="coconut">Football </option>
          <option value="mango">Ping-pong </option>
          <option value="mango">Baby-foot </option>
      </select>
      </div>
      <div className="col-sm text-center">
           <select className="form-control">
           <option value="grapefruit">Niveau</option>
           <option value="lime">Débutant </option>
           <option value="coconut">Intermédiaire</option>
           <option value="mango">Expert</option>
       </select>
       </div>
       <div className="col-sm text-center">
       <select className="form-control">
           <option value="grapefruit">Lieu</option>
           <option value="lime">Fontenay</option>
           <option value="coconut">La Défense</option>
           <option value="mango">Boulogne</option>
       </select>
       </div>
       <div className="col-sm text-center">
       <select className="form-control">
           <option value="grapefruit">Créneau</option>
           <option value="lime">Matin</option>
           <option value="coconut">Midi</option>
           <option value="mango">Soir</option>
       </select>
       </div>
       
       <div className="col-sm text-center">
       <Button color="secondary">Rechercher</Button>{' '}
       </div>
       </div>
</form>
</Jumbotron>
     );
   };



 export default SearchBar;




