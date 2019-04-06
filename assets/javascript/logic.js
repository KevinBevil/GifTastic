// Initial array of countrys
var countries = ["Thailand", "Scotland", "New Zealand", "China", "England", "Tibet", "Indonesia", "Iceland", "Greece", "Norway", "Switzerland", "Canada", "Japan"];

// Adding click event listen listener to all buttons

// Function for displaying country gif
function renderButtons() {

  // Empties out the dom of buttons before creating them fresh
  $("#buttons-view").empty();
  // Loops through the array of countrys
  for (var i = 0; i < countries.length; i++) {

    //  A button is created for each element in the array
    var buttonToBeRendered = $("<button>");
    // adds a class of country on to every button
    buttonToBeRendered.addClass("country");
    // The individual name of the country is added as a data-name attribute
    buttonToBeRendered.attr("data-name", countries[i]);
    // The text is assigned as the country's name in the array
    buttonToBeRendered.text(countries[i]);
    // Added the button to the buttons-view div
    $("#buttons-view").append(buttonToBeRendered);
  }
}

// This event listener handles when a country button is clicked
$("#add-country").on("click", function (event) {
  event.preventDefault();
  // This line of code will grab the input from the textbox
  var country = $("#country-input").val().trim();

  // The new user-entered country is added to our array
  countries.push(country);

  // The buttons are fleshed out using the renderButtons function
  renderButtons();
});

// Adding click event listeners to all elements with a class of "country"
// $(document).on("click", ".country", displayGif);

// Calling the renderButtons function to display the intial buttons
renderButtons();

$("#buttons-view").on("click", "button", function () {
  // Grabbing and storing the data-country property value from the button
  var country = $(this).attr("data-name");

  // Constructing a queryURL using the country name
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    country + "&api_key=dc6zaTOxFJmzC&rating=g&limit=10";

  // Performing an AJAX request with the queryURL
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    // After data comes back from the request
    .then(function (response) {
      console.log(queryURL);

      console.log(response);
      // storing the data from the AJAX request in the results variable
      var results = response.data;

      // Looping through each result item
      for (var i = 0; i < results.length; i++) {

        // Creating and storing a div tag
        var countryDiv = $("<div>");

        // Creating a paragraph tag with the result item's rating
        var p = $("<p>").text("Rating: " + results[i].rating);

        // Creating and storing an image tag
        var countryImage = $("<img>");
        // Setting the src attribute of the image to a property pulled off the result item
        countryImage.attr("src", results[i].images.fixed_height_still.url);
        countryImage.attr("data-state", "still");
        countryImage.attr("data-animate", results[i].images.fixed_height.url);
        countryImage.attr("data-still", results[i].images.fixed_height_still.url);


        // Appending the paragraph and image tag to the countryDiv
        countryDiv.append(p);
        countryDiv.append(countryImage);

        // Prependng the countryDiv to the HTML page in the "#gifs-appear-here" div
        $("#countries-view").prepend(countryDiv);
      }
    });
});
$("#countries-view").on("click", "img", function() {
  // imgState holds the current state of our image -- animate or still
  var imgState = $(this).attr("data-state");
  // When the image is clicked, the src is updated.

  if (imgState === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});
