app.controller('ProductController', function ($scope, productService) {

    init();


    function init() {
        console.log('this is the init for the angularjs APP');
        $scope.products = ['peras', 'manzanas', 'uvas', 'ciruelos'];
    }

});
