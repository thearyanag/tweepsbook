const typeString = {
    type : 'string'
}

const headerSchema = {
    type: 'object',
    required: ['token'],
    properties: {
      token: typeString,
    },
  };

const getUserSchema = {
    response : {
        200 : {
            type : 'array',
            items : {
                type : 'object',
                properties : {
                    username : { type : 'string' },
                    name : { type : 'string' },
                    email : { type : 'string' , format : 'email' },
                }
            }
        }
    }
}


// const updateUserSchema = {
//     response : {
//         201 : {
//             type : 'string'
//         }
//     },
//     body : {
//         type : 'object',
//         properties : {
//             name : typeString,
//             email : { type : 'string' , format : 'email' },
//             bio : typeString
//         }
//     },
//     querystring : {
//         username : typeString
//     }
// }

const updateUserSchema = {
    headers : headerSchema,
    response : {
        201 : {
            type : 'array',
            items : {
                type : 'object',
                properties : {
                    username : { type : 'string' },
                    name : { type : 'string' },
                    email : { type : 'string' , format : 'email' },
                    bio : { type : 'string' }
                }
            }
        }
    },
}

const addUserSchema = {
    // We use body as a property to tell Fastify what to expect from the request body of our post route
    body : {
        type : 'object',
        required : ['username' , 'name' , 'email' , 'pass'],
        properties : {
            username : typeString,
            name : typeString,
            email : typeString,
            pass : typeString
        }
    },
    response : {
        200 : {
            type : 'object',
            properties : {
                token : typeString
            }
        }
    }
}

const loginUserSchema = {
    body : {
        type : 'object',
        required : ['username' , 'password'],
        properties : {
            username : typeString,
            password : typeString
        }
    },
    response : {
        200 : {
            type : 'object',
            properties : {
                token : typeString
            }
        }
    }
}



module.exports = { getUserSchema , addUserSchema , updateUserSchema , loginUserSchema};