const mongoose = require('mongoose');
const slugify = require('slugify');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');
const productSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'A product must have a name'],
            unique: true,
            trim: true,
            maxlength: [
                40,
                'A product name must have less than or equal to 40 characters'
            ],
            minlength: [
                1,
                'A product name must have more than or equal to 1 characters'
            ]
            // validate: [validator.isAlpha, 'Tour name must only contain characters']
        },
        brand: String,
        slug: String,
        sku: String,
        ratingsAverage: {
            type: Number,
            default: 4.5,
            min: [1, 'Rating must be above 1.0'],
            max: [5, 'Rating must be below 5.0'],
            set: val => Math.round(val * 10) / 10 // 4.666666, 46.6666, 47, 4.7
        },
        ratingsQuantity: {
            type: Number,
            default: 0
        },
        department: String, //top level of category
        category: String, // category path
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
        coverImage: {
            type: String,
            required: [true, 'A product must have a cover image']
        },
        color: {
            type: String
        },
        images: [
            {
                type: String
            }
        ],
        size: {
            type: String
        },
        sold: {
            type: Number,
            default: 0
        }
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);
// Virtual populate
productSchema.virtual('reviews', {
    ref: 'Review',
    foreignField: 'product',
    localField: '_id'
});
productSchema.index({ name: 'text', brand: 'text' });
productSchema.plugin(mongoosePaginate);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
