const MessageService = require("../services/messages.service");

const Message = new MessageService();

module.exports.createMessage = async (req, res, next) => {
  try {
    const message = await Message.createMessage(req.body);

    if (message) {
      res.status(201).json({
        success: true,
        message,
      });
      next()
    }

  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
    next()
  }
};

module.exports.getUserMessages = async (req, res, next) => {
  try {

    const message = await Message.getAllUserMessages(req.params.id);

    if (message) {
      res.status(201).json({
        success: true,
        message,
      });
      next()
    }
  } catch (e) {
    console.log(e)
    res.status(500).json({
      success: false,
      message: e.msg,
    });
    next()
  }
};

module.exports.getConversation = async (req, res, next) => {
  try {
    const message = await Message.deleteMessage(req.params.user1, req.params.user2);

      res.status(200).json({
        success: true,
        message
      });
      next()

  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.msg,
    });
    next()
  }
};



