import React, { FunctionComponent, useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Container,Alert } from 'reactstrap';
import { useForm, Controller } from "react-hook-form";
import UserHelper from '../../helpers/UserHelper';
import {Credentials} from '../../services/User';
import {useUserManagement} from '../../components/User/Hook';


const Connection: FunctionComponent<{}> = () => {
  const [submitStatus, setSubmitStatus] = useState<Error | undefined>(undefined);
  const { register, control, handleSubmit, errors, formState } = useForm<Credentials>({
    mode: "onBlur"
  });
  const {getAccessToken,error} = useUserManagement();
  
  
  const onSubmit = async (data: Credentials) => {
    
    const token = await getAccessToken(data);
    if(token){
      UserHelper.connect(token);
      setSubmitStatus(undefined);
      window.location.href = "/search";
    }
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
          {formState.isSubmitted && !!!formState.isValid && <p className="error">Tous les champs sont obligatoires !</p>}
        </div>
        {error && <p className="error">{error.message}</p>}
        <Button color="warning" className="shadow-lg p-3 mb-5 bg-white rounded font-weight-bold d-block ml-auto mr-auto">Connexion</Button>
        <h6 className="text-danger mt-5 pt-5">* Champs obligatoires</h6>

      </Form>
    </Container>

  )
}

export default Connection;