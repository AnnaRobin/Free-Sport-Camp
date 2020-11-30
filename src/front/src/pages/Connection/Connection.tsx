import React from 'react';
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';
import { useForm, Controller } from "react-hook-form";

type Inputs = {
  client_id: any,
  grant_type: any,
  userName: string,
  password: string,
  color: any
};

const Connection = (props: any) => {

  const { register, control, handleSubmit, errors } = useForm<Inputs>();
  const onSubmit = (data: any) => {
    alert(JSON.stringify(data));
  };


  console.log(errors)

  return (

    <Container className="mt-5">
      <Form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
        <h5 className="text-right mt-5 pt-5" >Vous n'avez pas encore de compte? <a href="/inscription">Inscrivez-vous !</a></h5>
        <FormGroup>
          <input type="hidden" name="client_id" value="my-client-app" id="clientId" ref={register} />
          <input type="hidden" name="grant_type" value="password" id="grantType" ref={register} />
        </FormGroup>
        <FormGroup className="mt-5">
          <Label for="userName" className="font-weight-bold">Nom d'utilisateur *</Label>
          <Controller
            name="userName"
            control={control}
            rules={{ required: true, maxLength: 45 }}
            defaultValue=""
            as={<Input type="text" id="userName" placeholder="Arny" className="shadow p-3 mb-5 bg-white rounded" />}
          />
          {errors.userName && <p>{errors.userName.message}</p>}

        </FormGroup>
        <FormGroup>
          <Label for="password" className="font-weight-bold">Mot de passe *</Label>
          <Controller
            name="password"
            control={control}
            rules={{ required: true, maxLength: 45, minLength: { value: 5, message: "Le mot de passe doit contenir au moins 5 caractères !"}}}
            defaultValue=""
            as={<Input type="password" id="password" placeholder="Le mot de passe doit contenir au moins 5 caractères !" className="shadow p-3 mb-5 bg-white rounded" />}
          />  
          <div style={{ color: "red" }}>
          {errors.password && <p>{errors.password.message}</p>}
          </div>
        </FormGroup>
        {(errors.userName || errors.password) && <span>Veuillez remplir le champs !</span>}

        <div style={{ color: "red" }}>
          {Object.keys(errors).length > 0 &&
            "Nom d'utilisateur ou mot de passe incorrect !"}
        </div>

        <Button color="warning" className="shadow-lg p-3 mb-5 bg-white rounded font-weight-bold d-block ml-auto mr-auto">Connexion</Button>
        <h6 className="text-danger mt-5 pt-5">* Champs obligatoires</h6>

      </Form>
    </Container>

  )
}

export default Connection;