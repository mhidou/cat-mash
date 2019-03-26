import fs from 'fs';
import { URL } from 'url';
import request from 'request';
import _ from 'underscore';

import { Cats, Images } from 'meteor/catmash-collections';

Cats.remove({});
Images.remove({});

/**
 * Insert a cat into database
 * @param  String catImgPath Cat image path
 */

const insertCat = (catImgPath) => {
  fs.readFile(`/tmp${catImgPath}`, function (error, data) {
  if (error) {
    throw error;
  } else {
    Images.write(data, {
      fileName: catImgPath.split('/')[1],
    }, (writeError, fileRef) => {
      if (writeError) {
        throw writeError;
      } else {
        Cats.insert({ imageId: fileRef._id, status: 'verified'});
      }
    });
  }
});
}

/**
 * download an image from an url
 * @param  Object cat An object containing cat data, url and id
 */
const downloadImage = ({ url }) => {
  let imageUrl;
  try {
    imageUrl = new URL(url);
  } catch (e) {
    console.error(`${url} is not a valid url - reason: ${e.message}`);
  } finally {
    if (imageUrl instanceof URL) {
      const { hostname, port, protocol, pathname, href } = imageUrl;
      if (protocol.includes('http')) {
        request(href).pipe(fs.createWriteStream(`/tmp${pathname}`)).on('close', () => {
          insertCat(pathname);
        });
      } else {
        console.error(`Bad url protocol - ${protocol}`);
      }
    }
  }
}

// If there is no cats in our database
if (Cats.find({}).count() === 0) {
  const catsUrl = 'https://latelier.co/data/cats.json';
  request(catsUrl, (err, res, body) => {
    var response = JSON.parse(body);
    _.each(response.images, downloadImage)
  })
}
