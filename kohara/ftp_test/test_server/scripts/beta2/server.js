import ftp from "ftp";
import iconv from "iconv-lite";
import path_url from "url";
import path from "path";

var c = new ftp();

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
            for(let i = 0; i < list.length; i++){
                const rawname = list[i].name;
                const fname = iconv.decode(Buffer.from(rawname, "binary"), "utf-8");
                console.log(fname);
            }
        }
        c.end();
    });
});

c.on("error", function (err) {
    console.log(err);
    c.end();
});