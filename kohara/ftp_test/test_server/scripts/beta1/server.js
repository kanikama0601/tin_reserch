import ftp from "ftp";
import path_url from "url";
import path from "path";

var c = new ftp();

c.connect({
    host: "127.0.0.1",
    port: 21,
    user: "user",
    password: "password",
    secure: false,
});

c.on("ready", function () {
    c.list("/", function (err, list) {
        if (err) {
            console.log(err);
        } else {
            console.log(list);
        }
        c.end();
    });
});

c.on("error", function (err) {
    console.log(err);
    c.end();
});