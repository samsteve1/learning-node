const { validate, Genere } = require("../models/genere");

const index = async (req, res) => {
  let generes = await Genere.find().sort({ name: 1 }).select({ name: 1 });
  let payload = {
    status: true,
    data: generes,
  };
  res.send(payload);
};
const show = async (req, res) => {
  try {
    let genere = await Genere.findById(req.params.id);
    let payload = {
      status: true,
      data: genere,
    };
    res.send(payload);
  } catch {
    let payload = {
      status: false,
      data: {
        error: {
          code: 404,
          message: `Genere with the ID ${req.params.id} not found.`,
        },
      },
    };
    res.status(404).send(payload);
    return;
  }
};

const store = async (req, res) => {
  let result = validate(req.body);

  if (result.error) {
    let error = {
      status: false,
      data: {
        error: {
          code: 422,
          message: result.error.details[0].message,
        },
      },
    };
    return res.status(422).send(error);
  }
  let genere = new Genere({ name: req.body.name });
  try {
    genere = await genere.save();
    let payload = {
      status: true,
      data: genere,
    };
    res.status(201).send(payload);
  } catch (ex) {
    let payload = {
      status: false,
      data: {
        error: {
          msg: "unable to create genere.",
        },
      },
    };
    res.status(422).send(payload);
  }
};

const uppdate = async (req, res) => {
  let result = validate(req.body);
  if (result.error) {
    let error = {
      status: false,
      data: {
        error: {
          code: 422,
          message: result.error.details[0].message,
        },
      },
    };
    return res.status(422).send(error);
  }
  try {
    let genere = await Genere.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          name: req.body.name,
        },
      },
      { new: true }
    );
    let payload = {
      status: true,
      data: genere,
    };
    res.send(payload);
  } catch (ex) {
    let payload = {
      status: false,
      data: {
        error: {
          msg: `${ex.message}`,
        },
      },
    };
    res.status(400).send(payload);
  }
};

const destroy = async (req, res) => {
  let genere = await Genere.findByIdAndRemove(req.params.id);
  if (genere) {
    let payload = {
      status: true,
      data: genere,
    };
    res.status(200).send(payload);
    return;
  } else {
    let payload = {
      status: false,
      data: {
        error: {
          code: 404,
          message: `Genere with the ID ${req.params.id} not found.`,
        },
      },
    };
    res.status(404).send(payload);
    return;
  }
};

module.exports.index = index;
module.exports.show = show;
module.exports.store = store;
module.exports.update = uppdate;
module.exports.destory = destroy;
