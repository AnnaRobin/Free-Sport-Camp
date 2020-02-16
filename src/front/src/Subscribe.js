import React from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input, Badge, NavLink } from 'reactstrap';

const Subscribe = (props) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    let data = {};
    const formData = new FormData(event.target);
    formData.forEach((value, key) => {data[key] = value});
    fetch('//localhost:8585/members', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  }
  return (
   
    <Form onSubmit={handleSubmit}>
      <h5 style={{ paddingLeft:'400px'}}  md={{ size: 2, offset: 5 }} xs={{ size: 2, offset: 5 }}>Connectez-vous avec un autre compte<Badge color="secondary"></Badge></h5>
    <div> 
      <Col  md={{ size: 2, offset: 5 }} xs={{ size: 2, offset: 5 }}><h2>Inscription<Badge color="secondary"></Badge></h2> </Col>
   </div>
    <Row form>
      
      <Col md={6}>
        <FormGroup>
          <Label for="nomComplet">Nom complet*</Label>
          <Input type="nom" name="nom" id="nomComplet" placeholder="John Connor" required/>
        </FormGroup>
      </Col>
      
      <Col md={6}>
        <FormGroup>
          <Label for="userName">Nom d'utilisateur*</Label>
          <Input type="nom" name="userName" id="userName" placeholder="Jonny" required/>
        </FormGroup>
      </Col>
    </Row>
    <Col md={6}>
    
    <FormGroup>
      <Label for="Email">Email*</Label>
      <Input type="email" name="Email" id="Email" placeholder="john.connor@myemail.com" required/>
    </FormGroup>
    
    <FormGroup>
      <Label for="MotDePasse">Mot de passe*</Label>
      <Input type="password" name="password" id="MotDePasse" placeholder="Mot de passe" required/>
    </FormGroup>
    </Col>
    
    <Col md={6}>
      
        <FormGroup>
          <Label for="ConfMotDePasse">Confirmation de mot de passe*</Label>
          <Input type="password" name="ConfMotDePasse" id="examplConfMotDePasseeCity" placeholder="Confirmation de mot de passe" required/>
        </FormGroup>
      
      
      </Col>
    <FormGroup check>
      <Input type="checkbox" name="check" id="exampleCheck"/>
      <Label for="exampleCheck" check>Je ne suis pas un robot.</Label>
    </FormGroup>
    
    <Col  md={{ size: 2, offset: 5 }} xs={{ size: 2, offset: 5 }}> <Button color="info" >Envoyer</Button></Col>
    <Row>
    <h5 style={{ paddingLeft:'400px'}}>Vous possédez déjà un compte?<Badge color="secondary"></Badge></h5>
    <h5><NavLink href="#" style={{padding: '0px', paddingLeft:'10px'}}>Connectez-vous</NavLink></h5>

    </Row>
  
  </Form>
  );
}

export default Subscribe;




