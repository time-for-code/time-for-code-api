import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function newUserRegister(name, yearOfBirth, email, password) {
    try {

        yearOfBirth = yearOfBirth.toString();
        const hash = await bcrypt.hash(password, 15);

        const userRegistered = await prisma.user.create({
            data: {
                name,
                year_of_birth: yearOfBirth,
                email,
                password: hash
            }
        });

        if (!userRegistered) {
            return null;
        }

        return { name: userRegistered.name, id: userRegistered.user_id };

    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function signUpUser(email, password) {

    try {

        const user = await prisma.user.findUnique({
            where: { email }
        });


        const decryptedPassword = await bcrypt.compare(
            password, user.password);
        console.log(decryptedPassword);

        if (decryptedPassword) {
            return true;
        }
        
    } catch (error) {
        return false;
    }
}

export async function retrieveAllUsers() {
    try {

        const users = await prisma.user.findMany({
            select: {
                user_id: true,
                name: true,
                year_of_birth: true,
                email: true,
                password: false
            }
        });

        if (!users) {
            return false;
        }

        return users;
    } catch (error) {
        return false;
    }
}
