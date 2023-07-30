import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Text } from "components";
import Header from "components/Header";
import { useSelector} from "react-redux";
import { selectUser } from "reducers/userReducer";
import './main.css'

const Page3 = () => {
  // const user = useSelector(selectUser);
  const user = useSelector((state) => state.user);

  return (
    <>
      <div className="wrap-main">
        <Header className="header" />
        <div className="container-main">
          <div className="main-information">
            <div className="create-resume-info">
              <div className="text-job">
                <Text
                  className="title-job"
                >
                  Работа
                </Text>
                <Text
                  className="info-job"
                >
                  HR  — это лучшие предложения высокооплачиваемой работы
                  от белорусских и  зарубежных компаний.
                </Text>
              </div>
              <Link to={"/login"}>
                <Button className="btn-job">
                  Разместить резюме
                </Button>
              </Link>
            </div>
            <div className="create-vacancy-info">
              <div className="text-employees">
                <Text
                  className="title-employees"
                >
                  Сотрудники
                </Text>
                <Text
                  className="info-employees"
                >
                  <>
                    HR — самая большая
                    <br />
                    и качественная база резюме
                    <br />
                    лучших специалистов в Беларуси.
                  </>
                </Text>
              </div>
              <Link to={"/login"}>
                <Button className="btn-employees">
                  Разместить вакансию
                </Button> 
              </Link>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page3;
