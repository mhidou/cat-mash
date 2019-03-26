import { ReactiveAggregate } from 'meteor/jcbernack:reactive-aggregate';
import { Cats, Images } from 'meteor/catmash-collections';
import _ from 'underscore';


const cutestCats = function() {
  ReactiveAggregate(this, Cats, [
    { $match: {status: 'verified', displayNumber: {$gt: 0}}},
    { $addFields: {note: { $divide: ["$votesNumber", "$displayNumber"]}}},
    { $sort: { note: -1 }},
  ]);
}

Meteor.publish({
  cutestCats,
})
