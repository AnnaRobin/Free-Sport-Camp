import React from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input, Badge, Container, Nav, NavItem, NavLink } from 'reactstrap';

const Subscribe = (props) => {
  return (
   
    <Form>
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
          <Label for="Password">Nom d'utilisateur*</Label>
          <Input type="password" name="password" id="Password" placeholder="Jonny" required/>
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
      <Input type="password" name="address2" id="MotDePasse" required/>
    </FormGroup>
    </Col>
    <Col md={6}>
      
        <FormGroup>
          <Label for="ConfMotDePasse">Confirmation de mot de passe*</Label>
          <Input type="password" name="city" id="examplConfMotDePasseeCity" required/>
        </FormGroup>
      
      
      </Col>
    <FormGroup check>
      <Input type="checkbox" name="check" id="exampleCheck"/>
      <Label for="exampleCheck" check>Je ne suis pas un robot.</Label>
    </FormGroup>
   
    <Col  md={{ size: 2, offset: 5 }} xs={{ size: 2, offset: 5 }}> <Button color="info" >Envoyer</Button></Col>
    <Row>
    <h5 style={{ paddingLeft:'400px'}}>Vous posédez déjà un compte?<Badge color="secondary"></Badge></h5>
    <h5><NavLink href="#" style={{padding: '0px', paddingLeft:'10px'}}>Connectez-vous</NavLink></h5>

    </Row>
  
  </Form>
  );
}

export default Subscribe;




