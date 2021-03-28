import React, { FunctionComponent, useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Alert } from 'reactstrap';
import { Controller, useForm } from "react-hook-form";
import Select from '../../components/Select';
import PhoneInput from 'react-phone-input-2'
import useOptions from '../../components/Options';
import useProfile from '../../components/Profile/Hook';
import {ProfileParams} from '../../services/profile.service';
import { useHistory } from 'react-router-dom';

export const Editor: FunctionComponent<{}> = () => {
  const [submitStatus, setSubmitStatus] = useState<any | undefined>({ status: null });
  const { cityOptions, genderOptions } = useOptions();
  const { get, save, profile, error } = useProfile();
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>(undefined);
  const { register, control, handleSubmit, errors, setValue } = useForm<ProfileParams>({
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
    setValue('phoneNumber', profile?.phoneNumber);
    setValue('cityId', profile?.cityId);
    setValue('sex', profile?.sex);
    setValue('birthDate', profile?.birthDate);
  }, [profile])

  const onSubmit = handleSubmit(async (formDatas:ProfileParams) => {
    if (await save(formDatas)) {
      setSubmitStatus({ status: 'success', message: 'Votre profil a été mis à jour !' });
      history.push('/profile');
    }
    else {
      setSubmitStatus({ status: 'error', message: 'Veuillez remplir le formulaire correctement !' });
    }

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
              as={<Input type="textarea" name="presentation" id="presentation" className="shadow p-3 mb-5 bg-white rounded" register={register} />}
            />
          </FormGroup>
          <FormGroup>
            <Label for="birthDate" className="font-weight-bold">Date de naissance</Label>
            <Controller
              name="birthDate"
              control={control}
              defaultValue=""
              as={<Input type="date" name="birthDate" id="birthdate" className="shadow p-3 mb-5 bg-white rounded" register={register} />}
            />
          </FormGroup>
          <FormGroup>
            <Label for="sex" className="font-weight-bold">Genre</Label>
            <Controller
              name="sex"
              control={control}
              defaultValue=""
              as={<Select name="sex" label="" className="shadow mb-5 bg-white rounded" options={genderOptions} register={register} />}
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
            <Button disabled={submitStatus.status === "submitting"} type="submit" color="warning" className="shadow-lg p-3 mb-5 bg-white rounded font-weight-bold d-flex justify-content-center">Envoyer</Button>
          </Row>
          {error && <Alert color="danger">{error.message}</Alert>}
        </Form>
      </Container>
    </>
  );


}