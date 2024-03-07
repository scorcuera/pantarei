import { Request, Response } from "express";
import { Skill } from "../models/skill.model";
import { SkillSchema } from "../schemas/skill.schema";
import { ZodError } from "zod";

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
            if (skill === undefined || skill === null){
                return res.status(404).json({ message: "Skill not found" });
            }
            res.json(skill);
        } catch (error) {
            res.status(500).json({ message: "An error occurred while fetching skill" });
        }
    },
    createSkill : async(req: Request, res: Response) => {
        try {
            const newSkill = SkillSchema.parse(req.body);
            const skill = await Skill.createSkill(newSkill);
            res.status(201).json({message: "Skill created successfully", skill: skill});
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({ message: error.issues[0].message });
            }
            res.status(500).json({ message: "An error occurred while creating skill" });
        }
    }
}
