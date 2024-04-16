import mongoose, { Schema } from 'mongoose';

const todoSchema = new mongoose.Schema({

    name:{
        type: String,
        required: [true, 'Name is required'],
        unique: true,
    },
    description: {
        type: String,
    },
    isComplete:{
        type: Boolean,
        default: false,
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
    

});

export const TodoModel = mongoose.model('Todo', todoSchema)