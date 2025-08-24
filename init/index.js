const mongoose = require("mongoose")
const initData=require("./data.js") 
const Listing=require("../models/listing.js")

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderLust")
}

main().then(()=>{
    console.log("successfully connected to DB")
})
.catch((err)=>{
    console.log(err)
})

const initDB=async ()=>{
    await Listing.deleteMany({})
/* 
    initData = {
  data: sampleListings
}
  initData.data is the actual array of listings
*/
    await Listing.insertMany(initData.data)
    console.log("data was initialised in DB")
}
initDB();