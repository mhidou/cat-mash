import SimpleSchema from 'simpl-schema';

const catStatus = ['unverified', 'verified', 'deleted']

const CatSchema = new SimpleSchema({
  imageId: {
    type: String,
  },
  votesNumber: {
    type: Number,
    defaultValue: 0,
  },
  displayNumber: {
    type: Number,
    defaultValue: 0,
  },
  status: {
    type: String,
    allowedValues: catStatus,
    defaultValue: 'unverified',
  },
  createdAt: {
    type: Date,
    defaultValue: new Date(),
  }
});

export default CatSchema;
