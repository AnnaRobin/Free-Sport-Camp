import React, { FunctionComponent, useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';
import { useForm, Controller } from "react-hook-form";
import { access } from 'fs';
import { AsyncLocalStorage } from 'async_hooks';
import UserHelper from '../../components/UserHelper';
import AjaxHelper from '../../components/AjaxHelper';
type Inputs = {
  client_id: any,
  grant_type: any,
  userName: string,
  password: string
};

const Connection: FunctionComponent<{}> = () => {
  const [submitStatus, setSubmitStatus] = useState<any | undefined>(undefined);
  const { register, control, handleSubmit, errors } = useForm<Inputs>({
    mode: "onBlur"
  });
  const onSubmit = (data: Inputs) => {
    AjaxHelper.fetch('http://localhost:8585/oauth/token',
      'POST',
      false,
      {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      "username=" + data.userName
      + "&password=" + data.password
      + "&client_id=" + data.client_id
      + "&grant_type=" + data.grant_type)
      .then(function (response) {
        if (response.ok) {

          // setSubmitStatus({ status: 'success', message: "" })
          return response.json();
        }
        else {
          setSubmitStatus({ status: 'error', message: ' !' });
        }

      })
      .then(function (json) {
        const token = json.access_token;
        UserHelper.connect(token);
        window.location.href = "/search";
      });
  }

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
            rules={{ required: true }}
            defaultValue=""
            as={<Input type="text" id="userName" placeholder="nom d'utilisateur" className="shadow p-3 mb-5 bg-white rounded" />}
          />
        </FormGroup>
        <FormGroup>
          <Label for="password" className="font-weight-bold">Mot de passe *</Label>
          <Controller
            name="password"
            control={control}
            rules={{ required: true }}
            defaultValue=""
            as={<Input type="password" id="password" placeholder="mot de passe" className="shadow p-3 mb-5 bg-white rounded" />}
          />

        </FormGroup>
        {/* {(errors.userName || errors.password) && <span>Veuillez remplir le champs !</span>} */}

        <div style={{ color: "red" }}>
          {Object.keys(errors).length > 0 &&
            " ⚠Tous les champs sont obligatoires !"}
        </div>

        <Button color="warning" className="shadow-lg p-3 mb-5 bg-white rounded font-weight-bold d-block ml-auto mr-auto">Connexion</Button>
        <h6 className="text-danger mt-5 pt-5">* Champs obligatoires</h6>

      </Form>
    </Container>

  )
}

export default Connection;