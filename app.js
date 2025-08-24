const express = require("express")
const app = express()
const port = 3000
const path = require("path")
const mongoose = require("mongoose")
const Listing = require("./models/listing.js")
const methodOverride = require("method-override")
const ejsMate = require("ejs-mate")
const wrapAsync = require("./utils/wrapAsync.js")
const ExpressError=require("./utils/ExpressError.js")
const Review=require("./models/review.js")
const review = require("./models/review.js")
const {listingSchema,reviewSchema} =require("./schema.js")

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride("_method"))
app.engine("ejs", ejsMate) //use ejs-locals for all ejs templates
app.use(express.static(path.join(__dirname, 'public')));



async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderLust")
}

main().then(() => {
    console.log("successfully connected to DB")
})
    .catch((err) => {
        console.log(err)
    })

app.get("/", (req, res) => {
    res.send("hey i am root")
})
// for server side validation of listing
const validateListing=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body)
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",")
        throw new ExpressError(400,errMsg)
    }
    else{
        next()
    }
}
// for server side validation of review
const validateReview=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body)
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",")
        throw new ExpressError(400,errMsg)
    }
    else{
        next()
    }
}

// index route
app.get("/listings", async (req, res) => {
    const allListings = await Listing.find({});
    res.render("./listings/index.ejs", { allListings })
})

// create route
app.get("/listings/new", (req, res) => {
    res.render("./listings/new")
})

// show route
app.get("/listings/:id",  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
    // console.log(listing)
    res.render("./listings/show.ejs", { listing })
}))

//new route 
app.post("/listings",validateListing ,wrapAsync(async (req, res, next) => {
    if(!req.body){
        throw new ExpressError(400,"Bad Request")
    }
    let { title, description, image, price, location, country } = req.body
    let newListing = new Listing({
        title: title,
        description: description,
        image: {
            url: image
        },
        price: price,
        location: location,
        country: country
    })
    await newListing.save()
    console.log("Saved Listing:", newListing);
    res.redirect("/listings")


}))
// edit route
app.get("/listings/:id/edit", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    // console.log(listing)
    res.render("./listings/edit.ejs", { listing })
}))

app.put("/listings/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let { title, description, image, price, location, country } = req.body
    await Listing.findByIdAndUpdate(id,
        {
            title,
            description,
            image,
            price,
            location,
            country
        },
        { new: true, runValidators: true })
    res.redirect("/listings")
}))

// delete route
app.delete("/listings/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id)
    res.redirect("/listings")
}))

//   reviews route
app.post("/listings/:id/reviews",validateReview,wrapAsync(async (req,res)=>{
    let listing = await Listing.findById(req.params.id)
    let newReview= new Review(req.body.review)
    listing.reviews.push(newReview)
    await newReview.save()
    await listing.save()
    console.log("new review saved")
    res.redirect(`/listings/${listing._id}`)

}))


// app.all("*",(req,res,next)=>{
//     next(new ExpressError(404,"Page Not Found!"));
// });

app.use((err, req, res, next) => {
    let {statusCode=500,message="Something went wrong!"}=err
    res.render("error.ejs",{message})
})



app.listen(port, () => {
    console.log(`app is listening at port ${port}`)
})