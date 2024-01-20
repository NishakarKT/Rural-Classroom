import { Question, Response } from "../models.js";

export const get_test = async (req, res) => {
  try {
    // identify user
    const user = req.user;
    // check if user exists
    if (!user) {
      res.status(401);
      throw new Error("unauthorized");
    } else {
      // get attendances
      const { testId } = req.query;
      if (testId) {
        // calculate marks
        const questions = await Question.find({}, { question: 1, answer: 1 });
        const responses = await Response.find({ test: testId });
        const marks = {};
        responses.forEach((response) => {
          if (!marks[response.student]) marks[response.student] = 0;
          marks[response.student] += response.response === questions.find((q) => q._id.toString() === response.question)?.answer;
        });
        const data = { marks };
        res.status(200).send({ data, message: "analytics found" });
      } else res.status(404).send({ message: "analytics not found" });
    }
  } catch (err) {
    if (res.statusCode < 400) res.status(500);
    res.send({ message: err.message || "something went wrong" });
  }
};
