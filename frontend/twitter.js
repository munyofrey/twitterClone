const FollowToggle = require('./follow_toggle.js');
const UsersSearch = require('./users_search.js');

$(function () {
  let $el = $('.follow-toggle');
  let followToggle = new FollowToggle($el);
  followToggle.render();
  followToggle.handleClick();


  let $search = $('.users-search');
  let userSearch = new UsersSearch($search);

});
