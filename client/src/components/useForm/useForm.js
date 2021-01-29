import { useState } from 'react'

const useForm = (fields, proxy) => {
    const [values, setValues] = useState(fields);

    const handleChange = ({ target }) => {
        setValues({
            ...values,
            [target.name]: target.value
        })
        console.log(values);
    }

    const handleSubmit = e => {
        e.preventDefault();
        console.log('%c state:', 'color:blue;', values)
        fetch(`http://localhost:5000/${proxy}`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(values)
        })
            .then(res => res.json())
            .then(result => console.log(result))
            .catch(err => console.log(err.message))
            
            //window.location = "/${proxy}";
    }

    return ({
        values,
        handleSubmit,
        handleChange
    })
    
}

export default useForm;