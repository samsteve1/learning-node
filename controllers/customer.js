const { Customer, validate } = require("../models/customer");

const index = async (req, res) => {
  let customers = await Customer.find()
    .sort({ name: 1 })
    .select({ name: 1, phone: 1, isGold: 1 });
  let payload = {
    status: true,
    data: customers,
  };
  res.send(payload);
};

const show = async (req, res) => {
  try {
    let customer = await Customer.findById(req.params.id);
    let payload = {
      status: true,
      data: customer,
    };
    res.send(payload);
  } catch {
    let payload = {
      status: false,
      data: {
        error: {
          code: 404,
          message: `Customer with the ID ${req.params.id} not found.`,
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

  let customer = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold,
  });

  try {
    customer = await customer.save();
    let payload = {
      status: true,
      data: customer,
    };

    res.status(201).send(payload);
  } catch {
    let payload = {
      status: false,
      data: {
        error: {
          msg: "unable to create customer.",
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
    let customer = await  Customer.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          name: req.body.name,
          phone: req.body.phone,
          isGold: req.body.isGold,
        },
      },
      { new: true }
    );
    let payload = {
      status: true,
      data: customer,
    };
    res.send(payload)
  } catch {
    let payload = {
      status: false,
      data: {
        error: {
          code: 422,
          message: "Unable to update customer.",
        },
      },
    };
    res.status(422).send(payload);
  }
};

const destroy = async (req, res) => {
  let customer = await Customer.findByIdAndRemove(req.params.id);
  if (customer) {
    let payload = {
      status: true,
      data: customer,
    };
    res.send(payload);
  } else {
    let payload = {
      status: false,
      data: {
        error: {
          code: 404,
          message: `Customer with the ID ${req.params.id} not found.`,
        },
      },
    };
    res.status(404).send(payload);
  }
};

exports.index = index;
exports.show = show;
exports.update = update;
exports.store = store;
exports.destroy = destroy
