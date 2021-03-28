import React, { FunctionComponent, useState } from 'react';
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useForm, Controller } from "react-hook-form";
import { useUserManagement } from '../../components/User/Hook';
import { PasswordUpdate } from '../../services/user.service';
import { useHistory } from 'react-router-dom';

export const Password: FunctionComponent<{}> = () => {
    const [submitStatus, setSubmitStatus] = useState<any | undefined>(undefined);
    const { updatePassword, error } = useUserManagement();
    const { register, control, getValues, handleSubmit, errors } = useForm<any>({
        mode: "onBlur"
    });
    const history = useHistory();
    const onSubmit = async (datas: PasswordUpdate) => {
        console.log(datas);
        try {
            updatePassword(datas);
            setSubmitStatus({ status: 'success', message: 'Votre mot de passe a été mis à jour' });
            history.push("/profile");
        }
        catch (err) {
            setSubmitStatus(err);
        }
    }


    return (

        <Container className="mt-5">
            <Form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
                <FormGroup>
                    <Label for="password" className="font-weight-bold">Ancien mot de passe</Label>
                    <Controller
                        name="previousPassword"
                        control={control}
                        rules={{ required: true }}
                        defaultValue=""
                        as={<Input type="password" id="previousPassword" placeholder="mot de passe" className="shadow p-3 mb-5 bg-white rounded"  register={register} />}
                    />

                </FormGroup>
                <FormGroup>
                    <Label for="password" className="font-weight-bold">Nouveau mot de passe *</Label>
                    <Controller
                        name="password"
                        control={control}
                        rules={{ required: true }}
                        defaultValue=""
                        as={<Input type="password" id="password" placeholder="mot de passe" className="shadow p-3 mb-5 bg-white rounded"  register={register} />}
                    />

                </FormGroup>
                <FormGroup>
                    <Label for="password" className="font-weight-bold">Confirmation nouveau mot de passe *</Label>
                    <Controller
                        name="confirmation"
                        control={control}
                        rules={{
                            required: true,
                            validate: {
            
                              matchesPreviousPassword: value => {
                                const { password } = getValues();
                                return password === value || "La confirmation du mot de passe ne correspond pas !";
                              }
                            }
                          }}
                        defaultValue=""
                        as={<Input type="password" id="confirmation" placeholder="mot de passe" className="shadow p-3 mb-5 bg-white rounded"  register={register} />}
                    />

                </FormGroup>
                <div style={{ color: "red" }}>
                    {Object.keys(errors).length > 0 &&
                        " ⚠Tous les champs sont obligatoires !"}
                </div>

                <Button color="warning" className="shadow-lg p-3 mb-5 bg-white rounded font-weight-bold d-block ml-auto mr-auto">Modifier</Button>
                <h6 className="text-danger mt-5 pt-5">* Champs obligatoires</h6>

            </Form>
        </Container>

    )
};



