export const getJoin = (req, res) => res.render("join", { PageTitle: "Join" });
export const postJoin = (req, res) => {

    console.log(req.body);
    res.end();
    
};

export const login = (req, res) => res.send("login");
export const edit = (req, res) => res.send("Edit User");
export const remove  = (req, res) =>res.send("Remove User");
