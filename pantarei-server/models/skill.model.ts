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
            })
            return skill;
        } catch (error) {
            throw new Error("An error occurred while fetching skill");
        }
    },
    createSkill: async (data: any) => {
        try {
            const skill = await prisma.skills.create({
                data: {
                    name: data.name,
                    description: data.description
                }
            });
            return skill;
        } catch (error) {
            throw new Error("An error occurred while creating skill");
        }
    },
    updateSkill: async (id: string, data: any) => {
        try {
            const skill = await prisma.skills.update({
                where: {
                    id: id
                },
                data: {
                    name: data.name
                }
            })
            return skill;
        } catch (error) {
            throw new Error("An error occurred while updating skill");             
        }
    }
}