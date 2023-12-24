const db = require("../models");
const Activity = db.activities;

// Create and Save a new Activity
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create an Activity
  const activity = new Activity({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  });

  // Save Activity in the database
  activity
    .save(activity)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Activity."
      });
    });
};

// Retrieve all Activities from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  
    Activity.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving activities."
        });
      });
};

// Find a single Activity with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Activity.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Activity with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Activity with id=" + id });
      });
};

// Update an Activity by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
    
      const id = req.params.id;
    
      Activity.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update Activity with id=${id}. Maybe Activity was not found!`
            });
          } else res.send({ message: "Activity was updated successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating Activity with id=" + id
          });
        });
};

// Delete an Activity with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Activity.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Activity with id=${id}. Maybe Activity was not found!`
          });
        } else {
          res.send({
            message: "Activity was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Activity with id=" + id
        });
      });
};

// Delete all Activities from the database.
exports.deleteAll = (req, res) => {
    Activity.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Activities were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Activities."
      });
    });
};

// Find all published Activities
exports.findAllPublished = (req, res) => {
    Activity.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving activities."
      });
    });
};