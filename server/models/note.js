import mongoose from "mongoose";

// note schema defined 

const noteSchema = new mongoose.Schema(
    {
        title: { 
            type: String,
            required: true,
            trim: true,
        },

        content: { 
            type: String,
            required: true,
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },


        category: {
            type: String,
            default: "General",
        },

        topic: {
            type: String,
            default: "Miscellaneous",
        },

        difficulty: {
            type: String,
            enum: ["Easy", "Medium", "Hard"],
            default: "Medium",
        },

        tags: [
            {
                type: String,
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Note = mongoose.model("Note", noteSchema); // create Note model

export default Note; // export note model