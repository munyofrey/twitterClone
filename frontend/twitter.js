const FollowToggle = require('./follow_toggle.js');

$(function () {
  let $el = $('.follow-toggle');
  let followToggle = new FollowToggle($el);
  followToggle.render();
  followToggle.handleClick();
});
