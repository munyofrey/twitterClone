const FollowToggle = require('./follow_toggle.js');

function UsersSearch($el){
  this.$el = $el;
  this.$input = $el.find('.users-input');
  this.$ul = $el.find('.users');
  this.inputListener();
  this.val = '';
}

UsersSearch.prototype.inputListener = function(){
  let inputField = this;
  this.$input.on('input', function(e){
    inputField.handleInput();
  });

};

UsersSearch.prototype.handleInput = function () {
  const search = this;
  console.log(this.$input.val());
  $.ajax({
    method: 'GET',
    url: '/users/search',
    dataType: 'json',
    data: this.$input.serialize(),
    success: (message) => {
      this.render(message);
      console.log('success!');
    }
  });
};

UsersSearch.prototype.render = function(users) {
  this.$ul.children().remove();
  users.forEach( (user) =>{
    let list = $('<li>');
    let link = $('<a>').text(user.username).attr('href', `/users/${user.id}`);
    const button = $('<button>').addClass('follow-toggle').
      attr('data-user-id', user.id).
      attr('data-initial-follow-state', user.followed ? 'followed' : 'unfollowed');
    const followOpt = new FollowToggle(button);
    followOpt.render();
    followOpt.handleClick();
    list.append(link);
    list.append(button);
    this.$ul.append(list);
  });
};

module.exports = UsersSearch;
