import ftp from "ftp";
import iconv from "iconv-lite";
import express from "express";
import { fileURLToPath } from "url";
import path from "path";

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.text());


app.post("/", (req, res) => {
    const c = new ftp();
    const dir = req.body;
    console.log(dir);

    const sendResponse = (status, data) => {
        if (!res.headersSent) {
            res.status(status).send(data);
        }
        c.end();
    };

    c.on("ready", () => {
        c.list(`/${dir}`, (err, list) => {
            if (err) return sendResponse(500, { error: err.message });
            if (!list.length) return sendResponse(200, "no file");

            const fileNames = list.map(item =>
                iconv.decode(Buffer.from(item.name, "binary"), "utf-8")
            );
            console.log(fileNames);
            sendResponse(200, fileNames);
        });
    });

    c.on("error", (err) => {
        console.error(err);
        sendResponse(500, { error: err.message });
    });

    c.connect({
        host: "127.0.0.1",
        port: 21,
        user: "user",
        password: "password",
        encoding: "binary",
    });
});

app.get("/", (req, res) => res.send("Hello World!"));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
