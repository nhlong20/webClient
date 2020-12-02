const mongoose = require('mongoose');
const slugify = require('slugify');
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A tour must have a name'],
        unique: true,
        trim: true,
        maxlength: [
            40,
            'A tour name must have less or equal then 40 characters'
        ],
        minlength: [
            10,
            'A tour name must have more or equal then 10 characters'
        ]
        // validate: [validator.isAlpha, 'Tour name must only contain characters']
    },
    slug: String,
    sku: String,
    department: String, //top level of category
    category: String, // category path
    collection: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Collection'
    },
    price: {
        type: Number,
        required: [true, 'A product must have a price']
    },
    description: {
        type: String,
        trim: true
    },
    status: {
        type: Boolean
    },
    imageCover: {
        type: String,
        required: [true, 'A product must have a cover image']
    },
    color: {
        type: String,
        required: [true, 'A product must have color']
    },
    images: [
        {
            type: String
        }
    ],
    size: {
        type: String,
        required: [true, 'A product must have sizes']
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
