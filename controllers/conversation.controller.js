import createError from "../utils/createError.js";
import Conversation from "../models/conversation.model.js";
// 7atithom magloubi, eglebhom ba3d
export const createConversation = async (req, res, next) => {
  const newConversation = new Conversation({
    id: req.userId + req.body.to , 
    senderId: req.isEnterprise ? req.userId : req.body.to,
    reciverId: req.isEnterprise ? req.body.to : req.userId,
    readsender: req.isEnterprise,
    readByClient: !req.isEnterprise,
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(201).send(savedConversation);
  } catch (err) {
    next(err);
  }
};

export const updateConversation = async (req, res, next) => {
  try {
    const updatedConversation = await Conversation.findOneAndUpdate(
      { id: req.params.id },
      {
        $set: {
          readEntreprise: true,
          readByClient: true,
          ...(req.isEntreprise ? { readEntreprise: true } : { readByClient: true }),
        },
      },
      { new: true }
    );

    res.status(200).send(updatedConversation);
  } catch (err) {
    next(err);
  }
};

export const getSingleConversation = async (req, res, next) => {
  try {
    const conversation = await Conversation.findOne({ id: req.params.id });
    if (!conversation) return next(createError(404, "Not found!"));
    res.status(200).send(conversation);
  } catch (err) {
    next(err);
  }
};

export const getConversations = async (req, res, next) => {
  try {
    const conversations = await Conversation.find(
      req.isEntreprise ? { entrepriseId: req.userId } : { clientId: req.userId }
    ).sort({ updatedAt: -1 });
    res.status(200).send(conversations);
  } catch (err) {
    next(err);
  }
};
