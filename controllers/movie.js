const { Movie, validate } = require("../models/movie");
const { Genere } = require("../models/genere");

const index = async (req, res) => {
  let movies = await Movie.find()
    .sort({ title: 1 })
    .select("title numberInstock dailyRentalrate genere");
  let payload = {
    status: true,
    data: movies,
  };
  res.send(payload);
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
  try {
    const genere = await Genere.findById(req.body.genere_id);
    if (!genere) {
      let payload = {
        status: false,
        data: {
          error: {
            code: 422,
            message: "Genere is invalid",
          },
        },
      };

      return res.status(422).send(payload);
    }
    let movie = new Movie({
      title: req.body.title,
      genere: { _id: genere._id, name: genere.name },
      numberInstock: req.body.numberInstock,
      dailyRentalrate: req.body.dailyRentalrate,
    });
    movie = await movie.save();
    let payload = {
      status: true,
      data: movie,
    };
    res.send(payload);
  } catch (ex) {
    let payload = {
      status: false,
      data: {
        error: {
          code: 422,
          message: ex.message,
        },
      },
    };

    res.status(422).send(payload);
  }
};

const update = async (req, res) => {
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
    const genere = await Genere.findById(req.body.genere_id);
    if (!genere) {
      let payload = {
        status: false,
        data: {
          error: {
            code: 422,
            message: "Genere is invalid",
          },
        },
      };

      return res.status(422).send(payload);
    }

    let movie = await Movie.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title,
          numberInstock: req.body.numberInstock,
          dailyRentalrate: req.body.dailyRentalrate,
          genere: {
            _id: genere._id,
            name: genere.name,
          },
        },
      },
      { new: true }
    );
    let payload = {
      status: true,
      data: movie,
    };
    res.send(payload);
  } catch (ex) {
    let payload = {
      status: false,
      data: {
        error: {
          code: 400,
          message: ex.message,
        },
      },
    };
    return res.status(400).send(payload);
  }
};

const show = async (req, res) => {
  try {
    let movie = await Movie.findById(req.params.id).select(
      "title numberInstock dailyRentalrate genere"
    );
    let payload = {
      status: true,
      data: movie,
    };
    res.send(movie);
  } catch {
    let payload = {
      status: false,
      data: {
        error: {
          code: 404,
          message: `Movie with the ID ${req.params.id} not found.`,
        },
      },
    };
    res.status(404).send(payload);
  }
};

const destroy = async (req, res) => {
  try {
    let movie = await Movie.findByIdAndRemove(req.params.id);
    let payload = {
      status: true,
      data: movie,
    };
    res.send(payload);
  } catch {
    let payload = {
      status: false,
      data: {
        error: {
          code: 404,
          message: `The movie with the ID ${req.params.id} not found.`,
        },
      },
    };
    res.status(404).send(payload);
  }
};

exports.index = index;
exports.store = store;
exports.update = update;
exports.show = show;
exports.destroy = destroy;
