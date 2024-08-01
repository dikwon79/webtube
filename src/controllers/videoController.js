import Video from "../models/Video";


export const home = async(req, res) => {
  
    const videos = await Video.find({}).sort({createdAt: "desc"}); 
    return res.render("home", {pageTitle : "Home", videos});
   
};
export const watch = async (req, res) => {
    const {id} = req.params;
   
    const video = await Video.findById(id);
    const owner = await User.findById(video.owner);
    if(!video){
        return res.status(404).render("404", { pageTitle: "Video not found." });
    }
    return res.render("watch", { pageTitle : video.title, video, owner });
};

export const getEdit = async(req, res) => {
    const {id} = req.params;
    const video = await Video.findById(id);
    //이경우는 edit page에 오브젝트를 보내줘야 한다. 
    if(!video){
        return res.status(404).render("404", { pageTitle: "Video not found" });
    }
    return res.render("edit", { pageTitle: `Edit: ${video.title}`, video });

};

export const postEdit = async(req, res) => {
    const {id} = req.params;
    const {title, description, hashtags} = req.body;

    //const video = await Video.findById(id);
    // video object가 필요없기때문에 체크만 하면 되므로....
    const video = await Video.exists({ _id: id});

    if(!video){
        return res.render("404", { pageTitle: "Video not found" });
    }

    await Video.findByIdAndUpdate(id, {
        title, 
        description, 
        hashtags: Video.formatHashtags(hashtags),
    });
   

    return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
    return res.render("upload", {pageTitle: "Upload Video"});
};
export const postUpload = async (req, res) => {

    
    const { 
        user: {_id} 
    } = req.session;

    const { path: fileUrl } = req.file; [es6]
    const {title, description, hashtags} = req.body;

    try{
        await Video.create({
            title: title,
            description: description,
            hashtags: Video.formatHashtags(hashtags),
            fileUrl,
            owner: _id,
        });
        return res.redirect("/");
    } catch(error){
        console.log(error);
        return res.status(400).render("upload", {
            pageTitle: "Upload Video", 
            errorMessage: error._message,
        });
    }
    
};
export const deleteVideo = async (req, res) => {

    const { id } = req.params;
    await Video.findByIdAndDelete(id);

    return res.redirect("/");
}

export const search = async (req, res) => {
    const { keyword } = req.query;
    let videos = [];

    if(keyword){
        videos = await Video.find({
            title: {
                $regex: new RegExp(`${keyword}$`, "i"), 
            },

        });
        console.log(videos);
    }
    
    return res.render("search", {pageTitle: "Search", videos});
}