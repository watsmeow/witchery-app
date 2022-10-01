import axios from 'axios';

//giving a base url for proxy so that every time a request is made it calls port 4242
const API = axios.create({baseURL: "http://localhost:4242"})

//request to get posts of users you follow
export const getTimelinePosts = async (id) => {
    const posts = await API.get(`/post/${id}/timeline`);
    const users = await API.get(`/user`);
    let arr = []
    posts.data.map((post) => {
        let postWithUser = {}
        postWithUser["_id"] = post._id
        postWithUser['userId'] = post.userId
        postWithUser['spellname'] = post.spellname
        postWithUser['purpose'] = post.purpose
        postWithUser['howToMake'] = post.howToMake
        postWithUser['effects'] = post.effects
        postWithUser['questions'] = post.questions
        postWithUser['likes'] = post.likes
        postWithUser['image'] = post.image
        postWithUser['username'] = users.data.filter((person) => {return person._id === post.userId})[0].username
        arr.push(postWithUser)
    })
    return arr
}

//
export const likePost = (id, userId) => API.put(`post/${id}/like`, {userId: userId})

export const deletePost = (id, userId) => API.put(`post/${id}`, {userId: userId})

