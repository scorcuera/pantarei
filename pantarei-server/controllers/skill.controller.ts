import { Request, Response } from "express";
import { Skill } from "../models/skill.model";

export const SkillController = {
    getAllSkills: async (req: Request, res: Response) => {
        try {
            const skills = await Skill.getAllSkills();
            res.json(skills);
        } catch (error) {
            console.error(error);
        }
    }
}
