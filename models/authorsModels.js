import { model, Schema } from 'mongoose'

const authorsSchema = new Schema({
    autorsName: {type: String, required: true, min: 3, max: 80},
    Nacionality: {type: String, required: false},
    birthYear: {type: Number, required: false},
    active: {type: Boolean, default: true}
},{
    timestamps: true,
    versionKey: false 
})

export default model("Authors",authorsSchema)
