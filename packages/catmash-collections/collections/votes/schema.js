import SimpleSchema from 'simpl-schema';

const catStatus = ['unverified', 'verified', 'deleted']

const VoteSchema = new SimpleSchema({
  catId: {
    type: String,
  },
  value: {
    type: Number,
    allowedValues: [-1, 1],
  },
});

export default VoteSchema;
