import React, { FunctionComponent, useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container,Col,Row } from 'reactstrap';
import AjaxHelper from '../../helpers/AjaxHelper';
import { Controller, useForm } from "react-hook-form";
import Select from '../../components/Select';
import PhoneInput from 'react-phone-input-2'
import useOptions from '../../components/Options';
import useProfile from '../../components/Profile';

type ProfileParams = {
    presentation: string,
    phoneNumber: string,
    cityId: number
  }

export const Editor: FunctionComponent<{}> = ({ }) => {
    const [submitStatus, setSubmitStatus] = useState<any | undefined>({status:null});
    const { cityOptions } = useOptions();
    const { get, profile} = useProfile();
    const [phoneNumber, setPhoneNumber] = useState<string | undefined>(undefined);
    const { register, control, handleSubmit, errors, setValue } = useForm<ProfileParams>({
      mode: "onBlur"
    });
    
    useEffect(() => {
      //prefill form as soon as options are loaded
      if(cityOptions.length){
        get();
      }
      
    }, [cityOptions])

    useEffect(() => {
      setValue('presentation',profile?.presentation);
      setValue('phoneNumber',profile?.phoneNumber);
      setValue('cityId', profile?.cityId);
    }, [profile])

    const onSubmit = handleSubmit(({presentation,cityId,phoneNumber}) => {
        AjaxHelper.fetch('http://localhost:8585/api/profile/update','POST',true,{
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },JSON.stringify({presentation,cityId,phoneNumber}))
            .then(function (response) {
              if (response.ok) {
                setSubmitStatus({ status: 'success', message: 'Votre profil a été mis à jour !' });
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
  
    return (
        <>
          <Container className="mt-5 pt-5">
            <Form onSubmit={onSubmit}>
                <FormGroup>
                <Label for="presentation" className="font-weight-bold">Presentation</Label>
                <Controller
                  name="presentation"
                  control={control}
                  defaultValue=""
                  as={<Input type="textarea" name="presentation" id="presentation" className="shadow p-3 mb-5 bg-white rounded" register={register}/>}
                />
              </FormGroup>
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
             
                <Row className="d-flex justify-content-center">
                <Button disabled={submitStatus.status=="submitting"}type="submit" color="warning" className="shadow-lg p-3 mb-5 bg-white rounded font-weight-bold d-flex justify-content-center">Envoyer</Button>
                </Row>
                  
                
              
            </Form>
          </Container>
        </>
      );


}