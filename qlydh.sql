/*
 Navicat Premium Data Transfer

 Source Server         : mysql local
 Source Server Type    : MySQL
 Source Server Version : 100427
 Source Host           : localhost:3306
 Source Schema         : qlydh

 Target Server Type    : MySQL
 Target Server Version : 100427
 File Encoding         : 65001

 Date: 16/10/2023 19:43:30
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for _user
-- ----------------------------
DROP TABLE IF EXISTS `_user`;
CREATE TABLE `_user`  (
  `id` int NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `firstname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `lastname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `role` enum('ADMIN','MANAGER','USER') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of _user
-- ----------------------------

-- ----------------------------
-- Table structure for _user_seq
-- ----------------------------
DROP TABLE IF EXISTS `_user_seq`;
CREATE TABLE `_user_seq`  (
  `next_val` bigint NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of _user_seq
-- ----------------------------
INSERT INTO `_user_seq` VALUES (1);

-- ----------------------------
-- Table structure for book
-- ----------------------------
DROP TABLE IF EXISTS `book`;
CREATE TABLE `book`  (
  `created_by` int NOT NULL,
  `id` int NOT NULL,
  `last_modified_by` int NULL DEFAULT NULL,
  `create_date` datetime(6) NOT NULL,
  `last_modified` datetime(6) NULL DEFAULT NULL,
  `author` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `isbn` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of book
-- ----------------------------

-- ----------------------------
-- Table structure for book_seq
-- ----------------------------
DROP TABLE IF EXISTS `book_seq`;
CREATE TABLE `book_seq`  (
  `next_val` bigint NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of book_seq
-- ----------------------------
INSERT INTO `book_seq` VALUES (1);

-- ----------------------------
-- Table structure for classes
-- ----------------------------
DROP TABLE IF EXISTS `classes`;
CREATE TABLE `classes`  (
  `course_id` int NOT NULL,
  `id` int NOT NULL,
  `status` int NULL DEFAULT NULL,
  `created_at` datetime(6) NULL DEFAULT NULL,
  `updated_at` datetime(6) NULL DEFAULT NULL,
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `UK_ivcaxrbwnp0dosg2gj4i3sxpq`(`code` ASC) USING BTREE,
  UNIQUE INDEX `UK_pgs3gcxax70h9jugbt24ugwcg`(`name` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of classes
-- ----------------------------
INSERT INTO `classes` VALUES (102, 1, 0, '2023-10-16 15:53:27.000000', '2023-10-16 18:35:48.000000', 'jav-1', 'jav 1');
INSERT INTO `classes` VALUES (1, 2, 1, '2023-10-16 15:53:33.000000', '2023-10-16 15:53:33.000000', 'R1001', 'R10001');
INSERT INTO `classes` VALUES (102, 52, 1, '2023-10-16 18:36:04.000000', '2023-10-16 18:36:04.000000', 'java-123', 'java 123');

-- ----------------------------
-- Table structure for classes_seq
-- ----------------------------
DROP TABLE IF EXISTS `classes_seq`;
CREATE TABLE `classes_seq`  (
  `next_val` bigint NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of classes_seq
-- ----------------------------
INSERT INTO `classes_seq` VALUES (151);

-- ----------------------------
-- Table structure for courses
-- ----------------------------
DROP TABLE IF EXISTS `courses`;
CREATE TABLE `courses`  (
  `id` int NOT NULL,
  `status` int NULL DEFAULT NULL,
  `user_id` int NOT NULL,
  `created_at` datetime(6) NULL DEFAULT NULL,
  `updated_at` datetime(6) NULL DEFAULT NULL,
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `UK_61og8rbqdd2y28rx2et5fdnxd`(`code` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of courses
-- ----------------------------
INSERT INTO `courses` VALUES (1, 1, 52, '2023-10-16 15:53:19.000000', '2023-10-16 17:48:38.000000', 'khoa_hoc_c#', 'c@#', 'Khóa học c#');
INSERT INTO `courses` VALUES (102, 1, 0, '2023-10-16 18:09:24.000000', '2023-10-16 18:09:24.000000', 'khoa-hoc-java', 'lớp java', 'Khóa học java');

-- ----------------------------
-- Table structure for courses_seq
-- ----------------------------
DROP TABLE IF EXISTS `courses_seq`;
CREATE TABLE `courses_seq`  (
  `next_val` bigint NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of courses_seq
-- ----------------------------
INSERT INTO `courses_seq` VALUES (201);

-- ----------------------------
-- Table structure for exercises
-- ----------------------------
DROP TABLE IF EXISTS `exercises`;
CREATE TABLE `exercises`  (
  `class_id` int NOT NULL,
  `id` int NOT NULL,
  `status` int NULL DEFAULT NULL,
  `type` int NULL DEFAULT NULL,
  `user_id` int NULL DEFAULT NULL,
  `created_at` datetime(6) NULL DEFAULT NULL,
  `deadline` datetime(6) NULL DEFAULT NULL,
  `updated_at` datetime(6) NULL DEFAULT NULL,
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `file` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of exercises
-- ----------------------------
INSERT INTO `exercises` VALUES (1, 2, 1, 0, 1, '2023-10-16 15:53:45.000000', '2023-07-26 07:00:00.000000', '2023-10-16 15:53:45.000000', 'sadad', NULL, 'asdasdasdasd');

-- ----------------------------
-- Table structure for exercises_seq
-- ----------------------------
DROP TABLE IF EXISTS `exercises_seq`;
CREATE TABLE `exercises_seq`  (
  `next_val` bigint NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of exercises_seq
-- ----------------------------
INSERT INTO `exercises_seq` VALUES (101);

-- ----------------------------
-- Table structure for student_has_exercises
-- ----------------------------
DROP TABLE IF EXISTS `student_has_exercises`;
CREATE TABLE `student_has_exercises`  (
  `class_id` int NULL DEFAULT NULL,
  `exercise_id` int NULL DEFAULT NULL,
  `id` int NOT NULL,
  `mark` double NULL DEFAULT NULL,
  `student_id` int NULL DEFAULT NULL,
  `created_at` datetime(6) NULL DEFAULT NULL,
  `updated_at` datetime(6) NULL DEFAULT NULL,
  `file` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of student_has_exercises
-- ----------------------------
INSERT INTO `student_has_exercises` VALUES (1, 1, 1, 1, 1, '2023-10-16 15:55:32.000000', '2023-10-16 15:56:37.000000', NULL);

-- ----------------------------
-- Table structure for student_has_exercises_seq
-- ----------------------------
DROP TABLE IF EXISTS `student_has_exercises_seq`;
CREATE TABLE `student_has_exercises_seq`  (
  `next_val` bigint NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of student_has_exercises_seq
-- ----------------------------
INSERT INTO `student_has_exercises_seq` VALUES (51);

-- ----------------------------
-- Table structure for token
-- ----------------------------
DROP TABLE IF EXISTS `token`;
CREATE TABLE `token`  (
  `expired` bit(1) NOT NULL,
  `id` int NOT NULL,
  `revoked` bit(1) NOT NULL,
  `user_id` int NULL DEFAULT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `token_type` enum('BEARER') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `UK_pddrhgwxnms2aceeku9s2ewy5`(`token` ASC) USING BTREE,
  INDEX `FKiblu4cjwvyntq3ugo31klp1c6`(`user_id` ASC) USING BTREE,
  CONSTRAINT `FKiblu4cjwvyntq3ugo31klp1c6` FOREIGN KEY (`user_id`) REFERENCES `_user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of token
-- ----------------------------

-- ----------------------------
-- Table structure for token_seq
-- ----------------------------
DROP TABLE IF EXISTS `token_seq`;
CREATE TABLE `token_seq`  (
  `next_val` bigint NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of token_seq
-- ----------------------------
INSERT INTO `token_seq` VALUES (1);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int NOT NULL,
  `role` int NULL DEFAULT NULL,
  `status` int NULL DEFAULT NULL,
  `created_at` datetime(6) NULL DEFAULT NULL,
  `updated_at` datetime(6) NULL DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `full_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `gender` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `UK_ob8kqyqqgmefl0aco34akdtpe`(`email` ASC) USING BTREE,
  UNIQUE INDEX `UK_589idila9li6a4arw1t8ht1gx`(`phone` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 1, 1, '2023-10-16 15:53:10.000000', '2023-10-16 15:53:10.000000', 'sss', NULL, 'le1234@gmail.com', 'le', 'male', '$2a$10$/J7vaIQQ7W5ahFIVGktCZOefKcGwsyDQ3Aq/H.au/.8IXQFNyPvje', '09828372220');
INSERT INTO `user` VALUES (2, 2, 1, '2023-10-16 16:28:12.000000', '2023-10-16 16:28:12.000000', 'sss', NULL, 'le12234@gmail.com', 'le', 'male', '$2a$10$uHLXwkP0M/Myn9bZoOORFuJzkeW/nRHYtLemG3AvJ69x76f49AjFC', '098283723220');
INSERT INTO `user` VALUES (52, 2, 1, '2023-10-16 16:29:20.000000', '2023-10-16 17:48:38.000000', 'sss', NULL, 'le11@gmail.com', 'le', 'male', '$2a$10$emJc98oClVYVBwvJZpPdcOqhdQczoN5qOB/nGfqVsl3RTU5huCBPe', '098283120');
INSERT INTO `user` VALUES (53, 3, 1, '2023-10-16 16:29:48.000000', '2023-10-16 16:29:48.000000', 'sss', NULL, 'le114@gmail.com', 'le', 'male', '$2a$10$qE/lwyC/BKP1mKFm56/CWuBi0vEYju3B3nZCEkfoXZsJxwPH1c6u6', '0982834120');
INSERT INTO `user` VALUES (54, 3, 1, '2023-10-16 16:29:54.000000', '2023-10-16 17:50:19.000000', 'sss', NULL, 'le1142@gmail.com', 'le', 'male', '$2a$10$lh8ArRBlkalS3s2rtKtbiuqOAGO/o6FRu9s0U4lLlNqsCkwo8oGbW', '09828324120');
INSERT INTO `user` VALUES (102, 1, 1, '2023-10-16 16:47:36.000000', '2023-10-16 16:47:36.000000', 'Hà Nội', NULL, 'test@gmail.com', 'admin', 'MALE', '$2a$10$PWi7kALwGUyGotrtQTpv0etGsKpQEAGTrzjFrP719wN4N8RYygFUm', '0163254987');
INSERT INTO `user` VALUES (152, 2, 0, '2023-10-16 16:59:40.000000', '2023-10-16 16:59:40.000000', 'Phú thọ', NULL, 'teacher123@gmail.com', 'teacher 123', 'OTHER', '$2a$10$Inf9Iw3sh2vVlotTAvbrI.yWKAkdQiRyOMV1y.L2n1xGz2sGOzVDa', '0962503154');
INSERT INTO `user` VALUES (202, 2, 0, '2023-10-16 17:01:38.000000', '2023-10-16 17:01:38.000000', 'Phú thọ', NULL, 'teacher1234@gmail.com', 'teacher 1234', 'OTHER', '$2a$10$kVcAktvD/zs/zREeaOiojeJuM2lYts5FxddekJelu39tpiVauq0sy', '096250312');

-- ----------------------------
-- Table structure for user_courses_classes
-- ----------------------------
DROP TABLE IF EXISTS `user_courses_classes`;
CREATE TABLE `user_courses_classes`  (
  `class_id` int NULL DEFAULT NULL,
  `course_id` int NULL DEFAULT NULL,
  `id` int NOT NULL,
  `user_id` int NULL DEFAULT NULL,
  `created_at` datetime(6) NULL DEFAULT NULL,
  `updated_at` datetime(6) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_courses_classes
-- ----------------------------

-- ----------------------------
-- Table structure for user_courses_classes_seq
-- ----------------------------
DROP TABLE IF EXISTS `user_courses_classes_seq`;
CREATE TABLE `user_courses_classes_seq`  (
  `next_val` bigint NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_courses_classes_seq
-- ----------------------------
INSERT INTO `user_courses_classes_seq` VALUES (1);

-- ----------------------------
-- Table structure for user_seq
-- ----------------------------
DROP TABLE IF EXISTS `user_seq`;
CREATE TABLE `user_seq`  (
  `next_val` bigint NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_seq
-- ----------------------------
INSERT INTO `user_seq` VALUES (301);

SET FOREIGN_KEY_CHECKS = 1;
