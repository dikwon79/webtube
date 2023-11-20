let videos = [{

    title: "First video",
    rating: 5,
    comments: 2,
    createdAt: "2 minutes ago",
    views: 1,
    id: 1,
},
{

    title: "Second video",
    rating: 3,
    comments: 2,
    createdAt: "1 minutes ago",
    views: 59,
    id: 2,
},
{

    title: "third video",
    rating: 10,
    comments: 5,
    createdAt: "10 minutes ago",
    views: 39,
    id: 3,
}];
export const trending = (req, res) => {
   

    return res.render("home", {pageTitle : "Home", videos});
}
export const watch = (req, res) => {
    const {id} = req.params;
    
    const video = videos[id - 1];

    return res.render("watch", {pageTitle: `Watching: ${video.title}`, video});
}
export const getEdit = (req, res) => {
    
    const {id} = req.params;
    const video = videos[id - 1];
    return res.render("edit", {pageTitle: `Editing: ${video.title}`, video});
};
export const postEdit = (req, res) => {
    const { id } = req.params;
    console.log(req.body);
    return res.redirect(`/videos/${id}`);
}; 
