const PostServices = require("../services/postService");

const Post = new PostServices();

module.exports.createpost = async (req, res, next) => {
  try {
    const post = await Post.createPost(req.body);

    if (post) {
      res.status(201).json({
        success: true,
        post,
      });
      next();
    }
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
    next();
  }
};

module.exports.updatepost = async (req, res, next) => {
  try {
    let oldlikes, newlikes, updatedlikes;

    if (req.body.likes) {
      const thePost = await Post.getPost(req.params.id);

      oldlikes = thePost.likes;
      newlikes = req.body.likes;
      updatedlikes = [...oldlikes, ...newlikes];
    }

    req.body.likes = updatedlikes;

    const post = await Post.updatepost(req.params.id, req.body);

    if (post) {
      res.status(201).json({
        success: true,
        post,
      });
      next();
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: e.msg,
    });
    next();
  }
};

module.exports.deletepost = async (req, res, next) => {
  try {
    const post = await Post.deletePost(req.params.id);

    res.status(200).json({
      success: true,
      message: "post Successfully Deleted!",
    });
    next();
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.msg,
    });
    next();
  }
};

module.exports.getAllpost = async (req, res, next) => {
  try {
    const post = await Post.getAllPosts();

    if (post) {
      res.status(201).json({
        success: true,
        post,
      });
      next();
    }
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
    next();
  }
};

module.exports.getpost = async (req, res, next) => {
  try {
    const post = await Post.getPost(req.params.id);

    if (post) {
      res.status(200).json({
        success: true,
        post,
      });
      next();
    }
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
    next();
  }
};

module.exports.getUserposts = async (req, res, next) => {
  try {
    const post = await Post.getUserPosts(req.params.id);

    if (post) {
      res.status(200).json({
        success: true,
        post,
      });
      next();
    }
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
    next();
  }
};
