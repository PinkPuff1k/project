import React, { useEffect, useState } from "react"
import { Text } from "components";
import Header from "components/Header";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { login, selectUser } from '../../reducers/userReducer'
import './edit.css'

export const EditUserForm = () => {
    const user = useSelector(selectUser)
    const navigate = useNavigate();
    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
    }, [])
    const dispatch = useDispatch();
    const [username, setUsername] = useState(user.username);
    const [password, setPassword] = useState(user.password);
    const [firstName, setFirstName] = useState(user.name.firstName);
    const [lastName, setLastName] = useState(user.name.lastName);
    const [birthDate, setBirthDate] = useState(user.birthDate);
    const [personalInfo, setPersonalinfo] = useState(user.personalInfo)
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber)
    const [email, setEmail] = useState(user.email)
    const [photoPath, setPhotoPath] = useState(user.photoPath)

    const onSubmit = (e) => {
        e.preventDefault();
        const config = {
            method: 'PATCH',
            data: {
                username, password,
                email, phoneNumber,
                personalInfo, photoPath
                , id: user.id,
                name: {
                    firstName,
                    lastName
                },
                birthDate: new Date(String(birthDate))
            }
        }
        axios('/users', config)
            .then(res => {
                dispatch(login(res.data));
                navigate('/personal')
            })
            .catch(reason => alert(`Error: ${reason}`))
    }

    return <div>
        <div className="wrapper">
            <Header className="header" />
            <div className="edit-wrap">
                <div className="edit-header">
                    <Text
                        className="edit-title">
                        Редактировать профиль
                    </Text>
                </div>
                <form className="edit-info" onSubmit={onSubmit}>
                    <div className="edit-block">
                        <label form="username">Имя пользователя:</label>
                        <input value={username} id='username' onChange={e => setUsername(e.currentTarget.value)} />
                        <label form="password">Пароль:</label>
                        <input value={password} id="password" onChange={e => setPassword(e.currentTarget.value)} />
                        <label form="first">Имя:</label>
                        <input value={firstName} id="first" onChange={e => setFirstName(e.currentTarget.value)} />
                        <label form="last">Фамилия:</label>
                        <input value={lastName} id="last" onChange={e => setLastName(e.currentTarget.value)} />
                        <label form="email">Электронная почта:</label>
                        <input value={email} id="email" onChange={e => setEmail(e.currentTarget.value)} />
                    </div>
                    <div className="edit-block">
                        <label form="birth">День рождения:</label>
                        {user.birthDate ?
                            <input type="date" defaultValue={birthDate.substring(0, 10)} id="birth" onChange={e => setBirthDate(e.currentTarget.value)} /> :
                            <input type="date" id="birth" onChange={e => setBirthDate(e.currentTarget.value)} />
                        }
                        <label form="personal">О себе:</label>
                        <input value={personalInfo} id="personal" onChange={e => setPersonalinfo(e.currentTarget.value)} />
                        <label form="phone">Телефон:</label>
                        <input type="tel" value={phoneNumber} id="phone" onChange={e => setPhoneNumber(e.currentTarget.value)} />

                        <label form="photo">Фото:</label>
                        <div className="change-photo-btn">Выбрать фото
                            <input type="file" value={photoPath} id="photo" onChange={e => setPhotoPath(e.currentTarget.value)} />
                        </div>
                        <button className="save-btn" type='submit'>Сохранить</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
}