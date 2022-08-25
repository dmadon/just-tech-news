const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const app = express();
const PORT = process.env.PORT||3001;
const path = require('path');
const helpers = require('./utils/helpers');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({helpers});
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);


const sess = {
    secret:'ClassifiedTopSecret',
    cookie:{},
    resave:false,
    saveUninitialized:true,
    store: new SequelizeStore({
        db:sequelize
    })
};

app.use(session(sess));

app.engine('handlebars',hbs.engine);
app.set('view engine','handlebars');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'public')));

// turn on routes
app.use(routes);

// TURN ON CONNECTION TO DATABASE SERVER:
// note: turning the "force" parameter to "true" forces the database connection to sync with model definitions and associations. 
// by forcing the sync method to true, we will make the tables re-create if there are any association changes. performs similarly to "DROP TABLE IF EXISTS".
// keep this parameter set to "false" until you make new associations, then after you restart the server with the parameter set to "true", change it back to "false". otherwise,
// your server will drop all your tables and recreate them every time it starts and you will lose all your data that you've entered into them!
sequelize.sync({force: false})
    .then(() => {
        app.listen(PORT,() => console.log('Now listening'));
    })