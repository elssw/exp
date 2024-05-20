

//
// const createError = require('http-errors');
// const express = require('express');
// const path = require('path');
// const cookieParser = require('cookie-parser');
// const logger = require('morgan');
// const sqlite3 = require('sqlite3').verbose();
//
// const app = express();
//
// // Connect to SQLite database
// const dbPath = path.join(__dirname, 'db', 'we.db');
// const db = new sqlite3.Database(dbPath, (err) => {
//     if (err) {
//         console.error('Failed to connect to the database.');
//         console.error(err.message);
//     } else {
//         console.log('Connected to the SQLite database at ' + dbPath);
//         db.run(`CREATE TABLE IF NOT EXISTS products (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       date TEXT NOT NULL,
//       name TEXT NOT NULL,
//       price REAL NOT NULL
//     )`, (err) => {
//             if (err) {
//                 console.error('Failed to create products table.');
//                 console.error(err.message);
//             } else {
//                 console.log('Ensured products table exists.');
//             }
//         });
//     }
// });
//
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');
//
// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
//
// // Add a new route to handle product form submissions
// // app.post('/add-product', (req, res) => {
// //     const { date, name, price } = req.body;
// //
// //     db.run(`INSERT INTO products (date, name, price) VALUES (?, ?, ?)`, [date, name, price], function(err) {
// //         if (err) {
// //             console.error('Failed to insert product into database.');
// //             console.error(err.message);
// //             res.status(500).send('Failed to add product.');
// //         } else {
// //             res.send('Product added successfully!');
// //         }
// //     });
// // });
// // Add a new route to handle product form submissions
// app.post('/add-product', (req, res) => {
//     const { date, name, price } = req.body;
//
//     // 轉換日期格式的函數
//     function convertDateFormat(inputDate) {
//         const dateObj = new Date(inputDate);
//         const year = (dateObj.getFullYear() - 1911).toString(); // 轉換成民國年份
//         const month = (dateObj.getMonth() + 1).toString().padStart(2, '0'); // 補零至兩位數
//         const day = dateObj.getDate().toString().padStart(2, '0'); // 補零至兩位數
//         return year + '/' + month + '/' + day;
//     }
//
//     // 將日期格式轉換為民國年份格式
//     const convertedDate = convertDateFormat(date);
//
//     // 插入資料庫
//     db.run(`INSERT INTO products (date, name, price) VALUES (?, ?, ?)`, [convertedDate, name, price], function(err) {
//         if (err) {
//             console.error('Failed to insert product into database.');
//             console.error(err.message);
//             res.status(500).send('Failed to add product.');
//         } else {
//             res.send('Product added successfully!');
//         }
//     });
// });
//
//
// // Add a new route to handle product searches
// // app.get('/search', (req, res) => {
// //     const name = req.query.name;
// //     const startDate = req.query.start;
// //     const endDate = req.query.end;
// //     db.all(`SELECT * FROM products WHERE name LIKE ? AND date BETWEEN ? AND ?`, [`%${name}%`, startDate, endDate], (err, rows) => {
// //         if (err) {
// //             console.error('Failed to retrieve products from database.');
// //             console.error(err.message);
// //             res.status(500).send('Failed to retrieve products.');
// //         } else {
// //             res.json(rows);
// //         }
// //     });
// // });
//
// // Add a new route to handle product searches
// app.get('/search', (req, res) => {
//     const name = req.query.name;
//     const startDate = req.query.start;
//     const endDate = req.query.end;
//
//     // 轉換日期格式的函數
//     function convertDateFormat(inputDate) {
//         const dateObj = new Date(inputDate);
//         const year = (dateObj.getFullYear() - 1911).toString(); // 轉換成民國年份
//         const month = (dateObj.getMonth() + 1).toString().padStart(2, '0'); // 補零至兩位數
//         const day = dateObj.getDate().toString().padStart(2, '0'); // 補零至兩位數
//         return year + '/' + month + '/' + day;
//     }
//
//     // 將日期格式轉換為民國年份格式
//     const convertedStartDate = convertDateFormat(startDate);
//     const convertedEndDate = convertDateFormat(endDate);
//
//     // 執行資料庫查詢
//     db.all(`SELECT * FROM products WHERE name LIKE ? AND date BETWEEN ? AND ?`, [`%${name}%`, convertedStartDate, convertedEndDate], (err, rows) => {
//         if (err) {
//             console.error('Failed to retrieve products from database.');
//             console.error(err.message);
//             res.status(500).send('Failed to retrieve products.');
//         } else {
//             res.json(rows);
//         }
//     });
// });
//
//
//
//
// app.get('/products', (req, res) => {
//     db.all(`SELECT * FROM products`, (err, rows) => {
//         if (err) {
//             console.error('Failed to retrieve products from database.');
//             console.error(err.message);
//             res.status(500).send('Failed to retrieve products.');
//         } else {
//             res.json(rows);
//         }
//     });
// });
//
// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     next(createError(404));
// });
//
// // error handler
// app.use(function(err, req, res, next) {
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};
//     res.status(err.status || 500);
//     res.render('error');
// });
//
// module.exports = app;





// app.js

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sqlite3 = require('sqlite3').verbose();

const app = express();

// Connect to SQLite database
const dbPath = path.join(__dirname, 'db', 'we.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Failed to connect to the database.');
        console.error(err.message);
    } else {
        console.log('Connected to the SQLite database at ' + dbPath);
        db.run(`CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,
      name TEXT NOT NULL,
      price REAL NOT NULL
    )`, (err) => {
            if (err) {
                console.error('Failed to create products table.');
                console.error(err.message);
            } else {
                console.log('Ensured products table exists.');
            }
        });
    }
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route to add a new product
app.post('/add-product', (req, res) => {
    const { date, name, price } = req.body;

    // Function to convert date format
    function convertDateFormat(inputDate) {
        const dateObj = new Date(inputDate);
        const year = (dateObj.getFullYear() - 1911).toString(); // Convert to ROC year
        const month = (dateObj.getMonth() + 1).toString().padStart(2, '0'); // Pad to two digits
        const day = dateObj.getDate().toString().padStart(2, '0'); // Pad to two digits
        return year + '/' + month + '/' + day;
    }

    // Convert date format to ROC format
   // const convertedDate = convertDateFormat(date);
   // console.log(convertedDate);
    // Insert into the database
    db.run(`INSERT INTO products (date, name, price) VALUES (?, ?, ?)`, [date, name, price], function(err) {
        if (err) {
            console.error('Failed to insert product into database.');
            console.error(err.message);
            res.status(500).send('Failed to add product.');
        } else {
            res.send('Product added successfully!');
        }
    });
});

// Route to handle product searches
// app.get('/search', (req, res) => {
//     const name = req.query.name;
//     const startDate = req.query.start;
//     const endDate = req.query.end;
//
//     // Function to convert date format
//     function convertDateFormat(inputDate) {
//         const dateObj = new Date(inputDate);
//         const year = (dateObj.getFullYear() - 1911).toString(); // Convert to ROC year
//         const month = (dateObj.getMonth() + 1).toString().padStart(2, '0'); // Pad to two digits
//         const day = dateObj.getDate().toString().padStart(2, '0'); // Pad to two digits
//         return year + '/' + month + '/' + day;
//     }
//
//     // Convert date format to ROC format
//     const convertedStartDate = convertDateFormat(startDate);
//     const convertedEndDate = convertDateFormat(endDate);
//
//     // Execute database query
//     db.all(`SELECT * FROM products WHERE name LIKE ? AND date BETWEEN ? AND ?`, [`%${name}%`, convertedStartDate, convertedEndDate], (err, rows) => {
//         if (err) {
//             console.error('Failed to retrieve products from database.');
//             console.error(err.message);
//             res.status(500).send('Failed to retrieve products.');
//         } else {
//             res.json(rows);
//         }
//     });
// });

// Add a new route to handle product searches
app.get('/search', (req, res) => {
    const name = req.query.name;
    const startDate = req.query.start;
    const endDate = req.query.end;

    // 转换日期格式的函数
    function convertDateFormat(inputDate) {
        const dateObj = new Date(inputDate);
        const year = (dateObj.getFullYear() - 1911).toString(); // 转换成民国年份
        const month = (dateObj.getMonth() + 1).toString().padStart(2, '0'); // 补零至两位数
        const day = dateObj.getDate().toString().padStart(2, '0'); // 补零至两位数
        return year + '/' + month + '/' + day;
    }

    // 将日期格式转换为民国年份格式
    const convertedStartDate = convertDateFormat(startDate);
    const convertedEndDate = convertDateFormat(endDate);

    // 执行数据库查询
    db.all(`SELECT * FROM products WHERE name LIKE ? AND date BETWEEN ? AND ?`, [`%${name}%`, convertedStartDate, convertedEndDate], (err, rows) => {
        if (err) {
            console.error('Failed to retrieve products from database.');
            console.error(err.message);
            res.status(500).send('Failed to retrieve products.');
        } else {
            // 将日期数据转换成 formatted_date 格式
            const productsWithFormattedDate = rows.map(product => {
                return {
                    ...product,
                    formatted_date: product.date
                };
            });
            res.json(productsWithFormattedDate);
        }
    });
});


// Route to retrieve all products
app.get('/products', (req, res) => {
    db.all(`SELECT * FROM products`, (err, rows) => {
        if (err) {
            console.error('Failed to retrieve products from database.');
            console.error(err.message);
            res.status(500).send('Failed to retrieve products.');
        } else {
            res.json(rows);
        }
    });
});

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;

