import React from 'react';
import FormComponent from './FormComponent';

const EditComponent = ( { initialValues, onSubmit, onFetchCountry, countries, states } ) => {

    if(!initialValues) return <div>Loading...</div>

    const handleSubmit = (formValues) => {
        onSubmit(formValues);
    }

    return (
        <FormComponent 
        initialValues={initialValues} 
        onSubmit={handleSubmit} 
        onFetchCountry={onFetchCountry}
        countries={countries}
        states={states}
        />
    );
}

export default EditComponent;
