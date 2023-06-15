const express = require("express")
const blogModel = require("../model/blog.model")
const auth = require("../middleware/auth.middleware")
const blogRouter = express.Router()

blogRouter.use(auth)



//All Blogs and Pagination

blogRouter.get("/blogs", async (req, res) => {
    let { page, limit} = req.query;
    console.log(page,limit)
    try {
      const data = await blogModel
      .find()
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
      res.status(200).send(data);
    } catch (error) {
      res.status(400).send({ msg: error.message });
    }
  });
  



  blogRouter.get("/blogs/title", async (req, res) => {
    try {
      const data = await blogModel.find(req.query)
      res.status(200).send(data);
    } catch (error) {
      res.status(400).send({ msg: error.message });
    }
  });
  


  blogRouter.get("/blogs/category", async (req, res) => {
    try {
      const data = await blogModel.find(req.query)
      res.status(200).send(data);
    } catch (error) {
      res.status(400).send({ msg: error.message });
    }
  });



  
  blogRouter.get("/blogs/sort", async (req, res) => {
     let {sort,order} = req.query
    try {
      const data = await blogModel.find().sort({[sort]:order})
      res.status(200).send(data);
    } catch (error) {
      res.status(400).send({ msg: error.message });
    }
  });


  blogRouter.post("/blogs",async(req,res)=>{
    try {
        const newBlog = new blogModel(req.body)
        await newBlog.save()
        res.status(200).send({msg:"blog posted!"})
    } catch (error) {
        res.status(400).send({ msg: error.message });
    }
  })


  blogRouter.put("/blogs/:id",async(req,res)=>{
    const {id} = req.params
    try {
        const Blog = blogModel.findByIdAndUpdate(id,req.body)
        res.status(200).send({msg:"blog updated!"})
    } catch (error) {
        res.status(400).send({ msg: error.message });
    }
  })


  blogRouter.patch("/blogs/:id",async(req,res)=>{
    const {id} = req.params
    try {
        const Blog = blogModel.findByIdAndUpdate(id,req.body)
        res.status(200).send({msg:"blog updated!"})
    } catch (error) {
        res.status(400).send({ msg: error.message });
    }
  })


  blogRouter.delete("/blogs/:id",async(req,res)=>{
    const {id} = req.params
    try {
        const Blog = blogModel.findByIdAndDelete(id)
        res.status(200).send({msg:"blog updated!"})
    } catch (error) {
        res.status(400).send({ msg: error.message });
    }
  })






module.exports = blogRouter