$( document ).ready(function() {
  const textArea = document.getElementById("tweet-text");
  textArea.addEventListener("input", function(e) {
    const maxLength = 140;
    
    const currentLength = e.currentTarget.value.length;

    const counter = maxLength - currentLength;

    $( this ).parents().find('.counter').val(function() {
      if (counter < 0) $( this ).css("color", "red");
      return counter;
    });

    // console.log(counter);

  //   console.log(e);
  //   console.log(e.currentTarget);
  //   console.log(e.currentTarget.value);
  //   console.log(e.currentTarget.value.length);
  //   console.log(this);
  })
});