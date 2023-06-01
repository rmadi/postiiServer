import Review from "../models/review.model.js";
import offre from "../models/offre.model.js";
import createError from "../utils/createError.js";

export const createReview = async (req, res, next) => {
    const off = await offre.findById(req.params.id)
    if (!off) next(createError(403," no offer found"))

    const newReview = await new Review({
        userId : req.userId, 
        desc: req.body.desc,
        offreId: req.params.id,
    })

    try {
        const review = await newReview.save();

       // Update the Offre document with the new Review
       await offre.findByIdAndUpdate(req.params.id, {
        $push: {
            Reviews: {
                enterpriseId: req.userId,
                desc: req.body.desc
            }
        }
    });
       res.status(201).json(review);
    } catch (error) {
        next(error)
    }
};

export const getReview = async (req, res, next) => {
    try {
    
    const off = await offre.findById(req.params.id)
    if(!off) return next(createError(402, "no offer found here"))

    res.status(200).json(off.Reviews);
    console.log(off.Reviews)
    } catch (error) {
        next(error)
}

};

export const deleteReview = async (req, res, next) => {
    try {
      const reviewId = req.params.id;
      const review = await Review.findById(reviewId);
  
      if(!review) return next(createError(404, "Review not found"));
  
      await Review.deleteOne({ _id: reviewId });
  
      res.status(200).json({ message: "Review deleted" });
    } catch (error) {
      next(error);
    }
  };
  