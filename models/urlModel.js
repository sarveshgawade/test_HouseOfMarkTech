import mongoose from "mongoose";

// designing the Schema for URL as per given requirements
const urlSchema = new mongoose.Schema({
    originalUrl: {
        type: String ,
        required: [true,'Original-URL is a required field'],
        match:[/^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-._~:/?#[\]@!$&'()*+,;=]*)?$/,'Please enter a valid URL'],
        trim: true
    },
    shortId: {
        type: String ,
        required: [true,'Original-URL is a required field'],
        unique: true
    },
    clicks: {
        type: Number ,
        required: [true,'Clicks is a required field'],
    },
    lastAccessed:{
        type: String,
        required: [true,'Last Accessed is a required field'],
    }
},{
    timestamps:true
})


// indexing shortId for faster lookups
urlSchema.index({shortId: 1})


/**
 * PARAMETERS IN THE OBJECTS(FIELDS) CREATED ABOVE :
 * 
 * 1) type: defines the data type of the respective field
 * 2) required: makes sure that the respective field is made compulsory
 * 3) match: makes sure that the value must be matched with the given regex
 * 4) trim : trims the spaces(leading & trailing) for the given value
 * 5) unique: makes sure that the respective field must be unique throughout the DB acting like a primary key
 */

// creating a model based on the schema defined above
const URL = mongoose.model('URL',urlSchema)

// exporting the model
export default URL

