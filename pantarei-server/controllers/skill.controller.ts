import { Request, Response } from "express";
import { ZodError } from "zod";
import { Skill } from "../models/skill.model";
import { SkillSchema } from "../schemas/skill.schema";

export const SkillController = {
    getAllSkills: async (req: Request, res: Response) => {
        try {
            const skills = await Skill.getAllSkills();
            res.json(skills);
        } catch (error) {
            res.status(500).json({ message: "An error occurred while fetching skills" });
        }
    },
    getSkillById: async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const skill = await Skill.getSkillById(id);
            if (skill === undefined || skill === null) {
                return res.status(404).json({ message: "Skill not found" });
            }
            res.json(skill);
        } catch (error) {
            res.status(500).json({ message: "An error occurred while fetching skill" });
        }
    },
    createSkill: async (req: Request, res: Response) => {
        try {
            const newSkill = SkillSchema.parse(req.body);
            const skill = await Skill.createSkill(newSkill);
            res.status(201).json({ message: "Skill created successfully", skill: skill });
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({ message: error.issues[0].message });
            }
            res.status(500).json({ message: "An error occurred while creating skill" });
        }
    },
    updateSkill: async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const skill = await Skill.getSkillById(id);
            if (skill === undefined || skill === null) {
                return res.status(404).json({ message: "Skill not found" });
            }
            const skillData = req.body;
            const updatedSkill = await Skill.updateSkill(id, skillData);
            res.status(200).json({ message: "Skill updated successfully", skill: updatedSkill });
        } catch (error) {
            res.status(500).json({ message: "An error occurred while updating skill" });
        }
    },
    deleteSkill: async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const skill = await Skill.getSkillById(id);
            if (skill === undefined || skill === null) {
                return res.status(404).json({ message: "Skill not found" });
            }
            await Skill.deleteSkill(id);
            res.status(200).json({ message: "Skill deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: "An error occurred while deleting skill" });
        }
    },
}