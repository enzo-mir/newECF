import "dotenv/config";
import fastify from "fastify";
import session from "@fastify/session";
import fastifyCookie from "@fastify/cookie";
import path from "path";
import { fileURLToPath } from "url";
import { fileRoutes } from "fastify-file-routes";
import cors from "@fastify/cors";
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
const app = fastify();
app.register(fastifyCookie);
app.register(cors, {
    credentials: true,
    origin: "http://ecf2023juillet.uqkn2942.odns.fr/",
    methods: ["GET", "POST"],
});
/*  app.register(import("@fastify/static"), {
    root: path.join(__dirname, "../ecf2023juillet.uqkn2942.odns.fr/client/dist"),
});
app.get("/", async (req, res) => {
    res.sendFile(
        path.join(
            __dirname,
            "../ecf2023juillet.uqkn2942.odns.fr/client/dist/index.html"
        )
    );
});  */

app.register(import("@fastify/mysql"), {
    connectionString:
        "mysql://uqkn2942_enzmrg:5()Amg9709@enzomrg.com/uqkn2942_enzmrg",
});

app.register(session, {
    cookieName: "sessionId",
    secret: "secretenzAmg9709()5%Mlmrg9709azertyuiop",
    cookie: { secure: false },
    expires: 8000000000,
});
app.register(import("./routes/dataApi.js"));
app.register(import("./routes/cardApi.js"));
app.register(import("./routes/authentification.js"));
app.register(import("./routes/accountManagment.js"));
app.register(import("./routes/adminEdition.js"));
app.register(import("./routes/reservation.js"));

app.register(import('@fastify/static'), {
    root: path.join(__dirname, "../client/dist"),
});

app.get("/:", (req, res) => {
    res.sendFile("index.html");
});

/* if (typeof PhusionPassenger !== "undefined") {
    PhusionPassenger.configure({ autoInstall: false });
} */

/* if (typeof PhusionPassenger !== "undefined") {
    app.listen("passenger");
} else {
}
 */
app.listen(process.env.PORT || 3000, "localhost", (err) => {
    if (err) {
        app.log.error(err);
        process.exit(1);
    }
    console.log(`server running at ${app.server.address().port}`);
});
