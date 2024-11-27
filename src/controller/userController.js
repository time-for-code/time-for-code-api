import { cadastrarUsuario } from "../config/database.js";

export async function cadastraUsuario(req, res) {

    const { nome, ano_nascimento, email, senha } = req.body
    
    try {
        
        const user = await cadastrarUsuario(nome, ano_nascimento, email, senha);
        res.status(200);

    } catch (error) {

        console.error(error.message);
        res.status(500).json({"Erro": "Falha na requisição"});

    }

}
