import { aj } from "../config/arcjet.config.js"

const arcjectMiddleware = async (req, res, next) => {
    try {
        const decision = await aj.protect(req, { requested: 5 });
        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) res.status(429).json({ error: "Too Many Requests" });
            if (decision.reason.isBot()) res.status(403).json({ error: "No bots allowed" });
            
            res.status(403).json({ error: "Forbidden" });
  }
    next();
    } catch (error) {
        throw new Error("Arcjet middleware error: " + error.message);
    }
}

export default arcjectMiddleware;