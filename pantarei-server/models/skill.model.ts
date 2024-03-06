import { prisma } from "../connection/db_client"

export const Skill = {
    getAllSkills: async () => {
        try {
            const skills = await prisma.skills.findMany();
            return skills;
        } catch (error) {
            throw new Error("An error occurred while fetching skills");
        }
    },
    getSkillById: async (id: string) => {
        try {
            const skill = await prisma.skills.findUnique({
                where: {
                    id: id
                }
            });
            if (!skill) {
                throw new Error('Skill not found');
            }
            return skill;
        } catch (error) {
            throw new Error("An error occurred while fetching skill");
        }
    }
}