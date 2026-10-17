import { model, Schema} from 'mongoose'

const booksSchema = new Schema ({
    tittleBook: {type: String, required: true, min: 1, max: 120},
    isbn: {type: String, required: true, min: 10,max: 13},
    author: { type: Schema.Types.ObjetId,ref: "Authors", required: true, enum: ["novela", "cuento", "poesia", "ensayo", "tecnologia", "historia", "infantil"]},
    year: {type: Number,required: false},
    totalCopies: {type: Number, required: true},
    avaliableCopies: {type: Number},
    active: {type: Boolean, default: true}
},{
    timestamps: true,
    versionKey: false 
})

export default model("Books",booksSchema)
