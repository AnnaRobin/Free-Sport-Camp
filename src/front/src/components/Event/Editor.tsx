import React, { FunctionComponent, useEffect } from 'react';
import { Col, Button, Form, FormGroup, Label, Input, Container, Row } from 'reactstrap';
import { Controller, useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';

import Select from '../../components/Select';
import useOptions from '../../components/Options';
import { EditorParams } from '../../services/Event';
import { useEvent } from './Hook';


const Editor: FunctionComponent<{ params?: EditorParams }> = ({ params }) => {
    const { sportOptions, cityOptions, levelOptions } = useOptions();
    const { register, control, handleSubmit, reset, errors, formState, setValue } = useForm<EditorParams>({
        mode: "onBlur",
        defaultValues: params
    });
    const { save, error} = useEvent();
    const history = useHistory();
    
    useEffect(() => {
        if (params && sportOptions.length && cityOptions.length && levelOptions.length) {
            setValue('cityId', params?.cityId);
            setValue('sportId', params?.sportId);
            setValue('levelId', params?.levelId);
        }
    }, [sportOptions, cityOptions, levelOptions])
 
    const onSubmit = handleSubmit(async ({ cityId, levelId, sportId, appointment, time, description, id }) => {
        if (await save({ cityId, levelId, sportId, appointment, time, description, id })) {
            history.push("/publications");
        }
    });

    const dateValidator = (newDate: any) => {
        return Date.parse(newDate) > Date.now();
    };

    return (
        <>
            <Container className="mt-5 pt-5">
                <Form onSubmit={onSubmit}>
                    <Controller
                        name="id"
                        control={control}
                        defaultValue=""
                        as={<Input name="id" type="hidden" register={register} control={control} />}
                    />
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
                                    as={<Select name="sportId" label="" className="shadow  mb-5 bg-white rounded" options={sportOptions} register={register} />}
                                />
                                {errors.sportId && errors.sportId.message !== '' && <p className="error">{errors.sportId.message}</p>}
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
                                    as={<Select name="levelId" label="" className="shadow  mb-5 bg-white rounded" options={levelOptions} register={register} />}
                                />
                                {errors.levelId && errors.levelId.message !== '' && <p className="error">{errors.levelId.message}</p>}
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
                                    as={<Select name="cityId" label="" className="shadow  mb-5 bg-white rounded" options={cityOptions} register={register} />}
                                />
                                {errors.cityId && errors.cityId.message !== '' && <p className="error">{errors.cityId.message}</p>}
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
                                    }}
                                    defaultValue=""
                                    as={<Input type="date" name="appointment" id="appointment" placeholder="" className="shadow p-3 mb-5 bg-white rounded" />}
                                />
                                {errors.appointment && errors.appointment.type === "validate" && (
                                    <div className="error">"Cette date est déjà passée !"</div>)}
                                {errors.appointment && errors.appointment.message !== '' && <p className="error">{errors.appointment.message}</p>}
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
                                {errors.time && errors.time.message !== '' && <p className="error">{errors.time.message}</p>}
                            </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup>
                        <Label for="description" className="font-weight-bold">Information</Label>
                        <Controller
                            name="description"
                            control={control}
                            as={<Input type="textarea" name="description" id="description" className="shadow p-3 mb-5 bg-white rounded" />}
                        />
                    </FormGroup>
                    {(errors.sportId || errors.levelId || errors.cityId || errors.appointment || errors.time) && formState.isSubmitted && <span style={{ color: "red" }}>  ⚠ Les champs (*) sont obligatoires !</span>}
                    {error && error.message && <p className="error">{error?.message}</p>}
                    <Row>
                        <Col>
                            <Button disabled={formState.isSubmitting} type="submit" color="warning" className="text-center shadow-lg p-3 bg-white rounded font-weight-bold d-block ml-auto mr-auto">Envoyer</Button>
                        </Col>
                        {!params &&
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
                                        description: ""
                                    })}
                                    as={<Button color="warning" className="shadow-lg p-3 bg-white rounded font-weight-bold d-block ml-auto mr-auto">Annuler</Button>}
                                />
                            </Col>
                        }
                    </Row>
                    <h6 className="text-danger mt-5 pt-5">* Champs obligatoires</h6>
                </Form>
            </Container>
            
        </>
    );
}

export default Editor;