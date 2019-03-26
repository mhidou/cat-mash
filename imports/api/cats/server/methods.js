import { ReactiveAggregate } from 'meteor/jcbernack:reactive-aggregate';
import { Cats, Images } from 'meteor/catmash-collections';
import _ from 'underscore';

/**
 * Get two cats randomly
 * @return {Array} An array of two cats
 */

const getTwoRandomCats = () => {
  const pipeline = [{ $sample: { size: 2 } }]
  return Promise.await(Cats.rawCollection().aggregate(pipeline).toArray());
}

/**
 * Votes for a cat
 * @param  {Array catIds An array of cat ids
 * @param  {String} catId The id of cat concerned by vote
 */

const voteForCat = (catIds, catId) => {
  const voteIndex = _.indexOf(catIds, catId)
  if (catIds.length === 2 && voteIndex >= 0) {
    const catsCount = Cats.find({ _id: { $in: catIds }}).count()
    if (catsCount === 2) {
      const result = Cats.update({ _id: catId }, { $inc: { votesNumber: 1 }});
      return Cats.update({ _id: { $in: catIds } }, { $inc: { displayNumber: 1 }}, { multi: true });
    }
  }
}

Meteor.methods({
  getTwoRandomCats,
  voteForCat
})

export { getTwoRandomCats, voteForCat };
