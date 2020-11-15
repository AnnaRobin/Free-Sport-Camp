import React,  { FunctionComponent}  from 'react';

interface Option{
    id: number;
    name: string;
  }
  
const Select: FunctionComponent<{name:string,label:string,options:Option[],register:any}> = ({name,label,options,register}) => {
    return (
        <select className="form-control" name={name} id={name} ref={register}>
            <option value="" disabled selected>{label}</option>
            {options.map((option)=>{
                return (
                <option value={option.id}>{option.name}</option>
                )
            })}
    
      
      </select>


    )

}



export default Select;