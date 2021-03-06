const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: [true, "Username required."],
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            required: [true, "Email is required."],
            match: [/.+\@.+\..+/, 'Email not valid.'],
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

const User = model("User", UserSchema);

UserSchema.virtual("friendCount").get(function () {
    return this.friends.length;
});

module.exports = User;