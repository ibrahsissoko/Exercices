var googleEcom = angular.module('googleEcom',[]);

googleEcom.controller('mainNav',function($scope, $location){
    $scope.nav = [
        {
            "mainLink" : {
                "href":"#/phone","title":"Téléphone"
            },
            "underNav": [
                {
                    "href":"#/phone-apple","title":"Apple"
                },{
                    "href":"#/phone-samsung","title":"Samsung"
                },{
                    "href":"#/phone-google","title":"Google"
                },{
                    "href":"#/phone-sony","title":"Sony"
                }
            ]
        },
        {
            "mainLink" : {
                "href":"#/tablet","title":"Tablette"
            },
            "underNav": [
                {
                    "href":"#/tablet-apple","title":"Apple"
                },{
                    "href":"#/tablet-samsung","title":"Samsung"
                },{
                    "href":"#/tablet-google","title":"Google"
                }
            ]
        },
        {
            "mainLink" : {
                "href":"#/test","title":"test"
            }
        }
    ];
    $scope.activeNav = function(page){
        var currentPage = $location.path(),
            n = currentPage.indexOf("-");
        if(n > 0) currentPage = currentPage.substring(0,n);
        return page.substring(1) === currentPage ?  "active" : "";
    };
});

googleEcom.controller('loginCtrl',function($scope, $http){
    $scope.user = {};
    $scope.userLogged = false;
    $scope.login = function(){
        $http({method:'POST',url:'login.json',data:$scope.user})
            .success(function(data){
                if(data.error){
                    $scope.user.error = data.error;
                } else {
                    $scope.user = data;
                    $scope.userLogged = true;
                }

        }).error(function(data){
            console.log('Error : ' +data);
        });
    };
});

!function($){
    $(function(){


        var templateMinCart = $(document.getElementById('template')).html();

        $(document.getElementById('productList')).on('click','a.addToCart',
            function(event){
                event.preventDefault();
                event.stopPropagation();
                var article = $(this).closest('article'),
                    articleData = {
                        "id":article.data('id'),
                        "couleur":article.find('.select-color option:selected').val(),
                        "memory":article.find('.select-memory option:selected').val()
                    };

                $.ajax({
                    url : 'cart.html',
                    dataType : 'json',
                    data:articleData
                }).done(function(data){
                    templateMinCart = templateMinCart.replace("{{name}}",data.name);
                    templateMinCart = templateMinCart.replace("{{image}}",data.image);
                    templateMinCart = templateMinCart.replace("{{price}}",data.price);
                    templateMinCart = templateMinCart.replace("{{id}}",data.id);

                    $(document.getElementById('minCart')).prepend(templateMinCart);
                }).error(function(data){

                });
        });

        $(document.getElementById('minCart')).on('click',
            'article a.deleteArticle', function(event){
                $(this).closest('article').remove();
        });
    });
}(window.jQuery)