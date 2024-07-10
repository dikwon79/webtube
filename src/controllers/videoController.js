
let videos = [
    {
        title: "First Video",
        rating: 5,
        comments: 2,
        createdAt: "5 minutes ago",
        views: 1,
        id: 1,
    },
    {
        title: "Second Video",
        rating: 4,
        comments: 3,
        createdAt: "1 minutes ago",
        views: 39,
        id: 2,
    },
    {
        title: "Third Video",
        rating: 3,
        comments: 2,
        createdAt: "1 minutes ago",
        views: 19,
        id: 3,
    },
];
export const trending = (req, res) => {
    
    return res.render("home", {pageTitle : "Home", videos});
};
export const watch = (req, res) => {
    const {id} = req.params;
    //const id = req.params.id;   둘다 같은 표현 위는 ES6버젼
    console.log("Show video", id);
    const video = videos[id - 1];

    return res.render("watch", {pageTitle :`Watching: ${video.title}`, video});
};

export const getEdit = (req, res) => {
    const {id} = req.params;
    const video = videos[id - 1];

    return res.render("edit", { pageTitle: `Editing: ${video.title}`, video});

};

export const postEdit = (req, res) =>{
    const {id} = req.params;
    const { title } = req.body;
    videos[id - 1].title = title;
    return res.redirect(`/videos/${id}`);
};