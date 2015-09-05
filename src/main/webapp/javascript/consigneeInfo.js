/**
 * Created by darlingtld on 2015/7/4 0004.
 */
var ciModule = angular.module('CIModule', []);

var app = '/createsh';
var user;
var wechatId;
var username;

ciModule.controller('mainController', function ($scope, $http) {
    if (user == undefined || user == null) {
        var code = getURLParameter('code');
        $http.get(app + "/user/code/" + code).success(function (data, status, headers, config) {
            user = data;
            wechatId = user.openid;
            $('img.user-icon').attr('src', user.headimgurl);
            setLocalStorage('wechatid', wechatId);
        });
    }
    if (wechatId == undefined) {
        wechatId = getLocalStorage('wechatid');
    }
    $scope.refresh = function () {
        var url = app + '/user/wechatId/' + wechatId;
        $http.get(url).success(function (data, status, headers, config) {
            $scope.user = data;
        }).error(function () {

        });
    }
    $scope.submit = function () {
        var url = app + '/user/consigneeinfo';
        $http.post(url, {
            openid: wechatId,
            consignee: $scope.user.consignee,
            consigneeContact: $scope.user.consigneeContact,
            buyerAddress: $scope.user.buyerAddress
        }).success(function (data, status, headers, config) {
            alert('保存成功');
        }).error(function () {
            alert('保存失败');
        });
    }
});
