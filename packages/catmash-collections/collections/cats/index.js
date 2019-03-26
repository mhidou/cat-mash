import CatSchema from './schema';

const Cats = new Meteor.Collection('cats');

Cats.attachSchema(CatSchema);

export { Cats }
