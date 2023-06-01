
export const isEnterprise = (req, res, next) => {
    if (!req.isEnterprise) {
        return res.json({error: "Only enterprises can do that"})
    }
    next();
}