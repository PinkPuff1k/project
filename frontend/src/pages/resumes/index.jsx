import React, { useEffect } from "react";

import { Button, Img, Line, List, Text } from "components";
import Header from "components/Header";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "reducers/userReducer";
import { selectResumes, setResumes } from "reducers/resumesReducer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './resume.css'

const Page5 = () => {
  const resumes = useSelector(selectResumes);
  const user = useSelector(selectUser)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getYearPostfix = (age) => {
    if (age >= 10 && age <= 20) {
      return 'лет'
    }
    const mod = age % 10;
    if (mod == 1) {
      return 'год'
    }
    if (mod >= 2 && mod <= 4) {
      return "года"
    }
    if (mod >= 5 || mod == 0) {
      return "лет"
    }
  }

  const calculateAge = (date) => {
    const birthDate = new Date(date)
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return `${age} ${getYearPostfix(age)}`;
  }

  useEffect(() => {
    if (!resumes) {
      axios('/resumes')
        .then(res => dispatch(setResumes(res.data)))
        .catch(reason => alert(`Error: ${reason}`))
    }
  }, [])
  return (
    <>
      <div className="wrapper">
        <Header className="header" />
        <div className="resume-wrap">
          <div className="resume-header">
            <Text
              className="resume-title"
            >
              Поиск резюме в Витебске
            </Text>
            <Text
              className="resume-header-info"
            >
              Найдено {resumes.length} резюме
            </Text>
          </div>
          <div className="resume-info">
              <List
                className="flex flex-col gap-8 items-center w-full"
                orientation="vertical"
              >
                {resumes ? resumes.map(resume => <div className="resume-block">
                    <div className="resume-block-info">
                      <div className="info-text">
                        <Text
                          className="text-black-900 text-xl"
                          size="txtInterBold20"
                        >
                          {resume.wantedPosition}
                        </Text>
                        <Text
                          className="mt-1.5 text-[13px] text-black-900"
                          size="txtInterRegular13"
                        >
                          {calculateAge(resume.birthDate)}
                        </Text>
                        <Text
                          className="mt-9 text-[15px] text-black-900"
                          size="txtInterRegular15"
                        >
                          <>
                            {resume.personalInfo}
                          </>
                        </Text>
                        <button
                          className="apply"
                          onClick={e => {
                            e.preventDefault();
                            user ? alert(`Персональные данные. \nИмя: ${resume.name.lastName} ${resume.name.firstName}\nНомер телефона: ${resume.phoneNumber}\nПочта: ${resume.email}`) : alert("Сначала войдите в систему")
                          }}>
                          Откликнуться
                        </button>
                      </div>
                      <Img
                        className="h-[110px] md:h-auto rounded-[50%] w-[110px]"
                        src="images/img_ellipse1_110x110.png"
                        alt="ellipseOne"
                      />
                    </div>
                </div>) : <Text
                  className="mt-9 text-[15px] text-black-900"
                  size="txtInterRegular15"
                >
                  <>
                    Loading...
                  </>
                </Text>}


              </List>
          </div>


        </div>
      </div>
    </>
  );
};

export default Page5;
