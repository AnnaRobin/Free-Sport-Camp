import React from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText, Container, Row } from 'reactstrap';
import { useForm } from "react-hook-form";

const Creation = (props: any) => {
    



  return (
    <Container className="mt-5 pt-5">
    <Form>
      <Row>
        <Col md={6}>
          <FormGroup >
            <Label for="activity"  className="font-weight-bold">Activité *</Label>
      
        <Input type="select" name="activity" id="activity" className="shadow p-3 mb-5 bg-white rounded">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
        </Input>
        
        </FormGroup>
      </Col>
      
      <Col md={6}>
        <FormGroup >
        <Label for="level" className="font-weight-bold">Niveau *</Label>
       
        <Input type="select" name="activity" id="activity" className="shadow p-3 mb-5 bg-white rounded">
            <option>1</option>
            <option>2</option>
            <option>3</option>
        </Input>
      
      </FormGroup>
    </Col>
    </Row>

    <Row>
    <Col md={6}>
      <FormGroup>
        <Label for="city" className="font-weight-bold">Ville *</Label>
        
          <Input type="select" name="city" id="city" className="shadow p-3 mb-5 bg-white rounded">
            <option>1</option>
            <option>2</option>
            <option>3</option> 
          </Input>
        
      </FormGroup>
      </Col>
      <Col>
      <FormGroup>
        <Label for="timeSlot"  className="font-weight-bold">Créneau *</Label>
        
          <Input type="select" name="timeSlot" id="timeSlot" className="shadow p-3 mb-5 bg-white rounded">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            
          </Input>
         </FormGroup>
         </Col>
         </Row>
    
      <FormGroup row>
        <Label for="datetime"  className="font-weight-bold">Date  & time de début *</Label>
        
        <Input type="text" name="datetime" id="datetime" placeholder="datetime"className="shadow p-3 mb-5 bg-white rounded"/>
        
      </FormGroup>


      <Row>
        <Col md={6}>

        <FormGroup>
        <Label for="telephone"  className="font-weight-bold">Numéro de téléphone *</Label>
        
        <Input type="text" name="telephone" id="telephone" placeholder=""className="shadow p-3 mb-5 bg-white rounded"/>
        </FormGroup>
        </Col>
      
      <Col>
      <FormGroup>
        
          <FormGroup check>
          <Input type="checkbox" id="checkbox" className="shadow p-3 mb-5 bg-white rounded"/>
            <Label id="labelId" for="checkbox" check className="font-weight-bold">Afficher mon numéro dans l'annonce</Label>
           
          </FormGroup>
        
        </FormGroup>
     </Col>
      </Row>



  
      <FormGroup>
        <Label for="infos"  className="font-weight-bold">Information</Label>
        <Col >
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