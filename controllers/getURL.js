import UrlModel from "../models/url.model.js";

const getURL = async (req, res) => {
    try {
        const url = await UrlModel.findOne({ id: req.params.id });
        if (url) {
            url.clicks++;
            await url.save();
            res.redirect(url.url);
        } else {
            res.status(404).json({ error: "URL not found" });
        }
    } catch (error) {
        console.error("Error retrieving URL:", error);
        res.status(500).json({ error: "Error retrieving URL" });
    }
}

export default getURL