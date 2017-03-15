var foodObject = {};

function persistFood(foodName, foodCalories) {
  if (window.localStorage) {
    var rawFoodObject = localStorage.getItem('foodObject');
    if (rawFoodObject == null) {
      rawFoodObject = "{}";
    };
    var foodObject = JSON.parse(rawFoodObject);
    foodObject[foodName] = foodCalories;
    localStorage.setItem('foodObject', JSON.stringify(foodObject));
  }
}

function loadFoodList() {
  if (window.localStorage) {
    var rawFoodObject = localStorage.getItem('foodObject');
    var foodObject = JSON.parse(rawFoodObject);
    for (var key in foodObject) {
      var $newFoodItem = $("<tr class='food-row'><td class='food-name'>" + key + "</td><td class='food-calories'>" + foodObject[key] + "</td><td class='food-delete'><button>-</button></td></tr>")
      $('#food-list tbody').prepend($newFoodItem);
    }
  }
}

function deleteFood(foodName) {
  var rawFoodObject = localStorage.getItem('foodObject');
  var foodObject = JSON.parse(rawFoodObject);
  delete foodObject[foodName];
  localStorage.setItem('foodObject', JSON.stringify(foodObject));
}

$('document').ready(function() {

  loadFoodList();

  $("#food-filter label input:text").on('keyup', function() {
    var input = $(this).val();
    
    var foodList = $("#food-list").find(".food-row");
    if (this.value == "") {
      foodList.show();
      return;
    };
    foodList.hide();

    foodList.filter(function(i,v) {
      var $t = $(this);
      if ($t.is(":contains('" + input + "')")) {
        return true;
      }
      return false;
    })
    .show();
  });

  $(".food-delete button").on('click', function() {
    deleteFood($(this).parent().parent().find('.food-name').text());
    $(this).parent().parent().html('');
  });

  $("#add-food").on('click', function() {
    var $nameInput = $('#name-field input:text');
    var $calorieInput = $('#calories-field input:text');
    var newFoodName = $nameInput.val();
    var newFoodCalories = $calorieInput.val();

    if (newFoodName == '') {
      $('#name-field .validation-error').html('Please Enter a Name');
      $('#calories-field .validation-error').html('');
    }
    else if (newFoodCalories == '') {
      $('#calories-field .validation-error').html('Please Enter Calories');
      $('#name-field .validation-error').html('');
    }
    else {
      var $newFoodItem = $("<tr class='food-row'><td class='food-name'>" + newFoodName + "</td><td class='food-calories'>" + newFoodCalories + "</td><td class='food-delete'><button>-</button></td></tr>")
      $('#food-list tbody').prepend($newFoodItem);
      persistFood(newFoodName, newFoodCalories);
      $nameInput.val('');
      $calorieInput.val('');
      $('#name-field .validation-error').html('');
      $('#calories-field .validation-error').html('');
    }
    location.reload();
  });

});
