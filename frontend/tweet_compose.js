function TweetCompose($el){
  this.$form = $el;
  this.label = $el.find('label.text-area');
  this.count = 140;
  this.counter();
  this.$form.submit(this.submit.bind(this));
}


TweetCompose.prototype.submit = function(e){
    e.preventDefault();
    debugger
    let serializedForm = this.$form.serializeJSON();
    $(':input').prop('disabled', true);
    $.ajax({
      method: 'POST',
      url: '/tweets',
      dataType: 'json',
      data: serializedForm,
      success: (message)=>{
        this.handleSuccess(message);
      },
      error: (eMessage)=>{
        alert("Incomplete Tweet");
        $(':input').prop('disabled', false);
      }
    });
};

TweetCompose.prototype.counter = function(){
  const textarea = this.$form.find('textarea');
  this.label.append($("<strong>").text(`${this.count} charaters remaining`));
  textarea.on('input',(e)=>{
    this.label.children().last().remove();
    this.label.append($("<strong>").text(`${this.count - textarea.val().length} charaters remaining`));
  });
};

TweetCompose.prototype.clearInput = function(){
  this.$form.trigger('reset');
  $(':input').prop('disabled', false);
};

TweetCompose.prototype.handleSuccess = function(message){

  this.label.children().last().remove();
  this.label.append($("<strong>").text(`${this.count} charaters remaining`));


  let ul = $('ul#feed');
  let string = JSON.stringify(message);
  const newTweet = $('<li>').text(string);
  ul.prepend(newTweet);
  this.clearInput();
};

module.exports = TweetCompose;
