import { Images } from 'meteor/catmash-collections';

import './home.html';

Template.home.helpers({
  cats() {
    return Template.instance().cats.get();
  },
  imageLink() {
    const image = Images.findOne({ _id: this.imageId });
    return image ? image.link() : '';
  }
})

Template.home.events({
  'click .rounded-cat' (e, instance) {
    e.preventDefault();
    const catId = $(e.target).data('id');
    const catIds = instance.cats.get().map(c => c._id);
    Meteor.call('voteForCat', catIds, catId, (err, res) => {
      if (!err) {
        instance.getTwoRandomCats();
      }
    })
  },
  'click .randomize' (e, instance) {
    e.preventDefault();
    instance.getTwoRandomCats();
  }
})

Template.home.onCreated(function () {
  this.cats = new ReactiveVar([]);
  this.getTwoRandomCats = () => {
    Meteor.call('getTwoRandomCats', (err, res) => {
      if (!err) {
        this.cats.set(res);
      }
    })
  }
  this.autorun(() => {
    const cats = this.cats.get();
    if (cats.length === 2) {
      this.subscribe('catImages', cats.map(c => c.imageId));
    }
  })
  this.getTwoRandomCats();
})
