/**
 * Created by tangld on 2015/6/8.
 */
var adminModule = angular.module('AdminModule', ['ngRoute']);
var app = '/createsh';
var cdata = {
    "机器": {
        "碾米机": "category/nianmiji",
    },
    "米面粮油": {
        "大米": "category/dami",
        "面粉面条": "category/mianfenmiantiao",
        "食用油": "category/shiyongyou",
        "杂粮": "category/zaliang",
        "面点": "category/miandian",
        "烘焙佐料": "category/hongbeizuoliao",
    },
    "蔬菜水果": {
        "叶菜类": "category/yecailei",
        "根茎类": "category/genjinglei",
        "茄果类": "category/qieguolei",
        "豆类": "category/doulei",
        "葱姜蒜": "category/congjiangsuan",
        "菌类": "category/junlei",
        "特商": "category/tecai"
    },
    "禽肉蛋类": {
        "猪肉": "category/zhurou",
        "羊肉": "category/yangrou",
        "牛肉": "category/niurou",
        "鸡肉": "category/jirou",
        "鸭肉": "category/yarou",
        "禽类": "category/qinlei",
        "禽蛋类": "category/qindanlei",
        "熟食加工": "category/shushijiagong"
    },
    "水产冻货": {
        "海鲜水产": "category/haixianshuichan",
        "鱼丸火锅": "category/yuwanhuoguo",
    },
    "调料其他": {
        "调味品": "category/tiaoweipin",
        "粉丝粉条": "category/fensifentiao",
        "豆制品": "category/douzhipin",
        "干货": "category/ganhuo",
        "调味品": "category/tiaoweipin",
        "酱油醋": "category/jiangyoucu",
        "腌商罐头": "category/yancaiguantou"
    },
    "餐厨用品": {
        "纸品湿巾": "category/zhipinshijin",
        "餐饮用具": "category/canyinyongju",
    },
    "酒水饮料": {
        "饮料": "category/yinliao",
        "饮用水": "category/yinyongshui",
    }
}

var tdata = {
    "机器": "machine",
    "米面粮油": "mimianliangyou",
    "蔬菜水果": "shucaishuiguo",
    "禽肉蛋类": "qinroudanlei",
    "水产冻货": "shuichandonghuo",
    "调料其他": "tiaoliaoqita",
    "餐厨用品": "canchuyongpin",
    "酒水饮料": "jiushuiyinliao"
}

var isFirst = true;

adminModule.controller('productController', function ($scope, $http, $routeParams, $location) {
    $('li[role]').removeClass('active');
    $('li[role="manage_product"]').addClass('active');

    $scope.changedValue = function (item) {
        var productUrl = app + '/product/' + item + '/wechatid/0';
        $http.get(productUrl).success(function (data, status, headers, config) {
            $scope.products = data;
            procfilter();
        });

    }

    objS = $('select.product-picker');
    var selectHtml = '';
    $.each(cdata, function (name, value) {
        selectHtml += '<optgroup label="' + name + '">'
        $.each(value, function (name, value) {
            selectHtml += '<option value="' + value + '">' + name + '</option>';
        });
        selectHtml += '</optgroup>';
    });
    objS.html(selectHtml);

    //console.log(isFirst)
    if (isFirst == true) {
        setTimeout("objS.val('category/nianmiji')", 1000);
        isFirst = false;
    }

    var typeUrl = app + '/product/type_map';
    $http.get(typeUrl).success(function (data, status, headers, config) {
        $scope.typeMap = data;
    });

    var productUrl = app + '/product/admin/category/' + $routeParams.category;

    function getProcurement4Product(procurement, id) {
        for (var i = 0; i < procurement.length; i++) {
            if (procurement[i].productId == id) {
                return procurement[i];
            }
        }
        return null;
    }

    $http.get(productUrl).success(function (data, status, headers, config) {
        $scope.products = data;
        procfilter();

    });

    function procfilter() {
        var procurementUrl = app + '/product/procurement/all';
        $http.get(procurementUrl).success(function (data, status, headers, config) {
                $scope.procurement = data;
                for (var i = 0; i < $scope.products.length; i++) {
                    var procurement = getProcurement4Product($scope.procurement, $scope.products[i].id);
                    if (procurement == null) {
                        $scope.products[i].procindex = 1.0;
                        $scope.products[i].procprice = $scope.products[i].price;
                    } else {
                        $scope.products[i].procindex = procurement.procindex;
                        $scope.products[i].procprice = procurement.procprice;
                    }
                    $scope.products[i].price = ($scope.products[i].procindex * $scope.products[i].procprice).toFixed(2);
                }
            }
        );
    }


    $scope.updateProduct = function () {
        this.product.price = (this.product.procindex * this.product.procprice).toFixed(2);
        $http.post(app + '/product/update', JSON.stringify(this.product)).success(function () {

        })
        console.log(this.product)
    }

    //var procurementUrl = app + '/product/procurement/all';
    //$http.get(procurementUrl).success(function (data, status, headers, config) {
    //    $scope.procurement = data;
    //});
    $scope.modify = function (id) {
        $('#myDialog').attr('method', 'update');
        $('#myDialog .title').text('修改商品');
        for (var i = 0; i < $scope.products.length; i++) {
            var product;
            if (id == $scope.products[i].id) {
                product = $scope.products[i];
                break;
            }
        }
        $('#pid').val(product.id);
        $('#name').val(product.name);
        $('#description').val(product.description);
        $('#type').attr('value', '');
        $('#category').attr('value', '');
        $('#price').val(product.price);
        $('#unit').val(product.unit);
        $('#pic').attr('src', app + "/" + product.picurl);
        $('#ppic').val('');
        $('#ppic-zoom').val('');
        $('#detail').val(product.detail);
    };

    $scope.delete = function (id) {
        if (confirm('确认删除该商品')) {
            $http.post(app + '/product/delete/' + id, {}).success(function () {
                alert('删除成功！');
                location.reload();
            }).error(function () {
                alert('删除失败！');
            });
        }
    }

    $scope.create = function () {
        $('#upid').val('');
        $('#uname').val('');
        $('#udescription').val('');
        $('#utype').val('');
        $('#ucategory').val('');
        $('#uprice').val('');
        $('#uunit').val('');
        $('#upic').val('');
        $('#upic-zoom').val('');
        $('#udetail').val('');
    };

    $scope.export = function () {
        window.location.href = app + '/product/export/';
    };

    $scope.save = function () {
        if ($('#ppic').val() != '') {
            var product = new FormData();
            product.append("id", $('#pid').val());
            product.append("name", $('#name').val());
            product.append("description", $('#description').val());
            product.append("type", $('#type').val());
            product.append("category", $('#category').val());
            product.append("price", $('#price').val());
            product.append("unit", $('#unit').val());
            product.append("detail", $("#detail").val());
            product.append("pic", $("#ppic").get(0).files[0]);
            product.append("picZoom", $("#ppic-zoom").get(0).files[0]);
            $.ajax({
                type: 'POST',
                url: app + "/product/upload",
                data: product,
                processData: false,
                contentType: false,
                success: function () {
                    alert("修改成功");
                    location.reload();
                },
                error: function () {
                    alert("修改失败");
                    location.reload();
                }
            });
        } else {
            var product = {
                id: $('#pid').val(),
                name: $('#name').val(),
                description: $('#description').val(),
                type: $('#type').val(),
                category: $('#category').val(),
                price: $('#price').val(),
                unit: $('#unit').val(),
                detail: $('#detail').val()
            };
            if (validate(product)) {
                $.ajax({
                    type: "post",
                    url: app + "/product/update",
                    contentType: "application/json",
                    data: JSON.stringify(product),
                    success: function (data) {
                        alert('保存成功！');
                        location.reload();
                    },
                    error: function (data) {
                        alert('保存失败!');
                        location.reload();
                    }
                });
            } else {
                location.reload();
            }
        }
    }


    function validateProduct() {
        if ($('#uname').val() == '') {
            alert("请填写名字");
            return false;
        } else if ($('#udescription').val() == '') {
            alert("请填写描述");
            return false;
        } else if ($('#utype').val() == '') {
            alert("请填写大类");
            return false;
        } else if ($('#ucategory').val() == '') {
            alert("请填写小类");
            return false;
        } else if ($('#uprice').val() == '') {
            alert("请填写价格");
            return false;
        } else if ($('#uunit').val() == '') {
            alert("请填写单位");
            return false;
        } else if ($('#udetail').val() == '') {
            alert("请填写详细");
            return false;
        } else if ($('#upic').val() == '') {
            alert("请上传图片");
            return false;
        }
        return true;
    }

    function validate(product) {
        if (product.name == '') {
            alert("请填写名字");
            return false;
        } else if (product.description == '') {
            alert("请填写描述");
            return false;
        } else if (product.type == '') {
            alert("请填写大类");
            return false;
        } else if (product.category == '') {
            alert("请填写小类");
            return false;
        } else if (product.price == '') {
            alert("请填写价格");
            return false;
        } else if (product.unit == '') {
            alert("请填写单位");
            return false;
        } else if (product.detail == '') {
            alert("请填写详细");
            return false;
        }
        return true;
    }

    $scope.upload = function () {
        if (validateProduct()) {
            var product = new FormData();
            product.append("name", $('#uname').val());
            product.append("description", $('#udescription').val());
            product.append("type", $('#utype').val());
            product.append("category", $('#ucategory').val());
            product.append("price", $('#uprice').val());
            product.append("unit", $('#uunit').val());
            product.append("detail", $("#udetail").val());
            product.append("pic", $("#upic").get(0).files[0]);
            product.append("picZoom", $("#upic-zoom").get(0).files[0]);

            $.ajax({
                type: 'POST',
                url: app + "/product/upload",
                data: product,
                processData: false,
                contentType: false,
                success: function () {
                    alert("添加成功");
                    location.reload();
                },
                error: function () {
                    alert("添加失败");
                    location.reload();
                }
            });
        } else {
            location.reload();
        }
    }

    $scope.sort = function () {
        $('button.menu-product').hide();
        $('select.product-picker').hide();
        $('table').hide();
        $('#save_sort').show();
        $('#sortable').removeAttr('hidden');
        $('#sortable').sortable();
        $('#sortable').disableSelection();
    }

    $scope.saveSort = function () {
        var orderArr = $('#sortable li span.orderIndex');
        var productArr = $('#sortable li span.productId');
        var data = [];
        for (var i = 0; i < orderArr.length; i++) {
            console.log(productArr[i].innerText + " ==> " + orderArr[i].innerText);
            data.push({productId: productArr[i].innerText, orderIndex: i})
        }
        $('body').html('<h3 class="text-center">正在保存商品顺序</h3>');
        $http.post(app + "/product/save_sort", data).success(function () {
            alert('保存成功');
            location.reload();
        })
    }

    $scope.modifyPic = function () {
        $('div.upload_file').show();
    }

});

adminModule.controller('orderController', function ($scope, $http) {
    $('li[role]').removeClass('active');
    $('li[role="manage_order"]').addClass('active');
    $http.get(app + '/order/getall').success(function (data) {
        $scope.orders = data;
    });

    $http.get(app + '/order/status/jsonlist').success(function (data) {
        $scope.orderStatusList = data;
    });

    $http.get(app + '/transaction/stat').success(function (data) {
        $scope.transactionStat = data;
    });

    $scope.modify = function (id) {
        $('#myDialog').attr('method', 'update');
        for (var i = 0; i < $scope.orders.length; i++) {
            var order;
            if (id == $scope.orders[i].id) {
                order = $scope.orders[i];
                break;
            }
        }
        $('#oid').val(order.id);
        $('#userId').val(order.userId);
        $('#orderTs').val(order.orderTs);
        $('#deliveryTs').val(order.deliveryTs);
        $('#buyerInfo').val(order.buyerInfo);
        $('#buyerAddress').val(order.buyerAddress);
        $('#orderStatus').val(order.status);
        $('#consignee').val(order.consignee);
        $('#consigneeContact').val(order.consigneeContact);
        $scope.selectOrderStatus = {key: order.status, value: order.status};

    };

    $scope.save = function () {
        var oid = $('#oid').val();
        var order;
        for (var i = 0; i < $scope.orders.length; i++) {
            if (oid == $scope.orders[i].id) {
                order = $scope.orders[i];
                break;
            }
        }
        order.deliveryTs = $('#deliveryTs').val();
        order.buyerInfo = $('#buyerInfo').val();
        order.buyerAddress = $('#buyerAddress').val();
        order.consignee = $('#consignee').val();
        order.consigneeContact = $('#consigneeContact').val();
        order.status = $('#orderStatus').val();

        //console.log(order);
        $.ajax({
            type: "post",
            url: app + "/order/update",
            contentType: "application/json",
            data: JSON.stringify(order),
            success: function (data) {
                alert('保存成功！');
                window.location.href = app + '/admin/manage.html#/order';
                window.location.reload();
            },
            error: function (data) {
                alert('保存失败');
                window.location.href = app + '/admin/manage.html#/order';
                window.location.reload();
            }
        });
    }

    $scope.export = function () {
        window.location.href = app + '/order/export/';
    };

    $scope.delete = function (orderId) {
        if (confirm("确认删除该订单")) {
            $http.post(app + '/order/delete/' + orderId, {}).success(function (data) {
                alert("删除成功！");
                location.reload();
            }).error(function (data, status, headers, configs) {
                alert(decodeURI(headers().message));
                console.log(headers)
            });
        }
    }
});

adminModule.controller('dispatchController', function ($scope, $http) {
    $('li[role]').removeClass('active');
    $('li[role="manage_dispatch"]').addClass('active');
    $http.get(app + '/order/dispatch/list').success(function (data) {
        $scope.dispatchList = data;
    });

    $scope.export = function () {
        window.location.href = app + '/order/dispatch/export/';
    };

});

adminModule.controller('couponController', function ($scope, $http, $location) {
    $('li[role]').removeClass('active');
    $('li[role="manage_coupon"]').addClass('active');
    $http.get(app + '/coupon/all/list').success(function (data) {
        $scope.couponList = data;
    });

    $scope.export = function () {
        window.location.href = app + '/coupon/export/';
    };
    $scope.createdCoupon = {};

    $scope.print = function () {
        console.log($scope.createdCoupon.cType);
    }

    $scope.updateDescription = function () {
        if ($scope.createdCoupon.cType == 'voucher') {
            $scope.createdCoupon.description = '单笔订单满' + $scope.createdCoupon.reachedMoney + '减' + $scope.createdCoupon.deductedMoney
        } else if ($scope.createdCoupon.cType == 'discount') {
            $scope.createdCoupon.description = '单笔订单' + $scope.createdCoupon.discountFactor * 10 + '折优惠'
        }
    }

    $scope.save = function () {
        console.log($scope.createdCoupon);
        var coupon = {};
        if ($scope.createdCoupon.cType == 'discount') {
            coupon = {
                discountFactor: $scope.createdCoupon.discountFactor
            }
        } else if ($scope.createdCoupon.cType == 'voucher') {
            coupon = {
                reachedMoney: $scope.createdCoupon.reachedMoney,
                deductedMoney: $scope.createdCoupon.deductedMoney
            }
        }
        coupon.used = false;
        coupon.startTime = Date.parse($scope.createdCoupon.startTime);
        coupon.endTime = Date.parse($scope.createdCoupon.endTime);
        $http.post(app + '/coupon/' + $scope.createdCoupon.cType + '/create', coupon).success(function () {
            alert('优惠券创建成功');
            window.location.href = app + '/admin/manage.html#/coupon';
            window.location.reload();
        }).error(function () {
            alert('优惠券创建失败');
            window.location.href = app + '/admin/manage.html#/coupon';
            window.location.reload();
        });
    }
});

adminModule.controller('messageController', function ($scope, $http) {
    $('li[role]').removeClass('active');
    $('li[role="manage_message"]').addClass('active');
    $http.get(app + '/user/all').success(function (data) {
        $scope.userList = data;
    });


    $scope.sendMessage = function (openid) {
        $scope.openid2Send = openid;
    }


    $scope.send = function () {
        var message = {
            openid: $scope.openid2Send,
            content: $('#message-body').val(),
            ts: new Date(),
            read: false
        }
        console.log(message)
        $http.post(app + '/message/create', message).success(function () {
            alert('消息发送成功');
            window.location.href = app + '/admin/manage.html#/message';
            window.location.reload();
        }).error(function () {
            alert('消息发送失败');
            window.location.href = app + '/admin/manage.html#/message';
            window.location.reload();
        });
    }

});

adminModule.controller('csmessageController', function ($scope, $http) {
    $('li[role]').removeClass('active');
    $('li[role="manage_csmessage"]').addClass('active');
    $http.get(app + '/service/csmessage').success(function (data) {
        $scope.csmessageList = data;
    });

    if (typeof(EventSource) !== "undefined") {
        var source = new EventSource(app + '/service/csmessage/push');
        source.onmessage = function (event) {
            var csmsg = JSON.parse(event.data);
            if (csmsg != null) {
                $scope.csmessageList.unshift(JSON.parse(event.data));
                $scope.$apply();
                console.log($scope.csmessageList)
            }
        };
    } else {
        console.log("Sorry, your browser does not support server-sent events...");
    }

    $scope.enableAutoReply = function () {
        var isEnabled = $('#autoreply-checkbox').is(":checked");
        $http.post(app + '/service/enable_auto_reply/' + isEnabled, {content: $('#autoreply-content').val()}).success(function () {

        });
    }


    $scope.sendMessage = function (openid) {
        $scope.openid2Send = openid;
    }
    $scope.send = function () {
        var message = {
            openid: $scope.openid2Send,
            message: $('#message-body').val(),
            timestamp: new Date(),
        }
        console.log(message)
        $http.post(app + '/service/customer', message).success(function () {
            alert('消息发送成功');
            window.location.href = app + '/admin/manage.html#/csmessage';
            window.location.reload();
        }).error(function () {
            alert('消息发送失败');
            window.location.href = app + '/admin/manage.html#/csmessage';
            window.location.reload();
        });
    }

});

adminModule.controller('accountController', function ($scope, $http) {
    $('li[role]').removeClass('active');
    $('li[role="manage_account"]').addClass('active');
    $http.get(app + '/user/all').success(function (data) {
        $scope.userList = data;
    });

    $http.get(app + '/user/account/stat').success(function (data) {
        $scope.totalAccount = data.totalAccount;
        $scope.totalMember = data.totalMember;
    });


    $scope.deposit = function (username) {
        $scope.username = username;
    }


    $scope.save = function () {
        var user = {
            username: $scope.username,
            account: $scope.depositAccount
        }
        if (user.username == null) {
            alert('该用户尚未注册,请先注册！');
            return;
        }
        console.log(user)
        $http.post(app + '/user/account/save', user).success(function () {
            alert('保存成功');
            location.href = app + '/admin/manage.html#/account';
            location.reload();
        }).error(function () {
            alert('保存失败');
            location.href = app + '/admin/manage.html#/account';
            location.reload();
        });
    }

});

adminModule.controller('materialController', function ($scope, $http, $routeParams, $location) {
    $('li[role]').removeClass('active');
    $('li[role="manage_material"]').addClass('active');

    var picurl = app + '/material/picture/list';

    $http.get(picurl).success(function (data, status, headers, config) {
        $scope.picList = data;
    });

    $scope.delete = function (picLoc) {
        if (confirm('确认删除')) {
            $http.post(app + '/material/picture/delete', {picLoc: picLoc}).success(function () {
                alert('删除成功！');
                location.href = app + '/admin/manage.html#/material';
                location.reload();
            }).error(function () {
                alert('删除失败！');
            });
        }
    }

    $scope.create = function () {
        $('#pic').val('');
    };

    $scope.upload = function () {
        if ($('#pic').val() != '') {
            var pic = new FormData();
            pic.append("pic", $("#pic").get(0).files[0]);
            $.ajax({
                type: 'POST',
                url: app + "/material/picture/upload",
                data: pic,
                processData: false,
                contentType: false,
                success: function () {
                    alert("修改成功");
                    location.href = app + '/admin/manage.html#/material';
                    location.reload();
                },
                error: function () {
                    alert("修改失败");
                }
            });
        }
    }
});


adminModule.filter('translate', function () {
    return function (text, type) {
        if (!angular.isString(text)) {
            return text;
        }
        var translatedText;

        if (type == 't') {
            for (var key in tdata) {
                if (tdata[key].toUpperCase().indexOf(text) != -1) {
                    //console.log(key + " " + vkey);
                    translatedText = key;
                    return translatedText;
                }
            }
        } else {
            for (var key in cdata) {
                for (var vkey in cdata[key]) {
                    if (cdata[key][vkey].toUpperCase().indexOf(text) != -1) {
                        //console.log(key + " " + vkey);
                        translatedText = vkey;
                        return translatedText;
                    }
                }
            }
        }
    };
});

adminModule.controller('contentController', function ($scope, $http, $routeParams, $location) {
    $('li[role]').removeClass('active');
    $('li[role="manage_content"]').addClass('active');

    var contentUrl = app + '/material/content';

    $http.get(contentUrl).success(function (data, status, headers, config) {
        $scope.contentList = data;
    });

    $scope.switch = function (menu) {
        $scope.menu = menu;
    }

    $scope.upload = function () {
        if ($('#pic').val() != '') {
            var pic = new FormData();
            pic.append("pic", $("#pic").get(0).files[0]);
            pic.append("menu", $scope.menu);
            $.ajax({
                type: 'POST',
                url: app + "/material/content/switch",
                data: pic,
                processData: false,
                contentType: false,
                success: function () {
                    alert("替换成功");
                    location.href = app + '/admin/manage.html#/content';
                    location.reload();
                },
                error: function () {
                    alert("替换失败");
                }
            });
        }
    }
});

adminModule.filter('tochinese', function () {
    return function (text) {
        if (text == true) {
            return '是'
        } else {
            return '否'
        }
    };
});

adminModule.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/order', {
            controller: 'orderController',
            templateUrl: 'orders.html'
        })
        .when('/product/category/:category', {
            controller: 'productController',
            templateUrl: 'product.html'
        })
        .when('/dispatch', {
            controller: 'dispatchController',
            templateUrl: 'dispatch.html'
        })
        .when('/coupon', {
            controller: 'couponController',
            templateUrl: 'coupon.html'
        })
        .when('/account', {
            controller: 'accountController',
            templateUrl: 'account.html'
        })
        .when('/message', {
            controller: 'messageController',
            templateUrl: 'message.html'
        })
        .when('/csmessage', {
            controller: 'csmessageController',
            templateUrl: 'csmessage.html'
        })
        .when('/content', {
            controller: 'contentController',
            templateUrl: 'content.html'
        })
        .when('/material', {
            controller: 'materialController',
            templateUrl: 'material.html'
        })
        .otherwise({
            redirectTo: '/product/category/nianmiji'
        });
}]);