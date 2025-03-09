const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  contentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Content'
  },
  reason: String,
  resolved: Boolean
});

module.exports = mongoose.model('Report', ReportSchema);
