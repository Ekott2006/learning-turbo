import {json, urlencoded} from "body-parser";
import express, {type Express} from "express";
import morgan from "morgan";
import cors from "cors";
import userRouter from "./routes/user.routes.ts";
import groupRouter from "./routes/group.routes.ts";

export const createServer = (): Express => {
    const app = express();
    app
        .disable("x-powered-by")
        .use(morgan("dev"))
        .use(urlencoded({extended: true}))
        .use(json())
        .use(cors())
        .use((req,_, next) => {
            const time = new Date(Date.now()).toString();
            console.log(req.method, req.hostname, req.path, time);
            next();
        })
        .get("/message/:name", (req, res) => {
            return res.json({message: `hello ${req.params.name}`});
        })
        .get("/status", (_, res) => {
            return res.json({ok: true});
        })
        .use('/groups', groupRouter)
        .use('/users', userRouter)

    return app;
};
