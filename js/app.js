var myApp = angular.module('desafio',['ngRoute']);

//ngRoute inicio
myApp.config(function ($routeProvider, $locationProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'templates/main.html',
    controller: 'listaLivros'
  })
  .when('/book/:id', {
    templateUrl: 'templates/book.html',
    controller: 'livroSingle'
  })
  .when('/checkout/:id', {
    templateUrl: 'templates/checkout.html',
    controller: 'livroSingle'
  })
  .when('/payments', {
    templateUrl: 'templates/payments.html'
  })
  .when('/success', {
    templateUrl: 'templates/success.html'
  })
  .otherwise({
    redirectTo: '/'
  });
  $locationProvider.hashPrefix('');
});
myApp.run(['$rootScope','$location', '$routeParams', function($rootScope, $location, $routeParams) {
  $rootScope.$on('$routeChangeSuccess', function() {
    $rootScope.currentRoute = $location.path();
  });
}]);
//ngRoute fim

//controller lista inicio
myApp.controller('listaLivros', function($scope, $http){
  //Pega infos da lista completa
  $http({
     method: 'GET',
     url: 'https://www.googleapis.com/books/v1/volumes?q=star+wars'
  }).then(function (success){
    $scope.books = success.data.items;
    // console.log('Informacoes pegas com sucesso');
  },function (error){
    console.log(error, 'Erro ao pegar as informacoes');
  });
  //Fim lista completa
});
//controller lista fim

myApp.controller('livroSingle', function($scope, $http, $routeParams){
  const idBook = $routeParams.id;
  $http({
    method: 'GET',
    url: 'https://www.googleapis.com/books/v1/volumes/'+idBook
  }).then(function (success){
    $scope.bookS = success.data;
    console.log(success.data);
  },function (error){
    console.log(error, 'Erro ao pegar as informacoes');
  });
});
