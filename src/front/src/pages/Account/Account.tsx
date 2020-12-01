import React from 'react';


const Account = (props: any) => {


return(
<div className="list-group" id="sub_menu">
  <button type="button" className="font-weight-bolder list-group-item list-group-item-action">Mes activités</button>
  <button type="button" className="font-weight-bolder list-group-item list-group-item-action">Mes annonces</button>
  <button type="button" className="font-weight-bolder list-group-item list-group-item-action">Mon profil</button>
  <button type="button" className="font-weight-bolder list-group-item list-group-item-action">Editer mon profil</button>
  <button type="button" className="font-weight-bolder list-group-item list-group-item-action">Mot de passe</button>
  <button type="button" className="font-weight-bolder list-group-item list-group-item-action">Désactiver mon profil</button>
</div>
);



};

export default Account;