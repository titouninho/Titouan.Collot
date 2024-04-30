import { Router, Request, Response } from "express";
import { createClasse, getAllClasses, getClasseById } from "../../lib/classes/classe.service";
import { ZodError } from "zod";
 
const router = Router();
 
router.get("/", async (req: Request, res: Response) => {
    try {
      const characters = await getAllClasses(); 
      res.json(characters);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });
  
  
  router.get("/:id", async (req: Request, res: Response) => {
    const classeId = req.params.id;
    try {
      const classe = await getClasseById(classeId); 
      if (classe) {
        res.json(classe);
      } else {
        res.status(404).send("Classe not found");
      }
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });
 
	
router.post("/", async (req: Request, res: Response) => {
    try {
      const classe = await createClasse(req.body);
   
      res.json(classe);
    } catch (err) {
      if (err instanceof ZodError) {
        res.status(400).json(err);
        return;
      }
      console.error(err);
      res.sendStatus(500);
    }
  });
 
router.put("/:id", (req: Request, res: Response) => {
  res.send("Update");
});
 
router.delete("/:id", (req: Request, res: Response) => {
  res.send("Delete");
});
 
export const classesRouter = router;