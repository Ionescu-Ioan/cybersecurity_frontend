import React from 'react';
import { useState } from 'react';
import './Login.css';

function Login(props) {

    const [clicked, setClicked] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const onButtonClick = () => {
      setClicked(true);
      fetch('localhost:8000/login', {headers: {'Content-Type': 'application/json'}, method: 'POST', 
      body: JSON.stringify({
        username : email,
        password : password
      })
      }).then((data)=>{console.log(data)});

      }
    
      const onRegisterClick = () => {
        // You'll update this function later...
      }  

    return (
    // <div>
    //     Login component {props.test} {clicked ? 'pressed' : 'unpressed'}
    //     <button onClick={handleClick}>buton</button>
    // </div>
    <div className={'mainContainer'}>
      <div className={'titleContainer'}>
        <div className={'LoginText'}>WELCOME</div>
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
          type = "password"
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className={'ButtonContainer'}>
        {/* <input className={'LoginButton'} type="button" onClick={onButtonClick} value={'Log in'} /> */}
        <button className="LoginButton" onClick={onButtonClick}>LOGIN</button>
      </div>
      <div className={'RegisterContainer'}>
        <span>Don't have an account?  <a href="#" className="RegisterLink" onClick={onRegisterClick}>Register</a></span>
      </div>
      
    </div>
    );
}


export default Login;
