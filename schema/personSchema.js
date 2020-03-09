var addPersonSchema = {
    body:{
        type:'object',
        required:['name','relation','contactNo','addresssLine1','city','state'],
        properties:{
            businessName:{
                "type":"string"
            },
            name:{
                "type":"string",
                "minLength":1
            },
            relation:{
                "type":"string",
                "minLength":1
            },
            gstNo:{
                "type":"string"
            },
            contactNo:{
                "type":"string",
                "minLength":1
            },
            email:{
                "type":"string",
                "format":"email"
            },
            addresssLine1:{
                "type":"string",
                minLength:1
            },
            addressLine2:{
                "type":"string"
            },
            city:{
                "type":"string",
                "minLength":1
            },
            state:{
                "type":"string",
                "minLength":1
            }
        }
    }
};

module.exports = {
    addPersonSchema
}