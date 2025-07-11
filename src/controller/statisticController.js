import { z } from 'zod';
import { saveExerciseStatistics } from '../config/database.js';

const statisticSchemaValidation = z.object({
    total_attempts: z.number().int().positive({ message: "É preciso informar um número de tentativas" }),
    time_of_conclusion: z.number().positive({ message: "É preciso informar o tempo de conclusão" }),
    finished: z.boolean({ message: "É preciso informar se o exercício foi ou não finalizado" }),
    total_of_points: z.number().positive({ message: "É preciso informar a pontuação total" }),
});

const userIdValidation = z.object({
    user_id: z.string().uuid({ message: "É preciso informar o ID do usuário" }),
});

export async function registerExerciseStatistics(req, res) {
    try {

        statisticSchemaValidation.parse(req.body); // Lança exceção se campos são inválidos

        const user_id = req.params.user_id;
        
        const { total_attempts, time_of_conclusion, finished, total_of_points } = req.body;

        // user_id deve ser um UUID válido, se não for, o zod já lança um erro
        // statisticSchemaValidation.shape.user_id.parse(user_id); // Lança exceção se o user_id não for válido
        userIdValidation.parse({ user_id }); // Lança exceção se o user_id não for válido

        // Salva as estatísticas do exercício no banco de dados
        // O user_id é passado como parâmetro para a função saveExerciseStatistics

        const savedStatistic = await saveExerciseStatistics(total_attempts, time_of_conclusion, finished, total_of_points, user_id);
        
        if (!savedStatistic) {
            return res.status(400).json({ "Error": "Bad Request" });
        }

        return res.status(201).json(savedStatistic);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ errors: error.errors });
        }
        return res.status(500).json({ "Error": "Internal Server Error" });
    }
}
