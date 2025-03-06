import { newUserRegister, signUpUser } from "../config/database.js";

export async function registerNewUser(req, res) {

    try {
        const { name, yearOfBirth, email, password } = req.body;
        
        const newUser = await newUserRegister(name, yearOfBirth, email, password);  
        
        // if (!newUser) {
        //     res.status(400).json({ "Error": "Bad Request" });
        // }

        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ "Error": "Bad Request" });
    }
}

export async function userLogIn(req, res) {

    try {

        const { email, password } = req.body;

        const isValid = await signUpUser(email, password);

        if (!isValid) {
            res.status(401).json({ "Authentication": "Unauthorized" });
        }
        res.status(202).json({ "Authentication": "User authenticated" });
    } catch (error) {
        res.status(401).json({ "Authentication": "Unauthorized" });
    }

}

