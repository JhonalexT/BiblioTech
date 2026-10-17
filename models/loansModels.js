import { model, Schema } from 'mongoose'

const loansSchema = new Schema({
    user: {type: Schema.Types.ObjetId, ref: "Users"},
    book: {type: Schema.Types.ObjetId, ref: "Books"},
    loanDate: {type: Date, default: Date.now},
    dueDate: {type: Date},
    returnDate: {type: Date},
    state: {type: String, enum: ["Active","Returned"], default: "Active"}
},{
    timestamps: true,
    versionKey: false 
})

export default model("Loans",loansSchema)

