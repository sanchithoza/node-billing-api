//validating request body on login request
const loginSchema = {
    body: {
        type: 'object',
        required: ['userName', 'password'],
        properties: {
            userName: {
                "type": "string"

            },
            password: {
                "type": "string",
                "minLength": 5
            }
        }
    }
}
const signupSchema = {
    body: {
        type: 'object',
        required: ['fullName', 'userName', 'password', 'role', 'access'],
        properties: {
            fullName: {
                "type": "string",
            },
            userName: {
                "type": "string",
            },
            password: {
                "type": "string",
                "minLength": 5
            },
            role: {
                "type": "string",
            },
            access: {
                "type": "string",
            }
        }
    }
}
updateUserSchema = {
    body: {
        type:'object',
        properties:{
            fullName: {
                "type": "string",
            },
            userName: {
                "type": "string",
            },
            password: {
                "type": "string",
                "minLength": 5
            },
            role: {
                "type": "string",
            },
            access: {
                "type": "string",
            }
        }
    },
    params: {
        type: 'object',
        properties: {
            id: { type: 'string' },

        }
    }
}
module.exports = {
    loginSchema,
    signupSchema,
    updateUserSchema
}