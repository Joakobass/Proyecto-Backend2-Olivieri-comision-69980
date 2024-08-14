import { Router } from "express";
import { generateToken, checkAuth } from "../../middlewares/auth.middleware.js";
import { handleError } from "../../middlewares/error.middleware.js";
import UserManager from "../../managers/user.manager.js";

const router = Router();
const userManager = new UserManager();

router.post("/register", async (req, res) => {
    try {
        await userManager.insertOne(req.body);
        res.status(200).redirect("/login");
    } catch (error) {
        handleError(res, error.message);

    }
});

// Ruta para iniciar sesión
router.post("/login", generateToken, async (req, res, next) => {

    try {
        const token = req.token ?? null;
        res.cookie("cookieAuthToken", token, { maxAge: 2 * 60 * 60 * 1000, httpOnly: true }).status(200).json({ status: true, token });
    } catch (error) {
        next(error);
    }
});

router.get("/current", checkAuth, async (req, res, next) => {

    try {

        const userFound = await userManager.getOneById(req.user?._id);

        res.status(200).json({ status: true, payload: userFound });
    } catch (error) {
        next(error);
    }
});

// Middleware de manejo de errores
router.use(handleError);

export default router;