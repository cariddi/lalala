import React, { Fragment } from 'react'

function FormComponent({contactData}) {
    console.log(contactData)
    if(!contactData) return <h3>No contact data cat</h3>

    return (
        <Fragment>
            <div>Form Component</div>
            <h3>{contactData.name}</h3>
        </Fragment>
    )
}

export default FormComponent
