export const trending = (req, res) => res.send("Home page Video");
export const see = (req, res) => {
   
    return res.send(`Watch Video #${req.params.id}`);
};
export const edit = (req, res) => {
    console.log(req.params);
    return res.send("Edit");
};
export const search = (req, res) => res.send("search");
export const upload = (req, res) => res.send("upload");
export const deleteVideo = (req, res) => {
    
    console.log(req.params);
    res.send("deleteVideo");

};
