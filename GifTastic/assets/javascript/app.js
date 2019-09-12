var userFlower;
var flowersArray = [];
var buttonsDiv = $("#buttonsDiv");
var animalToSearch = '';
var buttonId=0;


// This function is called when a page is loaded
// It creates the buttons for the alredy existing array items
window.onload = function () {
    initialDisplay();
};

function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }
  
  function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
  }

// This function is called on click of the Add button
// Functioanlity: To create buttons for the user entered values by calling addAnimalToList internally 
$("#submit").click(function () {
    userFlower = $("#animal").val();
    if ($("#animal").val() !== '') {
        addFlowersToList(userFlower);
        $("#animal").val('');
    }
    $("#limit").hide();
});

// This function is used to add a button as user enters the value
function addFlowersToList(flowername) {
    buttonId++;
    var newButton = $("<button>");
    newButton.text(flowername);
    newButton.addClass("newButtons");
    newButton.attr("draggable", "true");
    newButton.attr("ondragstart", "drag(event)");
    newButton.attr("id",buttonId);
    buttonsDiv.append(newButton);
    flowersArray.push(flowername);
};

$(document.body).on("click", ".newButtons", function () {

    flowerToSearch = $(this).text();
    var limit = 10;
    makeAjaxCall(flowerToSearch, limit);
    $("#limit").show();

});

function makeAjaxCall(flowerToSearch, limit) {
    var queryURL = "https://api.giphy.com/v1/stickers/search?api_key=qR3JBUhSvpj9BtYwZRUh7NfYABU5B1t9&q=" + flowerToSearch + "&limit=" + limit + "&offset=0&lang=en";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var rownum = Math.floor((limit / 3)) + 1;
        var colnum = Math.floor((limit / 3));
        createGrid(rownum, colnum, response.data);
    });
};


function createGrid(rownum, colnum, gifArray) {
    $("#imageDiv .container").remove();
    var imgCnt = 0;
    $('#imageDiv').append('<div class="container"></div>')
    for (var rowIndex = 0; rowIndex < rownum; rowIndex++) {
        $('#imageDiv > div.container').append('<div class="row" id="row' + rowIndex + '"></div>');
        for (var colIndex = 0; colIndex < colnum; colIndex++) {
            if (imgCnt < gifArray.length) {
                var colDiv = $("<div>");
                colDiv.addClass("col-md-4 col-sm-4");
                colDiv.attr("id", colIndex);
                colDiv.append("<h5>" + "Title : " + gifArray[imgCnt].title + "</h5>");
                colDiv.append("<h5>" + "Rating : " + gifArray[imgCnt].rating + "</h5>");
                colDiv.append('<img src="' + gifArray[imgCnt].images.original_still.url + '"class="img-thumbnail" id="' + imgCnt + '"data-still="' + gifArray[imgCnt].images.original_still.url + '"data-animate="' + gifArray[imgCnt].images.preview_gif.url + '" data-status="still"/>');
                $('#row' + rowIndex).append(colDiv);
            }
            imgCnt++;
        }
    }
};


$(document.body).on("click", "img", function () {
    var status = $(this).attr("data-status");
    if (status === "still") {
        var animateURL = $(this).attr("data-animate");
        $(this).attr("src", animateURL);
        $(this).attr("data-status", "animate");
    }
    else {
        var stillURL = $(this).attr("data-still");
        $(this).attr("src", stillURL);
        $(this).attr("data-status", "still");
    }
});

$("#limit").click(function () {
    var limit = 20;
    console.log(flowerToSearch);
    makeAjaxCall(flowerToSearch, limit);
    $("#limit").hide();
});

$("#clear").click(function () {
    initialDisplay();
});
function initialDisplay() {
    buttonId=0;
    $("#buttonsDiv .newButtons").remove();
    flowersArray = ["Rose", "Lavender"];
    for (var i = 0; i < flowersArray.length; i++) {
        buttonId++;
        var newButton = $("<button>");
        newButton.text(flowersArray[i]);
        newButton.addClass("newButtons");
        newButton.attr("id",buttonId);
        newButton.attr("draggable", "true");
        newButton.attr("ondragstart", "drag(event)");
        buttonsDiv.append(newButton);        
    }
    $("#limit").hide();
    $("#imageDiv .container").remove();
};

