export interface IResume {
    id: string;
    phoneNumber: string;
    email: string;
    name: {
        firstName: string;
        lastName: string;
    },
    photoPath: string;
    personalInfo: string;
    birthDate: Date;
    wantedPosition:string;
}