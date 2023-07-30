import React, { useState } from "react";
import { Img, Text } from "components";
import Header from "components/Header";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "reducers/userReducer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './createResume.css'



const Page1 = () => {
  const user = useSelector(selectUser)
  const navigate = useNavigate();
  if (!user) {
    navigate('/login')
  }
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(user.name.firstName);
  const [firstNameError, setFirstNameError] = useState("");
  const [lastName, setLastName] = useState(user.name.lastName);
  const [lastNameError, setLastNameError] = useState("");
  const [birthDate, setBirthDate] = useState(user.birthDate);
  const [personalInfo, setPersonalinfo] = useState(user.personalInfo)
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber)
  const [phoneNumberError, setPhoneNumberError] = useState("")
  const [photoPath, setPhotoPath] = useState(user.photoPath)
  const [email, setEmail] = useState(user.email)
  const [emailError, setEmailError] = useState("")
  const [position, setPosition] = useState("")
  const [positionError, setPositionError] = useState("")

  const handleCreateResume = () => {
    setFirstNameError("");
    setLastNameError("");
    setPhoneNumberError("");
    setEmailError("");
    setPositionError("");
    let isValid = true;
    if (firstName.trim() === "") {
      setFirstNameError("Обязательное поле");
      isValid = false;
    }
    if (lastName.trim() === "") {
      setLastNameError("Обязательное поле");
      isValid = false;
    }
    if (phoneNumber.trim() === "") {
      setPhoneNumberError("Обязательное поле");
      isValid = false;
    } else {
      const phoneNumberRegex = /^\d+$/;
      if (!phoneNumberRegex.test(phoneNumber)) {
        setPhoneNumberError("Неверный формат поля");
        isValid = false;
      }
      else if (phoneNumber.length !== 12) {
        setPhoneNumberError("Номер телефона должен содержать 12 цифр");
        isValid = false;
      }
    }
    if (email.trim() === "") {
      setEmailError("Обязательное поле");
      isValid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setEmailError("Неверный формат поля");
        isValid = false;
      }
    }
    if (position.trim() === "") {
      setPositionError("Обязательное поле");
      isValid = false;
    }
    if (isValid) {
      const resume = {
        wantedPosition: position,
        birthDate, phoneNumber, email,
        name: {
          firstName, lastName
        },
        photoPath: photoPath,
        personalInfo
      }
      const config = {
        method: 'POST',
        data: resume
      }
      axios('/resumes', config)
        .then(res => navigate('/personal'))
        .catch(reason => alert(`Error: ${reason}`))
    }


  }

  return (
    <>
      {
        <div className="wrapper">
          <Header className="header" />
          <div className="createResume-wrap">
            <div className="createResume-header">
              <Text
                className="createResume-title">
                Составить резюме
              </Text>
            </div>
            <div className="createResume-info">
              <div className="createResume-block">
                <div className="createResume-inputs">
                  <div className="createResume-firstName">
                    <Text
                      className="createResume-firstName-title">
                      Имя
                    </Text>
                    <input value={firstName} onChange={e => setFirstName(e.target.value)} />
                    {firstNameError && <div className="error">{firstNameError}</div>}
                  </div>
                  <div className="createResume-lastName">
                    <Text
                      className="createResume-lastName-title">
                      Фамилия
                    </Text>
                    <input className="inputLastName" value={lastName} onChange={e => setLastName(e.target.value)} />
                    {lastNameError && <div className="error">{lastNameError}</div>}
                  </div>
                  <div className="createResume-birthDate">
                    <Text
                      className="createResume-birthDate-title">
                      Дата рождения
                    </Text>
                    <input type="date" defaultValue={birthDate.substring(0, 10)} onChange={e => setBirthDate(e.target.value)} />
                  </div>
                </div>
                <div className="createResume-avatar">
                  <Img
                    className="createResume-img"
                    src="images/img_ellipse1.png"
                    alt="ellipseOne"
                  />
                  <div className="add-photo-btn">Загрузить фото
                    <input type='file' defaultValue={photoPath.substring(photoPath.lastIndexOf("\\"))} onChange={e => setPhotoPath(e.target.value)} />
                  </div>
                </div>
              </div>
              <div className="createResume-block2">
                <div className="createResume-inputs2">
                  <div className="createResume-tel">

                    <Text
                      className="createResume-tel-title"
                    >
                      Телефон
                    </Text>
                    <input value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
                    {phoneNumberError && <div className="error">{phoneNumberError}</div>}
                  </div>
                  <div className="createResume-email">

                    <Text
                      className="createResume-email-title"
                    >
                      Электронная почта
                    </Text>
                    <input value={email} onChange={e => setEmail(e.target.value)} />
                    {emailError && <div className="error error-Email">{emailError}</div>}

                  </div>
                </div>
              </div>
              <Text
                className="createResume-position-title">
                Какую должность хотите занимать?
              </Text>
              <input className="createResume-position" value={position} onChange={e => setPosition(e.target.value)} />
              {positionError && <div className="error">{positionError}</div>}
              <Text
                className="createResume-personalInfo-title"
              >
                О себе
              </Text>
              <textarea className="createResume-personalInfo" value={personalInfo} onChange={e => setPersonalinfo(e.target.value)} />
              <button className="createResume-create-btn" onClick={handleCreateResume}>Создать</button>
            </div>

          </div>
        </div>
      }
    </>
  );
};

export default Page1;
