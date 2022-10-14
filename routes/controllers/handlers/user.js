const bcrypt = require('bcrypt');
const jwt  = require('jsonwebtoken');
require('dotenv').config()
const saltRounds = 10;

// const getUserHandler = (req , reply) => {
//     const users = fastify.mongo.db.collection('users');    
//     users.findOne({ username: req.params.username }, (err, user) => {
//         if (err) {
//             reply.send(err);
//         } else {
//             reply.send(user);
//         }
//     });
// }

async function getUserHandler(req , reply) {
    const users = this.mongo.db.collection('users');
    const { username } = req.query;
    // reply.send(username+"hey");
    const user = await users.findOne({ username: username });
    // way `1
    // const result = [{
    //     username : user.username,
    //     name : user.name,
    //     email : user.email
    // }]

    // way `2
    const result = [user]

    // let result = [].push(user);
    return reply.send(result);
}

// const addUserHandler = ()
// const addUserHandler = (req , reply) => {
//     const users = fastify.mongo.db.collection('users');    
//     const { username , name , email , password } = req.body;
//     bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
//         // let user = new User(username, name, email, hash);
//         const result = users.insertOne({ username, name, email, hash }); 
//         reply.send(result);
//     });
// }

async function addUserHandler(req , reply) {
    const users = this.mongo.db.collection('users');
    const { username , name , email , pass } = req.body;
    const password = await bcrypt.hash(pass, saltRounds);
    const result = await users.insertOne({ username, name, email,password });
    const token = jwt.sign({ username: username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    reply.code(201).send({token});
}

async function updateUserHandler(req , reply) {
    const users = this.mongo.db.collection('users');

    const { username } = req.query;

    const updateUser = {
        $set : {
        }
    };

    if('name' in req.body){
        updateUser.$set.name = req.body.name;
    }
    if('email' in req.body){
        updateUser.$set.email = req.body.email;
    }
    if('bio' in req.body){
        updateUser.$set.bio = req.body.bio;
    }

    const result = await users.updateOne({ username: username }, updateUser);
    reply.code(201).send("updated");
}

async function deleteUserHandler(req , reply) {
    const users = this.mongo.db.collection('users');
    const { username } = req.query;
    const result = await users.deleteOne({ username: username });
    reply.code(201).send("deleted");
}

async function loginUserHandler (req, reply) {
    const users = this.mongo.db.collection('users');
    const { username, pass } = req.body;
    const user = await users.findOne({ username: username });
    if (user) {
        const result = await bcrypt.compare(pass, user.password);
        if (result) {
            const token = jwt.sign({ username: username }, process.env.JWT_SECRET, { expiresIn: '1h' });
            reply.send({ token });
        } else {
            reply.send("Wrong password");
        }
    }
}
module.exports = { getUserHandler , addUserHandler , updateUserHandler , deleteUserHandler , loginUserHandler };