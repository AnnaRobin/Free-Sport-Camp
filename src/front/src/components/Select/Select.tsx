import React, { FunctionComponent } from 'react';
import { Option } from '../../services/Event';

const Select: FunctionComponent<{ name: string, label: string, className?: string, options: Option[], register: any, value?:any, onChange?:any }> = ({ name, label, className, options, register, value, onChange}) => {
    return (
        <select className={'form-control ' + className} name={name} id={name} ref={register} defaultValue="" value={value} onChange={onChange}>
            <option value="" disabled >{label}</option>
            {options && options.map((option) => {
                return (
                    <option key={option.id} value={option.id}>{option.name}</option>
                )
            })}
        </select>
    )
}
export default Select;