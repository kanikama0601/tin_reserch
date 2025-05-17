const dir = "toyoshimakeigo";

async function getfilelist(dir) {
    try {
        const res = await fetch("http://127.0.0.1:3000/", {
            method: "POST",
            body: dir,
            headers: {
                "Content-Type": "text/plain"
            }
        });
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.text();
        return data;

    } catch (error) {
        return error;
    }
}

let result = await getfilelist(dir);
console.log(result);