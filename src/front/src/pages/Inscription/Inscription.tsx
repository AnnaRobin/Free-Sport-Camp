import React, { FunctionComponent, useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';
import { useForm, Controller } from "react-hook-form";

type Inputs = {
  client_id: any,
  grant_type: any,
  name: string,
  userName: string,
  email: string,
  password: string,
  confirmation: string
}


const Inscription: FunctionComponent<{}> = () => {
  const [submitStatus, setSubmitStatus] = useState<any | undefined>(undefined);
  const { register, control, handleSubmit, errors, getValues, reset, formState: { isSubmitted } } = useForm<Inputs>({
    mode: "onBlur"
  });
  const onSubmit = (data: any) => {

    return fetch('http://localhost:8585/api/user', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(function (response) {
        if (response.ok) {
          window.location.href = "http://localhost:3000/connection"
          //   setSubmitStatus({ status: 'success', message: 'Votre inscription a bien été enregistré ! Vous pouvez vous connecter' });
        }
        else {
          setSubmitStatus({ status: 'error', message: 'Veuillez remplir le formulaire correctement !' });
        }
        //return response.json();
      });
    /*
    .then(function(data) {
      console.log(data);
        
      if (data.statusCode) {
        setSubmitStatus({ status: 'error', message: 'Veuillez remplir le formulaire correctement !' });
      } else {
        setSubmitStatus({ status: 'success', message: 'Votre inscription a bien été enregistré ! Vous pouvez vous connecter' });
        
      }
      
    });*/

  }

  return (
    <>
      {submitStatus && submitStatus.status === 'error' && <p className="alert alert-danger">{submitStatus.message}</p>}
      {submitStatus && submitStatus.status === 'success' && (
        <p className="alert alert-success">{submitStatus.message}</p>
      )}
      <Container className="mt-5">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <h5 className="text-right">Vous posédez déjà un compte?  <a href="/connection">Connectez-vous !</a> </h5>
          <FormGroup>
            <input type="hidden" name="client_id" value="my-client-app" id="clientId" ref={register} />
            <input type="hidden" name="grant_type" value="password" id="grantType" ref={register} />
          </FormGroup>
          <FormGroup>
            <Label for="fullName" className="font-weight-bold">Nom  complet *</Label>
            <Controller
              name="fullName"
              control={control}
              rules={{
                required: true, maxLength: { value: 45, message: "Votre nom ne doit pas contenir plus que 45 charachtères !" },
                pattern: {
                  value: /[a-zàáâãäåçèéêëìíîïðòóôõöùúûüýÿ]+\s[a-zàáâãäåçèéêëìíîïðòóôõöùúûüýÿ]+$/i,
                  message: " Êtes vous sûr ? "
                }
              }}
              defaultValue=""
              as={<Input type="text" name="fullName" id="fullName" placeholder="Prénom Nom" className="shadow p-3 mb-5 bg-white rounded" />}
            />
            {errors.name && errors.name.message !== '' && <p className="error">{errors.name.message}</p>}
          </FormGroup>
          <FormGroup>
            <Label for="userName" className="font-weight-bold">Nom d'utilisateur *</Label>
            <Controller
              name="userName"
              control={control}
              rules={{ required: true, maxLength: { value: 45, message: " Votre nom d'utilisateur ne doit contenir plus que 45 charachtères !" } }}
              defaultValue=""
              as={<Input type="text" id="userName" placeholder="Soyez créatifs ! ;)" className="shadow p-3 mb-5 bg-white rounded" />}
            />
            {errors.userName && errors.userName.message !== '' && <p className="error">{errors.userName.message}</p>}
          </FormGroup>
          <FormGroup>
            <Label for="email" className="font-weight-bold">Email *</Label>
            <Controller
              name="email"
              control={control}
              rules={{
                required: true, maxLength: { value: 45, message: "Votre email ne doit pas contenir plus que 45 charachtères !" },
                pattern: {
                  value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  message: "Le format de votre adresse email n'est pas valide !"
                }
              }}
              defaultValue=""
              as={<Input type="email" name="email" id="email" placeholder="Faites attention au format !" className="shadow p-3 mb-5 bg-white rounded" />}
            />
            {errors.email && errors.email.message !== '' && <p className="error">{errors.email.message}</p>}
          </FormGroup>
          <FormGroup>
            <Label for="password" className="font-weight-bold">Mot de passe *</Label>
            <Controller
              name="password"
              control={control}
              rules={{ required: true, maxLength: { value: 45, message: "Votre mot de passe ne doit contenir plus que 45 charachtères !" }, minLength: { value: 5, message: "Votre mot de passe doit contenir au moins 5 caractères !" } }}
              defaultValue=""
              as={<Input type="password" id="password" placeholder="Le mot de passe doit contenir au moins 5 caractères !" className="shadow p-3 mb-5 bg-white rounded" />}
            />
            {errors.password && errors.password.message !== '' && <p className="error">{errors.password.message}</p>}
          </FormGroup>
          <FormGroup>
            <Label for="confirmation" className="font-weight-bold">Confirmation de mot de passe *</Label>
            <Controller
              name="confirmation"
              control={control}
              rules={{
                required: true,
                validate: {

                  matchesPreviousPassword: value => {
                    const { password } = getValues();
                    return password === value || "La confirmation du mot de passe ne correspond pas !";
                  }
                }
              }}
              defaultValue=""
              as={<Input type="password" id="confirmation" placeholder="Confirmez votre mot de passe !" className="shadow p-3 mb-5 bg-white rounded" />}
            />
            {errors.confirmation && errors.confirmation.message !== '' && <p className="error">{errors.confirmation.message}</p>}

          </FormGroup>

          {(errors.name || errors.userName || errors.email || errors.password || errors.confirmation) && isSubmitted && <span style={{ color: "red" }}>  ⚠ Tous les champs sont obligatoires !</span>}



          <Button type="submit" color="warning" className="shadow-lg p-3 mb-5 bg-white rounded font-weight-bold  justify-content-center align-items-center d-block ml-auto mr-auto" >Inscription</Button>
          <h6 className="text-danger">* Champs obligatoires</h6>

        </Form>
      </Container>
    </>
  )
};


export default Inscription;