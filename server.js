const http = require("http");
const system = require("os");
const toRupiah = require("rupiah-format");
console.log("memory: ", system.freemem());

const myName = "Aditya Pramudita";

function getName() {
    return myName;
}

const player = {
    // key: value
    id: 1,
    name: getName(),
    total_match: 100,
    win: 200,
    lose: 100,
    age: 20,
    saldo: 50000,
};

const items = [{
        item_id: 111,
        item_name: "War-Axe",
        item_damage: 500,
        item_drop: false
    },
    {
        item_id: 115,
        item_name: "BOD",
        item_damage: 1000,
        item_drop: true
    },
    {
        item_id: 115,
        item_name: "BloodAxe",
        item_damage: 400,
        item_drop: false
    },
    {
        item_id: 115,
        item_name: "Heptaseis",
        item_damage: 800,
        item_drop: false
    },
    {
        item_id: 115,
        item_name: "DHS",
        item_damage: 600,
        item_drop: false
    },
    {
        item_id: 115,
        item_name: "Windtalker",
        item_damage: 400,
        item_drop: true
    },
];

const playerItems = Object.assign(player, items[1]);

function generateAge() {
    if (player.age >= 6 && player.age <= 10) {
        return "anak-anak";
    } else if (player.age >= 11 && player.age <= 17) {
        return "remaja";
    } else if (player.age >= 18 && player.age <= 30) {
        return "dewasa";
    } else if (player.age >= 31 && player.age <= 60) {
        return "orang tua";
    } else if (player.age >= 100) {
        return "Dewa";
    } else {
        return "Balita";
    }
}

function generateWinRate() {
    const win_rate = (player.win / player.total_match) * 100
    return win_rate;
}

function hero(id, name, atk, def) {
    return {
        id,
        name,
        atk,
        def
    }
}

function interaction(request, response) {
    console.log("url yang di akses: ", request.url);
    if (request.url == "/") {
        response.writeHead(200, {
            "Content-Type": "text/html"
        });
        response.write(`<html>
        <head>
        <title>DEACOURSE NODE JS</title>
        </head>
        <body style="background: #555;color: #fff; height: 100vh;width: 100%;">
        <h1>
        <marquee>I'm ${myName}</marquee>
        </h1>
        <h3>usia saya ${player.age}</h3>
        <h3>saya golongan ${generateAge()}</h3>
        </body>
        </html>`);
    } else if (request.url == "/player") {
        response.writeHead(200, {
            "Content-Type": "text/html"
        });
        response.write(`<html>
        <head>
        <title>PLAYER</title>
        </head>
        <body style="background: #555;color: #fff; height: 100vh;width: 100%;">
        <h1>
        <marquee>DATA PLAYER</marquee>
        </h1>
        <h3>id ${player.id}</h3>
        <h3>nama pemain ${player.name}</h3>
        <h3>total match ${player.total_match}</h3>
        <h3>total win ${player.win}</h3>
        <h3>total lose ${player.lose}</h3>
        <h3>winrate ${generateWinRate()}</h3>
        <h3>Saldo User ${toRupiah.convert(player.saldo)}</h3>
        </body>
        </html>`);
    } else if (request.url == "/items") {
        response.writeHead(200, {
            'Content-Type': "application/json"
        });
        const itemList = JSON.stringify(items);
        response.write(itemList);

    } else if (request.url == "/hero") {
        response.writeHead(200, {
            'Content-Type': "application/json"
        });
        const heroList = JSON.stringify(hero(1, "balmond", 80, 60));
        response.write(heroList);
    } else {
        response.writeHead(404, {
            "Content-Type": "text/html"
        });
        response.write(
            "<html><body><h1>404 BRO SORRY MU NGAPEN LO?</h1></body></html>"
        );
    }
    return response.end();
}

const port = 3000;
const server = http.createServer(interaction);

server.listen(port, function (err) {
    if (err) {
        return console.log("error brader servernya");
    }
    console.log("server nyala cuy!");
});