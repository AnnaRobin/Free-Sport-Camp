import React from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText, Container, Row } from 'reactstrap';
import { useForm } from "react-hook-form";

const Creation = (props: any) => {
    



  return (
    <Container className="mt-5 pt-5">
    <Form>
      <FormGroup row>
        
      <Label for="activity" sm={2} className="font-weight-bold">Activité *</Label>
        <Col sm={10}>
        <Input type="select" name="activity" id="activity" className="shadow p-3 mb-5 bg-white rounded">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
        </Input>
        </Col>
        </FormGroup>
        <FormGroup row>
        <Label for="level" sm={2} className="font-weight-bold">Niveau *</Label>
        <Col sm={10}>
        <Input type="select" name="activity" id="activity" className="shadow p-3 mb-5 bg-white rounded">
            <option>1</option>
            <option>2</option>
            <option>3</option>
        </Input>
        </Col>
      </FormGroup>
    
      <FormGroup row>
        <Label for="city" sm={2} className="font-weight-bold">Ville *</Label>
        <Col sm={10}>
          <Input type="select" name="city" id="city" className="shadow p-3 mb-5 bg-white rounded">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            
          </Input>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="timeSlot" sm={2} className="font-weight-bold">Créneau *</Label>
        <Col sm={10}>
          <Input type="select" name="timeSlot" id="timeSlot" className="shadow p-3 mb-5 bg-white rounded">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            
          </Input>
        </Col>
      </FormGroup>
    
      <FormGroup row>
        <Label for="datetime" sm={2} className="font-weight-bold">Date  & time de début *</Label>
        <Col sm={10}>
        <Input type="datetime" name="datetime" id="datetime" placeholder="datetime"className="shadow p-3 mb-5 bg-white rounded"/>
        </Col>
      </FormGroup>
      <FormGroup row>
     
       
        <Col sm={{ size: 10 }}>
          <FormGroup check>
            <Label check className="font-weight-bold">
              <Input type="checkbox" id="checkbox" className="shadow p-3 mb-5 bg-white rounded"/>{' '}
              Afficher mon numéro dans l'annonce
            </Label>
          </FormGroup>
        </Col>
     
      </FormGroup>
      <FormGroup row>
       
      </FormGroup>
      <FormGroup row>
        <Label for="infos" sm={2} className="font-weight-bold">à savoir</Label>
        <Col sm={10}>
          <Input type="textarea" name="infos" id="infos" className="shadow p-3 mb-5 bg-white rounded" />
        </Col>
      </FormGroup>
  
      <Row form>
      
        <Col md={6}>
        <FormGroup>
        <Button color="warning" className="shadow-lg p-3 mb-5 bg-white rounded font-weight-bold d-block ml-auto mr-auto">Envoyer</Button>
        </FormGroup>
            </Col>
            <Col md={6}>
            <FormGroup>
        <Button color="warning" className="shadow-lg p-3 mb-5 bg-white rounded font-weight-bold d-block ml-auto mr-auto">Annuler</Button>
        </FormGroup>
        </Col>
       
      </Row>
      <h6 className="text-danger mt-5 pt-5">* Champs obligatoires</h6>
    </Form>
    </Container>
  );
}


    



export default Creation;