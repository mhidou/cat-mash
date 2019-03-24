// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by catmash-collections.js.
import { name as packageName } from "meteor/catmash-collections";

// Write your tests here!
// Here is an example.
Tinytest.add('catmash-collections - example', function (test) {
  test.equal(packageName, "catmash-collections");
});
