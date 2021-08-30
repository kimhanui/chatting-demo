const express = require("express");
const cors = require("cors");
const path = require('path');
const dotenv = require("dotenv");
const nunjucks = require('nunjucks');
const webSocket = require("./socket");
const domains = ["https://chatting-demo.herokuapp.com"];

const app = express();
dotenv.config();
const serverip = process.env.SERVER_IP;

app.set("port", process.env.PORT || 3000);
app.set("view engine", "html");
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

nunjucks.configure('views', {
	express: app,
	watch: true,
  });

//serverip 설정
app.get('/', (req, res, next)=>{
	res.render('index.html', {serverip:serverip});
})

//cors
const corsOptions = {
  origin: function (origin, callback) {
    const isTrue = domains.indexOf(origin) !== -1;
    callback(null, isTrue);
  },
  credentials: true,
};
app.use(cors(corsOptions));

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

const server = app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기중");
});

webSocket(server, app);
