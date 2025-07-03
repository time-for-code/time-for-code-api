import { z } from 'zod';
import { getAllUsersWithStatistics, getPerformanceOfUserId } from '../config/database.js';

const performanceValidation = z.object({
    total_attempts: z.number().int().positive({ message: "É preciso informar um número de tentativas" }),
    time_of_conclusion: z.number().positive({ message: "É preciso informar o tempo de conclusão" }),
    finished: z.boolean({ message: "É preciso informar se o exercício foi ou não finalizado" }),
    total_of_points: z.number().positive({ message: "É preciso informar a pontuação total" }),
    user_id: z.string().uuid({ message: "É preciso informar o ID do usuário" }),
});

export async function getPerformanceByUserId(req, res) {
    try {

        const user_id = req.params.user_id;

        if (!user_id) {
            return res.status(400).json({ "Error": "Bad Request" });
        }

        const performanceById = await getPerformanceOfUserId(user_id);

        if (!performanceById) {
            return res.status(400).json({ "Error": "Bad Request" });
        }

        return res.status(201).json(performanceById);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ errors: error.errors });
        }
        return res.status(500).json({ "Error": "Internal Server Error" });
    }
}

export async function getAllUsersAndRanking(req, res) {
    try {

        // TODO: ORDER BY DESC total_of_points
        const user_id = req.params.user_id;
        if (!user_id) {
            return res.status(400).json({ "Error": "Bad Request" });
        }

        const users = await getAllUsersWithStatistics(user_id);
        
        if (!users) {
            return res.status(400).json({ "Error": "Bad Request" });
        }

        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ "Error": "Internal Server Error" });
    }
}
