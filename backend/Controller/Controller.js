const Columns = require("../Model/ColumnModel.js");


//* ---------- Cards ---------- *//

// Get Cards By Status(Column) (GET) 
exports.getCardsByColumn = async (req, res) => {
  const status = req.params.name
  try {
    const column = await Columns.findOne({ title: status })
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

// Add Card (POST) 
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

// Move Cards Between Columns (PATCH)
exports.moveCardsBetweenColumns = async (req, res) => {
  const id = req.params.id
  const { status } = req.body

  try {
    const currentColumn = await Columns.findOne({ 'cards._id': id });

    const removedCard = currentColumn.cards.find(card => card._id.toString() === id);

    currentColumn.cards.pull(id);
    await currentColumn.save();

    const newColumn = await Columns.findOneAndUpdate(
      { title: status },
      { $push: { cards: removedCard } },
      { new: true }
    );
    console.log("newColumn ", newColumn)

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
    });
  }
}

//* ---------- Column ---------- *//

// Get All Columns (GET)
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

// Add new Column (POST) 
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
