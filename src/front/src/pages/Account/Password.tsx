import React, { FunctionComponent, useState } from 'react';
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useForm, Controller } from "react-hook-form";
import { useUserManagement } from '../../components/User/Hook';
import { PasswordUpdate } from '../../services/User';
import { useHistory } from 'react-router-dom';


export const Password: FunctionComponent<{}> = () => {
    const [errorMessage, setErrorMessage] = useState<Error | undefined>(undefined);
    const { updatePassword, error } = useUserManagement();
    const { register, control, getValues, handleSubmit, errors, formState: { isSubmitted } } = useForm<any>({
        mode: "onBlur"
    });
    const history = useHistory();
    const onSubmit = async (datas: PasswordUpdate) => {
        try {
            if(await updatePassword(datas)){
                history.push("/profile");
            }
        }
        catch (err) {
            setErrorMessage(err);
        }
        console.log(errors);
    }
    return (
        <Container className="mt-5">
            <Form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
                <FormGroup>
                    <Label for="password" className="font-weight-bold">Ancien mot de passe *</Label>
                    <Controller
                        name="previousPassword"
                        control={control}
                        rules={{ required: true }}
                        defaultValue=""
                        as={<Input type="password" id="previousPassword" placeholder="mot de passe" className="shadow p-3 mb-5 bg-white rounded" register={register} />}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="password" className="font-weight-bold">Nouveau mot de passe *</Label>
                    <Controller
                        name="password"
                        control={control}
                        rules={{ required: true, maxLength: { value: 45, message: "Votre mot de passe ne doit contenir plus que 45 caractères !" }, minLength: { value: 5, message: "Votre mot de passe doit contenir au moins 5 caractères !" } }}
                        defaultValue=""
                        as={<Input type="password" id="password"placeholder="Le mot de passe doit contenir au moins 5 caractères !" className="shadow p-3 mb-5 bg-white rounded" register={register} />}
                    />
                    {errors.password && errors.password.message !== '' && <p className="error">{errors.password.message}</p>}
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
                        as={<Input type="password" id="confirmation" placeholder="Confirmez votre mot de passe !" className="shadow p-3 mb-5 bg-white rounded" register={register} />}
                    />
                    {errors.confirmation && errors.confirmation.message !== '' && <p className="error">{errors.confirmation.message}</p>}
                </FormGroup>
                    {(errors.previousPassword?.type == "required" || errors.password?.type == "required" || errors.confirmation?.type == "required") && isSubmitted && <p className="error">"Tous les champs sont obligatoires !"</p>}
                    {errorMessage && <p className="error">{errorMessage.message}</p>}
                    {error && <p className="error">{error.message}</p>}
                

                <Button color="warning" className="shadow-lg p-3 mb-5 bg-white rounded font-weight-bold d-block ml-auto mr-auto">Modifier</Button>
                <h6 className="text-danger mt-5 pt-5">* Champs obligatoires</h6>
            </Form>
            
        </Container>
    )
};



