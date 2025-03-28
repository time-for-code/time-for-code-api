import pg from "pg";
const { Pool } = pg;

import bcrypt from "bcrypt";

const pool = new Pool({
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
});

export async function newUserRegister(name, yearOfBirth, email, password) {
    try {

        const hash = await bcrypt.hash(password, 15);

        const newUser = { name, yearOfBirth, email, hash };

        pool.query(`INSERT INTO users
            (name, year_of_birth, email, password) VALUES ($1, $2, $3, $4)`,
            [name, yearOfBirth, email, hash]);

        const registeredUser = { "name" : newUser.name };
        return registeredUser; 
    } catch (error) {
        console.log(error);
    }
}

export async function signUpUser(email, password) {

    try {

        const emailCheck = await pool.query(`
                SELECT email FROM users WHERE email = $1
            `, [email]);
        
        if (emailCheck.rows[0].email !== email) {
            return null;
        }
        const user = await pool.query(`
                SELECT name, year_of_birth, email, password
                FROM users
                WHERE email = $1
            `, [emailCheck.rows[0].email]);

        const decryptedPassword = await bcrypt.compare(
            password, user.rows[0].password);
        console.log(decryptedPassword);

        if (decryptedPassword) {
            return true;
        }
        
    } catch (error) {
        return false;
    }
}
