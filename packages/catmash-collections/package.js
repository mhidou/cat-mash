Package.describe({
  name: 'catmash-collections',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Npm.depends({
  'simpl-schema': '1.5.5',
});

Package.onUse(function(api) {
  api.versionsFrom('1.8.0.2');
  api.use([
    'ecmascript',
    'aldeed:collection2@3.0.2',
    'ostrio:files@1.10.2',
  ]);
  api.mainModule('catmash-collections.js');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('catmash-collections');
  api.mainModule('catmash-collections-tests.js');
});
