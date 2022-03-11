const { Thought, User } = require("../models");

const thoughtController = {
    //get all thoughts
    getAllThoughts(req, res) {
        Thought.find()
            .select("-__v")
            .then((dbThoughtData) => res.json(dbThoughtData))
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    getThoughtById({ params }, res) {
        Thought.findById(params.id)
            .then((dbData) => {
                if (!dbData) {
                    res
                        .status(404)
                        .json({ message: `No thought found with id ${params.id}!` });
                    return;
                }
                res.json(dbData);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    //create Thought
    createThought({ body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { username: body.username },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: "No Thought found with this id!" });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch((err) => res.json(err));
    },
    updateThought({ params, body }, res) {
        Thought.findByIdAndUpdate(params.id, body, {
            new: true,
            runValidators: true,
        })
            .then((dbData) => {
                if (!dbData) {
                    res
                        .status(404)
                        .json({ message: `No thought found with id used ${params.id}!` });
                    return;
                }
                res.json(dbData);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    deleteThought({ params }, res) {
        Thought.findByIdAndDelete(params.id)
            .then((dbData) => {
                if (!dbData) {
                    res
                        .status(404)
                        .json({ message: `No thought found with id ${params.id}!` });
                    return;
                }
                res.json({ message: "Thought deleted!" });
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },
};

module.exports = thoughtController;