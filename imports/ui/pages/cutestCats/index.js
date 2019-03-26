import { Cats, Images } from 'meteor/catmash-collections';

import './cutestCats.html';

Template.cutestCats.helpers({
  cats() {
    return Cats.find({}, {sort: {note: -1, votesNumber: -1}});
  },
  imageLink() {
    const image = Images.findOne({ _id: this.imageId });
    return image ? image.link() : '';
  },
  percent() {
    return `${Math.round(this.note*100)}%`
  }
})

Template.cutestCats.events({
})

Template.cutestCats.onCreated(function () {
  this.subscribe('cutestCats');
  this.autorun(() => {
    const cats = Cats.find({});
    if (cats.count() > 0) {
      this.subscribe('catImages', cats.map(c => c.imageId));
    }
  })
})
