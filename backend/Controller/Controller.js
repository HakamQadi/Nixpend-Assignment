const ToDo = require("../Model/CardsModel.js");
const Columns = require("../Model/ColumnModel.js");


//* ---------- Cards ---------- *//

// Get All Cards (GET)
// exports.getAllCards = async (req, res) => {
//   try {
//     const cards = await ToDo.find();
//     if (!cards) {
//       res.status(404).json({
//         error: "Cards Not Found",
//       });
//     }
//     else {
//       res.status(200).json({
//         cards
//       });
//     }
//   } catch (error) {
//     res.status(404).json({
//       error: error.message,
//     });
//   }
// };
// exports.getAllCards = async (req, res) => {
//   try {
//     const cards = await ToDo.find();
//     if (!cards) {
//       res.status(404).json({
//         error: "Cards Not Found",
//       });
//     }
//     else {
//       res.status(200).json({
//         cards
//       });
//     }
//   } catch (error) {
//     res.status(404).json({
//       error: error.message,
//     });
//   }
// };


// Get Cards By Status(Column) (GET) Done
exports.getCardsByColumn = async (req, res) => {
  const status = req.params.name
  try {
    const column = await Columns.findOne({ title: status })
    // console.log("column ", column)

    res.status(200).json({
      cards:column.cards,
      title:column.title  

    })


  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
}


// Add Card (POST) Done
exports.addCard = async (req, res) => {
  const { title, description, subtasks, status } = req.body;
  const transformedSubtasks = subtasks.map(subtask => ({ title: subtask }));

  const card = {
    title,
    description,
    subtasks: transformedSubtasks,
    status,
  }
  try {
    const column = await Columns.findOneAndUpdate(
      { title: card.status },
      {
        $push: { cards: card }
      },
      { new: true }
    )
    res.status(201).json({
      message: "Card Created successfully"
    });
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
};



// Edit Card (PATCH)
  // exports.editCard = async (req, res) => {
  //   const id = req.params.id
  //   const { title, description, status } = req.body;
  //   try {
  //     const updatedTask = await ToDo.findByIdAndUpdate(
  //       id,
  //       {
  //         title,
  //         description,
  //         status
  //       },
  //       { new: true }
  //     )
  //     res.status(200).json({
  //       message: "Updated successfully",
  //       updatedTask,
  //     });
  //   } catch (error) {
  //     res.status(400).json({
  //       error: error.message
  //     });
  //   }
  // };


// Move Cards Between Columns (PATCH) Done
exports.moveCardsBetweenColumns = async (req, res) => {
  const id = req.params.id
  const { status } = req.body

  try {
    // Step 1: Find the card you want to remove from its current column
    const currentColumn = await Columns.findOne({ 'cards._id': id });

    // Step 2: Store the card data in a variable
    const removedCard = currentColumn.cards.find(card => card._id.toString() === id);
    console.log("removedCard ", removedCard)

    // Step 3: Remove the card from its current column
    currentColumn.cards.pull(id);
    await currentColumn.save();

    // Step 4: Find the target column where you want to move the card
    const newColumn = await Columns.findOneAndUpdate(
      { title: status },
      { $push: { cards: removedCard } },
      { new: true }
    );
    console.log("newColumn ", newColumn)

    // Step 5: Push the stored card data into the target column's cards array
    newColumn.updateOne(
      { title: status },
      { $push: { cards: { removedCard } } }
    )
    await newColumn.save();

    res.status(200).json({
      message: "Card moved successfully",
    });

  } catch (error) {
    res.status(404).json({
      error: error
      // updatedTask,
    });
  }
}


//* ---------- Column ---------- *//

// Get All Columns (GET) Done
exports.getAllColumns = async (req, res) => {
  const { title } = req.body
  try {
    const columns = await Columns.find();
    if (!columns) {
      res.status(404).json({
        error: "columns Not Found",
      });
    }
    else {
      res.status(200).json({
        columns
      });
    }
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
  }
};

// Add new Column (POST) Done
exports.addColumn = async (req, res) => {
  const { title } = req.body;
  try {
    await Columns.create({
      title,

    });
    res.status(201).json("Column Created successfully");
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
};



// {
//   // Define the updated values
//   const updatedCardValues = {
//     'cards.$.title': 'New Title', // Update the card's title
//     'cards.$.des': 'New Description', // Update the card's description
//     'cards.$.subtask.0.title': 'New Subtask Title', // Update the title of the first subtask
//   };

//   // Update the specific card within a specific column
//   Column.updateOne(
//     {
//       title: 'Your Column Title', // Match the specific column
//       'cards._id': 'Your Card ID', // Match the specific card using its _id
//     },
//     { $set: updatedCardValues },
//     (err, result) => {
//       if (err) {
//         console.error('Error updating card:', err);
//       } else {
//         console.log('Card updated successfully:', result);
//       }
//     }
//   );

// }