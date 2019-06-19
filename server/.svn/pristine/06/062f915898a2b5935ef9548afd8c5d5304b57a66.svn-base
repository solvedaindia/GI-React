const mongoose = require('mongoose');
const { Schema } = mongoose;
const UserSchema = new Schema({
  consumer_id: {
    type: String,
    required: false,
  },
  user_id: {
    type: String,
    required: false,
  },
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  wc_token: {
    type: String,
    required: false,
  },
  wc_trusted_token: {
    type: String,
    required: false,
  },
  access_token: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    required: false,
  },
  updatedAt: {
    type: Date,
    required: false,
  }

});

UserSchema.methods.toJSON = function () {
  return {
    _id: this._id,
    consumer_id: this.consumer_id,
    user_id: this.user_id,
    firstName: this.firstName,
    lastName: this.lastName,
    wc_token: this.wc_token,
    wc_trusted_token: this.wc_trusted_token,
    createdAt: this.createdAt,
  };
};

module.exports = mongoose.model('Users', UserSchema);
