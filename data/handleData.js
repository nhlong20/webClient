const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const Product = require('../models/productModel');

dotenv.config();
// Get DB link
const DB = process.env.DB_URL.replace(
 '<PASSWORD>',
 process.env.DATABASE_PASSWORD
);
// Config DB options
const DB_options = {
 useNewUrlParser: true,
 useCreateIndex: true,
 useFindAndModify: false,
 useUnifiedTopology: true
};
// Connect to the DB
mongoose
 .connect(DB, DB_options)
 .then(() => console.log('DB connection successful!'));


let products = JSON.parse(fs.readFileSync(`${__dirname}/../data/products.json`, 'utf-8'));

// IMPORT DATA INTO DB
const importData = async () => {
 try {
   await Product.create(products);
   console.log('Data successfully loaded!');
 } catch (err) {
   console.log(err);
 }
 process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
 try {
   await Product.deleteMany();
   console.log('Data successfully deleted!');
 } catch (err) {
   console.log(err);
 }
 process.exit();
};

if (process.argv[2] === '--import') {
 importData();
} else if (process.argv[2] === '--delete') {
 deleteData();
}

