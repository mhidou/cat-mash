import { Images } from 'meteor/catmash-collections';

const catImages = (ids) => {
  if (ids.length > 0) {
    return Images.collection.find({ _id: { $in: ids }})
  }
}

Meteor.publish({
  catImages,
});
