import { IUser } from "../interfaces/IUser";
import { randomUUID } from 'crypto'
import { readFile, writeFile } from "fs/promises";
import { IResume } from "../interfaces/IResume";

const RESUME_FILE = 'resumes.json';

type ResumeFileData = {
    resumes: IResume[]
}

export type CreateResumeDto = Omit<IResume, 'id'>

export const createResume = async (dto: CreateResumeDto) => {
    const rawData = (await readFile(RESUME_FILE)).toString();
    const parsedUsers = JSON.parse(rawData) as ResumeFileData;
    const mappedUser: IResume = {
        ...dto,
        id: randomUUID()
    }
    parsedUsers.resumes.push(mappedUser);
    await writeFile(RESUME_FILE, JSON.stringify(parsedUsers));

    return mappedUser;
}


export const saveResume = async (resume: IResume) => {
    const rawData = (await readFile(RESUME_FILE)).toString();
    const parsedUsers = JSON.parse(rawData) as ResumeFileData;
    parsedUsers.resumes = parsedUsers.resumes.map(u => {
        if (u.id !== resume.id) {
            return u
        }
        return resume

    })
    await writeFile(RESUME_FILE, JSON.stringify(parsedUsers));
    return resume;
}


export const findAllResumes = async () => {
    const rawData = (await readFile(RESUME_FILE)).toString();
    const parsedUsers = JSON.parse(rawData) as ResumeFileData;
    return parsedUsers.resumes;
}

export const findAllResumesByName = async (name: string) => {
    const rawData = (await readFile(RESUME_FILE)).toString();
    const parsedUsers = JSON.parse(rawData) as ResumeFileData;
    return parsedUsers.resumes.filter(resume => resume.wantedPosition.toLocaleLowerCase().includes(name.toLocaleLowerCase()));
}