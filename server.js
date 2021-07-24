// Node/Express setup
const express = require("express");
const path = require("path");
const session = require("express-session")
const routes = require("./controllers");

// express-handlebars npm
const exphbs = require("express-handlebars");

// express setup
const app = express();
const PORT = process.env.PORT || 3001;

// sequelize db connection
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sess = {
    secret: "can you keep a little secret?",
    cookie: {},
    resave: false,
    saveUnitialized: true,
    store: new SequelizeStore({
        db:sequelize
    })
};

// handlebars setup
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(session(sess));

// Use routes outlined in controllers folder
app.use(routes);

sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on ${PORT}`))
})