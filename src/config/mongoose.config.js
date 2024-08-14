import { connect, Types } from "mongoose";

export const connectDB = () => {

    const URI = process.env.MONGODB_URI;
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: "sessions",
    };

    connect(URI, options)
        .then(() => console.log("Conectado a MongoDB"))
        .catch((err) => console.error("Error al conectar con MongoDB", err));

};

export const isValidID = (id) => {
    return Types.ObjectId.isValid(id);
};