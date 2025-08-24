const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    image: {
        filename: {
            type: String
        },
        url:{
        type: String,
        default: "https://unsplash.com/photos/a-house-covered-in-snow-with-a-snowboard-in-front-of-it-tpXN6eheba8",
        // if the user hasn't given the url of the image then to show some images on the property we must set some default images. We can do this by using set: function
        set: (v) => v === "" ? "https://unsplash.com/photos/a-house-covered-in-snow-with-a-snowboard-in-front-of-it-tpXN6eheba8" : v
        }
    },
    price: {
        type: Number,
    },
    location: {
        type: String,
    },
    country: {
        type: String
    },
    reviews : [
        {
            type: Schema.Types.ObjectId,
            ref:"Review"
        }
    ]

})

const Listing = mongoose.model("Listing", listingSchema)
module.exports = Listing;