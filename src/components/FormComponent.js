import React, { useRef, useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';

const locationList = list => list.map( elem => <option key={elem.id} value={elem.id}>{elem.name}</option>);

const FormComponent = ({ initialValues = {}, onSubmit, onFetchCountry, countries = [], states = [] }) => {
    const [contactData, setContactData] = useState({});
    const [myCountries, setCountries] = useState([]);
    const [myStates, setStates] = useState([]);

    const currentStateRef = useRef(null);

    useEffect( //COUNTRIES
    () => {
        setCountries(countries);
    }, [countries]);   
    
    useEffect( //STATES
    () => {
        setStates(states);
    }, [states]);

    useEffect( () => { //CONTACT DATA
        setContactData(initialValues);
      }, [initialValues] );

    const handleChange = (key, e) => {
        let newLocation = {};

        switch (key) {
            case 'country':
                newLocation = myCountries.filter(c => c.id === parseInt(e.target.value))[0];
                onFetchCountry( newLocation.id );

                
                setContactData( 
                    { ...contactData, 
                        ...{ country: {'id': newLocation.id, 'name': newLocation.name} }
                    } 
                );
                    
                // console.log(currentStateRef.current);
                break;
            case 'state':
                newLocation = myStates.filter(s => s.id === parseInt(e.target.value))[0];
                setContactData( { ...contactData, ...{ state: {'id': newLocation.id, 'name': newLocation.name} } } );
                break;
            case 'avatar':
                break;
            default:
                setContactData({ ...contactData, ...{[key]: e.target.value} });
                break;
        }
    };

    const handleSubmit = e => {
        // console.log(currentStateRef.current.value);
        // console.log(currentStateRef.current.text);

        e.preventDefault();
        const formValues = contactData;
        onSubmit(formValues);
    }

    return (
        <Fragment>
            {
             (Object.keys(contactData).length > 0 && myCountries && myStates) ?
                <div className="mainContainer">
                    <form onSubmit={ e => handleSubmit(e) } className="form">
                        <div className="formAvatarElement">
                            <input 
                                className="avatar"
                                type="image" 
                                value={ contactData.avatar || "" } 
                                onChange={e => handleChange('avatar', e)} 
                            />
                        </div>
                        <br />
                        <div className="formElement">
                            <span className="formElementHeader">Name</span><br />
                            <input 
                                className="formElementValue"
                                type="text" 
                                value={ contactData.name } 
                                onChange={e => handleChange('name', e)}
                            />
                        </div>
                        <div className="formElement">
                            <span className="formElementHeader">Birthdate</span><br />
                            <input 
                                className="formElementValue"
                                type="date" 
                                value={ contactData.birthdate } 
                                onChange={e => handleChange('birthdate', e)} 
                            />
                        </div>
                        <div className="formElement">
                            <span className="formElementHeader">Email</span><br />
                            <input 
                                className="formElementValue"
                                type="email" 
                                value={ contactData.email } 
                                onChange={e => handleChange('email', e)}
                            />
                        </div>
                        <div className="formElement">
                            <span className="formElementHeader">Address</span><br />
                            <input 
                                className="formElementValue"
                                type="text" 
                                value={ contactData.address } 
                                onChange={e => handleChange('address', e)}
                            />
                        </div>
                        <div className="formElement">
                            <span className="formElementHeader">Phone Number</span><br />
                            <input 
                                className="formElementValue"
                                type="text" 
                                value={ contactData.phone1 } 
                                onChange={e => handleChange('phone1', e)}
                            />
                        </div>
                        <div className="formElement">
                            <span className="formElementHeader">Country</span><br />
                            <select 
                                className="formElementValue"
                                name="countries"
                                id="countriesCmb"
                                value={ contactData.country.id }
                                onChange={e => handleChange('country', e)}
                            >
                                { locationList(myCountries) }
                            </select>
                        </div>
                        <div className="formElement">
                            <span className="formElementHeader">Cellphone</span><br />
                            <input 
                                className="formElementValue"
                                type="text" 
                                value={ contactData.phone2 } 
                                onChange={e => handleChange('phone2', e)}
                            />
                        </div>
                        <div className="formElement">
                            <span className="formElementHeader">City</span><br />
                            <select 
                                className="formElementValue"
                                name="states"
                                id="statesCmb"
                                value={ contactData.state.id }
                                ref={currentStateRef}
                                onChange={e => handleChange('state', e)}
                            >
                                { locationList(myStates) }
                            </select>                    
                        </div>
                    </form>
                    <br />
                    <div className="form">
                        <Link to="/">
                            <button 
                                className="linkBtnEdit"
                                onClick={ e => { e.preventDefault(); window.location.href = "/"; } } 
                            >
                                Cancel
                            </button>
                        </Link>
                        <Link to="/">
                            <button 
                                className="linkBtnView"
                                type="submit"
                                onClick={ e => { handleSubmit(e) } } 
                            >
                                Save Changes
                            </button>
                        </Link>
                    </div>
                </div>
             :
                <p>No Form Data....Cat!!!</p>
            } 
        </Fragment>
    )
}

export default FormComponent
