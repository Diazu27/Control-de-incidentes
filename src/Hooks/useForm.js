import { useState } from "react"


export const useForm = ( initialState ) => {
    
    const [values, setValues] = useState(initialState);

    const LoadData = (data)=>{
        setValues(...values,data)
    }


    const handleInputChange = ({ target }) => {

        setValues({
            ...values,
            [ target.name ]: target.value
        });

    }

    const validateForm = ()=>{
        let IsError = false
        for (let campo in values) {
            if(values[campo]===""){
                let msg = `El campo ${campo} se encuentra vacio`;
                IsError = true
                return {IsError, msg}
            }
        }
        return {IsError}
    }


    return [ values, handleInputChange, validateForm, LoadData ];

}