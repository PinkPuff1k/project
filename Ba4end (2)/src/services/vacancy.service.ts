import { randomUUID } from 'crypto'
import { readFile, writeFile } from "fs/promises";
import { IResume } from "../interfaces/IResume";
import { IVacancy } from '../interfaces/IVacancy';

const VACANCY_FILE = 'vacancies.json';

type VacancyFileData = {
    vacancies: IVacancy[]
}

export type CreateVacancyDto = Omit<IVacancy, 'id'>

export const createVacancy = async (dto: CreateVacancyDto) => {
    const rawData = (await readFile(VACANCY_FILE)).toString();
    const parsedUsers = JSON.parse(rawData) as VacancyFileData;
    const mappedUser: IVacancy = {
        ...dto,
        id: randomUUID()
    }
    parsedUsers.vacancies.push(mappedUser);
    await writeFile(VACANCY_FILE, JSON.stringify(parsedUsers));
    return mappedUser;
}

export const saveResume = async (resume: IVacancy) => {
    const rawData = (await readFile(VACANCY_FILE)).toString();
    const parsedUsers = JSON.parse(rawData) as VacancyFileData;
    parsedUsers.vacancies = parsedUsers.vacancies.map(u => {
        if (u.id !== resume.id) {
            return u
        }
        return resume
    })
    await writeFile(VACANCY_FILE, JSON.stringify(parsedUsers));
    return resume;
}

export const findAllVacancies = async () => {
    const rawData = (await readFile(VACANCY_FILE)).toString();
    const parsedUsers = JSON.parse(rawData) as VacancyFileData;
    return parsedUsers.vacancies;
}

export const findAllVacanciesByName = async (name: string) => {
    const rawData = (await readFile(VACANCY_FILE)).toString();
    const parsedUsers = JSON.parse(rawData) as VacancyFileData;
    return parsedUsers.vacancies.filter(vacancy => vacancy.position.toLocaleLowerCase().includes(name.toLocaleLowerCase()));
}