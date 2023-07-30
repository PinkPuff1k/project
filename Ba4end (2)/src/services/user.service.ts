import { IUser } from "../interfaces/IUser";
import { randomUUID } from 'crypto'
import { readFile, writeFile } from "fs/promises";

const USER_FILE = 'users.json';

type UserFileData = {
    users: IUser[]
}

export type RegisterDto = Omit<IUser, 'id' | 'photoPath' | 'personalInfo' | 'email' | 'phoneNumber' | 'birthDate'>

export const getUserByUsernameAndPassword = async (username: string, password: string) => {
    const rawData = (await readFile(USER_FILE)).toString();
    const parsedUsers = JSON.parse(rawData) as UserFileData;
    return parsedUsers.users.find(user => user.username == username && user.password == password)
}

export const findUserById = async (id: string) => {
    const rawData = (await readFile(USER_FILE)).toString();
    const parsedUsers = JSON.parse(rawData) as UserFileData;
    return parsedUsers.users.find(user => user.id === id);
}

export const getAllUsers = async () => {
    const rawData = (await readFile(USER_FILE)).toString()
    const parsedUsers = JSON.parse(rawData) satisfies UserFileData;
    return parsedUsers.users;
}

const validateUnique = (username:string,email:string,users:IUser[]):boolean => {
    const userWithUsername = users.find(user => user.username === username);
    const usernameExists = userWithUsername!==undefined && username!=='';
    const userWithEmail = users.find(user => user.email ===email);
    const emailExists = userWithEmail!==undefined && email!=='';
    return !usernameExists && !emailExists; 
}

export const register = async (user: RegisterDto) => {
    const rawData = (await readFile(USER_FILE)).toString();
    const parsedUsers = JSON.parse(rawData) as UserFileData;
    const mappedUser: IUser = {
        ...user,
        id: randomUUID(),
        email:'',
        personalInfo:'',
        phoneNumber:'',
        photoPath:''
    }
    if (!validateUnique(mappedUser.username, mappedUser.email,parsedUsers.users)) {
        throw Error('Not unique username or phone number.')
    }
    parsedUsers.users.push(mappedUser);
    await writeFile(USER_FILE, JSON.stringify(parsedUsers));
    return mappedUser;
}

export const saveUser = async (user: IUser) => {
    const rawData = (await readFile(USER_FILE)).toString();
    const parsedUsers = JSON.parse(rawData) as UserFileData;
    parsedUsers.users = parsedUsers.users.map(u => {
        if (u.id !== user.id) {
            return u
        }
        return user
    })
    await writeFile(USER_FILE, JSON.stringify(parsedUsers));
    return user;
}

export const deleteUserById = async (id:string) => {
    const rawData = (await readFile(USER_FILE)).toString();
    const parsedUsers = JSON.parse(rawData) as UserFileData;
    parsedUsers.users = parsedUsers.users.filter(user => user.id!==id);
    await writeFile(USER_FILE, JSON.stringify(parsedUsers));
}