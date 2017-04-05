var app = angular.module("myApp", ['smart-table']);

app.controller('mainCtrl', ['$scope', '$http',
function($scope, $http, ModalService) {
  $scope.products = []; //List of products (with their attributes)
  $scope.cart = {items: []};
  $scope.showModal = { value: false };
  $scope.totalPrice = 0;
  $scope.cartSize = 0;

  $http({
    method: 'GET',
    url: 'http://sneakpeeq-sites.s3.amazonaws.com/interviews/ce/feeds/store.js'})
    .success(function(data,status,headers,config) {
      for(var i = 0; i < data.products.length; i++) {
        var product = {};
        product["src"] = "http:" + data.products[i].mainImage.meta[0].value;
        product["name"] = data.products[i].name;
        product["price"] = (data.products[i].maxPrice)/100;
        product["id"] = data.products[i].id;
        product["quantity"] = 0;
        product["isWholesale"] = false;
        $scope.products.push(product);
      }
    })

    $scope.addToCart = function(product) {
      product["quantity" ] +=1 ;
      if($scope.cart.items.indexOf(product) === -1 ) {
        $scope.cart.items.push(product);
      }
    }

    //Watches over the cart to reflect changes in total price.
    $scope.$watch('cart.items', function(newValue, oldValue) {
      var newTotalPrice = 0;
      var newCartSize = 0;
      for(var i=0; i< $scope.cart.items.length; i++) {
        var price = $scope.cart.items[i]["price"];
        var quantity = $scope.cart.items[i]["quantity"];
        newTotalPrice += (price * quantity);
        newCartSize += $scope.cart.items[i]["quantity"];
      }
      $scope.totalPrice = newTotalPrice;
      $scope.cartSize = newCartSize;
    }, true);

    //Changes price depending on type.
    $scope.changePrice = function(product) {
      if(product["isWholesale"] === true) {
        product.price  *= 3/4; //75% discount
      }
      else {
        product.price  *= 4/3;
      }
    }

    $scope.openCart = function() {
      $scope.showModal.value  = true;
    };

    //Delete elements in cart from modal.
    $scope.delete = function(row) {
      var index = $scope.cart.items.indexOf(row);
      if (index !== -1) {
        $scope.cart.items.splice(index, 1);
      }
    }

    //Closes modal
    $scope.closeModal = function() {
      $scope.showModal.value = false;
    }

    //Bonus : Create an API endpoint that returns a product price given a product cluster ID & user type.
    $scope.getPrice = function(id,type) {
      var product;
      for(var i = 0; i < $scope.products.length; i++) {
        if(id === $scope.products[i].id) {
          product = $scope.products[i];
        }
      }
      if(type === "Wholesale") {
        if(product["isWholesale"] === true) {
              return product.price;
        }
        return product.price * (3/4);
      }
      if(type === "Retail") {
        if(product["isWholesale"] === true) {
          return product.price * (4/3);
        }
        return product.price;
      }
  }

}
]);
