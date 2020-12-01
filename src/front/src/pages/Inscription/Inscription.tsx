import React from 'react';
import { Button, Form, FormGroup, Label, Input, Container} from 'reactstrap';
import { useForm, Controller } from "react-hook-form";

type Inputs ={
  client_id: any,
  grant_type: any,
  name: string,
  userName: string,
  email: string,
  password: string,
  confirmation: string
}


const Inscription = (props: any) => {

  const { register, control, handleSubmit, errors, getValues, reset, formState: { isSubmitted } } = useForm<Inputs>({
    mode: "onBlur"
  });
  const onSubmit = (data: any) => {
    alert(JSON.stringify(data));
    reset();

  };


  console.log(errors)
    return (
        <Container className="mt-5">
      <Form onSubmit={handleSubmit(onSubmit)}> 
      <h5 className="text-right">Vous posédez déjà un compte?  <a href="/connexion">Connectez-vous !</a> </h5> 
      <FormGroup>
          <input type="hidden" name="client_id" value="my-client-app" id="clientId" ref={register} />
          <input type="hidden" name="grant_type" value="password" id="grantType" ref={register} />
        </FormGroup>    
        <FormGroup>
          <Label for="name" className="font-weight-bold">Nom  complet *</Label>
          <Controller
          name="name"
          control={control}
          rules={{ required : true, maxLength: { value: 45, message: "Votre nom ne doit pas contenir plus que 45 charachtères !"},      
           pattern: {
             value: /[a-zàáâãäåçèéêëìíîïðòóôõöùúûüýÿ]+\s[a-zàáâãäåçèéêëìíîïðòóôõöùúûüýÿ]+$/i, 
             message:" Êtes vous sûr ? "}
          }}
          defaultValue=""
          as={<Input type="text" name="name" id="name" placeholder="Prénom Nom" className="shadow p-3 mb-5 bg-white rounded" />}
          />
          {errors.name && errors.name.message != '' && <p className="error">{errors.name.message}</p>}
        </FormGroup>
        <FormGroup>
          <Label for="userName" className="font-weight-bold">Nom d'utilisateur *</Label>
          <Controller
            name="userName"
            control={control}
            rules={{ required: true, maxLength: { value: 45, message: " Votre nom d'utilisateur ne doit contenir plus que 45 charachtères !"} }}
            defaultValue=""
            as={<Input type="text" id="userName" placeholder="Soyez créatifs ! ;)" className="shadow p-3 mb-5 bg-white rounded" />}
          />
          {errors.userName && errors.userName.message != '' && <p className="error">{errors.userName.message}</p>}
        </FormGroup>
        <FormGroup>
          <Label for="email" className="font-weight-bold">Email *</Label>
          <Controller
          name="email"
          control={control}
          rules={{ required: true, pattern: {
            value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
            message: "Le format de votre adresse email n'est pas valide !"
          } }}
          defaultValue=""  
         as={<Input type="email" name="email" id="email" placeholder="Faites attention au format !" className="shadow p-3 mb-5 bg-white rounded"/>}
           />    
           {errors.email && errors.email.message != '' && <p className="error">{errors.email.message}</p>}  
        </FormGroup>
        <FormGroup>
          <Label for="password" className="font-weight-bold">Mot de passe *</Label>
          <Controller
            name="password"
            control={control}
            rules={{ required: true, maxLength: { value: 45, message: "Votre mot de passe ne doit contenir plus que 45 charachtères !"}, minLength: { value: 5, message: "⚠ Votre mot de passe doit contenir au moins 5 caractères !"}}}
            defaultValue=""
            as={<Input type="password" id="password" placeholder="Le mot de passe doit contenir au moins 5 caractères !" className="shadow p-3 mb-5 bg-white rounded" />}
          />    
           {errors.password && errors.password.message != '' && <p className="error">{errors.password.message}</p>}     
          </FormGroup>
        <FormGroup>
          <Label for="confirmation" className="font-weight-bold">Confirmation de mot de passe *</Label>
          <Controller
            name="confirmation"
            control={control}
            rules={{ required: true, 
              validate :{

                matchesPreviousPassword: value => {
                  const { password } = getValues();
                  return password === value || "La confirmation du mot de passe ne correspond pas !";
                }
            }}}
            defaultValue=""
            as={<Input type="password" id="confirmation" placeholder="Confirmez votre mot de passe !" className="shadow p-3 mb-5 bg-white rounded" />}
          />    
           {errors.confirmation && errors.confirmation.message != '' && <p className="error">{errors.confirmation.message}</p>}  
      
        </FormGroup>

      {(errors.name || errors.userName || errors.email || errors.password || errors.confirmation) && isSubmitted && <span style={{ color: "red" }}>  ⚠ Tous les champs sont obligatoires !</span>}

{/* <         div style={{ color: "red" }}>
          {Object.keys(errors).length > 0 &&
           " ⚠Tous les champs sont obligatoires !"}
        </div> */}

        <Button type="submit"  color="warning" className="shadow-lg p-3 mb-5 bg-white rounded font-weight-bold  justify-content-center align-items-center d-block ml-auto mr-auto" >Inscription</Button>
        <h6 className="text-danger">* Champs obligatoires</h6>
        
        </Form>
        </Container>
        
    )}
    

export default Inscription;