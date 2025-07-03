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
            },  
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

// TODO export async function retrieveUserById(id)

export async function saveExerciseStatistics(total_attempts, time_of_conclusion, finished, total_of_points, user_id) {
    try {

        const exerciseStatistics = await prisma.statistic.create({
            data: {
                total_attempts,
                time_of_conclusion,
                finished,
                total_of_points,
                user_id
            }
        })

        if (!exerciseStatistics) {
            return false;
        }

        return { is_finished: exerciseStatistics.finished, total_points: exerciseStatistics.total_of_points, user_id: exerciseStatistics.user_id };


    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function getAllUsersWithStatistics(user_id) {
    try {
        const users = await prisma.user.findMany({
            omit: {
                name: true,
                year_of_birth: true,
                email: true,
                password: true
            },
            where: {
                user_id
            },
            include: {
                statistics: {
                    orderBy: {
                        total_of_points: "desc"
                    }
                }
            }
        });

        if (!users) {
            return false;
        }

        return users;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function getPerformanceOfUserId(user_id) {
    try {
        const performance = await prisma.statistic.findMany({
            where: { user_id },
            orderBy: { created_at: "desc" }
        });

        if (!performance) {
            return false;
        }
        // const { total_attempts, time_of_conclusion, finished, total_of_points } = performance[0];

        // return { total_attempts, time_of_conclusion, finished, total_of_points };
        return performance;
    } catch (error) {
        console.log(error);
        return false;
    }
}
