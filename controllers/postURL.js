import getId from "../utils/generateID.js";
import insertURL from "../services/insertURL.mongo.js";
import { port } from "../env/env.js";

export const postURL = async (req, res) => {
  try {
    const { url, customId, title = '', tags = '' } = req.body;
    const id = req.user.id

    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    const code = customId || getId(8);
    const parsedTags = Array.isArray(tags)
      ? tags.map((tag) => String(tag).trim()).filter(Boolean)
      : String(tags)
          .split(',')
          .map((tag) => tag.trim())
          .filter(Boolean);

    await insertURL({ url, id, code, title: title.trim(), tags: parsedTags });
    res.json({ shortUrl: `http://localhost:${port}/api/urls/${code}`, shortId: id });
  } catch (error) {
    console.error('Error shortening URL:', error);
    res.status(500).json({ error: 'Failed to shorten URL' });
  }
};