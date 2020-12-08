const { query } = require('express');
const Product = require('../models/productModel');
const productService = require('../services/productService.js');

function renderView(res, paginate, categoryPath) {
    const pageControlObj = {
        products: paginate.docs,
        lastPage: paginate.totalPages,
        totalProducts: paginate.totalDocs,
        currentPage: paginate.page,
        hasPrevPage: paginate.hasPrevPage,
        hasNextPage: paginate.hasNextPage,
        ITEM_PER_PAGE: paginate.limit,
        prevPage: paginate.prevPage,
        nextPage: paginate.nextPage,
        categoryPath: categoryPath
    };
    res.render('shop', pageControlObj);
}

exports.topPopularProducts = (req, res, next) => {
    req.query.limit = '5';
    next();
};
exports.getPopularProducts = async(req, res) => {
    let query = Product.find({});
    const limit = req.query.limit;
    if (limit) {
        query = query.limit(~~limit);
    }
    const products = await query;
    res.render('index', { products });
};
exports.getAllProducts = async(req, res) => {
    let query = Product.find({});
    const limit = req.query.limit;
    if (limit) {
        query = query.limit(~~limit);
    }
    const products = await query;
    res.render('shop', { products });
};
const ITEM_PER_PAGE = 9;
exports.getMenWatches = async(req, res) => {
    let color = req.query.color;
    const filterObj = {
        department: 'Watch',
        category: 'Men',

    };
    if (color) {
        filterObj.color = color;
    }
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || ITEM_PER_PAGE;
    const paginate = await productService.listProduct(filterObj, page, limit);
    const categoryPath = `/san-pham/dong-ho-nam`;
    renderView(res, paginate, categoryPath);
};

exports.getWomenWatches = async(req, res) => {
    let color = req.query.color;
    const filterObj = {
        department: 'Watch',
        category: 'Women'
    };
    if (color) {
        filterObj.color = color;
    }
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || ITEM_PER_PAGE;
    const paginate = await productService.listProduct(filterObj, page, limit);
    const categoryPath = `/san-pham/dong-ho-nu`;
    renderView(res, paginate, categoryPath);
};
exports.getAccessories = async(req, res) => {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || ITEM_PER_PAGE;
    const paginate = await productService.listProduct({
            department: 'Accessory'
        },
        page,
        limit
    );
    const categoryPath = `/san-pham/phu-kien`;
    renderView(res, paginate, categoryPath);

};
exports.getBrand = async(req, res) => {
    console.log(req.query)
    const brand = req.query.name
    let color = req.query.color;
    const filterObj = {
        brand: brand
    };
    if (color) {
        filterObj.color = color;
    }
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || ITEM_PER_PAGE;
    const paginate = await productService.listProduct(filterObj, page, limit);
    const categoryPath = `/san-pham/thuong-hieu`;
    renderView(res, paginate, categoryPath);
};

exports.getProduct = async(req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (product && (product.department == 'Accessory')) {
        res.render('accessory', { product });
    }
    res.render('single', { product });
};