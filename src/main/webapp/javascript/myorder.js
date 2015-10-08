/**
 * Created by darlingtld on 2015/7/4 0004.
 */
var mycaiModule = angular.module('MycaiModule', ['ngRoute']);
var app = '/createsh';
var user;
var wechatId;

mycaiModule.config(function () {

});


mycaiModule.controller('routerController', function ($http, $scope, $location) {
    getUserInfo();
    if (user == undefined || user == null) {
        var code = getURLParameter('code');
        $http.get(app + "/user/code/" + code).success(function (data, status, headers, config) {
            user = data;
            wechatId = user.openid;
            $('img.user-icon').attr('src', user.headimgurl);
            setLocalStorage('wechatId', wechatId);
        });
    }
    sleep(2000)
    $location.path('/order/history');

});

mycaiModule.controller('orderController', function ($http, $scope) {
    var url = app + '/order/get/';
    if (user == undefined || user == null) {
        var code = getURLParameter('code');
        $http.get(app + "/user/code/" + code).success(function (data, status, headers, config) {
            user = data;
            wechatId = user.openid;
            $('img.user-icon').attr('src', user.headimgurl);
            setLocalStorage('wechatId', wechatId);
            $http.get(url + wechatId).success(function (data, status, headers, config) {
                $scope.orders = data;
            });
        });
    }
    if (wechatId == undefined) {
        wechatId = getLocalStorage('wechatId');
    }
    if ($scope.orders == undefined) {
        $http.get(url + wechatId).success(function (data, status, headers, config) {
            $scope.orders = data;
        });
    }

    $scope.deleteOrder = function (orderId) {
        $scope.deleteOrderId = orderId;
    }

    $scope.confirmDelete = function () {
        console.log($scope.deleteOrderId);
        $http.post(app + '/order/delete/'+$scope.deleteOrderId, {}).success(function(){
            alert("取消订单成功！");
            location.reload();
        }).error(function(){
            alert("取消订单失败！");
        });
    }

});

mycaiModule.controller('orderDetailController', function ($http, $scope, $routeParams) {
    var url = app + '/order/detail/' + $routeParams.id;
    $http.get(url).success(function (data, status, headers, config) {
        $scope.orderDetail = data;
        $scope.items = JSON.parse($scope.orderDetail.bill).items;
        $scope.total = JSON.parse($scope.orderDetail.bill);
        $scope.total.price = parseFloat($scope.total.price).toFixed(2);
        $scope.itemAmount = $scope.items.length;
        if (JSON.parse($scope.orderDetail.confirmBill) != null) {
            $scope.items = JSON.parse($scope.orderDetail.confirmBill).items;
            $scope.total = JSON.parse($scope.orderDetail.bill);
            $scope.actTotal = JSON.parse($scope.orderDetail.confirmBill)
            $scope.itemAmount = $scope.items.length;
        }
    });

});

mycaiModule.controller('orderModifyController', function ($http, $scope, $routeParams) {
    $('.datetime').mobiscroll().datetime({
        theme: 'sense-ui',     // Specify theme like: theme: 'ios' or omit setting to use default
        mode: 'scroller',       // Specify scroller mode like: mode: 'mixed' or omit setting to use default
        lang: 'zh',       // Specify language like: lang: 'pl' or omit setting to use default
        minDate: new Date(),  // More info about minDate: http://docs.mobiscroll.com/2-14-0/datetime#!opt-minDate
        maxDate: new Date(2020, 1, 1, 1, 1),   // More info about maxDate: http://docs.mobiscroll.com/2-14-0/datetime#!opt-maxDate
        stepMinute: 10  // More info about stepMinute: http://docs.mobiscroll.com/2-14-0/datetime#!opt-stepMinute
    });
    var amountList = [];
    for (var i = 0; i <= 100; i++) {
        amountList.push(i);
    }
    $scope.amountList = amountList;
    var url = app + '/order/detail/' + $routeParams.id;
    $http.get(url).success(function (data, status, headers, config) {
        $scope.orderDetail = data;
        $scope.items = JSON.parse($scope.orderDetail.bill).items;
        $scope.total = JSON.parse($scope.orderDetail.bill);
        $scope.total.price = parseFloat($scope.total.price).toFixed(2);
        $scope.itemAmount = $scope.items.length;
    });

    $scope.save = function () {
        console.log($scope.items);
        var totalPrice = 0;
        for (var i = 0; i < $scope.items.length; i++) {
            totalPrice += $scope.items[i].amount * $scope.items[i].productPrice;
        }
        $scope.orderDetail.bill = JSON.stringify({
            items: $scope.items,
            totalAmount: $scope.items.length,
            totalPrice: parseFloat(totalPrice).toFixed(2)
        });

        console.log($scope.orderDetail);
        var modifyUrl = app + '/order/modify';
        $http.post(modifyUrl, $scope.orderDetail).success(function () {
            alert('修改成功');
            location.href = app + '/myorder.html';
        }).error(function (data) {
            alert(data.message);
        })

    }

});

mycaiModule.directive('confirmCode', function () {
    return {
        restrict: 'AE',
        scope: {},
        link: function (scope, element, attr) {
            var value = attr.confirmCode;
            element.bind('click', function () {
                alert("确认码 ：\r\n" + value);
            })
        }
    }
});

mycaiModule.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/order/history', {
            controller: 'orderController',
            templateUrl: 'orderHistory.html'
        })
        .when('/order/details/:id', {
            controller: 'orderDetailController',
            templateUrl: 'orderDetails.html'
        })
        .when('/order/modify/:id', {
            controller: 'orderModifyController',
            templateUrl: 'orderModify.html'
        })
        .when('/router', {
            controller: 'routerController',
            template: ''
        })
        .otherwise({
            redirectTo: '/order/history'
        });
}]);

mycaiModule.filter('part', function () {
    return function (input, which) {
        if (!angular.isString(input)) {
            return input;
        }
        return input.split(' ')[which];
    };
});

function getUserInfo(callback) {
    var code = getURLParameter('code');
    $.ajax({
        type: 'get',
        url: app + "/user/code/" + code,
        success: function (data) {
            user = data;
            wechatId = user.openid;
            $('img.user-icon').attr('src', user.headimgurl);
            setLocalStorage('wechatId', wechatId);
            if (callback && typeof(callback) === "function") {
                callback();
            }
        }
    });
}
