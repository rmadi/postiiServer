import offre from "../models/offre.model.js";
import Proposition from "../models/proposition.model.js";
// import User from '../models/users.model.js';
import createError from "../utils/createError.js";

export const createPropostion = async (req, res) => {
  console.log("req.params.id:", req.params.id);

  const Off = await offre.findById(req.params.id);
  if (!Off) {
    res.json({
      error: "no match offre !",
    });
  }

  const newProp = new Proposition({
    prix: req.body.prix,
    msg: req.body.msg,
    title: req.title,
    buyerId: req.body.buyerId,
    sellerId: Off.userId,
    offreId: req.params.id,
  });
  console.log("newProp:", newProp);

  const proposition = await newProp.save();

  // Update the Offre document with the new proposition
  await offre.findByIdAndUpdate(req.params.id, {
    $push: {
      proposals: {
        enterpriseId: req.body.buyerId,
        price: req.body.prix,
      },
    },
  });

  res.status(201).json(proposition);
};

export const getMyPropositions = async (req, res, next) => {
  try {
    // const user = await User.findById(req.userId);
    const propositon = await Proposition.find({ userId: req.userId });
    if (!propositon) return next(createError(404, "No proposition found"));

    res.status(200).json(propositon);
  } catch (error) {
    next(error);
  }
};

export const getPropo = async (req, res, next) => {
  try {
    const offerId = req.params.id;
    const offer = await offre.findById(offerId);

    if (!offer) {
      res.status(404).send("No offer found with the given ID.");
      return;
    }

    res.json(offer.proposals);
  } catch (error) {
    next(error);
  }
};
