import ftp from "ftp"; //ftp接続
import iconv from "iconv-lite"; //utf-8変換
import express from "express"; //メインモジュール
import fetch from "node-fetch"; //get/post管理
import path_url from "url"; //html表示用
import path from "path"; //html表示用

var c = new ftp();

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post("/", (req, res) => {
    const dir= req.body;

    c.connect({
        host: "127.0.0.1",
        port: 21,
        user: "user",
        password: "password",
        encoding: "binary",
    });

    c.on("ready", function () {
        c.list("/hamadakenji", function (err, list) {
            if (err) {
                console.log(err);
            } else {
                if(list.length===0) {
                    console.log("no file");
                    res.send("no file");
                }
                for(let i = 0; i < list.length; i++){
                    const rawname = list[i].name;
                    const fname = iconv.decode(Buffer.from(rawname, "binary"), "utf-8");
                    console.log(fname);
                    res.send(fname);
                }
            }
            c.end();
        });
    });

    c.on("error", function (err) {
        console.log(err);
        c.end();
    });
    
})


app.get("/", (req, res) => {
    res.send("Hello World!");
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));


// サーバーを起動
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});