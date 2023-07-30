import React, { useState } from "react";

import { Text } from "components";
import Header from "components/Header";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "reducers/userReducer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './createVacancy.css'


export const CreateVacancy = () => {
    const user = useSelector(selectUser)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [position, setPosition] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [companyDuty, setCompanyDuty] = useState('');
    const [positionError, setPositionError] = useState('');
    const [companyNameError, setCompanyNameError] = useState('');
    const [companyDutyError, setCompanyDutyError] = useState('');

    const handleCreateVacancy = () => {
        setCompanyNameError("");
        setCompanyDutyError("");
        setPositionError("");
        let isValid = true;
        if (companyName.trim() === "") {
            setCompanyNameError("Обязательное поле");
            isValid = false;
        }
        if (companyDuty.trim() === "") {
            setCompanyDutyError("Обязательное поле");
            isValid = false;
        }
        if (position.trim() === "") {
            setPositionError("Обязательное поле");
            isValid = false;
        }
        if (isValid) {
            const config = {
                method: 'POST',
                data: {
                    position, companyName, companyDuty
                }
            }
            axios('/vacancies', config)
                .then(res => navigate('/'))
                .catch(reason => alert(`Error: ${reason}`))
        }
    }

    return <>
        <div className="createVacancy-wrap">
            <Header className="header" />
            <div className="createVacancy-container">
                <div className="create-vacancy">
                    <div className="header">
                        <Text className="title">
                            Составить вакансию
                        </Text>
                    </div>
                    <div className="main">
                        <div className="flex flex-col items-start justify-start w-[100%] md:w-full">
                            <div className="flex md:flex-col flex-row md:gap-10 items-start justify-between w-full">
                                <div className="flex flex-col items-start justify-start">
                                    <div className="flex flex-row items-center justify-between w-[71%] md:w-full">
                                    </div>
                                </div>
                                <div className="vacancy-form">
                                    <div className="position">
                                        <Text>Должность</Text>
                                        <input value={position} onChange={e => setPosition(e.target.value)} />
                                        {positionError && <div className="error">{positionError}</div>}
                                    </div>
                                    <div className="company-name">
                                        <Text>Название компании</Text>
                                        <textarea value={companyName} onChange={e => setCompanyName(e.target.value)} />
                                        {companyNameError && <div className="error">{companyNameError}</div>}
                                    </div>
                                    <div className="company-duty">
                                        <Text>Комментарий к вакансии</Text>
                                        <textarea value={companyDuty} onChange={e => setCompanyDuty(e.target.value)} />
                                        {companyDutyError && <div className="error">{companyDutyError}</div>}
                                    </div>
                                    <div className="create-vacancy-btn">
                                        <button onClick={handleCreateVacancy}>Создать</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
};

export default CreateVacancy;
