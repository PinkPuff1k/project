import React from "react";

import { Img, Text } from "components";
import Header from "components/Header";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "reducers/userReducer";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import './personal.css'

const Page6 = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const onSubmitDelete = () => {
    axios(`/users/${user.id}`, { method: 'POST' })
      .then(res => {
        navigate('/')
        dispatch(logout());
      })
      .catch(reason => alert(`Error: ${reason}`))
  }
  const personalBlock = <>
    <div className="personal-wrap">
      <div className="personal-header">
        <Text className="header-title">Личная информация</Text>
        <Text className="header-info">
          {user ? user.personalInfo ? user.personalInfo : 'Ваша личная информация здесь' : 'Ваша личная информация здесь'}
        </Text>
      </div>
      <div className="personal-info">
        <div className="personal-block">
          <div className="personal-text">
            <Text className="personal-title">Фото профиля</Text>
            <Text className="personal-info-text">Решайте, как вас увидят пользователи</Text>
          </div>
          <Img
            className="personal-img"
            src="images/img_ellipse1_110x110.png"
            alt="ellipseOne"
          />
        </div>
        <div className="personal-block">
          <div className="personal-text">
            <Text
              className="personal-title"
            // size="txtInterRegular16"
            >
              Имя{" "}
            </Text>
            <Text
              className="personal-info-text"
            // size="txtInterRegular20"
            >
              {user ? `${user.name.lastName} ${user.name.firstName}` : 'Без имени'}
            </Text>
          </div>
        </div>
        <div className="personal-block">
          <div className="personal-text">
            <Text
              className="personal-title">
              Дата рождения
            </Text>
            <Text
              className="personal-info-text">
              {user ? user.birthDate ? user.birthDate.substring(0, 10) : 'Не указано' : 'Не указано'}
              {/* {user.birthDate ? user.birthDate.substring(0, 10) : 'Не указано'} */}
            </Text>
          </div>
        </div>
        <div className="personal-block">
          <div className="personal-text">
            <Text
              className="personal-title"
              size="txtInterRegular16"
            >
              Пароль
            </Text>
            <Text
              className="personal-info-text"
              size="txtInterRegular20"
            >
              {user ? user.password ? user.password : 'Не указано' : 'Не указано'}
              {/* {user.password} */}
            </Text>
          </div>
        </div>
        <div className="personal-block">
          <div className="personal-text">
            <Text
              className="personal-title">
              Номер телефона
            </Text>
            <Text
              className="personal-info-text">
              {user ? user.phoneNumber ? user.phoneNumber : 'Не указано' : 'Не указано'}
              {/* {user.phoneNumber ? user.phoneNumber : 'Не указано'} */}
            </Text>
          </div>
        </div>
        <div className="personal-block">
          <div className="personal-text">
            <Text
              className="personal-title">
              Электронная почта
            </Text>
            <Text
              className="personal-info-text">
              {user ? user.email ? user.email : 'Не указано' : 'Не указано'}
            </Text>
          </div>
        </div>
        <div className="personal-btns">
          <button className="personal-delete-btn" onClick={onSubmitDelete}>
            Удалить аккаунт
          </button>
          <div className="personal-edit-btn">
            <Link to='/personal/edit'>Редактировать</Link>
          </div>
          <div className="personal-create-btn">
            <Link to='/createResume'>Создать резюме</Link>
          </div>
        </div>
      </div>
    </div>
  </>
  return (
    <>
      <div className="bg-gray-300 flex flex-col font-inter items-center justify-start mx-auto pb-[22px] w-full">
        <Header className="bg-blue_gray-400 flex flex-col items-center justify-center md:px-5 w-full" />
        {user ? personalBlock :
          <h1>Sorry, but you need <Link to='/login'>login</Link> to access this page.</h1>}
      </div>
    </>
  );
};

export default Page6;
