import { z } from 'zod';
import jwt from 'jsonwebtoken';
import { newUserRegister, signUpUser, retrieveAllUsers } from "../config/database.js";

const user = z.object({
    name: z.string().nonempty({ message: "Nome inválido" }),
    yearOfBirth: z.number().int().positive({ message: "Ano de nascimento inválido" }),
    email: z.string().email({ message: "E-mail inválido" }),
    password: z.string().min(8, { message: "Senha inválida" }),
});

const loginSchema = z.object({
    email: z.string().email({ message: "E-mail inválido" }),
    password: z.string().min(8, { message: "Senha inválida" }),
});

export async function registerNewUser(req, res) {

    try {

        user.parse(req.body); // Lança exceção se campos são inválidos

        const { name, yearOfBirth, email, password } = req.body;
        
        // user.parse({ name, yearOfBirth, email, password });
        
        const newUser = await newUserRegister(name, yearOfBirth, email, password);  
        
        if (!newUser) {
            return res.status(400).json({ "Error": "Bad Request" });
        }

        res.location(`/users/${newUser.id}`);
        return res.status(201).json(newUser);
    } catch (error) {
        console.log(error.status)
        if (error instanceof z.ZodError) {
            return res.status(400).json({ errors: error.errors });
        }
        return res.status(400).json({ "Error": "Bad Request" });
    }
}

export async function userLogIn(req, res) {

    try {

        loginSchema.parse(req.body); // Lança exceção se campos são inválidos

        const { email, password } = req.body;
        const isValid = await signUpUser(email, password);

        if (!isValid) {
            return res.status(401).json({ "Authentication": "Unauthorized" });
        }

        const token = jwt.sign(
            { email },
            env(JWT_SECRET_KEY) || "default_secret_key",
            { expiresIn: '1h' }
        );

        return res.status(202).json({ "Authentication": "User authenticated" });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ errors: error.errors });
        }
        return res.status(401).json({ "Authentication": "Unauthorized" });
    }

}

export async function getAllUsers(req, res) {
    try {
        const users = await retrieveAllUsers();
        if (!users) {
            return res.status(404).json({ "Error": "Not Found" });
        }
        return res.status(200).json(users);
    } catch (error) {
        return res.status(404).json({ "Error": "Not Found" });
    }
}
