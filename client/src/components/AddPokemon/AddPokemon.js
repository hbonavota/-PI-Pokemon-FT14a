import React from 'react';


export function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = 'Name is required, complete it please';
  } else if (/[$%&|<>#]/.test(input.name)) {
    errors.name = 'The input should be contains any name without special character ($,%,&,|,<,>,#)';
  }

  if (!input.type) {
    errors.type = 'type is required, complete it please';
  } else if ((/[$%&|<>#]/.test(input.type))) {
    errors.type = 'The input should be contains any type without special character ($,%,&,|,<,>,#)';
  }

  return errors;
};

async function sendNewPoke (input) {
  /*  fetch ('Ruta', {
     method: 'POST'
   }) 
   .then(res => res.json())
   .then(res => {
     if (res.success) { // exito
       alert('Categoría creada');
     }
   });
    */
   try {
     console.log("entre a sendnewpoke")
     let response = await fetch('http://localhost:3001/pokemons', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json;charset=utf-8'
     },
     body: JSON.stringify(input)
   });
   const datanewPoke = await response.json();

   if(response.status === 200 && response.ok === true){
     alert(`The pokemon has been created by ID: ${datanewPoke.id}, please save it`)
   }

   } catch (error) {
     console.log(error)
   }
   

 }


export default function  AddPokemon() {
  const [input, setInput] = React.useState({
    name: '',
    type: '',
  });

  const [errors, setErrors] = React.useState({});
  /*
    para optimizar el código Ver si queda tiempo!
  const handleInputChange = React.useCallback((e)=>{
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
    }));

    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  },[])
  
  */

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.type && input.name) {
      console.log("entre a al if")
        sendNewPoke(input);
        setInput({});
    }
    else alert("Please, check the inputs.  Read the required information and complete it");
};

  const handleInputChange = (e) =>{
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
    }));

    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  }

  return (
    <form >
      <div>
        <label>Name:</label>
        <input className={errors.name && 'danger'} type="text" name="name" value={input.name} onChange={handleInputChange} required minLength="1" maxLength="12"/>
        {errors.name && (
        <p className="danger">{errors.name}</p>)}
      </div>
      <div>
        <label>type:</label>
        <input className={errors.type && 'danger'} type="text" name="type" value={input.type} onChange={handleInputChange} required minLength="1" maxLength="12"/>
        {errors.type && (
        <p className="danger">{errors.type}</p>)}
      </div>
      {/*  <input type="submit" value="Submit"/> */}
      <button onClick={handleSubmit} type="submit" >Send</button> 
    </form>
  )
}