const express = require("express");
const session = require("express-session");
const cors = require("cors");
const config = require("./config");

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// // configure sessions
// app.use(
//   session({
//     token: "",
//     secret: "1234567890",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       secure: "auto",
//       httpOnly: true,
//       maxAge: 3600000,
//     },
//   })
// );
app.use("/home", require("./routes/home"));
app.use("/login", require("./routes/login"));
app.use("/callback", require("./routes/callback"));
app.use("/logout", require("./routes/logout"));

app.listen(config.serverPort, () =>
  console.log(`App listening on port ${config.serverPort}.`)
);
