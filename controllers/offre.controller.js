import offre from "../models/offre.model.js";
import User from "../models/users.model.js";
import createError from "../utils/createError.js";

export const createOffre = async (req, res, next) => {
  console.log('req:', req.body)
  const newOff = new offre({
    userId: req.params.id,
    ...req.body,
  });

  try {
    const savedOffre = await newOff.save();
    console.log('savedOffre:', savedOffre)
    
    if (!req.params.id) {
      return res.send('user is no longer exist')
    }
    const user = await User.findById(req.params.id);
    user.myOffres.push(savedOffre._id);
    await user.save();

    res.status(201).json({ offreId: savedOffre._id });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Title already exists" });
    }
    else {
      res.json({
        error : error,
        status :0
      }).status(405)
    }
    next(error);
  }
};

export const deleteOffre = async (req, res, next) => {
  try {
    const off = await offre.findById(req.params.id);
    if (!off) return next(createError(404, "No offer found"));


    await offre.findByIdAndDelete(req.params.id);
    res.status(200).json("Offer deleted");
  } catch (error) {
    res.json({error: error})
  }
};

export const singleOffre = async (req, res, next) => {
  try {
    const off = await offre.findById(req.params.id);
    if (!off) next(createError(404, "no offre found"));
    res.status(200).send(off);
  } catch (error) {
    next(error);
  }
};

export const updateOffre = async (req, res, next) => {
  try {
    const off = await offre.findById(req.params.id);
    if (!off) return next(createError(404, "No offer found"));

    // Check if the user is the owner of the offer
    if (off.userId.toString() !== req.userId)
      return next(createError(403, "You're not the owner of this offer"));

    // Update the offer with the new data. Only fields included in the request body will be updated.
    Object.assign(off, req.body);

    await off.save();

    res.status(200).json(off);
  } catch (error) {
    next(error);
  }
};

export const allOffre = async (req, res, next) => {
  const query = req.query;
  const filters = {
    ...(query.userId && !req.isEnterprise && { userId: query.userId }),
    ...(query.category && { category: query.category }),
    ...((query.min || query.max) && {
      prix: {
        ...(query.min && { $gt: query.min }),
        ...(query.max && { $lt: query.max }),
      },
    }),
    ...(query.search && { title: { $regex: query.search, $options: "i" } }),
  };

  try {
    const offres = await offre.find(filters).sort({ createdDate: -1 });
    res.status(200).send(offres);
  } catch (error) {
    next(error);
  }
};

export const myOffres = async (req, res) => {
  try {
 

    const offres = await offre.find({ userId: req.params.id });
    res.status(201).json({
      data: offres,
      status: 1,
    });
  } catch (error) {
    res.json({
      error: "failed to load data!",
      status: 0,
    });
  }
};
