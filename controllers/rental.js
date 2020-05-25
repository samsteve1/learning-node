const { validate, Rental, mongoose } = require("../models/rental");
const { Customer } = require("../models/customer");
const { Movie } = require("../models/movie");
const Fawn = require("fawn");

Fawn.init(mongoose);

const index = async (req, res) => {
  try {
    const rentals = await Rental.find().sort("-dateOut");
    let payload = {
      status: true,
      data: rentals,
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

    res.status(400).send(payload);
  }
};

const store = async (req, res) => {
  let result = validate(req.body);
  if (result.error) {
    let payload = {
      status: false,
      data: {
        code: 442,
        message: result.error.details[0].message,
      },
    };
    return res.status(422).send(payload);
  }

  const customer = await Customer.findById(req.body.customer_id);
  if (!customer) {
    let payload = {
      status: 422,
      data: {
        error: {
          code: 422,
          message: "Customer not found.",
        },
      },
    };
    return res.status(422).send(payload);
  }
  const movie = await Movie.findById(req.body.movie_id);
  if (!movie) {
    let payload = {
      status: 422,
      data: {
        error: {
          code: 422,
          message: "Movie not found.",
        },
      },
    };
    return res.status(422).send(payload);
  }
  if (movie.numberInstock === 0) {
    let payload = {
      status: false,
      data: {
        error: {
          code: 422,
          message: `Movie -${movie.title} is out of stock.`,
        },
      },
    };
    return res.status(400).send(payload);
  }
  let rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalrate: movie.dailyRentalrate,
    },
  });

  try {
    new Fawn.Task()
      .save("rentals", rental)
      .update(
        "movies",
        { _id: movie._id },
        {
          $inc: { numberInstock: -1 },
        }
      )
      .run();
    let payload = {
        status: true,
        data: rental
    }
    res.send(payload)
  } catch (ex) {
    let payload = {
      status: false,
      data: {
        code: 500,
        message: "Something went wrong.",
      },
    };
    return res.status(500).send(payload);
  }
};

exports.index = index;
exports.store = store;
