const { session } = require('passport');
const Order = require('../models/orderModel');
const Product = require('../models/productModel');

exports.getCheckOut = (req, res) => {
    
    if (req.session.cart && req.session.cart.totalQty >= 1) {
        return res.render('checkout');
    }
    req.flash(
        'error',
        'Đơn hàng của bạn đang trống, vui lòng thêm sản phẩm vào giỏ để tiến hành thanh toán'
    );
    res.redirect('san-pham');
};
exports.createOrder = async (req, res) => {
    const reqBody = JSON.parse(JSON.stringify(req.body));
    const user = req.user;
    if (!user.name || !user.phoneNumber || !user.address || !user.email) {
        req.flash(
            'error',
            'Vui lòng nhập đủ thông tin để chúng tôi chuyển hàng tới bạn thuận tiện nhất'
        );
        return res.redirect('/thanh-toan');
    }
    if (req.session.cart && req.session.cart.totalQty == 0) {
        req.flash(
            'error',
            'Có lỗi xảy ra trong quá trình đặt hàng, vui lòng thử lại'
        );
        return res.redirect('/san-pham');
    }
    const newOrder = {
        order_id: Math.floor(Math.random() * 100000000) + 10000000,
        user: req.user._id,
        products: req.session.cart.items,
        paymentType: reqBody.payment,
        totalPrice: req.session.cart.totalPrice
    };
    const order = await Order.create(newOrder);
    if (!order) {
        req.flash(
            'error',
            'Có lỗi xảy ra trong quá trình đặt hàng, vui lòng thử lại'
        );
        return res.redirect('/thanh-toan');
    }
    // // Update product quantity;
    // for (let productId in req.session.cart.items) {
    //     const update = { $inc: { sold: 1 } };
    //     await Product.updateOne({_id: productId}, update);
    // }
    req.session.cart = undefined;
    req.flash('success', 'Đặt hàng thành công');
    return res.redirect('/order/history');
};

exports.getOrder = async (req, res) => {
    const order = await Order.findById(req.params.id);
    const pageType = 'order-detail';
    res.render('profile', { order, pageType });
};
