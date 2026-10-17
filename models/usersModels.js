import { model, Schema } from 'mongoose'

const usersSchema = new Schema ({
    usersName: {type: String, required: true, min: 3, max: 60},
    email: {type: String, required: true},
    password: {type: String, required: true, min: 6},
    role: {type: String, enum:["USER","ADMIN"], default: "USER"},
    active: {type: Boolean, default: true}
},{
    timestamps: true,
    versionKey: false 
})

export default model("Users",usersSchema)