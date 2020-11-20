import React from 'react';
import { Button, Form, FormGroup, Label, Input, Container} from 'reactstrap';
import { useForm } from "react-hook-form";

const Connexion = (props: any) => {
    return(
        <Container className="mt-5 pt-5">
        <Form>
        <FormGroup>
          <Label for="userName" className="font-weight-bold">Nom d'utilisateur *</Label>
          <Input type="text" name="userName" id="userName" placeholder="Arny" className="shadow p-3 mb-5 bg-white rounded"/>
        </FormGroup>
        <FormGroup>
          <Label for="password" className="font-weight-bold">Mot de passe *</Label>
          <Input type="password" name="password" id="password" placeholder="Le mot de passe doit contenir au moins 5 caractères !" className="shadow p-3 mb-5 bg-white rounded" />
        </FormGroup>
        <Button color="warning" className="shadow-lg p-3 mb-5 bg-white rounded font-weight-bold d-block ml-auto mr-auto">Connexion</Button>
        <h6 className="text-danger mt-5 pt-5">* Champs obligatoires</h6>
        <h5 className="text-right mt-5 " >Vous n'avez pas encore de compte? <a href="/inscription">Inscrivez-vous !</a></h5>
        </Form>
        </Container>
    )
}

export default Connexion;