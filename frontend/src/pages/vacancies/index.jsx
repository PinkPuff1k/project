import React, { useEffect } from "react";
import { selectUser } from "reducers/userReducer";
import { Button, List, Text } from "components";
import { Link } from "react-router-dom";
import Header from "components/Header";
import { useDispatch, useSelector } from "react-redux";
import { selectVacancies, setVacancies } from "reducers/vacanciesReducer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './vacancies.css'

const Page = () => {
  const vacancies = useSelector(selectVacancies);
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!vacancies) {
      axios('/vacancies')
        .then(res => dispatch(setVacancies(res.data)))
        .catch(err => alert(`Error: ${err}`))
    }
  })
  return (
    <>
      <div className="wrapper">
        <Header className="header" />
        <div className="Vacancies-wrap">
          <div className="Vacancies-header">
            
                  <Text
                    className="Vacancies-title"
                  >
                    Поиск вакансий в Витебске
                  </Text>
                  <Text
                    className="Vacancies-header-info">
                    Найдено {vacancies.length} вакансий
                  </Text>
                </div>
                <div className="Vacancies-info">
                  
                    {vacancies ?
                      <List
                        className="flex flex-col gap-8 items-center w-full"
                        orientation="vertical"
                      >
                        {vacancies.map(vacancy =>
                          <div className="Vacancies-block">
                            <div className="block-info">
                              <Text
                                className="ml-5 md:ml-[0] mt-6 text-black-900 text-xl"
                                size="txtInterBold20"
                              >
                                {vacancy.position}
                              </Text>
                              <Text
                                className="ml-5 md:ml-[0] mt-7 text-base text-black-900 w-[97%] sm:w-full"
                                size="txtInterRegular16"
                              >
                                {vacancy.companyDuty}
                              </Text>
                              <Link to={"/createResume"}>
                                <Button className="apply">
                                Откликнуться
                                </Button></Link>
                            </div>
                          </div>)}
                      </List> : <>Loading...</>}

                  
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
