import { 
    createPost,
    getPost,
    getPosts,
    updatePost
 } from "./post.repository"
import { createPostValidate } from "../posts/post.validation"
import {
    clientError,
    serverError
} from "../../utils/error"
import { findUser } from "../users/usersRepository"



//create post
export async function createPostService ( userId: string, payload: {[key: string]: any}, images?: {imgUrl: string, imgId: string}){
    try {
        
        const {description} = createPostValidate(payload)

    return await createPost(userId, description, images)
    } catch (err) {
        return err
    }
}

export async function getpostService (postId: string) {
    try {
       const post = await getPost(postId)

       if (!post) throw new clientError("post not found", 404)

       return post

    } catch ( err ) {
        return err
    }
}

export async function getpostsService () {
    try {
       const posts = await getPosts()

       if (!posts) throw new clientError("no post found", 404)

       return posts

    } catch ( err ) {
        return err
    }
}

export async function deletepostService (postid: string, userId: string) {
    try {
        const post = await getPost(postid)
        if (!post) throw new clientError("post not found", 404)

        const user = await findUser({_id: post.userId})

        if ( userId !== (post.userId).toString() ) throw new serverError("user account not found", 404)

        post.delete()
        return "post has been deleted successfully"

    } catch (err) {
        return err
    }
}

// export async function updatepost(postid: string, payload: {[key: string]: any}) {
//     try {
//         const post = await updatePost(postid)
//         if (!post) throw new clientError("post not found", 404)


//     } catch (err) {
//         return err
//     }
// }

//like post
//unlike a post
//comment on a post or create comment
//delete comment
//update comment