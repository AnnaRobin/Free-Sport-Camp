import React from 'react';
import { Button, Form, FormGroup, Label, Input, Container} from 'reactstrap';
import { useForm } from "react-hook-form";


const Inscription = (props: any) => {
    return (
        <Container className="mt-5">
      <Form> 
      <h5 className="text-right">Vous posédez déjà un compte?  <a href="/connexion">Connectez-vous !</a> </h5>     
        <FormGroup>
          <Label for="name" className="font-weight-bold">Nom  complet *</Label>
          <Input type="text" name="name" id="name" placeholder="Arnold Smith" className="shadow p-3 mb-5 bg-white rounded" />
        </FormGroup>
        <FormGroup>
          <Label for="userName" className="font-weight-bold">Nom d'utilisateur *</Label>
          <Input type="text" name="userName" id="userName" placeholder="Arny" className="shadow p-3 mb-5 bg-white rounded"/>
        </FormGroup>
        <FormGroup>
          <Label for="email" className="font-weight-bold">Email *</Label>
          <Input type="email" name="email" id="email" placeholder="arnold.smith@monemail.com" className="shadow p-3 mb-5 bg-white rounded"/>
        </FormGroup>
        <FormGroup>
          <Label for="password" className="font-weight-bold">Mot de passe *</Label>
          <Input type="password" name="password" id="password" placeholder="Le mot de passe doit contenir au moins 5 caractères !"className="shadow p-3 mb-5 bg-white rounded" />
        </FormGroup>
        <FormGroup>
          <Label for="confirmation" className="font-weight-bold">Confirmation de mot de passe *</Label>
          <Input type="password" name="confirmation" id="confirmation" placeholder="Je confirme mon mot de passe" className="shadow p-3 mb-5 bg-white rounded"/>
        </FormGroup>
        <Button color="warning" className="shadow-lg p-3 mb-5 bg-white rounded font-weight-bold  justify-content-center align-items-center d-block ml-auto mr-auto" >Inscription</Button>
        <h6 className="text-danger">* Champs obligatoires</h6>
        
        </Form>
        </Container>
        
    )}
    

export default Inscription;