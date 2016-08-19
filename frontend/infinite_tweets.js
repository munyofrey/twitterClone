// let _=require('underscore');

function InfiniteTweets($div){
  this.maxCreated = null;
  this.$div = $div;
  this.$script = $('.script-infinite-tweets');
  this.fetchTweets();
  this.$div.find('.fetch-more').click(this.fetchTweets.bind(this));
  this.$ul = this.$div.find('ul#feed');
}

InfiniteTweets.prototype.fetchTweets = function(e){
  let data = '';
  if (this.maxCreated !== null){ data = {'max_created_at':`${this.maxCreated}`};}
  // debugger;
  $.ajax({
    method: 'GET',
    url: '/feed',
    dataType: 'json',
    data: data,
    success: (message) =>{
      this.render(message);
    }

  });
};

InfiniteTweets.prototype.render = function(message){
  message.forEach( (el) =>{
    let tweet = $('<li>');
    tweet.append(JSON.stringify(el));
    this.$ul.append(tweet);
  });
  this.maxCreated = message[message.length - 1].created_at;
  if (message.length < 20){
    this.$div.find('.fetch-more').remove();
    this.$div.append($('<h3>').text('No more tweets to fetch!'));
  }
};

InfiniteTweets.prototype.renderNew = function(message2){
  let templateCode = this.$script.html();
  let templateFn = _.template(templateCode);
  console.log(templateFn);
  let renderedContent = templateFn({
    tweets: message2
  });

  this.$div.append(renderedContent);
};

module.exports = InfiniteTweets;
