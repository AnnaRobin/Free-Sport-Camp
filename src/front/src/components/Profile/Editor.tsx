import React, { FunctionComponent, useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Alert, InputGroup,InputGroupAddon, InputGroupText } from 'reactstrap';
import { Controller, useForm } from "react-hook-form";
import Select from '../../components/Select';
import useOptions from '../../components/Options';
import useProfile from '../../components/Profile/Hook';
import { ProfileParams } from '../../services/Profile';
import { useHistory } from 'react-router-dom';

export const Editor: FunctionComponent<{}> = () => {
  const { cityOptions, genderOptions } = useOptions();
  const { get, save, profile, error, prefix } = useProfile();
  const { register, control, handleSubmit, errors, setValue, formState } = useForm<ProfileParams>({
    mode: "onBlur"
  });
  const history = useHistory();

  useEffect(() => {
    //prefill form as soon as options are loaded
    if (cityOptions.length) {
      get();
    }

  }, [cityOptions])

  useEffect(() => {
    setValue('presentation', profile?.presentation);
    if(profile?.phoneNumber && profile.phoneNumber.startsWith(prefix)){
      setValue('phoneNumber', profile?.phoneNumber?.slice(prefix.length));
    }
    else{
      setValue('phoneNumber', profile?.phoneNumber);
    }
    
    setValue('cityId', profile?.cityId);
    setValue('sex', profile?.sex);
    setValue('birthDate', profile?.birthDate);
  }, [profile])

  const onSubmit = handleSubmit(async (formDatas: ProfileParams) => {
    if (await save(formDatas)) {
      history.push('/profile');
    }
  });


  const dateValidator = (newDate: any) => {
    return newDate == null ||  Date.parse(newDate) < Date.now();
};

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
              as={<Input type="textarea" name="presentation" id="presentation" className="shadow p-3 mb-5 bg-white rounded" register={register} />}
            />
          </FormGroup>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="birthDate" className="font-weight-bold">Date de naissance</Label>
                <Controller
                  name="birthDate"
                  control={control}
                  rules={{
                    required: false,
                    validate: dateValidator,
                    //     message: "Cette date est déjà passée !"
                  }}
                  defaultValue=""
                  as={<Input type="date" name="birthDate" id="birthdate" className="shadow p-3 mb-5 bg-white rounded" register={register} />}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="sex" className="font-weight-bold">Genre</Label>
                <Controller
                  name="sex"
                  control={control}
                  as={<Select name="sex" label="" className="shadow mb-5 bg-white rounded" options={genderOptions} register={register} />}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="cityId" className="font-weight-bold">Ville</Label>
                <Controller
                  name="cityId"
                  control={control}
                  rules={{
                    required: false
                  }}
                  as={<Select name="cityId" label="" className="shadow  mb-5 bg-white rounded" options={cityOptions} register={register} />}
                />
                {errors.cityId && errors.cityId.message != '' && <p className="error">{errors.cityId.message}</p>}
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup className="mb-5">
                <Label for="phoneNumber" className="font-weight-bold">Numéro de téléphone</Label>
                <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>+{prefix}</InputGroupText>
        </InputGroupAddon>
                <Controller
                  name="phoneNumber"
                  control={control}
                  rules={{
                    required: false,
                    pattern: {
                      value: /^(\d{9}?)$/,
                      message: "Le numéro de téléphone n'est pas valide !"
                    }
                  }}
                  defaultValue=""
                  as={<Input placeholder="6XXXXXXXXX" type="tel" maxlength="9" name="phoneNumber" className="shadow bg-white rounded form-control" register={register} />}
                />
                </InputGroup>
                {errors.phoneNumber && errors.phoneNumber.message != '' && <p className="error">{errors.phoneNumber.message}</p>}
              </FormGroup>
            </Col>
          </Row>
          <Row className="d-flex justify-content-center">
            <Button disabled={formState.isSubmitting} type="submit" color="warning" className="shadow-lg p-3 mb-5 bg-white rounded font-weight-bold d-flex justify-content-center">Envoyer</Button>
          </Row>
          {error && <p className="error">{error.message}</p>}
        </Form>
      </Container>
    </>
  );
}