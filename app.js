require("dotenv").config();

const Express = require("express");
const app = Express();
const dbConnection = require("./db");
const controllers = require("./controllers");


app.use(Express.json());
app.use("/user", controllers.usercontroller);


// app.use(Express.static(__dirname + '/public'));
// console.log(__dirname);

// app.get('/', (req, res) => res.render ('index'));

// app.use()
// app.use()
// app.use()

dbConnection
  .authenticate()
  .then(() => dbConnection.sync())
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`[Server]: App is listening on ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("[Server]: Server Crashed");
    console.log(err);
  });
