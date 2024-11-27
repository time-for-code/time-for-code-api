import pg from 'pg'
const { Pool } = pg

import dotenv from 'dotenv'
dotenv.config()

const pool = new Pool({
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
})

export async function verificarLogin() {

    try {
        const result = await pool.query("SELECT $1? FROM professores")

    } catch(error) {
        console.log(error);
    }
    return result;

}

export async function loginUsuario(email, senha) {
    
    try {
        const email_banco = await pool.query('SELECT email WHERE email = $1', [email]);
        
    } catch (error) {
        return null;
    }

    try {
        const senha = await pool.query('SELECT senha WHERE senha = $1 AND email = $2', [email_banco, senha]);
    } catch (error) {

    }

}

export async function cadastrarUsuario(nome, ano_nascimento, email, senha) {

    try {
        const result = await pool.query('INSERT INTO cadastro (nome, ano_nascimento, email, senha) VALUES ($1, $2, $3, $4)', [nome, ano_nascimento, email, senha])
        return result;
    } catch (error) {
        console.log(error);
    }
}

export async function mostrarUsuarios() {
    try {
        const result = await pool.query('SELECT * FROM cadastro');
        return result;
    } catch(error) {
        console.log(error);
    }
}

export async function verificarEmail(email) {
    try {

        const result = await pool.query('SELECT email FROM cadastro WHERE email = $1', [email]);
        if (result.email === email) {
            return true;
        } else {
            return false;
        }
        // return email === email;
    } catch (error) {
        console.log(error);
    }
}

export async function verificarSenha(senha) {

    try {

        const result = await pool.query('SELECT senha FROM cadastro WHERE senha = $1', [senha]);
        if (result.senha === senha) {
            return true;
        } else {
            return false;
        }

    } catch (error) {
        
        console.log(error);

    }

}
