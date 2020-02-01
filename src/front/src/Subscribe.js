import React from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';

const Subscribe = (props) => {
  return (
    <Form>
    <Row form>
      <Col md={6}>
        <FormGroup>
          <Label for="nomComplet">Nom complet*</Label>
          <Input type="nom" name="nom" id="nomComplet"/>
        </FormGroup>
      </Col>
      <Col md={6}>
        <FormGroup>
          <Label for="examplePassword">Nom d'utilisateur*</Label>
          <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
        </FormGroup>
      </Col>
    </Row>
    <FormGroup>
      <Label for="exampleAddress">Email*</Label>
      <Input type="text" name="address" id="exampleAddress" placeholder="1234 Main St"/>
    </FormGroup>
    <FormGroup>
      <Label for="exampleAddress2">Mot de passe*</Label>
      <Input type="text" name="address2" id="exampleAddress2" placeholder="Apartment, studio, or floor"/>
    </FormGroup>
    <Row form>
      <Col md={6}>
        <FormGroup>
          <Label for="exampleCity">Confirmation de mot de passe*</Label>
          <Input type="text" name="city" id="exampleCity"/>
        </FormGroup>
      </Col>
      
      
    </Row>
    <FormGroup check>
      <Input type="checkbox" name="check" id="exampleCheck"/>
      <Label for="exampleCheck" check>Je ne suis pas un robot.</Label>
    </FormGroup>
    <Button color="info">Envoyer</Button>
  </Form>
  );
}

export default Subscribe;




