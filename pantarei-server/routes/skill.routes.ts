import { Router } from "express";
import { SkillController } from "../controllers/skill.controller";

export const skillRoutes = Router();

skillRoutes.route("/").get(SkillController.getAllSkills);
skillRoutes.route("/:id").get(SkillController.getSkillById);
skillRoutes.route("/").post(SkillController.createSkill);