const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const wareLogin = require("../middleware/wareLogin");
const Post = mongoose.model("Post");
const User = mongoose.model("User");

router.get("/user/:Id", wareLogin, (req, res) => {
  User.findOne({ _id: req.params.Id })
    .select("-password")
    .then((user) => {
      Post.find({ postedBy: req.params.Id })
        .populate("postedBy", "_id name")
        .then((posts) => {
          res.json({ user, posts });
        });
    })
    .catch((err) => {
      return res.status(404).json({ error: "user not found" });
    });
});
// following and unfollowing
router.put("/follow", wareLogin, (req, res) => {

 User.findByIdAndUpdate(
    req.body.followId,
    {
      $push: { following: req.body.followId,followers: req.user._id}
    },
    {
      new: true,
    },
  ).then(
    User.findByIdAndUpdate(
      req.user._id,
      {
        $push: { following: req.body.followId,followers: req.user._id}
      },
      {
        new: true,
      }).select("-password").then((result)=>{
        console.log(result);
        res.json(result)
       
      }).catch(err=>{
        return res.status(422).json({error:err})
      })
  )
  
  })
  router.put("/unfollow", wareLogin, (req, res) => {
    User.findByIdAndUpdate(
       req.body.followId,
       {
         $pull: { following: req.body.followId,followers: req.user._id}
       },
       {
         new: true,
       },
     ).then((result,err)=>{
      if(err){
       return res.status(422).json({error:err})
      }
      User.findByIdAndUpdate(
       req.user._id,
       {
         $push: { following: req.body.followId,followers: req.user._id}
       },
       {
         new: true,
       }).select("-password").then((result)=>{
         res.json(result)
       }).catch(err=>{
         return res.status(422).json({error:err})
       })
     })})
module.exports = router;
