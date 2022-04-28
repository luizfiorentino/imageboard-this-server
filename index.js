const express = require("express");
const app = express();
const jsonParser = express.json();
const PORT = process.env.PORT || 4004;
const imageRouter = require("./routers/image");
const userRouter = require("./routers/user");
const routersAuth = require("./routers/auth");

app.use(jsonParser);
app.use("/auth", routersAuth);
app.use("/images", imageRouter);
app.use("/users", userRouter);

app.listen(PORT, () => console.log("Listening on port: " + PORT));
