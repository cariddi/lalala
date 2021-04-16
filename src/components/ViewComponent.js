import React from 'react';
import componentStyles from '../styles/_components.scss';

function ViewComponent({ contactData }) {
    if(!contactData) return <h3>No contact data cat</h3>

    return (
        <div className="mainContainer">
            <div className="mainHeader">
                <div className="avatar">Avatar {contactData.avatar}</div>
                <h2 className="headerTitle">{contactData.name}</h2>
                <button className="button">Edit</button>
            </div>
            <hr />
            <div className="dataContainer">
                <div className="subHeader">
                    <div className="subHeaderLabel">Date added 00/00/00</div>
                    <h2 className="subHeaderTitle"><strong>Informacion</strong></h2>
                </div>
                <br />
                <div className="dataFlexbox">
                    <div className="flexboxItem">
                        <div className="label">Email</div>
                        <div className="value">{contactData.email}</div>
                    </div>
                    <div className="flexboxItem">
                        <div className="label">Name</div>
                        <div className="value">{contactData.name}</div>
                    </div>
                    <div className="flexboxItem">
                        <div className="label">Country</div>
                        <div className="value">{contactData.country.name}</div>
                    </div>
                    <div className="flexboxItem">
                        <div className="label">Phone Number</div>
                        <div className="value">{contactData.phone1}</div>
                    </div>
                    <div className="flexboxItem">
                        <div className="label">Birth Date</div>
                        <div className="value">{contactData.birthdate}</div>
                    </div>
                    <div className="flexboxItem">
                        <div className="label">City</div>
                        <div className="value">{contactData.state.name}</div>
                    </div>
                    <div className="flexboxItem">
                        <div className="label">Cellphone</div>
                        <div className="value">{contactData.phone2}</div>
                    </div>
                    <div className="flexboxItem">
                        <div className="label">Adress</div>
                        <div className="value">{contactData.address}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewComponent
