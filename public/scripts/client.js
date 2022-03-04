/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$( document ).ready(function() {
  const createTweetElement = function(tweet) {
    const $tweet = $(`
    <article class="tweet">
      <header>
        <img src="${tweet.user.avatars}" alt="pfp">
        <span>${tweet.user.name}</span>
        <span>${tweet.user.handle}</span>
      </header>
      <p>${tweet.content.text}</p>
      <footer>
        <span>${timeago.format(tweet.created_at)}</span>
        <ul>
          <li><i class="fa-solid fa-flag"></i></li>
          <li><i class="fa-solid fa-retweet"></i></li>
          <li><i class="fa-solid fa-heart"></i></li>
        </ul>
      </footer>
    </article>`);
    return $tweet;
  }

  const loadTweets = function() {
    $.get("/tweets", function( data ) {
      renderTweets(data);
    });
  };

  loadTweets();

  const renderTweets = function(tweets) {
    // loops through tweets
    for (const tweet of tweets) {
      // calls createTweetElement for each tweet
      const $tweet = createTweetElement(tweet);
       
      // takes return value and appends it to the tweets container
      $('#tweets-container').append($tweet);
    }
  }

  // NOTE* ask ian about how express .static(public) knows to access the index.html see link below for what seems to be the explanantion, specifically check out the connect docs
  // https://stackoverflow.com/questions/10857393/how-to-make-label-visible-invisible

  $( "form" ).submit(function( e ) {
    e.preventDefault();
    const maxTweetLength = 140;
    if (Number(this.counter.value) < 0) {
      alert("exceeds max tweet length");
      return;
    }
    if (Number(this.counter.value) === 140) {
      alert("no tweet content present");
      return;
    }
    const newTweet = $( this ).serialize(); 
    $.post("/tweets", newTweet);
  })
});