require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('node:path');

const { MONGO_USER, MONGO_PW } = process.env;
const passport = require('passport');

const indexRouter = require('./routes/index');
const userRouter = require('./routes/users');
const productRouter = require('./routes/product');
const orderRouter = require('./routes/order');

const adminRouter = require('./routes/admin');
const adminCategoryRouter = require('./routes/admin-category');
const adminProductRouter = require('./routes/admin-product');
const adminOrderRouter = require('./routes/admin-order');

const userApiRouter = require('./routes/api/users');
const adminApiRouter = require('./routes/api/admin');
const categoryApiRouter = require('./routes/api/category');
const productApiRouter = require('./routes/api/product');
const orderApiRouter = require('./routes/api/order');

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

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/product', productRouter);
app.use('/order', orderRouter);

app.use('/admin', adminRouter);
app.use('/admin/category', adminCategoryRouter);
app.use('/admin/product', adminProductRouter);
app.use('/admin/orders', adminOrderRouter);

app.use('/api/orders', orderApiRouter);
app.use('/api/users', userApiRouter);
app.use('/api/admin', adminApiRouter);
app.use('/api/category', categoryApiRouter);
app.use('/api/product', productApiRouter);

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
