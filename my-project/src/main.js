/* global $ */

$(document).ready(function() {
    $.ajax({
      url: "/restaurants",
      method: "GET",
      success: function(data) {
        var restaurantList = $("#restaurant-list");
        data.forEach(function(restaurant) {
          var restaurantElement = $("<div>")
            .addClass("restaurant")
            .text(restaurant.name)
            .click(function() {
              localStorage.setItem("selectedRestaurant", JSON.stringify(restaurant));
              window.location.href = "menu.html";
            });
          restaurantList.append(restaurantElement);
        });
      },
      error: function() {
        console.log("Error occurred while fetching restaurants.");
      }
    });
  });
  
  $("#place-order-btn").click(function () {
    var nameInput = $("#name-input").val();
    var addressInput = $("#address-input").val();
    var totalAmount = parseFloat($("#total-amount").text().replace("Total: $", ""));
    var selectedRestaurant = JSON.parse(localStorage.getItem("selectedRestaurant"));
    var selectedMenuItem = JSON.parse(localStorage.getItem("selectedMenuItem"));
  
    // Prepare the order data to send to the server
    var orderData = {
      name: nameInput,
      address: addressInput,
      totalAmount: totalAmount,
      selectedRestaurant: selectedRestaurant,
      selectedMenuItem: selectedMenuItem
    };
  
    $.ajax({
      url: "/place-order",
      method: "POST",
      data: orderData,
      success: function (response) {
        console.log("Order placed successfully:", response);
  
        localStorage.removeItem("selectedRestaurant");
        localStorage.removeItem("selectedMenuItem");
        window.location.href = "index.html";
      },
      error: function (error) {
        console.log("Error occurred while placing the order:", error);
      }
    });
  });
  