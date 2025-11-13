const mongoose = require('mongoose');

const userSearchSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  query: {
    type: String,
    required: true
  },
  embedding: {
    type: [Number],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for better query performance
userSearchSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('UserSearch', userSearchSchema);
