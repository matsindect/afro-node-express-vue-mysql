const User = require('../models/userModel');

exports.createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).send({
      status: 'success',
      data: {
        user: newUser
      }
    });
  } catch (err) {
    res.status(400).send({
      status: 'Fail',
      massage: err
    });
  }
};
exports.getUsers = async (req, res) => {
  try {
    // BUILD THE QUERY
    // Excluding some keys from the search query
    const queryObject = { ...req.query };
    const removeFields = ['page', 'sort', 'limit', 'fields'];
    removeFields.forEach(field => delete queryObject[field]);

    //Advanced filtering
    let regStr = JSON.stringify(queryObject);
    regStr = regStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

    let query = User.find(JSON.parse(regStr));

    //Sort the query
    if (req.query.sort) {
      //sort(filed1, field2..)
      const sortBy = req.query.sort.split(',').join('');
      query = query.sort(sortBy);
    }

    //EXECUTE A QUERY
    const users = await query;

    res.status(200).send({
      status: 'Success',
      results: users.length,
      data: {
        users
      }
    });
  } catch (err) {
    res.status(400).send({
      status: 'Failed',
      message: err
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    // const user = await User.findOne({user_name: req.params.user_name});
    res.status(200).send({
      status: 'Success',
      data: {
        user
      }
    });
  } catch (err) {
    res.status(400).send({
      status: 'Failed',
      message: err
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    // const user = await User.findOneAndDelete({user_name: req.params.user_name});
    res.status(204).send({
      status: 'Success',
      data: null
    });
  } catch (err) {
    res.status(400).send({
      status: 'Failed',
      message: err
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    // const user = await User.findOne({user_name: req.params.user_name});
    res.status(200).send({
      status: 'Success',
      data: {
        user
      }
    });
  } catch (err) {
    res.status(400).send({
      status: 'Failed',
      message: err
    });
  }
};
