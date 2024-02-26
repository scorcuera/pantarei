import { Request, Response } from "express";
import { Skill } from "../models/skill.model";

export const SkillController = {
    getAllSkills: async (req: Request, res: Response) => {
        try {
            const skills = await Skill.getAllSkills();
            res.json(skills);
        } catch (error) {
           res.status(500).json({message: "An error occurred while fetching skills"});
        }
    },
    getSkillById: async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const skill = await Skill.getSkillById(id);
            if (!skill) {
                res.status(404).json({ message: "Skill not found" });
            }
            res.json(skill);
        } catch (error) {
            res.status(500).json({ message: "An error occurred while fetching skill" });
        }
    }
}
