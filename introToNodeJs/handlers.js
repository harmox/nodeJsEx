const { readFile, writeFile } = require(`./u.js`)
const url = require(`url`)
function catCard(cat) {
    return `<li>
<img src="${cat.imageUrl}" alt="Black Cat">
<h3>${cat.name}</h3>
<p><span>Breed: </span>${cat.breed}</p>
<p><span>Description: </span>${cat.description}</p>
<ul class="buttons">
    <li class="btn edit"><a href="">Change Info</a></li>
    <li class="btn delete"><a href="">New Home</a></li>
</ul>
</li>`
}

async function homeHandler(req, res) {
    let html = await readFile(`/resources/views/home/index.html`)
    let catItems = JSON.parse(await readFile(`/cats.json`)).cats;
    let queryObject = url.parse(req.url, true).query.breed;

    if (queryObject) {
        catItems = catItems.filter((a) => a.breed.toLowerCase().includes(queryObject.toLowerCase())
            || a.name.toLowerCase().includes(queryObject.toLowerCase()))
    }
    res.writeHead(200, [`Content-Type`, `text/html`])
    html = html.replace('%%catR%%', catItems.map(catCard).join(``));//todo
    res.end(html)
}
async function addBreedHandler(req, res) {
    const html = await readFile(`/resources/views/addBreed.html`)
    res.writeHead(200,
        [`Content-Type`, `text/html`])
    res.end(html)

}
function breed(i) {
    return `
    <option value="${i}">${i}</option>
`
}
async function addCatHandler(req, res) {
    let html = await readFile(`/resources/views/addCat.html`)
    let breedsItems = JSON.parse(await readFile(`/cats.json`)).breeds;
    html = html.replace(`%%breeds%%`, breedsItems.map(breed).join(``))
    res.writeHead(200,
        [`Content-Type`, `text/html`])
    res.end(html)
}
async function postBreedHandler(req, res) {
    let data = ``
    req.on(`data`, (chunk) => { data += chunk })
    req.on(`end`, async () => {
        let breedsItems = JSON.parse(await readFile(`/cats.json`));
        const formData = new URLSearchParams(data);
        const breed = formData.get('breed');
        breedsItems.breeds.push(breed)
        if (breed) {
            await writeFile(`./cats.json`, breedsItems);
        }

        res.writeHead(301, [
            `Location`, `/`
        ])
        res.end()

    })

}

module.exports = {
    homeHandler,
    addBreedHandler,
    addCatHandler,
    postBreedHandler,
}