// import express from "express";
// import cors from "cors";

// import { cadastrarUsuario, verificarEmail, verificarSenha } from "./src/config/database.js";

// const app = express()

// app.use(express.static("public"))
// /* const crs = cors() */

// app.set("view engine", "ejs")

// app.use(express.json());

// app.use(cors())

// /* app.options('*', cors()) */

// app.get("/",  (req, res) => {
//     res.render("index.ejs");
// });

// app.get("/login", (req, res) => {
//     res.render("login.ejs");
// });

// app.get("/cadastro", (req, res) => {
//     res.render("cadastro.ejs");
// });

// app.get("/home", (req, res) => {
//     res.render("home.ejs");
// });

// app.get("/exercicio/01", (req, res) => {
//         /*  res.set({'Content-Type': 'text/html'}); */
//         res.render("exercicio1.ejs");
// });

// app.get("/exercicio/02", (req, res) => {
//         /*  res.set({'Content-Type': 'text/html'}); */
//         res.render("exercicio2.ejs");
// });

// app.get("/exercicio/03", (req, res) => {
//         /*  res.set({'Content-Type': 'text/html'}); */
//         res.render("exercicio3.ejs");
// });

// app.get("/exercicio/04", (req, res) => {
//         /*  res.set({'Content-Type': 'text/html'}); */
//         res.render("exercicio4.ejs");
// });

// app.post("/login", (req, res) => {
//     const { email_form, senha_form } = req.body;

//     if (verificarEmail(email_form)) {

//         if (verificarSenha(senha_form)) {
//             console.log(req);
//             res.redirect("/home");
//         }

//     } else {
//         res.status(404).redirect("/login");
//     }

//     res.send(data);

// });

// app.post("/cadastro", async (req, res) => {
//     /* const data = req.body; */
//     const { nome, ano_nascimento, email, senha } = req.body;
//     console.log(req);
//     let user = await cadastrarUsuario(nome, ano_nascimento, email, senha);
//     console.log(user);
//     /* res.render(user); */
//     res.redirect("/login");
// });

import express from "express";
import routes from "./src/routes/userRoutes.js";

const app = express();

routes(app);

app.listen(3000, () => {
    console.log('Servidor está sendo executado na porta 3000 :)');
});