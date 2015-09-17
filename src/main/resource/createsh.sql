/*
Navicat MySQL Data Transfer

Source Server         : Songda Database
Source Server Version : 50543
Source Host           : 120.26.37.219:3306
Source Database       : createsh

Target Server Type    : MYSQL
Target Server Version : 50543
File Encoding         : 65001

Date: 2015-09-17 22:21:34
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for administrator
-- ----------------------------
DROP TABLE IF EXISTS `administrator`;
CREATE TABLE `administrator` (
  `username` varchar(45) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of administrator
-- ----------------------------
INSERT INTO `administrator` VALUES ('admin', 'createsh', 'ROLE_ADMIN');

-- ----------------------------
-- Table structure for bill_order
-- ----------------------------
DROP TABLE IF EXISTS `bill_order`;
CREATE TABLE `bill_order` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` varchar(255) CHARACTER SET utf8mb4 DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `wechat_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `bill` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `order_ts` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `delivery_ts` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `buyer_info` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `buyer_address` text,
  `consignee` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `consignee_contact` varchar(45) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `status` varchar(45) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `confirm_code` varchar(45) DEFAULT NULL,
  `confirm_bill` text,
  `confirm_ts` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of bill_order
-- ----------------------------
INSERT INTO `bill_order` VALUES ('79', '灵达', 'darlingtld', 'oh88lwyr0lDwuey9tr3o1hUIajPA', '{\"items\":[{\"amount\":2,\"description\":\"粮源食品碾米机 品质保证 健康食品保证 \",\"picurl\":\"product_images/nianmiji.jpg\",\"productId\":215,\"productName\":\"碾米机\",\"productPrice\":1299,\"productUnit\":\"台\"}],\"totalAmount\":2,\"totalPrice\":2598}', '2015-09-05 07:53:02', '2015/09/05 07:52', 'lingda', '长阳路', '灵达', '13402188638', '未配送', '724733796', null, null);
INSERT INTO `bill_order` VALUES ('80', 'lingda', 'darlingtld', 'oh88lwyr0lDwuey9tr3o1hUIajPA', '{\"items\":[{\"amount\":2,\"description\":\"家用鲜米机\",\"picurl\":\"product_images/nianmiji.jpg\",\"productId\":215,\"productName\":\"家用鲜米机\",\"productPrice\":2000,\"productUnit\":\"台\"}],\"totalAmount\":2,\"totalPrice\":4000}', '2015-09-06 11:51:29', '2015/09/06 11:50', '新中源大楼', '长阳路1930号', '灵达', '13402188638', '未配送', '951940405', null, null);
INSERT INTO `bill_order` VALUES ('83', '李含嘉', '李杰', 'oh88lw-vDzuoM7HmbNB-NwnbIES4', '{\"items\":[{\"$$hashKey\":\"object:34\",\"amount\":3,\"description\":\"精选优品寒地富硒谷\",\"picurl\":\"product_images/youpinheituxiaozhenzhu.jpg\",\"productId\":218,\"productName\":\"优品寒地富硒谷\",\"productPrice\":15,\"productUnit\":\"斤\"},{\"$$hashKey\":\"object:35\",\"amount\":\"1\",\"description\":\"精选优品黑土小珍珠\",\"picurl\":\"product_images/youpinheituxiaozhenzhu.jpg\",\"productId\":216,\"productName\":\"优品黑土小珍珠\",\"productPrice\":7,\"productUnit\":\"斤\"}],\"totalAmount\":4,\"totalPrice\":52}', '2015-09-15 13:43:17', '2015/09/16 15:40', '李杰', '上海市普陀区中山北路1715号', '李杰', '02161171230', '未配送', '062769990', null, null);
INSERT INTO `bill_order` VALUES ('84', 'Mz、', 'monica', 'oh88lw9CkJc9ByMyA7lhNCqtC4wc', '{\"items\":[{\"$$hashKey\":\"object:18\",\"amount\":4,\"description\":\"精选优品五常稻花香\",\"picurl\":\"product_images/youpinheituxiaozhenzhu.jpg\",\"productId\":217,\"productName\":\"优品五常稻花香\",\"productPrice\":12,\"productUnit\":\"斤\"}],\"totalAmount\":4,\"totalPrice\":48}', '2015-09-17 10:23:29', '2015/09/18 10:33', '张守艳', '普陀区中山北路1715号805', '张守艳', '13917444535', '未配送', '620090244', null, null);

-- ----------------------------
-- Table structure for coupon
-- ----------------------------
DROP TABLE IF EXISTS `coupon`;
CREATE TABLE `coupon` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `coupon_type` varchar(25) COLLATE utf8_unicode_ci DEFAULT NULL,
  `openid` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `start_time` datetime DEFAULT NULL,
  `end_time` datetime DEFAULT NULL,
  `reached_money` double(255,2) DEFAULT NULL,
  `deducted_money` double(255,2) DEFAULT NULL,
  `discount_factor` double(255,2) DEFAULT NULL,
  `used` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of coupon
-- ----------------------------

-- ----------------------------
-- Table structure for feedback
-- ----------------------------
DROP TABLE IF EXISTS `feedback`;
CREATE TABLE `feedback` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of feedback
-- ----------------------------
INSERT INTO `feedback` VALUES ('1', '%E4%B8%8D%E9%94%99=');
INSERT INTO `feedback` VALUES ('2', '不错');
INSERT INTO `feedback` VALUES ('3', 'bc');
INSERT INTO `feedback` VALUES ('4', 'bc啊啊啊');
INSERT INTO `feedback` VALUES ('5', '');

-- ----------------------------
-- Table structure for message
-- ----------------------------
DROP TABLE IF EXISTS `message`;
CREATE TABLE `message` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `openid` varchar(255) DEFAULT NULL,
  `content` text,
  `ts` datetime DEFAULT NULL,
  `has_read` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of message
-- ----------------------------
INSERT INTO `message` VALUES ('20', 'oh88lw5qzIAlCg6kVI6S3W2XYXNc', '欢迎您关注我们', '2015-09-06 16:30:45', '0');
INSERT INTO `message` VALUES ('21', 'oh88lwxkHk93He21A7lmJLuJmmz0', '欢迎您关注我们', '2015-09-07 22:07:43', '0');
INSERT INTO `message` VALUES ('22', 'oh88lwwjau2kNlgNNecFq2tjPg-I', '欢迎您关注我们', '2015-09-08 12:51:37', '0');
INSERT INTO `message` VALUES ('23', 'oh88lw_1PzVA5DGhGz2nJNAWLZF4', '欢迎您关注我们', '2015-09-09 09:20:07', '0');
INSERT INTO `message` VALUES ('24', 'oh88lw1SvRk0c7HNJl7uhJWiEV_w', '欢迎您关注我们', '2015-09-09 12:59:58', '0');
INSERT INTO `message` VALUES ('25', 'oh88lw12KqKj-5BrXPTB_EJvWTIU', '欢迎您关注我们', '2015-09-09 14:47:16', '0');
INSERT INTO `message` VALUES ('26', 'oh88lw6vJG7g441gJMGHzGh2j9Og', '欢迎您关注我们', '2015-09-09 15:20:42', '0');
INSERT INTO `message` VALUES ('27', 'oh88lwyCXh16XMjCtxLlJhqEgQxU', '欢迎您关注我们', '2015-09-11 20:27:11', '0');
INSERT INTO `message` VALUES ('28', 'oh88lw0WbfC8VYiTOBd4NpogMODE', '欢迎您关注我们', '2015-09-15 20:56:11', '0');
INSERT INTO `message` VALUES ('29', 'oh88lw8WC6we-aXAVMppyByuEQ7s', '欢迎您关注我们', '2015-09-16 16:29:42', '0');
INSERT INTO `message` VALUES ('30', 'oh88lw2hOzkugJQSF22kqZpF0-iQ', '欢迎您关注我们', '2015-09-16 16:33:10', '0');
INSERT INTO `message` VALUES ('31', 'oh88lw6_JSjwYTLKFJxHHCV3OZyw', '欢迎您关注我们', '2015-09-16 16:35:11', '0');
INSERT INTO `message` VALUES ('32', 'oh88lw7YHK44AVgj_Ip8AGGWR4aI', '欢迎您关注我们', '2015-09-17 18:17:10', '0');
INSERT INTO `message` VALUES ('33', 'oh88lw45fMV8l0epZSf1K9SqWtK4', '欢迎您关注我们', '2015-09-17 21:45:38', '0');

-- ----------------------------
-- Table structure for procurement
-- ----------------------------
DROP TABLE IF EXISTS `procurement`;
CREATE TABLE `procurement` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) DEFAULT NULL,
  `procprice` double DEFAULT NULL,
  `procindex` double DEFAULT NULL,
  `date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of procurement
-- ----------------------------

-- ----------------------------
-- Table structure for product
-- ----------------------------
DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `type` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `category` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `price` double DEFAULT NULL,
  `unit` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `picurl` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `picurl_zoom` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `onsale` int(1) DEFAULT '0',
  `data_change_last_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `order_index` int(11) DEFAULT NULL,
  `detail` text COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=223 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of product
-- ----------------------------
INSERT INTO `product` VALUES ('215', '家用鲜米机', '家用鲜米机', 'MACHINE', 'NIANMIJI', '2000', '台', 'product_images/nianmiji.jpg', null, '0', '2015-09-07 21:22:14', '1', '<p>产品名称：家用鲜米机</p>\n<p>用途：将稻谷碾为鲜米</p>\n<p>产品规格：35x25x34cm</p>\n<p>整机重量：6.9kg</p>\n<p>生产速率：18-22kg/h（约每4分钟可碾一公斤稻谷）</p>\n<p>最大连续工作时间：90分钟</p>\n<p>适用范围：稻谷（长粒、圆粒均可）</p>\n<img src=\'product_images/nianmiji1.jpg\'>\n一台小巧轻便、操作简单的新型家用碾米设备。\n为了让稻谷达到最佳的食用品质，远离过度加工。梁源引进国外先进技术，研制出了这款家用鲜米机。配送稻谷的同时，免费为每户顾客搭配一台鲜米机，供顾客随吃随碾。保证每天都吃到健康、营养、美味和新鲜的大米。');
INSERT INTO `product` VALUES ('216', '优品黑土小珍珠', '精选优品黑土小珍珠', 'MIMIANLIANGYOU', 'DAMI', '7', '斤', 'product_images/youpinheituxiaozhenzhu.jpg', null, '0', '2015-09-10 21:04:59', '0', '谷粒饱满、圆润，出米率高。采用先进稻种筛选设备精选而来的原种谷，即第一代种子精选稻谷。纯度极高99%。（普通优质谷纯度为85%－90%）。黑土小珍珠，产自中国鹤岗。\n鹤岗——三金之城、湿地之都。三江平原粮食主产区，黑龙江、松花江在鹤岗境内汇合，两江冲积平原8300k㎡，是三江平原的腹地。其稻谷，选自优质遗传基因稻种；稀有肥沃黑土地种植；中俄界河—黑龙江，世界罕见原生态水源灌溉；森林覆盖率高，空气质量高，地广人稀，天然氧吧；雨热同季，昼夜温差大，营养物质积累丰富；水稻专家精心培育，蛙鱼生态捉虫，无农药化肥。一年一熟，十分珍贵。<img src=\'product_images/daogu1.jpg\'>\n米粒圆润，色泽洁白，米质油润、味道香甜，营养丰富，富含蛋白质、脂肪。新鲜碾磨的圆圆米粒上均匀的分布着一层薄薄的米粉，就像刚摘下的带着白霜的葡萄一样诱人。<img src=\'product_images/daogu2.jpg\'>\n饭粒洁白晶莹、粘而不腻，饭粒表面油光洁白，味道极佳剩饭也不回生，不论冷吃还是热吃，满口留香，松软不沾且有弹性。<img src=\'product_images/daogu3.jpg\'>\n饱满软糯，香滑可口。一年一季的黑土小珍珠，也是熬粥的上乘之选，保留完整的胚芽加上新鲜现磨，其营养与美味程度不言而喻。\n');
INSERT INTO `product` VALUES ('217', '优品五常稻花香', '精选优品五常稻花香', 'MIMIANLIANGYOU', 'DAMI', '12', '斤', 'product_images/youpinheituxiaozhenzhu.jpg', null, '0', '2015-09-10 21:04:59', '1', '谷粒饱满、修长，香气浓郁。欧盟认证标准。采用先进稻种筛选设备精选而来的种级谷，即精选种子稻谷。每一颗都产自五常，晒足了一百四十天的太阳，喝饱了张广才岭的山泉水，才告别了北纬四十五度肥沃的黑土地，来到您的餐桌。\n五常——“张广才岭下的水稻王国”。与法国的波尔多地区同纬度（44°06′—45°），世界五大黄金植物带之一。绵延几千里长白山西麓，12亿年冲击而成的寒地草炭黑土；雨雪甘露而成的林间山泉；雨热同季，昼夜温差大，营养物质积累丰富。五常之米，松软香甜，油亮润滑。百万良田，一年一季，极端稀缺。\n<img src=\'product_images/daogu1.jpg\'>\n米粒均匀，色泽光亮，醇厚绵长，芳香四溢。新鲜碾磨的米粒上一层薄薄的米粉，加上碾磨的温度，生米还比熟饭香。轻轻淘拭两遍，将水沥出，静置20分钟，加入矿泉水蒸煮，随着水温的升高，香气满屋。<img src=\'product_images/daogu2.jpg\'>\n饭食味清淡略甜，棉软略粘，芳香爽口，饭粒表面油光艳丽，剩饭不回生。是老百姓餐桌上的健康首选。若食用前滴入几滴稻米油拌匀，口味更佳。正所谓“一餐五常米，浑忘酒肉香”。<img src=\'product_images/daogu3.jpg\'>\n口感绵软滑溜,香气扑鼻。稻花香熬粥，是一场嗅觉与味觉的盛宴。耐下心来熬煮一碗白粥，清理一下在大鱼大肉过后昏沉不振的肠胃，平和在纷乱世俗中疲惫不堪的心绪。简单，纯粹。\n');
INSERT INTO `product` VALUES ('218', '优品寒地富硒谷', '精选优品寒地富硒谷', 'MIMIANLIANGYOU', 'DAMI', '15', '斤', 'product_images/youpinheituxiaozhenzhu.jpg', null, '0', '2015-09-06 20:42:30', '2', '硒是人体不可缺少的微量元素，与人体的免疫作用和健康长寿密切相关，被誉为“生命火种”、“抗癌之王”、“心脏的守护神”。谷以“硒”为贵！\n富硒谷，通过水稻补硒，经过生物转化，把无机硒转化为有机硒，并贮存在水稻中，使谷中的硒元素更利于人体吸收，是十分难得的健康食品。出产自“鹤城”齐齐哈尔扎龙国家级自然保护区，该地区空气清新、无工业污染，是世界上最大的沼泽湿地，不仅为珍奇的丹顶鹤提供了优良栖息地，也为富硒谷创造了不可复制的自然条件。其土地属于寒地黑土，天然有机物质含量丰富，引天然嫩江水灌溉，使生产出的稻谷颗粒饱满、软糯甘甜，特有的浓郁谷香堪称谷中极品。<img src=\'product_images/daogu1.jpg\'>\n米颗粒饱满，色泽透亮，米香浓郁。优良的取种，加上传统工艺培植，使米中的蛋白质和氨基酸达到黄金配比，是世界卫生组织认定的最佳配比模式，可消化性超过百分之九十，营养价值高，极易被人体消化吸收。<img src=\'product_images/daogu2.jpg\'>\n饭不仅食味软糯甘甜，香气浓郁，同时还能补硒。人类有40多种疾病都与缺硒有关，我国缺硒人口达7亿以上，缺硒已严重威胁我国国民的身体健康。国家已成立全民补硒工程推广委员会，号召人们要像补碘一样补硒。<img src=\'product_images/daogu3.jpg\'>\n饱满软糯，香滑可口。同样产于黑土地的富硒米煮粥，不仅营养，同时兼具保健的功能，且易于消化吸收。是老人和孩子的最佳保健营养品。\n');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `wechat_id` varchar(255) NOT NULL DEFAULT '0',
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  `role` varchar(45) DEFAULT NULL,
  `headimgurl` text,
  `consignee` varchar(45) DEFAULT NULL,
  `consignee_contact` varchar(45) DEFAULT NULL,
  `buyer_info` varchar(255) DEFAULT NULL,
  `buyer_address` text,
  `account` double(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('26', 'oh88lwyr0lDwuey9tr3o1hUIajPA', 'darlingtld', '123456', null, '灵达', 'USER', 'http://wx.qlogo.cn/mmopen/wzJhLVPsrd06ia1IOb3oxvTsaxO3MzicglGboAtSwia6e9eIMu61N0jXe6LnMwsOZrFKFOctnbUX4q6Bx3dR2XyRianmwgcXEaicib/0', '灵达', '13402188638', '新中源大楼', '长阳路1930号', '2000.00');
INSERT INTO `user` VALUES ('27', 'oh88lw9CkJc9ByMyA7lhNCqtC4wc', 'monica', 'zhang228701', null, 'Mz、', 'USER', 'http://wx.qlogo.cn/mmopen/ajNVdqHZLLB0O1bphE5hn8xFlhCjS1fBsxwTSIE7hacoURN2ly0fI4LT7pPN6HW6EgkJ4zh9dtvdo5XicUHsbmg/0', '张守艳', '13917444535', '张守艳', '普陀区中山北路1715号805', '2000.00');
INSERT INTO `user` VALUES ('29', 'oh88lw_1PzVA5DGhGz2nJNAWLZF4', '何文俊', '731127', null, '天行健', 'USER', 'http://wx.qlogo.cn/mmopen/a5ejNnmFDsCT6dlRFqyeNl18asrcX0rUdyaz6tC4Y4eFwe43SOtr3tyXibvrkNYlcWibwicpASibn2ImgJLFpSL6hCcewicSFJqAh/0', null, null, null, null, '0.00');
INSERT INTO `user` VALUES ('31', 'oh88lwyy9zRJFdRNnoQTktd_A5bI', null, null, null, '品味人生', 'USER', 'http://wx.qlogo.cn/mmopen/CpUViaz60DZZ1tujqss2Y7PMBajfjzrTShkQNXzOnrnqfAJFN67jJKcQNgcguricc96vNibGq3JqFebZAOlXOFGN5cvuRgichaml/0', null, null, null, null, '0.00');
INSERT INTO `user` VALUES ('32', 'oh88lw-vDzuoM7HmbNB-NwnbIES4', '李杰', '86378229', null, '李含嘉', null, 'http://wx.qlogo.cn/mmopen/a5ejNnmFDsCT6dlRFqyeNv38SDhoqH4ApVzEt9NkO6p3NicIiciaqYBKwpOytk0VKTvcH9fl2K0ERzRakCX8WN76uZKMCMEFHFia/0', '李杰', '02161171230', '李杰', '上海市普陀区中山北路1715号', '2000.00');
INSERT INTO `user` VALUES ('33', 'oh88lw7YHK44AVgj_Ip8AGGWR4aI', '邵建飞', '940816', null, '梁源', null, 'http://wx.qlogo.cn/mmopen/Q3auHgzwzM4fWa4lmhVtBv2Lia2MnFU2kqCzEc7H0PkjgnahlZ07mYkDRxaRxevichic4fM0USvLoBZ5tXAD6mKRN8fDibFyNLXqy4O8reicWUkU/0', null, null, null, null, '2000.00');
