const mongoose = require('mongoose');

const ContentSchema = new mongoose.Schema({
    text: { type: String, required: true },
    flagged: { type: Boolean, default: false },
    label: { type: String, default: 'OK' },
    probability: { type: Number, default: 0.0 },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Content', ContentSchema);
