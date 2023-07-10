require('dotenv').config();
<<<<<<< HEAD
=======

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('node:path');

const { MONGO_USER, MONGO_PW } = process.env;
const passport = require('passport');
// const getUserFromJWT = require('./middlewares/get-user-from-jwt');

const indexRouter = require('./routes/index');
const userRouter = require('./routes/users');
const userInfoRouter = require('./routes/api/users');
const adminRouter = require('./routes/admin');
const adminCategoryRouter = require('./routes/admin-category');
const adminProductRouter = require('./routes/admin-product');
const categoryRouter = require('./routes/api/category');
const productRouter = require('./routes/api/product');

// passport설정 가지고 옴
require('./passport')();

const connectToDatabase = async (url) => {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('연결성공');
    } catch (err) {
        console.log('연결실패', err);
    }
};

const url = `mongodb+srv://${MONGO_USER}:${MONGO_PW}@cluster0.snarddw.mongodb.net/?retryWrites=true&w=majority`;
connectToDatabase(url);
>>>>>>> 128b67a41cbcd655e39b12fe2caba3d1ef1ab7a9

const express = require('express');
const cors = require('cors');
const path = require('node:path');
const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
<<<<<<< HEAD
=======

>>>>>>> 128b67a41cbcd655e39b12fe2caba3d1ef1ab7a9
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
<<<<<<< HEAD
app.get('/', function (req, res) {
    res.render('main.ejs');
});
=======
app.use(passport.initialize());
app.use(cookieParser());
app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/api/users', userInfoRouter);
app.use('/admin', adminRouter);
app.use('/admin/category', adminCategoryRouter);
app.use('/admin/product', adminProductRouter);
app.use('/api/category', categoryRouter);
app.use('/api/product', productRouter);
>>>>>>> 128b67a41cbcd655e39b12fe2caba3d1ef1ab7a9

app.use((req, res, next) => {
    const error = new Error('Resource Not Found');
    error.statusCode = 404;
    next(error);
});

app.use((err, req, res) => {
    console.error(err);
    res.status(err.statusCode || 500);
    res.json({ status: err.status, reason: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`정상적으로 커스텀잇 서버를 시작하였습니다.  http://localhost:${PORT}`);
});