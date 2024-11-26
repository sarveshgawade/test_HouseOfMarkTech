import URL from '../models/urlModel.js'
import generateShortCode from '../utils/generateShortCode.js'

// function to shorten the URL provided
const shorten = async (req,res) => {
    try {
        
        // getting url from the body of the request
        const {url} = req.body

        // checking whether the URl is provided 
        if(!url){
            return res.status(500).json('URL is required')
        }

        // regex to verify the URL
        const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-._~:/?#[\]@!$&'()*+,;=]*)?$/

        // matching/testing the provided URL against the regex
        if(!urlRegex.test(url)){
            return res.status(500).json('Enter a valid URL')
        }

        // verifying whether the URL provided already exists in the DB
        const urlExists = await URL.findOne({originalUrl: url})

        if(urlExists){
            return res.status(500).json('URL already exists and has been shortened!')
        }

        let shortCode = "" ;
        let isUnique = false ;
        
        // checking the uniqueness of the shortCode/shortId.
        /*
            for each iteration the generated shortCode is checked in the DB.
            If its not unique then the shortCode is generated again until its not unique.
        */
        
        do {
            shortCode = generateShortCode(8)
            const codeExists = await URL.findOne({shortId: shortCode})
            if(!codeExists){
                isUnique = true
            }
        } while (!isUnique);

        // creating new URL object
        const newUrl = await URL.create({
            originalUrl: url,
            shortId: shortCode ,
            clicks: 0 ,
            lastAccessed: '0'
        })

        // saving the object in the DB
        await newUrl.save()

        // return the response with required data & a success message
        return res.status(200).json({
            success: true ,
            message: 'URL shortened successfully !',
            shortenedURL : shortCode
        })


    } catch (error) {
        console.log(error);
    }
}

// function to redirect to the original URL using the provided shortId
const redirect = async (req,res) => {
    try {

        // getting shortId from the body of the request
        const {shortId} = req.params    

        // checking whether the shortId is provided.If not then send below error response 
        if(!shortId){
            return res.status(500).json('shortId is required !')
        }
        
        // verifying whether the DB contains the shortId
        const shortIdExists = await URL.findOne({shortId})

        if(!shortIdExists){
            return res.status(500).json('URL with given shortId does not exists')
        }

        // updating the click count and last accessed time
        shortIdExists.clicks += 1
        shortIdExists.lastAccessed = new Date().toISOString()

        // saving the updated document in DB
        await shortIdExists.save()
        
        // redirecting to the originalURL matching with the shortId provided
        return res.redirect(shortIdExists.originalUrl)

    } catch (error) {
        console.log(error);
    }
}

// function to get the stats(total clicks and last accessed date)
const getStats = async (req,res) => {
    try {
        // getting shortId from the body of the request
        const {shortId} = req.params

        // checking whether the shortId is provided
        if(!shortId){
            return res.status(500).json('shortId is required !')
        }

        // verifying whether the DB contains the shortId. If not then send below error response
        const shortIdExists = await URL.findOne({shortId})

        if(!shortIdExists){
            return res.status(500).json('URL with given shortId does not exists')
        }

        // converting the ISO date format to human readable date format
        const humanReadbleTimeFormat = new Date(shortIdExists.lastAccessed).toLocaleString('en-IN',{
            year: 'numeric',
            month: 'long',
            day:'numeric',
            hour:'2-digit',
            minute: '2-digit',
            second:'2-digit',
            hour12: true,
            timeZone: 'Asia/Kolkata'
        })

         // return the response with required data & a success message
        return res.status(200).json({
            success: true ,
            message : 'Stats for given shortId found !',
            stats: {
                totalNoOfclicks: shortIdExists.clicks,
                lastAccessed: humanReadbleTimeFormat
            }
        })
    } catch (error) {
        console.log(error)
    }
}

// exporting all the functions
export {shorten,redirect,getStats} 