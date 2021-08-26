-- --------------------------------------------------------
-- 主机:                           127.0.0.1
-- 服务器版本:                        5.7.26 - MySQL Community Server (GPL)
-- 服务器操作系统:                      Win64
-- HeidiSQL 版本:                  9.5.0.5196
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- 导出 koa.blog 的数据库结构
CREATE DATABASE IF NOT EXISTS `koa.blog` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `koa.blog`;

-- 导出  表 koa.blog.category 结构
CREATE TABLE IF NOT EXISTS `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '标识id',
  `parent_id` int(11) NOT NULL DEFAULT '0' COMMENT '上级id',
  `parent_path` varchar(50) NOT NULL COMMENT '上级路径',
  `name` varchar(50) NOT NULL COMMENT '分类名',
  `sort` int(11) NOT NULL DEFAULT '0' COMMENT '排序',
  `title` varchar(50) DEFAULT NULL,
  `keywords` varchar(50) DEFAULT NULL,
  `description` varchar(50) DEFAULT NULL,
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='分类表';

-- 数据导出被取消选择。
-- 导出  表 koa.blog.document 结构
CREATE TABLE IF NOT EXISTS `document` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '标识id',
  `category_id` int(11) NOT NULL DEFAULT '0' COMMENT '分类id',
  `title` varchar(50) NOT NULL COMMENT '标题',
  `keywords` varchar(50) DEFAULT NULL COMMENT '关键字',
  `description` varchar(150) DEFAULT NULL COMMENT '描述',
  `tags` varchar(150) DEFAULT NULL COMMENT '标签',
  `logo` varchar(150) DEFAULT NULL COMMENT '封面logo',
  `views` int(11) NOT NULL DEFAULT '0' COMMENT '浏览量',
  `comments` int(11) NOT NULL DEFAULT '0' COMMENT '评论数',
  `markdown` text COMMENT 'markdown内容',
  `contents` text COMMENT '内容',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 数据导出被取消选择。
-- 导出  表 koa.blog.menu 结构
CREATE TABLE IF NOT EXISTS `menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '标识id',
  `parent_id` int(11) NOT NULL DEFAULT '0' COMMENT '上级id',
  `name` varchar(50) NOT NULL COMMENT '菜单名',
  `icon` varchar(50) DEFAULT NULL COMMENT '图标',
  `path` varchar(50) DEFAULT NULL COMMENT '路径',
  `sort` int(11) NOT NULL DEFAULT '0' COMMENT '排序',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='菜单表';

-- 数据导出被取消选择。
-- 导出  表 koa.blog.site 结构
CREATE TABLE IF NOT EXISTS `site` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '标识id',
  `name` varchar(50) NOT NULL COMMENT '名称',
  `keywords` varchar(50) DEFAULT NULL COMMENT '关键字',
  `description` varchar(150) DEFAULT NULL COMMENT '描述',
  `doc_count` int(11) NOT NULL DEFAULT '0' COMMENT '文档数',
  `comments` int(11) NOT NULL DEFAULT '0' COMMENT '评论数',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 数据导出被取消选择。
-- 导出  表 koa.blog.user 结构
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '标识id',
  `username` varchar(50) NOT NULL COMMENT '用户名',
  `password` varchar(50) NOT NULL COMMENT '密码',
  `salt` varchar(50) NOT NULL COMMENT '随机盐',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户表';

-- 数据导出被取消选择。
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
