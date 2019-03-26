import '/imports/ui/'

FlowRouter.route('/', {
  action: function(params, queryParams) {
    BlazeLayout.render('mainlayout', {content: 'home'});
  }
});
FlowRouter.route('/cutestCats', {
  action: function(params, queryParams) {
    BlazeLayout.render('mainlayout', {content: 'cutestCats'});
  }
});
