import express, { Express } from "express"
import { RegisterDto, getAllUsers, register, getUserByUsernameAndPassword, saveUser, deleteUserById } from "./services/user.service";
import bodyParser from "body-parser";
import { createResume, findAllResumes, findAllResumesByName, saveResume } from "./services/resume.service";
import { createVacancy, findAllVacancies, findAllVacanciesByName } from "./services/vacancy.service";

const app: Express = express();
app.use(bodyParser.json())

app.get('/users', async (req, res) => {
    return res.send(await getAllUsers());
})


app.post('/users/register', async (req, res) => {
    try {
    const user = await register(req.body);
    res.statusCode=201;
    res.send(user)
    } catch (e) {
        res.sendStatus(403)
    }
})

app.post('/users/login', async (req, res) => {
    const dto = req.body;
    console.log(dto);
    const foundedUser = await getUserByUsernameAndPassword(dto.username, dto.password);
    if (!foundedUser) {
        res.sendStatus(404)
    } else {
        res.send(foundedUser);
    }
})

app.patch('/users', async (req, res) => {
    const user = req.body;
    const saved = await saveUser(user);
    res.send(saved);
})

app.post('/users/:id',async (req,res) => {
    const id = req.params.id;
    console.log(id)
    await deleteUserById(id);
    res.sendStatus(204)
})

app.post('/resumes',async (req,res) => {
    const dto = req.body;
    console.log(dto)
    const savedResume = await createResume(dto);
    res.send(savedResume)
})
app.get('/resumes',async (req,res) => {
    const savedResume = await findAllResumes();
    res.send(savedResume)
})
app.get('/resumes/:name',async (req,res) => {
    const name = req.params.name;
    console.log(name)
    const foundedResume = await findAllResumesByName(name);
    res.send(foundedResume)
})

app.post('/vacancies', async (req,res) => {
    const dto = req.body;
    const savedVacancy = await createVacancy(dto);
    res.send(savedVacancy)
})
app.get('/vacancies', async (req,res) => {
    const savedVacancy = await findAllVacancies();
    res.send(savedVacancy)
})

app.get('/vacancies/:name', async (req, res) => {
    const name = req.params.name;
    const savedVacancy = await findAllVacanciesByName(name)
    res.send(savedVacancy)
})

app.listen(3001, () => {
    console.log('Server launched on 3001')
})