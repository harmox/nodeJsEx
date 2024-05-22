const http = require(`http`)
const { homeHandler, addBreedHandler, addCatHandler, postBreedHandler } = require("./handlers.js")
const { staticHandler } = require(`./cssHandler.js`)

const routes = {
    "GET": {
        "/": homeHandler,
        "/add-breed": addBreedHandler,
        "/add-cat": addCatHandler,
    },
    "POST": {
        "/add-breed": postBreedHandler
    }

}

http.createServer((req, res) => {
    const [pathName, query] = (req.url.split(`?`))
    console.log(pathName, query)
    const method = routes[req.method]
    if (method) {
        const route = method[pathName]
        if (typeof route == `function`) {
            route(req, res)
            return
        };
    }
    if (staticHandler(req, res)) {
        return;
    }
    res.writeHead(404, [
        `Content-Type`, `text/plaint`
    ])
    res.write(`404 not found`)
    res.end()
}).listen(3000);