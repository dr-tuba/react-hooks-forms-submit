import React, { useState } from "react";

function Form() {
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Henry");
  // this state just set for demonstration of submission
  const [submittedData, setSubmittedData] = useState([])

  // add state for holding error messages
  const[errors, setErrors] = useState([])

  function handleFirstNameChange(event) {
    setFirstName(event.target.value);
  }

  function handleLastNameChange(event) {
    setLastName(event.target.value);
  }

  // This is how the function would be built to send data to the back end
  // function handleSubmit(e) {
  //   e.preventDefault()
  //   const formData = {
  //     firstName: firstName,
  //     lastName: lastName,
  //   };
  //   props.sendFormDataSomeWhere(formData);
  //   setFirstName('')
  //   setLastName('')
  // }

  // This is how we are building it for now to demonstrate submission, but is NOT how it would usually be coded
  function handleSubmit(e) {
    e.preventDefault()
    // validation to make sure first name is required
    if (firstName.length > 0) {
      const formData = {
        firstName: firstName,
        lastName: lastName,
      };
      const dataArray = [...submittedData, formData];
      setSubmittedData(dataArray)
      setFirstName('')
      setLastName('')
      setErrors([])
    } else {
      setErrors(['First name is required!'])
    }
  }

  // This .map() renders our submitted data on to the page for this demonstration
  const listOfSubmissions = submittedData.map((data, index) => {
    return (
      <div key={index}>
        {data.firstName} {data.lastName}
      </div>
    );
  });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleFirstNameChange} value={firstName} />
        <input type="text" onChange={handleLastNameChange} value={lastName} />
        <button type="submit">Submit</button>
      </form>
      {/* conditionally render error messages */}
      {errors.length > 0
        ? errors.map((error, index) => (
          <p key={index} style={{ color: 'red'}}>
            {error}
          </p>
        ))
        : null}
      <h3>Submissions</h3>
      {listOfSubmissions}
    </div>
  );
}

export default Form;
