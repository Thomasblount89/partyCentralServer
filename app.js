require("dotenv").config();

const Express = require("express");
const app = Express();
const dbConnection = require("./db");
const controllers = require("./controllers");
const middleware = require('./middleware');

app.use(Express.json());
app.use(middleware.CORS);
app.use("/user", controllers.usercontroller);
app.use('/events', controllers.eventscontroller)
app.use('/rsvp', controllers.rsvpcontroller)

dbConnection
  .authenticate()
  .then(() => dbConnection.sync({force:true}))  
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`[Server]: App is listening on ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("[Server]: Server Crashed");
    console.log(err);
  });
