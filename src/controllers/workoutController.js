// In src/controllers/workoutController.js
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const getAllWorkouts = (req, res) => {
  res.send(req.body);
};

const getOneWorkout = (req, res) => {
  res.send(req.param("workoutId"));
};

const createNewWorkout = (req, res) => {
  res.send({
    "name": req.body.Name,
    "Age": 20
  });
};

const updateOneWorkout = (req, res) => {
  res.send("Update an existing workout");
};

const deleteOneWorkout = (req, res) => {
  res.send("Delete an existing workout");
};

module.exports = {
  getAllWorkouts,
  getOneWorkout,
  createNewWorkout,
  updateOneWorkout,
  deleteOneWorkout,
};