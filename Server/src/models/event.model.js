const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const eventSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Organization',
      required: true,
    },
    cssSettings: {
      tabletContainer: {
        width: String,
        paddingTop: String,
        position: String,
        background: String,
        borderRadius: String,
        boxShadow: String,
        overflow: String,
      },
      tabletBackground: {
        position: String,
        top: String,
        left: String,
        height: String,
        width: String,
        backgroundSize: String,
        backgroundPosition: String,
        backgroundRepeat: String,
        backgroundImage: String,
      },
      scanner: {
        width: String,
        height: String,
        position: String,
        top: String,
        left: String,
        border: String,
        borderRadius: String,
        overflow: String,
      },
    },
    participants: [],
    present: [],
  },
  {
    timestamps: true,
  }
);

// Add plugins for toJSON and pagination
eventSchema.plugin(toJSON);
eventSchema.plugin(paginate);

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
