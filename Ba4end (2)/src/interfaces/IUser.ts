
export interface IUser {
    id: string;
    username: string;
    password: string;
    phoneNumber: string;
    email: string;
    name: {
        firstName: string;
        lastName: string;
    },
    photoPath: string;
    personalInfo: string;
    birthDate?: Date;
    role: 'employee' | 'employer';
}