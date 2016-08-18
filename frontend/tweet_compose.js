function TweetCompose($el){
  this.$form = $el;
  this.count = 140;
  this.counter();
  this.submit();
}


TweetCompose.prototype.submit = function(){
  this.$form.on('submit', (e)=>{
    e.preventDefault();
    // console.log(this.$form);
    let serializedForm = this.$form.serializeJSON();
    $(':input').prop('disabled', true);
    // console.log("---------");
    // console.log(this.$form);
    $.ajax({
      method: 'POST',
      url: '/tweets',
      dataType: 'json',
      data: serializedForm,
      success: (message)=>{
        this.handleSuccess(message);
        // console.log(message);
      },
      error: (eMessage)=>{
        alert("Incomplete Tweet");
        $(':input').prop('disabled', false);
      }
    });
  });
};

TweetCompose.prototype.counter = function(){
  const textarea = this.$form.find('textarea');
  const label = this.$form.find('label.text-area');
  label.append($("<strong>").text(`${this.count} charaters remaining`));
  textarea.on('input',(e)=>{
    console.log(textarea.val());
    label.children().last().remove();
    label.append($("<strong>").text(`${this.count - textarea.val().length} charaters remaining`));
  });
};

TweetCompose.prototype.clearInput = function(){
  this.$form.trigger('reset');
  $(':input').prop('disabled', false);
};

TweetCompose.prototype.handleSuccess = function(message){
  let ul = $('ul#feed');
  let string = JSON.stringify(message);
  const newTweet = $('<li>').text(string);
  ul.prepend(newTweet);
  console.log(ul);
  this.clearInput();
};

module.exports = TweetCompose;
