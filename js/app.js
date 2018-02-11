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
  .otherwise({
    redirectTo: '/'
  });
  $locationProvider.hashPrefix('');
});
//ngRoute fim

//controller lista inicio
myApp.controller('listaLivros', function($scope, $http){
  //Pega infos da lista completa
  $http({
     method: 'GET',
     url: 'https://www.googleapis.com/books/v1/volumes?q=star+wars'
  }).then(function (success){
    $scope.books = success.data.items;
    // console.log(success.data.items, 'Informacoes pegas com sucesso');
    console.log('Informacoes pegas com sucesso');
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
    $scope.book = success.data;
    console.log(success.data);
  },function (error){
    console.log(error, 'Erro ao pegar as informacoes');
  });
});
