import User from "../models/User";
import bcrypt from "bcrypt";

export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });
export const postJoin = async(req, res) => {


    const {name, username, email, password, password2, location } = req.body;
    const pageTitle = "Join";

    if(password != password2){
        return res.status(400).render("join", { 
            pageTitle,
            errorMessage: "Password confirmation does not match.",
        
        });
    }
    const exists = await User.exists({$or: [{username},{email}]});
    
    if(exists){
        return res.status(400).render("join", { 
            pageTitle,
            errorMessage: "This username/email is already taken.",
        
        });
    }
    
    try{
        await User.create({
            name,
            username,
            email,
            password,
            location,
        });
        return res.redirect("/login");
    }catch(error){

       
        return res.status(400).render("join", {
            pageTitle: "login", 
            errorMessage: error._message,
        });


    };
   
   
};

export const getLogin = (req, res) => res.render("login", {pageTitle : "Login"});
export const postLogin = async(req, res) => {

    const {username, password} = req.body;
    const pageTitle = "Login";
    const user = await User.findOne({ username });
    if(!user){
        return res
            .status(400)
            .render("login", {
                pageTitle,
                errorMessage: "An account with this username dose not exists.",
            });

    };

    const ok = await bcrypt.compare(password, user.password);
    if(!ok){
        return res.status(400).render("login",{
            pageTitle,
            errorMessage: "Wrong Password",
        });

    }
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
};

export const getEdit = (req, res) => {
    return res.render("edit-profile", {pageTitle: "Edit profile"});
};

export const postEdit = async (req, res) => {
    const {
      session:{
        user: { _id, avatarUrl },
      },
      body :{name, email, username, location},
      file,
    } = req;
    console.log(file);
    const findUsername = await User.findOne({ username });
   
    const findEmail = await User.findOne({ email });
    if (
        (findUsername != null && findUsername._id != _id) ||
        (findEmail != null && findEmail._id != _id)
        ) {
        return res.render("editProfile", {
          pageTitle: "Edit  Profile",
          errorMessage: "User is exist",
        });
    }
    
    const updatedUser = await User.findByIdAndUpdate(
        _id, 
        {
            avatarUrl: file ? file.path : avatarUrl,
            name,
            email,
            username,
            location,    
        },
        {  new: true }
    );

    req.session.user = updatedUser;
    return res.redirect("/users/edit");
};
export const remove  = (req, res) =>res.send("Remove User");
export const logout  = (req, res) =>res.send("logout");

export const getChangePassword = (req, res) => {
    //깃허브 로그인시
    if (req.session.user.socialOnly == true) {
        return res.redirect("/");
    }
    return res.render("users/change-password", { pageTitle: "Change Password"});

};

export const postChangePassword = async (req, res) => {
    const {
        session: {
            user: { _id },
        },
        body: { oldPassword, newPassword, newPasswordConfirmation}, 
    } = req;
    
    const user = await User.findById(_id);
    const ok = await bcrypt.compare(oldPassword, user.password);
    
    if(!ok){
        return res.status(400).render("users/change-password",{
            pageTitle: "Change Password",
            errorMessage: "The current password is incorrect",
        });
    }
    if (newPassword !== newPasswordConfirmation){
        return res.status(400).render("users/change-password",{
            pageTitle: "Change Password",
            errorMessage: "The password does not match the conformation",
        });
    }

    
    user.password = newPassword;
    await user.save();
    return res.redirect("/users/logout");
   
};
export const see  = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    return res.render("users/profile", { pageTitle: user.name, user});

};