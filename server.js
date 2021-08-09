// Node/Express setup
const express = require("express");
const path = require("path");
const session = require("express-session");
const routes = require("./controllers");
const helpers = require("./utils/helpers");

// express-handlebars npm
const exphbs = require("express-handlebars");
const hbs = exphbs.create({ helpers })

// express setup
const app = express();
const PORT = process.env.PORT || 3001;

// sequelize db connection
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sess = {
    secret: "can you keep a little secret?",
    cookie: {
        // maxAge: 1000*60*20 //twenty minutes
    },
    resave: false,
    saveUnitialized: true,
    store: new SequelizeStore({
        db:sequelize
    })
};

app.use(session(sess));

// handlebars setup
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Use routes outlined in controllers folder
app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on ${PORT}. Access here: http://localhost:3001/`))
})