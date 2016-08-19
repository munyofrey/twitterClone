const FollowToggle = require('./follow_toggle.js');
const UsersSearch = require('./users_search.js');
const TweetCompose = require('./tweet_compose.js');
const InfiniteTweets = require('./infinite_tweets.js');

$(function () {
  let $el = $('.follow-toggle');
  let followToggle = new FollowToggle($el);
  followToggle.render();
  followToggle.handleClick();


  let $search = $('.users-search');
  let userSearch = new UsersSearch($search);

  let $form = $('.tweet-compose');
  let tweetCompose = new TweetCompose($form);

  let $tweets = $('div.infinite-tweets');
  let tweetList = new InfiniteTweets($tweets);
});
