import chai from 'chai';

import { Cats } from 'meteor/catmash-collections';
import { getTwoRandomCats, voteForCat } from './methods';

// TODO add test for getTwoRandomCats

describe('voteForCat', function () {
  it('should increment selected cat votesNumber and increment displayNumber for two cats', function () {
    const firstCatId = Cats.insert({
      imageId: 'something',
    })
    const secondCatId = Cats.insert({
      imageId: 'something',
    })

    voteForCat([firstCatId, secondCatId], firstCatId);

    const firstCat = Cats.findOne({_id: firstCatId});
    const secondCat = Cats.findOne({_id: secondCatId});

    chai.assert.equal(firstCat.votesNumber, 1);
    chai.assert.equal(firstCat.displayNumber, 1);
    chai.assert.equal(secondCat.votesNumber, 0);
    chai.assert.equal(secondCat.displayNumber, 1);
  })
})
