'use strict';
const Product = require('../models/productModel');
const productService = require('../services/productService.js');
const AppError = require('../utils/appError');
const ITEM_PER_PAGE = 8;
const ejs = require('ejs');

function renderView(res, paginate, custom) {
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

        categoryPath: custom.categoryPath,
        searchString: custom.search,
        pageType: custom.pageType || 'Sản phẩm',
        queryString: custom.queryString ? '&' + custom.queryString : ''
    };
    res.status(200);
    res.render('shop', pageControlObj);
}
const baseDir = __dirname + '/../views/api/';

function toUpperOnlyFirstChar(word) {
    return word[0].toUpperCase() + word.substr(1).toLowerCase();
}

function serializeQuery(query) {
    let str = [];
    for (let key in query)
        if (query.hasOwnProperty(key) && key != 'category' && key != 'page') {
            str.push(
                encodeURIComponent(key) + '=' + encodeURIComponent(query[key])
            );
        }
    return str.join('&');
}

exports.apiGetBrand = async (req, res) => {
    let { brand, color, sort, category } = req.query;
    const query = {};
    color ? (query.color = color) : null;
    brand ? (query.brand = toUpperOnlyFirstChar(brand)) : null;
    const custom = {};
    custom.queryString = serializeQuery(req.query);
    custom.categoryPath = `/san-pham/` + category;

    if (category == 'dong-ho-nam') {
        query.category = 'Men';
        custom.categoryPath = `/san-pham/` + category;
        custom.pageType = 'Đồng hồ nam';
    } else if (category == 'dong-ho-nu') {
        query.category = 'Women';
        custom.categoryPath = `/san-pham/` + category;
        custom.pageType = 'Đồng hồ nữ';
    } else if (category == 'san-pham') {
        custom.categoryPath = '/' + category;
        custom.pageType = 'Đồng hồ';
        category = '';
    } else if (category == 'tim-kiem') {
        custom.categoryPath = '/' + category;
        custom.pageType = 'Tìm kiếm';
        category = '';
    }

    const options = {
        page: req.query.page * 1 || 1,
        limit: req.query.limit * 1 || ITEM_PER_PAGE,
        sort: sort || 'all'
    };
    const paginate = await productService.listProduct(query, options);

    const html = await ejs.renderFile(baseDir + 'ajax_products.ejs', {
        products: paginate.docs,
        lastPage: paginate.totalPages,
        totalProducts: paginate.totalDocs,
        currentPage: paginate.page,
        hasPrevPage: paginate.hasPrevPage,
        hasNextPage: paginate.hasNextPage,
        ITEM_PER_PAGE: paginate.limit,
        prevPage: paginate.prevPage,
        nextPage: paginate.nextPage,

        categoryPath: custom.categoryPath || '',
        pageType: custom.pageType || 'Đồng hồ',
        queryString: custom.queryString ? '&' + custom.queryString : ''
    });
    res.json(html);
};
exports.topPopularProducts = (req, res, next) => {
    req.query.limit = '5';
    next();
};

exports.getPopularProducts = async (req, res) => {
    let query = Product.find({});
    const limit = req.query.limit;
    limit ? (query = query.limit(~~limit)) : null;
    const products = await query;
    res.render('index', { products });
};
exports.getAllWatches = async (req, res) => {
    const { color, sort, brand } = req.query;
    const query = {
        department: 'Watch'
    };
    color ? (query.color = color) : null;
    brand ? (query.brand = toUpperOnlyFirstChar(brand)) : null;

    const options = {
        page: req.query.page * 1 || 1,
        limit: req.query.limit * 1 || ITEM_PER_PAGE,
        sort: sort || 'all'
    };
    const paginate = await productService.listProduct(query, options);

    const custom = {};
    custom.queryString = serializeQuery(req.query);
    custom.pageType = 'Đồng hồ';
    custom.categoryPath = `/san-pham`;

    renderView(res, paginate, custom);
};

exports.getMenWatches = async (req, res) => {
    const { color, sort, brand } = req.query;
    const query = {
        department: 'Watch',
        category: 'Men'
    };
    color ? (query.color = color) : null;
    brand ? (query.brand = toUpperOnlyFirstChar(brand)) : null;

    const options = {
        page: req.query.page * 1 || 1,
        limit: req.query.limit * 1 || ITEM_PER_PAGE,
        sort: sort || 'all'
    };

    const custom = {};
    custom.queryString = serializeQuery(req.query);
    custom.pageType = 'Đồng hồ nam';
    custom.categoryPath = `/san-pham/dong-ho-nam`;

    const paginate = await productService.listProduct(query, options);
    renderView(res, paginate, custom);
};

exports.getWomenWatches = async (req, res) => {
    const { color, sort, brand } = req.query;
    const query = {
        department: 'Watch',
        category: 'Women'
    };
    color ? (query.color = color) : null;
    brand ? (query.brand = toUpperOnlyFirstChar(brand)) : null;

    const options = {
        page: req.query.page * 1 || 1,
        limit: req.query.limit * 1 || ITEM_PER_PAGE,
        sort: sort || 'all'
    };

    const custom = {};
    custom.queryString = serializeQuery(req.query);
    custom.pageType = 'Đồng hồ nữ';
    custom.categoryPath = `/san-pham/dong-ho-nu`;

    const paginate = await productService.listProduct(query, options);
    renderView(res, paginate, custom);
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

    const custom = {};
    custom.pageType = 'Phụ kiện';
    custom.categoryPath = `/san-pham/phu-kien`;

    renderView(res, paginate, custom);
};
exports.getBrand = async (req, res) => {
    const { name, color, sort } = req.query;
    const query = {
        brand: toUpperOnlyFirstChar(name)
    };
    color ? (query.color = color) : null;
    const options = {
        page: req.query.page * 1 || 1,
        limit: req.query.limit * 1 || ITEM_PER_PAGE,
        sort: sort || 'all'
    };
    const paginate = await productService.listProduct(query, options);

    const custom = {};
    custom.queryString = serializeQuery(req.query);
    custom.pageType = 'Thương hiệu';
    custom.categoryPath = `/san-pham/thuong-hieu`;

    renderView(res, paginate, custom);
};

exports.getProduct = async (req, res, next) => {
    try {
        const doc = await Product.findById(req.params.id).populate('reviews');
        if (!doc) {
            return next(new AppError('No document found with that ID', 404));
        }
        if (doc.department == 'Accessory') {
            return res.render('accessory', { product: doc});
        }
        // Looking for relevant products
        const relevantProducts = await Product.find({ brand: doc.brand });

        // Remove current view product out of relevantProducts arrays
        relevantProducts.splice(relevantProducts.findIndex(item => item._id.equals(req.params.id) ), 1);
        return res.render('single', {
            product: doc,
            products: relevantProducts
        });
    } catch (err) {
        next(new AppError(err, 400));
    }
};

exports.searchProducts = async (req, res) => {
    const search = req.query.search;
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || ITEM_PER_PAGE;
    const sort = req.query.sort || 'all';
    const color = req.query.color || '';

    // Create regex to make a partial match search
    var searchKey = new RegExp(search, 'i');
    // Create query to search by name
    let query = { name: searchKey };
    color ? (query.color = color) : null;

    const options = { page, limit, sort };
    const paginate = await productService.listProduct(query, options);

    const custom = {};
    custom.queryString = serializeQuery({ search: req.query.search });
    console.log(custom.queryString);
    custom.search = search;
    custom.categoryPath = `/tim-kiem`;
    custom.pageType = 'Tìm kiếm';

    renderView(res, paginate, custom);
};
