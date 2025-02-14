import blogService from "../services/blogs";

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_BLOGS":
      return action.data;
    case "ADD_BLOG":
      return [...state, action.data];
    case "LIKE_BLOG": {
      const updatedBlog = action.data;
      return state.map((blog) =>
        blog.id === updatedBlog.id ? updatedBlog : blog
      );
    }
    case "DELETE_BLOG":
      return state.filter((blog) => blog.id !== action.data);
    default:
      return state;
  }
};

export const initializeBlogs = (blogs) => {
  return {
    type: "INIT_BLOGS",
    data: blogs,
  };
};

export const addBlog = (blog) => {
  return async (dispatch) => {
    try {
      const addedBlog = await blogService.create(blog);
      dispatch({
        type: "ADD_BLOG",
        data: addedBlog,
      });
      return addedBlog;
    } catch (error) {
      console.error("Error adding blog:", error);
    }
  };
};

export const likeBlog = (blog) => {
  return {
    type: "LIKE_BLOG",
    data: blog,
  };
};

export const deleteBlog = (id) => {
  return {
    type: "DELETE_BLOG",
    data: id,
  };
};

export default blogReducer;
