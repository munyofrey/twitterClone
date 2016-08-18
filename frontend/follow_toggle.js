function FollowToggle ($el){
  this.$el = $el;
  this.userId = this.$el.data('user-id');
  this.followState = this.$el.data('initial-follow-state');
}

FollowToggle.prototype.render = function(){
  if(this.followState === 'followed'){
    this.$el.text('Unfollow')
    ;}
  else{
    this.$el.text('Follow')
  ;}
};

FollowToggle.prototype.handleClick = function () {

  this.$el.on('click', (e) => {
    console.log("CLICKED");
    let $el = $(e.currentTarget);
    let method;
    if (this.followState === "followed"){
      method = "DELETE";
    } else {
      method = "POST";
    }
    let follow = this;
    console.log(follow.userId);
    $.ajax(
      {
      method: method,
      url: `/users/${follow.userId}/follow`,
      dataType: "json",
      success: (message) =>{
        follow.followState = follow.followState === "followed" ? "unfollowed" : "followed";
        follow.render();
      },
      error: (e) => {
        console.log(e);
      }
      }
    );

  });
};


module.exports = FollowToggle;
