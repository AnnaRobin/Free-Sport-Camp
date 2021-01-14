import React, { FunctionComponent, useState } from 'react';
import { Col, Button, Form, FormGroup, Label, Input, Container, Row } from 'reactstrap';
import { Controller, useForm } from "react-hook-form";
import Select from '../../components/Select';
import useOptions from '../../components/Options';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { DevTool } from "@hookform/devtools";
import AjaxHelper from '../../components/AjaxHelper';

type CreatorParams = {
  cityId: any,
  levelId: any,
  sportId: any,
  appointment: any,
  time: any,
  phoneNumber: string,
  //showTelephone: any,
  description: string,
  newDate: any
}

const EventCreator: FunctionComponent<{}> = () => {

  const [submitStatus, setSubmitStatus] = useState<any | undefined>({status:null});
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>(undefined);
  const { sportOptions, cityOptions, levelOptions } = useOptions();
  const { register, control, handleSubmit, reset, errors, formState: { isSubmitted } } = useForm<CreatorParams>({
    mode: "onBlur"
  });



  const onSubmit = handleSubmit(({ cityId, levelId, sportId, appointment, time, phoneNumber, description }) => {
    
    //submit button is disabled with this status
    setSubmitStatus({ status: 'submitting'});
    AjaxHelper.fetch('http://localhost:8585/api/event/create','POST',true,{
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },JSON.stringify({ cityId, levelId, sportId, appointment, time, phoneNumber, description }))
      .then(function (response) {
        if (response.ok) {
          setSubmitStatus({ status: 'success', message: 'Votre événement a bien été enregistré !' });
          window.location.href = '/activities';
        }
        else {
          setSubmitStatus({ status: 'error', message: 'Veuillez remplir le formulaire correctement !' });
        }
        return response.json();
      })
      .then(function (json){
        console.log(json);
      })
      .catch(function(error) {
        setSubmitStatus({ status: 'error', message: error.message });
      });
  });

  const dateValidator = (newDate: any) => {
    return Date.parse(newDate) > Date.now();
  };



  return (
    <>
      {submitStatus && submitStatus.status === 'error' && <p className="alert alert-danger">{submitStatus.message}</p>}
      {submitStatus && submitStatus.status === 'success' && (
        <p className="alert alert-success">{submitStatus.message}</p>
      )}
      <Container className="mt-5 pt-5">
        <Form onSubmit={onSubmit}>
          <Row>
            <Col md={4}>
              <FormGroup >
                <Label for="sportId" className="font-weight-bold">Activité *</Label>
                <Controller
                  name="sportId"
                  control={control}
                  rules={{
                    required: true
                  }}
                  defaultValue=""
                  as={<Select name="sportId" label="" className="shadow  mb-5 bg-white rounded" options={sportOptions} register={register} />}
                />
                {errors.sportId && errors.sportId.message != '' && <p className="error">{errors.sportId.message}</p>}
              </FormGroup>
            </Col>

            <Col md={4}>
              <FormGroup >
                <Label for="levelId" className="font-weight-bold">Niveau *</Label>
                <Controller
                  name="levelId"
                  control={control}
                  rules={{
                    required: true
                  }}
                  defaultValue=""
                  as={<Select name="levelId" label="" className="shadow  mb-5 bg-white rounded" options={levelOptions} register={register} />}
                />
                {errors.levelId && errors.levelId.message != '' && <p className="error">{errors.levelId.message}</p>}
              </FormGroup>
            </Col>



            <Col md={4}>
              <FormGroup>
                <Label for="cityId" className="font-weight-bold">Ville *</Label>
                <Controller
                  name="cityId"
                  control={control}
                  rules={{
                    required: true
                  }}
                  defaultValue=""
                  as={<Select name="cityId" label="" className="shadow  mb-5 bg-white rounded" options={cityOptions} register={register} />}
                />
                {errors.cityId && errors.cityId.message != '' && <p className="error">{errors.cityId.message}</p>}
              </FormGroup>
            </Col>

          </Row>
          <Row>
            <Col md={6}>
              <FormGroup >
                <Label for="appointment" className="font-weight-bold">Date *</Label>
                <Controller
                  name="appointment"
                  control={control}
                  rules={{
                    required: true,
                    validate: dateValidator,
                    //     message: "Cette date est déjà passée !"
                  }}
                  defaultValue=""
                  as={<Input type="date" name="appointment" id="appointment" placeholder="" className="shadow p-3 mb-5 bg-white rounded" />}
                />
                {errors.appointment && errors.appointment.type === "validate" && (
                  <div className="error">"Cette date est déjà passée !"</div>)}
                {errors.appointment && errors.appointment.message != '' && <p className="error">{errors.appointment.message}</p>}
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="time" className="font-weight-bold">Time *</Label>
                <Controller
                  name="time"
                  control={control}
                  rules={{
                    required: true
                  }}
                  defaultValue=""
                  as={<Input type="time" name="time" id="time" placeholder="" className="shadow p-3 mb-5 bg-white rounded" />}
                />
                {errors.time && errors.time.message != '' && <p className="error">{errors.time.message}</p>}

              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <FormGroup className="mb-5">
                <Label for="phoneNumber" className="font-weight-bold">Numéro de téléphone *</Label>

                <Controller
                  name="phoneNumber"
                  control={control}
                  rules={{
                    required: true,
                    pattern: {
                      value: /^\d{11}$/,
                      message: "Le numéro de téléphone n'est pas valide !"
                    }
                  }}
                  defaultValue=""
                  as={<PhoneInput country={'fr'} onlyCountries={['fr']} placeholder="" onChange={setPhoneNumber} inputProps={{ className: "shadow p-3 mb-5 bg-white rounded form-control w-100" }} />}

                />
                {errors.phoneNumber && errors.phoneNumber.message != '' && <p className="error">{errors.phoneNumber.message}</p>}
              </FormGroup>
            </Col>

            <Col>
              <FormGroup check>
                <Input type="checkbox" id="checkbox" className="shadow p-3 mb-5 bg-white rounded" />
                <Controller
                  name="showTelephone"
                  control={control}

                  defaultValue=""
                  as={<Label id="labelId" for="checkbox" check className="font-weight-bold">Afficher mon numéro dans l'annonce</Label>}
                />

              </FormGroup>
            </Col>
          </Row>

          <FormGroup>
            <Label for="description" className="font-weight-bold">Information</Label>
            <Controller
              name="description"
              control={control}
              defaultValue=""
              as={<Input type="textarea" name="description" id="description" className="shadow p-3 mb-5 bg-white rounded" />}
            />
          </FormGroup>

          {(errors.sportId || errors.levelId || errors.cityId || errors.appointment || errors.time || errors.phoneNumber) && isSubmitted && <span style={{ color: "red" }}>  ⚠ Les champs (*) sont obligatoires !</span>}


          <Row>
            <Col>
              <Button disabled={submitStatus.status=="submitting"}type="submit" color="warning" className="shadow-lg p-3 mb-5 bg-white rounded font-weight-bold d-block ml-auto mr-5">Envoyer</Button>
            </Col>

            <Col>
              <Controller
                name="resetButton"
                control={control}
                onClick={() => reset({
                  sportId: "",
                  levelId: "",
                  cityId: "",
                  time: "",
                  appointment: "",
                  phoneNumber: "",
                  //showTelephone: "",
                  description: ""

                })}
                as={<Button color="warning" className="shadow-lg p-3 mb-5 bg-white rounded font-weight-bold d-block ml-5 mr-auto">Annuler</Button>}
              />
            </Col>
          </Row>

          <h6 className="text-danger mt-5 pt-5">* Champs obligatoires</h6>
        </Form>
      </Container>
      <DevTool control={control} />
    </>
  );
}

export default EventCreator;