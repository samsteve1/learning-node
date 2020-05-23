let generes = require("../data");
let Joi = require("@hapi/joi");

const index = (req, res) => {
  let payload = {
    status: true,
    data: generes.data,
  };
  res.send(payload);
};
const show = (req, res) => {
  let genere = generes.data.find((g) => g.id === parseInt(req.params.id));
  if (!genere) {
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
  let payload = {
    status: true,
    data: genere,
  };
  res.status(200).send(payload);
};

const store = (req, res) => {
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
  let genere = {
    id: generes.data.length + 1,
    name: req.body.name,
  };
  generes.data.push(genere);
  let payload = {
    status: true,
    data: genere,
  };
  res.status(201).send(payload);
};

const uppdate = (req, res) => {
  let genere = generes.data.find((g) => g.id === parseInt(req.params.id));
  if (!genere) {
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
  genere.name = req.body.name;
  let payload = {
    status: true,
    data: genere,
  };
  res.send(payload);
};

const destroy = (req, res) => {
  let genere = generes.data.find((g) => g.id === parseInt(req.params.id));
  if (!genere) {
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

  generes.data = generes.data.filter((g) => g.id !== genere.id);

  let payload = {
    status: true,
    message: `Genere ${genere.name} deleted!`,
  };

  res.status(200).send(payload);
};

function validate(genere) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(genere);
}
module.exports.index = index;
module.exports.show = show;
module.exports.store = store;
module.exports.update = uppdate;
module.exports.destory = destroy;
