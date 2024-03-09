import { Router } from "express";
import { SkillController } from "../controllers/skill.controller";

export const skillRoutes = Router();

skillRoutes.route("/").get(SkillController.getAllSkills);
skillRoutes.route("/:id").get(SkillController.getSkillById);
skillRoutes.route("/").post(SkillController.createSkill);
skillRoutes.route("/:id").put(SkillController.updateSkill);
skillRoutes.route("/:id").delete(SkillController.deleteSkill);