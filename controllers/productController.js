'use strict';
const Product = require('../models/productModel');
const productService = require('../services/productService.js');
const ITEM_PER_PAGE = 9;
const ejs = require('ejs');
const { skips } = require('debug');
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
        sort: paginate.sort || 'all',
        searchString: paginate.search,
        pageType: paginate.pageType || 'Sản phẩm'
    };
    res.status(200);
    res.render('shop', pageControlObj);
}
const baseDir = __dirname + '/../views/api/';
function toUpperOnlyFirstChar(word) {
    return word[0].toUpperCase() + word.substr(1).toLowerCase();
}
function serializeQuery(obj) {
    var str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p) && p!= 'category') {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
  }

exports.apiGetBrand = async (req, res) => {
    let { brand, color, sort, category } = req.query;
    const query = {};
    sort ='all';
    color ? (query.color = color) : null;
    brand ? (query.brand = toUpperOnlyFirstChar(brand)) : null;
    let categoryPath = `/san-pham/` + category;
    category == 'dong-ho-nam' ? (query.category = 'Men') : null;
    category == 'dong-ho-nu' ? (query.category = 'Women') : null;
    if (category == 'san-pham' || category == 'tim-kiem') {
        categoryPath = '/' + category;
        category = '';
    }
    const options = {
        page: req.query.page * 1 || 1,
        limit: req.query.limit * 1 || ITEM_PER_PAGE,
        sort: sort || 'all'
    };
    const paginate = await productService.listProduct(query, options);
    const queryString = serializeQuery(req.query)
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
        categoryPath: categoryPath,
        sort: paginate.sort || 'all',
        searchString: paginate.search || '',
        pageType: paginate.pageType || 'Sản phẩm',
        queryString
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
exports.getAllProducts = async (req, res) => {
    const { color, sort, brand } = req.query;
    const query = {};
    color ? (query.color = color) : null;
    brand ? (query.brand = toUpperOnlyFirstChar(brand)) : null;
    const options = {
        page: req.query.page * 1 || 1,
        limit: req.query.limit * 1 || ITEM_PER_PAGE,
        sort: sort || 'all'
    };
    const paginate = await productService.listProduct(query, options);
    if (sort && sort != 'all') {
        paginate.sort = sort;
    }
    paginate.pageType = 'Đồng hồ';
    const categoryPath = `/san-pham`;
    renderView(res, paginate, categoryPath);
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
    const paginate = await productService.listProduct(query, options);
    if (sort && sort != 'all') {
        paginate.sort = sort;
    }
    paginate.pageType = 'Đồng hồ nam';
    const categoryPath = `/san-pham/dong-ho-nam`;
    renderView(res, paginate, categoryPath);
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
    const paginate = await productService.listProduct(query, options);
    if (sort && sort != 'all') {
        paginate.sort = sort;
    }
    paginate.pageType = 'Đồng hồ nữ';
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
    paginate.pageType = 'Phụ kiện';
    const categoryPath = `/san-pham/phu-kien`;
    renderView(res, paginate, categoryPath);
};
exports.getBrand = async (req, res) => {
    const { name, color, sort } = req.query;
    const query = {
        brand: toUpperOnlyFirstChar(name)
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
    paginate.pageType = 'Thương hiệu';
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
    paginate.pageType = 'Tìm kiếm';
    renderView(res, paginate, categoryPath);
};
