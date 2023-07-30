import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Img } from "components";
import './header.css'
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "reducers/userReducer";
import axios from "axios";
import { setVacancies } from "reducers/vacanciesReducer";
import { setResumes } from "reducers/resumesReducer";

const Header = (props) => {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Вакансии');
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout())
    navigate('/')
  }
  const onSubmit = (e) => {
    e.preventDefault();
    if (category === 'Вакансии') {
      axios(`/vacancies/${name}`)
        .then(res => {
          dispatch(setVacancies(res.data))
          navigate('/vacancies')
        })
        .catch(err => alert(`Error: ${err}`))
    } else {
      axios(`/resumes/${name}`)
        .then(res => {
          dispatch(setResumes(res.data))
          navigate('/resume')
        })
        .catch(err => alert(`Error: ${err}`))
    }
  }
  const authBlock = <>
    {user ?
      <>
        {user.role === 'employer' ? (
          <Link to='/personalEmployer' className="account">
            Кабинет
          </Link>
        ) : (
          <Link to='/personal' className="account">
            Кабинет
          </Link>
        )}
        <div onClick={handleLogout} className="exit">
          Выйти
        </div>
      </> : <>
        <Link
          to='/login'
          className="sign-in"
          size="txtInterMedium20WhiteA700">
          Войти
        </Link>
        <Link
          to='/register'
          className="register"
          size="txtInterMedium20WhiteA700">
          Регистрация
        </Link>
      </>
    }
  </>
  return (
    <>
      <header className={props.className}>
        <div className="header">
          <div className="header-row ">
            <Img
              className="logo"
              src="images/img_.png"
              alt="Fifteen"
            />

            <div className="search-bar" >
              <input
                value={name}
                onChange={e => setName(e.currentTarget.value)}
                placeholder="Должность"
              />
              <select
                className="list"
                size="txtInterRegular20Black90070"
                onChange={e => setCategory(e.target.value)}>
                <option value="Вакансии">Вакансии</option>
                <option value="Резюме">Резюме</option>
              </select>


              <button onClick={onSubmit} className="search">
                Найти
              </button>
              {/* <Button
                className="bg-white-A700 text-xl pt-5 pl-3 m-auto pb-5 w-[10%]"
                size="bg-white-A700 txtInterRegular20">
                Найти</Button> */}

            </div>
            {authBlock}
          </div>
        </div>


      </header >
    </>
  );
};

Header.defaultProps = {};

export default Header;
