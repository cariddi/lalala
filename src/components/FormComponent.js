import React, { Fragment } from 'react'

function FormComponent({ contactData, readOnly }) {
    if(!contactData) return <h3>No contact data cat</h3>

    return (
        <Fragment>
            <div>Form Component</div>
            <h3>{contactData.name}</h3>
            <form>
                <input 
                    type="text" 
                    value={ contactData.name } 
                    onChange={ e => console.log(e) } 
                    readOnly={readOnly} 
                />
            </form>
        </Fragment>
    )
}

export default FormComponent
