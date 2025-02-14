const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
//get token
//const getTokenFrom = (request) => {
// const authorization = request.get("authorization");
// if (authorization && authorization.startsWith("Bearer ")) {
//   return authorization.replace("Bearer ", "");
//  }
// return null;
//};

//get all
blogsRouter.get("/", async (request, response) => {
  const userId = request.query.user;
  const filter = userId ? { user: userId } : {};
  const blogs = await Blog.find(filter).populate("user", {
    username: 1,
    name: 1,
    url: 1,
  });
  response.json(blogs);
});
blogsRouter.get("/:id", async (request, response) => {
  try {
    const blog = await Blog.findById(request.params.id).populate("user", {
      username: 1,
      name: 1,
    });

    if (!blog) {
      return response.status(404).json({ error: "Blog not found" });
    }

    response.json(blog);
  } catch (error) {
    return response.status(400).json({ error: "Invalid blog ID" });
  }
});

//add a blog
blogsRouter.post("/", async (request, response, next) => {
  const body = request.body;

  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }
  const user = request.user;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id,
  });

  const savedBlog = await blog.save();

  await savedBlog.populate("user", "username name");

  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

//delete blog
blogsRouter.delete("/:id", async (request, response) => {
  const blogId = request.params.id;
  const user = request.user;

  const blog = await Blog.findById(blogId);
  if (!blog) {
    return response.status(404).json({ error: "Blog not found" });
  }

  if (blog.user.toString() !== user._id.toString()) {
    return response
      .status(403)
      .json({ error: "Forbidden: You are not the owner of this blog" });
  }

  await Blog.findByIdAndDelete(blogId);

  response.status(200).json({ message: "Blog successfully deleted" });
});
//update a blog
blogsRouter.put("/:id", async (request, response) => {
  const { title, author, url, likes } = request.body;

  const update = { title, author, url, likes };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, update, {
    new: true,
    runValidators: true,
  }).populate("user", { username: 1, name: 1 });

  if (!updatedBlog) {
    return response.status(404).json({ error: "Blog not found" });
  }

  response.json(updatedBlog);
});

blogsRouter.post("/:id/comments", async (request, response) => {
  const { id } = request.params;
  const { comment } = request.body;

  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return response.status(404).json({ error: "Blog not found" });
    }

    blog.comments = blog.comments.concat(comment);
    await blog.save();

    response.status(201).json(blog);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Error saving comment" });
  }
});

module.exports = blogsRouter;
