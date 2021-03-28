import React, { FunctionComponent, useEffect, useState } from 'react';
import { Col, Button, Form, FormGroup, Label, Input, Container, Row, Alert } from 'reactstrap';
import { Controller, useForm } from "react-hook-form";
import Select from '../../components/Select';
import useOptions from '../../components/Options';
import { DevTool } from "@hookform/devtools";
import {EditorParams} from '../../services/event.service';
import {useHistory} from 'react-router-dom';
import {useEvent} from './Hook';


const Editor: FunctionComponent<{ params?: EditorParams }> = ({ params }) => {

    const [submitStatus, setSubmitStatus] = useState<any | undefined>({ status: null });
    const { sportOptions, cityOptions, levelOptions } = useOptions();
    const { register, control, handleSubmit, reset, errors, formState: { isSubmitted }, setValue } = useForm<EditorParams>({
        mode: "onBlur",
        defaultValues:params
    });
    const {save, error,get,event} = useEvent();
    const history = useHistory();
    useEffect(()=>{
        //load event as soon as options are loaded
        if(params && sportOptions.length && cityOptions.length && levelOptions.length){
            get(Number(params?.id));
        }
    },[sportOptions, cityOptions, levelOptions])

    useEffect(()=>{
        //load event as soon as options are loaded
        if(params && sportOptions.length && cityOptions.length && levelOptions.length){
            setValue('cityId',event?.cityId);
            setValue('sportId',event?.sportId);
            setValue('levelId',event?.levelId);
            setValue('description', event?.description);
            setValue('appointment', event?.appointment);
            setValue('time',event?.time);
            setValue('id',event?.id);
        }
        
    },[event])

    useEffect(()=>{
        if(submitStatus.status === 'submitted' && error === undefined){
            history.push("/publications");
        }
    },[submitStatus])


    const onSubmit = handleSubmit(async ({ cityId, levelId, sportId, appointment, time, description, id }) => {

        
        //submit button is disabled with this status
        setSubmitStatus({ status: 'submitting' });

        await save({ cityId, levelId, sportId, appointment, time, description, id });
        setSubmitStatus({ status: 'submitted' });

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
            {error && error.message && <Alert color="danger">{error?.message}</Alert>}
            <Container className="mt-5 pt-5">
                <Form onSubmit={onSubmit}>
                    <Controller
                                    name="id"
                                    control={control}
                                    defaultValue=""
                                    as={<Input name="id" type="hidden" register={register} control={control}/>}
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
                    <FormGroup>
                        <Label for="description" className="font-weight-bold">Information</Label>
                        <Controller
                            name="description"
                            control={control}
                            as={<Input type="textarea" name="description" id="description" className="shadow p-3 mb-5 bg-white rounded" />}
                        />
                    </FormGroup>

                    {(errors.sportId || errors.levelId || errors.cityId || errors.appointment || errors.time ) && isSubmitted && <span style={{ color: "red" }}>  ⚠ Les champs (*) sont obligatoires !</span>}


                    <Row>
                        <Col>
                            <Button disabled={submitStatus.status === "submitting"} type="submit" color="warning" className="shadow-lg p-3 mb-5 bg-white rounded font-weight-bold d-block ml-auto mr-5">Envoyer</Button>
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
                                as={<Button color="warning" className="shadow-lg p-3 mb-5 bg-white rounded font-weight-bold d-block ml-5 mr-auto">Annuler</Button>}
                            />
                        </Col>
                        }
                    </Row>

                    <h6 className="text-danger mt-5 pt-5">* Champs obligatoires</h6>
                </Form>
            </Container>
            <DevTool control={control} />
        </>
    );
}

export default Editor;