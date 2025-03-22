const http = require("http");
const url = require("url");
const path = require("path");
const fs = require("fs");
const { error } = require("console");

const server = http.createServer(rotas);
server.listen(5000, () => console.log("servidor rodando!"));

function rotas(request, response) {
    const URL = url.parse(request.url, true);
    const filePath = path.join(__dirname, "..", "mock", "alunos.json")

    if (request.method === "GET" && URL.pathname === "/") {
        return response.end("ola mundo")
    }

    if (request.method === "GET" && URL.pathname === "/alunos") {
        fs.readFile(filePath, "utf-8", (error, data) => {
            if (error) {
                response.writeHead(400, {"Content-Type":"text/plain"})
                console.error(error)
                return response.end(JSON.stringify({ error: "erro de lelitura de arquivo"}))
            }

            response.writeHead(200, {"Content-Type":"text/plain"})
            return response.end(data)
        });
    };
};