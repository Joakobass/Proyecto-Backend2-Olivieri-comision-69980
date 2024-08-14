import { Router } from "express";

const router = Router();

// Ruta para ir al registro de usuario
router.get("/register", async (req, res) => {
    res.status(200).render("register", { title: "Registrate" });
});

// Ruta para ir a la pagina de login
router.get("/login", async (req, res) => {
    res.status(200).render("login", { title: "Login" });
});

export default router;