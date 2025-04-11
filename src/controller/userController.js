import { z } from 'zod';
import { newUserRegister, signUpUser, retrieveAllUsers } from "../config/database.js";

const user = z.object({
    name: z.string().nonempty({ message: "Nome inválido" }),
    yearOfBirth: z.number().int().positive({ message: "Ano de nascimento inválido" }),
    email: z.string().email({ message: "E-mail inválido" }),
    password: z.string().min(8, { message: "Senha inválida" }),
});

export async function registerNewUser(req, res) {

    try {
        const { name, yearOfBirth, email, password } = req.body;
        
        user.parse({ name, yearOfBirth, email, password });
        
        const newUser = await newUserRegister(name, yearOfBirth, email, password);  
        
        if (!newUser) {
            res.status(400).json({ "Error": "Bad Request" });
        }

        res.location(`/users/${newUser.id}`);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ "Error": "Bad Request" });
    }
}

export async function userLogIn(req, res) {

    try {

        const { email, password } = req.body;

        // user.parse({ email, password });

        const isValid = await signUpUser(email, password);

        if (!isValid) {
            res.status(401).json({ "Authentication": "Unauthorized" });
        }
        res.status(202).json({ "Authentication": "User authenticated" });
    } catch (error) {
        res.status(401).json({ "Authentication": "Unauthorized" });
    }

}

export async function getAllUsers(req, res) {
    try {
        const users = await retrieveAllUsers();
        if (!users) {
            res.status(404).json({ "Error": "Not Found" });
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ "Error": "Not Found" });
    }
}
