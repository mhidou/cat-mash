import VoteSchema from './schema';

const Votes = new Meteor.Collection('votes');

Votes.attachSchema(VoteSchema);

export { Votes }
