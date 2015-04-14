var app = angular.module('asafApp', []);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/products', {
            controller: 'ProductController',
            templateUrl: '/app/partials/inventory/product.html'
        })
        .when('/product/:productId', {
            controller: 'ProductController',
            templateUrl: '/app/partials/inventory/product.html'
        })
        .when('/prductType', {
            controller: 'ProductTypeController',
            templateUrl: '/app/partials/inventory/productType.html'
        })
        .otherwise({
            redirectTo: '/Home'
        });
});
