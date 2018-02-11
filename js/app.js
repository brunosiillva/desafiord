var myApp = angular.module('desafio',[]);

myApp.controller('listaLivros', ['$scope', '$http', function($scope, $http){

  //Pega infos da lista completa
  $http({
     method: 'GET',
     url: 'https://www.googleapis.com/books/v1/volumes?q=star+wars'
  }).then(function (success){
    $scope.data = success;
    console.log(success);
  },function (error){

  });
  //Fim lista completa

}]);
