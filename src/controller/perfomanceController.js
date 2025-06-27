import { z } from 'zod';

const performanceValidation = z.object({
    total_attempts: z.number().int().positive({ message: "É preciso informar um número de tentativas" }),
    time_of_conclusion: z.number().positive({ message: "É preciso informar o tempo de conclusão" }),
    finished: z.boolean({ message: "É preciso informar se o exercício foi ou não finalizado" }),
    total_of_points: z.number().positive({ message: "É preciso informar a pontuação total" }),
    finished: z.boolean({ message: "É preciso informar se o exercício foi finalizado" }),
    user_id: z.string().uuid({ message: "É preciso informar o ID do usuário" }),
});

export async function getPerformanceByUserId(req, res) {
    try {

        statisticSchemaValidation.parse(req.body); // Lança exceção se campos são inválidos

        // const { exercise_name, time_of_conclusion, total_attempts, finished }
        const { total_attempts, time_of_conclusion, finished, total_of_points, user_id } = req.body;

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

export async function getAllUsersAndRanking(req, res) {
    try {

        // TODO: ORDER BY DESC total_of_points

        // const users = await getAllUsersWithStatistics();
        // const { total_of_points }
        if (!users) {
            return res.status(400).json({ "Error": "Bad Request" });
        }

        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ "Error": "Internal Server Error" });
    }
}
