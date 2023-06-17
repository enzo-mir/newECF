const fastify = require("fastify");
const session = require("@fastify/session");
const fastifyCookie = require("@fastify/cookie");
const cors = require("@fastify/cors");
const path = require("path");

const app = fastify();
app.register(fastifyCookie);
app.register(cors, {
    credentials: true,
    origin: "http://ecf2023juillet.uqkn2942.odns.fr/",
    methods: ["GET", "POST"],
});

app.register(require("@fastify/mysql"), {
    connectionString:
        "mysql://uqkn2942_enzmrg:5()Amg9709@enzomrg.com/uqkn2942_enzmrg",
});

app.register(session, {
    cookieName: "sessionId",
    secret: "secretenzAmg9709()5%Mlmrg9709azertyuiop",
    cookie: { secure: false },
    expires: 172800000,
});

app.register(require("./routes/dataApi.js"));
app.register(require("./routes/cardApi.js"));
app.register(require("./routes/authentification.js"));
app.register(require("./routes/accountManagment.js"));
app.register(require("./routes/adminEdition.js"));
app.register(require("./routes/reservation.js"));

  app.register(require("@fastify/static"), {
    root: path.join(__dirname, "../client/dist"),
});

app.get("/:", (req, res) => {
    res.sendFile("index.html");
});   
if (typeof PhusionPassenger !== "undefined") {
    app.listen({ path: "passenger", host: "127.0.0.1" });
} else {
    app.listen({ port: 3000 });
}
