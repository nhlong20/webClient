'use strict';
const Product = require('../models/productModel');
const productService = require('../services/productService.js');
const ITEM_PER_PAGE = 9;

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
        categoryPath: categoryPath,
        sort: paginate.sort,
        searchString: paginate.search
    };
    res.render('shop', pageControlObj);
}

exports.topPopularProducts = (req, res, next) => {
    req.query.limit = '5';
    next();
};
exports.getPopularProducts = async (req, res) => {
    let query = Product.find({});
    const limit = req.query.limit;
    if (limit) {
        query = query.limit(~~limit);
    }
    const products = await query;
    res.render('index', { products });
};
exports.getAllProducts = async (req, res) => {
    const { color, sort } = req.query;
    const query = {};
    if (color) {
        query.color = color;
    }
    const options = {
        page: req.query.page * 1 || 1,
        limit: req.query.limit * 1 || ITEM_PER_PAGE,
        sort: sort || 'all'
    };
    const paginate = await productService.listProduct(query, options);
    if (sort && sort != 'all') {
        paginate.sort = sort;
    }
    const categoryPath = `/san-pham`;
    renderView(res, paginate, categoryPath);
};
exports.getMenWatches = async (req, res) => {
    const { color, sort } = req.query;
    const query = {
        department: 'Watch',
        category: 'Men'
    };
    if (color) {
        query.color = color;
    }
    const options = {
        page: req.query.page * 1 || 1,
        limit: req.query.limit * 1 || ITEM_PER_PAGE,
        sort: sort || 'all'
    };
    const paginate = await productService.listProduct(query, options);
    if (sort && sort != 'all') {
        paginate.sort = sort;
    }
    const categoryPath = `/san-pham/dong-ho-nam`;
    renderView(res, paginate, categoryPath);
};

exports.getWomenWatches = async (req, res) => {
    const { color, sort } = req.query;
    const query = {
        department: 'Watch',
        category: 'Women'
    };
    if (color) {
        query.color = color;
    }
    const options = {
        page: req.query.page * 1 || 1,
        limit: req.query.limit * 1 || ITEM_PER_PAGE,
        sort: sort || 'all'
    };
    const paginate = await productService.listProduct(query, options);
    if (sort && sort != 'all') {
        paginate.sort = sort;
    }
    const categoryPath = `/san-pham/dong-ho-nu`;
    renderView(res, paginate, categoryPath);
};
exports.getAccessories = async (req, res) => {
    const sort = req.query.sort;
    const query = {
        department: 'Accessory'
    };
    const options = {
        page: req.query.page * 1 || 1,
        limit: req.query.limit * 1 || ITEM_PER_PAGE,
        sort: sort || 'all'
    };
    const paginate = await productService.listProduct(query, options);
    if (sort && sort != 'all') {
        paginate.sort = sort;
    }
    const categoryPath = `/san-pham/phu-kien`;
    renderView(res, paginate, categoryPath);
};
exports.getBrand = async (req, res) => {
    const { name, color, sort } = req.query;
    const query = {
        brand: name
    };
    if (color) {
        query.color = color;
    }
    const options = {
        page: req.query.page * 1 || 1,
        limit: req.query.limit * 1 || ITEM_PER_PAGE,
        sort: sort || 'all'
    };
    const paginate = await productService.listProduct(query, options);
    if (sort && sort != 'all') {
        paginate.sort = sort;
    }
    const categoryPath = `/san-pham/thuong-hieu`;
    renderView(res, paginate, categoryPath);
};

exports.getProduct = async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (product && product.department == 'Accessory') {
        res.render('accessory', { product });
    }
    res.render('single', { product });
};

exports.searchProducts = async (req, res) => {
    const search = req.query.search;
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || ITEM_PER_PAGE;
    const sort = req.query.sort || 'all';
    const color = req.query.color || '';

    var searchKey = new RegExp(search, 'i');
    let query = { name: searchKey };

    if (color) {
        query.color = color;
    }
    const options = { page, limit, sort };
    const paginate = await productService.listProduct(query, options);
    paginate.sort = sort;
    paginate.search = search;
    const categoryPath = `/tim-kiem`;
    renderView(res, paginate, categoryPath);
};
