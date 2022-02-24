import {Schema, model, models} from 'mongoose';



const accountSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true,
        trim: true,
        maxlength: [20, 'Name is very long please abbreviate']
    }
},
{
    timestamps: true,
    versionKey: false,
});

export default models.Account || model('Account', accountSchema);