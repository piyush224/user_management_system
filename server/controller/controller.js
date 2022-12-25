const UserDB = require("../model/model");
var userDB = require("../model/model");


// Create and Save New User
exports.create = (req,res)=>{

    if(!req.body){
        res.status(400).send({message:"Content Can Not Be Empty"});
        return;
    }

    const user = new UserDB({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    });

    user.save(user).then(data=>{
        res.redirect("/");
    }).catch(err=>{
        res.status(500).send({
            message:err.message || 'Some error occured while creating operation'
        })
    })
}

// get all user or single user
exports.find = (req, res)=>{
    
    if(req.query.id){
        const id = req.query.id;
        UserDB.findById(id)
        .then(data=>{
            if(!data){
                res.status(404).send({
                    message:"User Not Found"
                })
            }else{
                res.send(data);
            }
        }).catch(err=>{
            res.status(500).send({
                message:err.message || 'Some error occured while find operation'
            })
        });
    }else{
        UserDB.find().then(data=>{
            res.send(data);
        }).catch(err=>{
            res.status(500).send({
                message:err.message || 'Some error occured while find operation'
            })
        })
    }
}

// update a new User
exports.update = (req,res)=>{
    if(!req.body){
        res.status(400).send({message:"Content Can Not Be Empty"});
        return;
    }

    const id = req.params.id;
    UserDB.findByIdAndUpdate(id, req.body, {useFindAndModify:false})
    .then(data=>{
        if(!data){
            res.status(404).send({
                message:`Can not update user with ${id} user id`
            })
        }
        else{
            res.send(data);
        }
        
    }).catch(err=>{
        res.status(500).send({
            message:err.message || 'Some error occured while find operation'
        })
    })
}

// delete a new User
exports.delete = (req,res)=>{
    const id = req.params.id;
    UserDB.findByIdAndDelete(id)
    .then(data=>{
        if(!data){
            res.status(404).send({
                message:`Can not delete user with ${id} user id`
            })
        }else{
            res.send("User was deleted successfully");
        }
    }).catch(err=>{
        res.status(500).send({message:"Error"})
    })
}