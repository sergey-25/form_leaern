import React, {useState} from 'react';
import {Button} from "@mui/material";

function Persons(props) {

    const [state, setState] = useState( {
        fields: [{}]
    })

    // const addPerson =() => {
    //     const newPerson = {
    //         id: Math.random(),
    //         name: "",
    //         email: ""
    //     };
    //
    //     setState({ fields: [...state.fields, {...newPerson}] });
    // };
    const addPerson = () => {
        let index = 0;
        const person = { id: index, name: '', email: '' };
        index++;
            setState({ fields: [ ...state.fields, person ] })
    }

    const removeInputFields = (index)=>{
        const rows = state;
        rows.splice(index, 1);
        setState(rows);
    }
   // const handleChange =(e, index) => {
   //      const fieldsCopy = [...state.fields];
   //
   //      fieldsCopy.forEach(item => {
   //          if (item.id === index) {
   //              item[e.target.name] = e.target.value;
   //          }
   //      });
   //      setState({fields: fieldsCopy} );
   //  }

    const handleChange =(e, idx) => {
        const { name, value } = e.target;
        setState(state => {
            return state.fields[idx][name] = value;
        });
    }

    const handleSubmit =(e) => {
        console.log(state, "$$");
    }
    const {fields} = state;
    return (
        <div>
            <Button onClick={handleSubmit}>person</Button>
            {fields
                ? fields.map((field, i) => {
                return (
                    <div key={i}>
                        <input
                            value={field.name}
                            onChange={e => handleChange(e, i)}
                            name="name"
                        />
                        <input
                            value={field.email}
                            onChange={e => handleChange(e,i)}
                            name="email"
                        />

                        {(state.fields.length!==1)? <button className="btn btn-outline-danger" onClick={removeInputFields}>Remove</button>:''}
                    </div>
                );
            }) : null}
            <button onClick={e => addPerson(e)}>Add Person</button>
            <button onClick={e => handleSubmit(e)}>Submit</button>
        </div>
    );
}

export default Persons;
// https://stackoverflow.com/questions/61349770/how-i-can-add-multiple-same-fields-form-in-reactjs
//     https://codingstatus.com/add-remove-multiple-input-fileds-dynamically-in-react-js/