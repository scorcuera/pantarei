import prisma from "../connection/db_client"

export const Skill = {
    getAllSkills: async () => {
        try {
            const skills = await prisma.skills.findMany();
            return skills;
        } catch (error) {
            console.error(error);
        }
    }
}