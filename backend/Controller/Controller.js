const ToDo = require("../Model/Model.js");


//* ---------- Cards ---------- *//

// Get All Cards (GET)
exports.getAllCards = async (req, res) => {
  try {
    const cards = await ToDo.find();
    if (!cards) {
      res.status(404).json({
        error: "Cards Not Found",
      });
    }
    else {
      res.status(200).json({
        cards
      });
    }
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
  }
};


// Get Cards By Status(Column) (GET)
exports.getCardsByColumn = async (req, res) => {
  try {
    const { status } = req.body
    const cards = await ToDo.find({ status })
    if (cards.length === 0) {
      res.status(404).json({
        error: "Cards Not Found",
      });
    }
    else {
      res.status(200).json({
        cards
      })
    }
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
}


// Add Card (POST)
exports.addCard = async (req, res) => {
  const { title, description, subtasks, status } = req.body;
  try {
    await ToDo.create({
      title,
      description,
      subtasks:[
        {
          title:subtasks
        }
      ],
      status,
    });
    res.status(201).json({
      message:"Card Created successfully"
    });
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
};



// Edit Card (PATCH)
exports.editCard = async (req, res) => {
  const id = req.params.id
  const { title, description, status } = req.body;
  try {
    const updatedTask = await ToDo.findByIdAndUpdate(
      id,
      {
        title,
        description,
        status
      },
      { new: true }
    )
    res.status(200).json({
      message: "Updated successfully",
      updatedTask,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
};


// Move Cards Between Columns (PATCH)
exports.moveCardsBetweenColumns = async (req, res) => {
  const id = req.params.id
  const { status } = req.body
  try {
    const updatedTask = await ToDo.findByIdAndUpdate(
      id,
      {
        status
      },
      { new: true }
    )
    res.status(200).json({
      message: "Card moved successfully",
      updatedTask,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }

}


//* ---------- Column ---------- *//

// Get All Columns (GET)
exports.getAllColumns = async (req, res) => {
  try {
    const cards = await ToDo.find();
    if (!cards) {
      res.status(404).json({
        error: "cards Not Found",
      });
    }
    else {
      const status = cards.map((card) => card.status)
      // console.log('status ',status)
      let uniqueStatus = [...new Set(status)];
      console.log('status2 ',uniqueStatus)

      res.status(200).json({
        column: uniqueStatus
      });
    }
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
  }
};

// Add new Column (POST)
// exports.addColumn = async (req, res) => {
//   const { title, description, subtasks, status } = req.body;
//   try {
//     await ToDo.create({
//       title,
//       description,
//       subtasks,
//       status,
//     });
//     res.status(201).json("Card Created successfully");
//   } catch (error) {
//     res.status(400).json({
//       error: error.message
//     });
//   }
// };