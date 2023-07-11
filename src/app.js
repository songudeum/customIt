require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('node:path');

const { MONGO_USER, MONGO_PW } = process.env;
const passport = require('passport');
// const getUserFromJWT = require('./middlewares/get-user-from-jwt');
// const loginrequired = require('./middlewares/login-required');
// const adminCheck = require('./middlewares/admin-check');

const indexRouter = require('./routes/index');
const userRouter = require('./routes/users');
const adminRouter = require('./routes/admin');
const adminApiRouter = require('./routes/api/admin');
const userApiRouter = require('./routes/api/users');
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

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 유저 로그인
app.get('/users/login', (req, res) => {
    res.render('user-login');
});
// 관리자 로그인
app.get('/admin/login', (req, res) => {
    res.render('admin-login');
});
// 유저 회원가입
app.get('/users/join', (req, res) => {
    res.render('signin');
});
// 어드민 회원가입
app.get('/admin/join', (req, res) => {
    res.render('admin-join');
});
// 개인정보조회
app.get('/users/info/:email', (req, res) => {
    res.render('edit-user-info');
});
// 탈퇴
app.get('/api/users/info/delete/:email', (req, res) => {
    res.render('user-secession');
});

// 페이지 보기
app.get('/', (req, res) => {
    res.render('signin');
});

app.get('/', (req, res) => {
    res.render('order-list.ejs');
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(cookieParser());
app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/admin', adminRouter);
app.use('/api/users', userApiRouter);
app.use('/api/admin', adminApiRouter);
app.use('/admin/category', adminCategoryRouter);
app.use('/admin/product', adminProductRouter);
app.use('/api/category', categoryRouter);
app.use('/api/product', productRouter);

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
