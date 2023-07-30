import React, { useState } from "react";

import { Text } from "components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import './register.css'

const Register = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isEmployer, setIsEmployer] = useState(false)
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [birthDate, setBirthDate] = useState(new Date());
  // const [birthDateError, setBirthDateError] = useState(new Date());
  const navigate = useNavigate()

  const onRegister = () => {
    setFirstNameError("");
    setLastNameError("");
    setUsernameError("");
    setPasswordError("");
    // setBirthDateError("");
    let isValid = true;
    if (firstName.trim() === "") {
      setFirstNameError("Обязательное поле");
      isValid = false;
    }
    if (lastName.trim() === "") {
      setLastNameError("Обязательное поле");
      isValid = false;
    }
    // if (birthDate.trim() === "") {
    //   setBirthDateError("Обязательное поле");
    //   isValid = false;
    // }
    if (username.trim() === "") {
      setUsernameError("Обязательное поле");
      isValid = false;
    }
    if (password.trim() === "") {
      setPasswordError("Обязательное поле");
      isValid = false;
    }

    if (isValid) {
      const config = {
        method: 'POST',
        data: {
          username, password, role: isEmployer ? 'employer' : 'employee', name: {
            firstName, lastName
          },
          birthDate
        }
      }
      axios('/users/register', config)
        .then(res => {
          navigate('/login')
        })
        .catch(reason => alert(`Error: ${reason}`))
    }
  }

  return (
    <>
      <div className="wrap">
        <div className="container">
          <div className="register-form">
            <Text
              className="title"
            >
              Регистрация
            </Text>
            <div className="register">
              <div className="first-name">
                <input type="text" value={firstName} placeholder="Имя" onChange={e => setFirstName(e.target.value)} />

              </div>
              <hr />
              {firstNameError && <div className="error">{firstNameError}</div>}

              <div className="last-name">
                <input type="text" value={lastName} placeholder="Фамилия" onChange={e => setLastName(e.target.value)} />

              </div>
              <hr />
              {lastNameError && <div className="error">{lastNameError}</div>}

              <div className="birthDate">
                <input type="date" defaultValue={String(birthDate).substring(0, 10)} placeholder="Дата рождения" onChange={e => setBirthDate(e.target.value)} />

              </div>
              <hr />
              {/* {birthDateError && <div className="error">{birthDateError}</div>} */}


              <div className="username">
                <input type="text" value={username} placeholder="Логин" onChange={e => setUsername(e.target.value)} />

              </div>
              <hr />
              {usernameError && <div className="error">{usernameError}</div>}

              <div className="password">
                <input type="password" value={password} placeholder="Пароль" onChange={e => setPassword(e.target.value)} />

              </div>
              <hr />
              {passwordError && <div className="error">{passwordError}</div>}

              <div className="role">
                <input type="checkbox" value={isEmployer} onChange={e => setIsEmployer(!isEmployer)} />Зергистрироваться как представитель компании
              </div>
            </div>
          </div>
          <button className="register-btn" onClick={onRegister}>Продолжить</button>
          <Link to={'../main'} className="back">На главную</Link>
        </div>
      </div>
    </>
  );
};

export default Register;
