
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin_sms_log
-- ----------------------------
DROP TABLE IF EXISTS `admin_sms_log`;
CREATE TABLE `admin_sms_log` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '记录id',
  `user_id` int(10) unsigned DEFAULT '0' COMMENT '用户id',
  `ip` varchar(16) DEFAULT NULL COMMENT '用户ip',
  `biz_id` varchar(32) DEFAULT NULL COMMENT '三方流水号',
  `content` varchar(70) DEFAULT NULL COMMENT '短信发送内容',
  `code` int(6) unsigned DEFAULT NULL COMMENT '短信验证码',
  `tid` varchar(16) DEFAULT NULL COMMENT '模版id',
  `mobile` char(11) DEFAULT '' COMMENT '用户手机号',
  `creator` varchar(16) DEFAULT NULL,
  `modifier` varchar(16) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `admin_sms_log_mobile` (`mobile`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of admin_sms_log
-- ----------------------------
BEGIN;
INSERT INTO `admin_sms_log` VALUES (1, 0, '127.0.0.1', '', '', 180282, 'SMS_150741810', '15558155021', NULL, NULL, '2020-01-10 03:09:30', '2020-01-10 03:09:30', NULL);
INSERT INTO `admin_sms_log` VALUES (2, 0, '127.0.0.1', '', '', 286118, 'SMS_150741810', '15558155021', NULL, NULL, '2020-01-10 03:10:38', '2020-01-10 03:10:38', '2020-01-10 03:10:44');
INSERT INTO `admin_sms_log` VALUES (3, 0, '127.0.0.1', '', '', 573672, 'SMS_150741810', '15558155021', NULL, NULL, '2020-01-10 03:13:40', '2020-01-10 03:13:40', '2020-01-10 03:13:48');
INSERT INTO `admin_sms_log` VALUES (4, 0, '172.16.237.109', '', '', 947478, 'SMS_150741810', '15558155021', NULL, NULL, '2020-01-23 02:49:22', '2020-01-23 02:49:22', NULL);
INSERT INTO `admin_sms_log` VALUES (5, 0, '172.16.237.109', '', '', 929870, 'SMS_150741810', '15558155022', NULL, NULL, '2020-01-28 09:20:09', '2020-01-28 09:20:09', '2020-01-28 09:20:15');
INSERT INTO `admin_sms_log` VALUES (6, 0, '172.16.237.109', '', '', 781663, 'SMS_150741810', '15558155023', NULL, NULL, '2020-01-28 09:22:20', '2020-01-28 09:22:20', '2020-01-28 09:22:25');
COMMIT;

-- ----------------------------
-- Table structure for admin_sys_menu
-- ----------------------------
DROP TABLE IF EXISTS `admin_sys_menu`;
CREATE TABLE `admin_sys_menu` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '菜单id',
  `name` varchar(5) DEFAULT NULL COMMENT '菜单名称',
  `url` varchar(32) DEFAULT NULL COMMENT '菜单地址',
  `icon` varchar(16) DEFAULT NULL COMMENT '菜单icon',
  `desc` varchar(16) DEFAULT NULL COMMENT '菜单描述',
  `sort` int(10) unsigned DEFAULT '0' COMMENT '菜单排序',
  `parent_id` int(10) unsigned DEFAULT '0' COMMENT '父级菜单id',
  `level` int(10) unsigned DEFAULT '0' COMMENT '菜单等级',
  `creator` varchar(16) DEFAULT NULL,
  `modifier` varchar(16) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `admin_sys_menu_parent_id` (`parent_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of admin_sys_menu
-- ----------------------------
BEGIN;
INSERT INTO `admin_sys_menu` VALUES (1, '权限管理', '/auth', 'menu-unfold', '权限管理', 10, 0, 1, NULL, 'landluck', '2020-01-10 11:19:21', '2020-01-28 09:05:19', NULL);
INSERT INTO `admin_sys_menu` VALUES (2, '菜单管理', '/auth/menu', 'menu', '菜单管理', 1, 1, 2, NULL, 'landluck', '2020-01-10 11:19:56', '2020-01-28 09:01:40', NULL);
INSERT INTO `admin_sys_menu` VALUES (3, '用户管理', '/auth/user', 'user', '用户管理', 2, 1, 2, 'landluck', 'landluck', '2020-01-10 05:24:45', '2020-01-10 05:24:45', NULL);
INSERT INTO `admin_sys_menu` VALUES (4, '角色管理', '/auth/role', 'team', '角色管理', 3, 1, 2, 'landluck', 'landluck', '2020-01-10 05:25:20', '2020-01-10 05:25:20', NULL);
INSERT INTO `admin_sys_menu` VALUES (5, '首页', '/dashboard', 'dashboard', '首页', 1, 0, 1, 'landluck', 'landluck', '2020-01-10 05:29:40', '2020-01-25 09:13:38', NULL);
INSERT INTO `admin_sys_menu` VALUES (6, '系统介绍', '/dashborad/intro', 'read', '系统介绍', 1, 5, 2, 'landluck', 'landluck', '2020-01-10 05:30:05', '2020-01-10 05:33:31', NULL);
COMMIT;

-- ----------------------------
-- Table structure for admin_sys_role
-- ----------------------------
DROP TABLE IF EXISTS `admin_sys_role`;
CREATE TABLE `admin_sys_role` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '角色id',
  `name` varchar(12) DEFAULT NULL COMMENT '角色名称',
  `creator` varchar(16) DEFAULT NULL,
  `modifier` varchar(16) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of admin_sys_role
-- ----------------------------
BEGIN;
INSERT INTO `admin_sys_role` VALUES (1, '超级管理员', NULL, NULL, '2020-01-10 11:17:34', '2020-01-10 11:17:38', NULL);
COMMIT;

-- ----------------------------
-- Table structure for admin_sys_role_menu
-- ----------------------------
DROP TABLE IF EXISTS `admin_sys_role_menu`;
CREATE TABLE `admin_sys_role_menu` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '记录id',
  `role_id` int(10) unsigned DEFAULT NULL COMMENT '角色id',
  `menu_id` int(10) unsigned DEFAULT NULL COMMENT '菜单id',
  `creator` varchar(16) DEFAULT NULL,
  `modifier` varchar(16) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `admin_sys_role_menu_role_id` (`role_id`),
  KEY `admin_sys_role_menu_menu_id` (`menu_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of admin_sys_role_menu
-- ----------------------------
BEGIN;
INSERT INTO `admin_sys_role_menu` VALUES (1, 1, 1, NULL, NULL, '2020-01-10 11:20:17', '2020-01-10 11:20:26', NULL);
INSERT INTO `admin_sys_role_menu` VALUES (2, 1, 2, NULL, NULL, '2020-01-10 11:20:35', '2020-01-10 11:20:39', NULL);
INSERT INTO `admin_sys_role_menu` VALUES (3, 1, 4, NULL, NULL, '2020-01-10 13:25:42', '2020-01-10 13:25:47', NULL);
INSERT INTO `admin_sys_role_menu` VALUES (4, 1, 3, 'landluck', 'landluck', '2020-01-10 05:26:08', '2020-01-10 05:26:08', NULL);
INSERT INTO `admin_sys_role_menu` VALUES (5, 1, 5, 'landluck', 'landluck', '2020-01-10 05:30:14', '2020-01-10 05:30:14', NULL);
INSERT INTO `admin_sys_role_menu` VALUES (6, 1, 6, 'landluck', 'landluck', '2020-01-10 05:30:14', '2020-01-10 05:30:14', NULL);
COMMIT;

-- ----------------------------
-- Table structure for admin_user
-- ----------------------------
DROP TABLE IF EXISTS `admin_user`;
CREATE TABLE `admin_user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `name` varchar(8) DEFAULT NULL COMMENT '用户名称',
  `account` varchar(16) DEFAULT NULL COMMENT '用户账号',
  `avatar` varchar(100) DEFAULT NULL COMMENT '用户头像',
  `password` char(32) DEFAULT NULL COMMENT '用户密码',
  `mobile` char(11) DEFAULT '' COMMENT '用户手机号',
  `role_id` int(10) unsigned DEFAULT '1' COMMENT '角色id',
  `status` tinyint(1) unsigned DEFAULT '1' COMMENT '角色状态：1 正常 0 禁用',
  `creator` varchar(16) DEFAULT NULL,
  `modifier` varchar(16) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `admin_user_mobile` (`mobile`),
  KEY `admin_user_account` (`account`),
  KEY `admin_user_role_id` (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of admin_user
-- ----------------------------
BEGIN;
INSERT INTO `admin_user` VALUES (1, 'admin1', 'admin1', 'http://image.landluck.com.cn/2020-01-10/11578634065020.jpeg', '363b4089e7829c514b33f966300d60ed', '15558155555', 1, 1, '', 'admin', '2020-01-10 03:13:48', '2020-01-28 09:07:07', NULL);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
