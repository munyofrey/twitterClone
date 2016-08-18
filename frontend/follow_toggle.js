function FollowToggle ($el){
  this.$el = $el;
  this.userId = this.$el.data('user-id');
  this.followState = this.$el.data('initial-follow-state');
}

FollowToggle.prototype.render = function(){
  if(this.followState === 'followed'){
    this.$el.text('Unfollow')
    ;}
  else if(this.followState === 'unfollowed'){
    this.$el.text('Follow');
  } else {
    this.$el.prop('disabled', true);
  }
};

FollowToggle.prototype.handleClick = function () {

  this.$el.on('click', (e) => {
    const method = this.followState === 'followed' ? 'DELETE' : 'POST';
    let follow = this;
    this.followState = `${this.followState.slice(0, this.followState.length -2)}ing`;
    this.render();
    $.ajax(
      {
      method: method,
      url: `/users/${follow.userId}/followertgert`,
      dataType: "json",
      success: (message) =>{
        follow.switchState();
        follow.render();
      },
      error: (er) => {
        follow.followState = follow.followState === "following" ? "followed" : "unfollowed";
        follow.$el.prop('disabled', false);
        follow.render();
        console.log(er);

      }
      }
    );

  });
};

FollowToggle.prototype.switchState = function(){
  this.followState = this.followState === "following" ? "unfollowed" : "followed";
  this.$el.prop('disabled', false);
};


module.exports = FollowToggle;
