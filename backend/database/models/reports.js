const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
    reportedContent: { type: mongoose.Schema.Types.ObjectId, ref: 'Content' },
    reason: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'Reviewed'], default: 'Pending' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Report', ReportSchema);
