import React from 'react';
import { useState } from 'react';
import './Register.css';
import {Icon} from 'react-icons-kit';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {eye} from 'react-icons-kit/feather/eye'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

function Register(props) {

    const [clicked, setClicked] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmed_password, setConfirmedPassword] = useState('');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [type, setType] = useState('password');
    const [iconEye, setIcon] = useState(eyeOff);
    const [emailError, setEmailError] = useState('');
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleToggle = () => {
      if (type==='password'){
         setIcon(eye);
         setType('text')
      } else {
         setIcon(eyeOff)
         setType('password')
      }
   }

    const onButtonClick = () => {
      setClicked(true);
      fetch('/user/register', 
      {
        headers: {
          'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
          'Access-Control-Allow-Origin':'*'

        }, 
        method: 'POST', 
        mode: "cors",
        body: JSON.stringify({
          username : email,
          password : password,
          check_password : confirmed_password,
          first_name : first_name,
          last_name : last_name

        })
      }).then((data)=>data.json()).then((json)=>console.log(json));

      }

    return (

    <div className={'mainContainer'}>

      <div className={'titleContainer'}>
        <div className={'RegisterText'}>REGISTER{' '}<FontAwesomeIcon icon={faAddressCard} style={{ marginRight: '5px' }} /></div>
      </div>

      <br />

      <div className={'inputContainer'}>
        <input
          value={first_name}
          placeholder="First Name"
          onChange={(ev) => setFirstName(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{firstNameError}</label>
      </div>

      <br />

      <div className={'inputContainer'}>
        <input
          value={last_name}
          placeholder="Last Name"
          onChange={(ev) => setLastName(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{lastNameError}</label>
      </div>

      <br />

      <div className={'inputContainer'}>
        <input
          value={email}
          placeholder="Email"
          onChange={(ev) => setEmail(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{emailError}</label>
      </div> 

      <br />

      <div className={'inputContainer'}>
        <input
            value={password}
            placeholder="Password"
            onChange={(ev) => setPassword(ev.target.value)}
            className={'inputBox'}
            type={type}
        />
        <label className="errorLabel">{passwordError}</label>
      </div>

      <br />

      <div className={'inputContainer'}>
        <input
          value={confirmed_password}
          placeholder="Confirm Password"
          onChange={(ev) => setConfirmedPassword(ev.target.value)}
          className={'inputBox'}
          type={type}
        />
        <span className="password-icon" onClick={handleToggle}>
          <Icon icon={iconEye} size={25}/>
        </span>
        <label className="errorLabel">{passwordError}</label>
      </div>

      <br />

      <div className={'ButtonContainer'}>
        <button className="RegisterButton" onClick={onButtonClick}>SIGN UP</button>
      </div>

    </div>
    );
}


export default Register;
