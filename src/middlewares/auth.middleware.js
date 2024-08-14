import jwt from "jsonwebtoken";
import passport from "passport";
import UserManager from "../managers/user.manager.js";
import { JWT_TRANSLATIONS } from "../constants/messages.constant.js";

const userManager = new UserManager();

// Middleware para generar un token de acceso para un usuario autenticado
export const generateToken = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const userFound = await userManager.getOneByEmailAndPassword(email, password);

        const token = jwt.sign({ id: userFound._id }, process.env.SECRET_KEY, { expiresIn: "2h" });

        req.token = token;

        next();
    } catch (error) {
        next(error);
    }
};

// Middleware para verificar la autenticación del usuario
export const checkAuth = async (req, res, next) => {
    passport.authenticate("current", { session: false }, (error, user, info) => {
        if (error) return next(error);
        if (!user) return res.status(401).send(JWT_TRANSLATIONS[info.message]);

        req.user = user;

        next();
    })(req, res, next);
};