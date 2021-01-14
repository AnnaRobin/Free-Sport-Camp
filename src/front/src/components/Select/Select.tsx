import React, { FunctionComponent } from 'react';

type Option = {
    id: number;
    name: string;
}

const Select: FunctionComponent<{ name: string, label: string, className?: string, options: Option[], register: any }> = ({ name, label, className, options, register}) => {
    return (
        <select className={'form-control ' + className} name={name} id={name} ref={register} >
            <option value="" disabled selected>{label}</option>
            {options && options.map((option) => {
                return (
                    <option value={option.id}>{option.name}</option>
                )
            })}
        </select>
    )
}
export default Select;