const mongoose = require('mongoose');

const UrlSchema = mongoose.Schema({
  url: {
    type: String,
    require: true
  },
  short_url: {
    type: String,
    unique: true
  },
  count: {
    type: Number,
    default: 0
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Url', UrlSchema);