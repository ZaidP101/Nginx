import { nanoid } from "nanoid";
import URL from "../model/url.js"
async function handleShortURL(req, res) {
    const shortID = nanoid(8);
    const body = req.body;
    if(!body.url){
        return res.status(400).json({
            error : "the url  cannot be empty"
        })
    }
    await URL.create({
        shortURL : shortID,
        originalURL : body.url
    })
    return res.status(200).json({id : shortID})
}
const redirect = async (req, res) =>{
    const shortID = req.params.shortID;
    const entry = await URL.findOneAndUpdate({
        shortURL:shortID
    }, {
        $push:{
            visistHis: {
                timestamp : Date.now()
            }
        }
    });
    if (!entry) {
        return res.status(404).send("Short URL not found");
    }
    return res.redirect(entry.originalURL)
}
const getanalytics = async (req, res) =>{
    const shortID = req.params.shortID;
    const result = await URL.findOne({shortURL: shortID});
    return res.json({
        totalclicks:result.visistHis.length,
        Analytics : result.visistHis, 
    })
}
export {handleShortURL, redirect, getanalytics};
