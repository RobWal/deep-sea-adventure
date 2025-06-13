if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

import express, { Request, Response } from "express";
import path from "path";

const PORT =
    process.env.PORT || (process.env.NODE_ENV === "production" && 3000) || 3001;
const app = express();

app.set("trust proxy", 1);
app.use(express.json()); // support json encoded bodies

app.get("/api/test", (req: Request<any, any, any, any>, res: Response<any>) => {
    res.json({ date: new Date().toString() });
});

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "..", "client", "build")));

    app.get("/*", (req, res) => {
        res.sendFile(
            path.join(__dirname, "..", "client", "build", "index.html")
        );
    });
}

app.listen(+PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});