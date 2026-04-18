import exp from 'express'
import { verifyToken } from '../middlewares/VerifyToken.js' 
export const userApp=exp.Router()

//Read all articles of all authors
//Add comment to an article
userApp.put("/articles",verifyToken("USER"),async(req,res)=>{
    //get body from req
    const {articleId,comment}=req.body;
    //check article 
    const articleDocument = await ArticleModel.findOne({_id:articleId,isArticleActive:true})
    //if article not found
    if(!articleDocument){
        return res.status(404).json({message:"Article not found"})
    }
    //get user id
    const userID=req.user?.id;
    //add comment to comments array of articleDocument 
    articleDocument.comments.push({user:userID,comment:comment});
    //save 
await articleDocument.save();
//send res
res.status(200).json({message:"Comment added successfully",payload:articleDocument})
})
