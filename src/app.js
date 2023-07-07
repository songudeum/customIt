require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
    res.render("signin.ejs");
});

app.use((req, res, next) => {
    const error = new Error("Resource Not Found");
    error.statusCode = 404;
    next(error);
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.statusCode);
    res.json({ status: err.status, reason: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(
        `정상적으로 커스텀잇 서버를 시작하였습니다.  http://localhost:${PORT}`
    );
});
app.set("views", path.join(__dirname, "views")); 