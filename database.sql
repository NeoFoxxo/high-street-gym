-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 11, 2023 at 02:14 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `high-street-gym`
--

-- --------------------------------------------------------

--
-- Table structure for table `blog_posts`
--

CREATE TABLE `blog_posts` (
  `post_id` int(11) NOT NULL COMMENT 'pk for blog_posts table',
  `title` varchar(200) NOT NULL COMMENT 'the post title',
  `article` text NOT NULL COMMENT 'the actual article text',
  `user_id` int(11) NOT NULL COMMENT 'fk to the users table to get the username of the blog author',
  `publish_date` date NOT NULL DEFAULT current_timestamp() COMMENT 'date the post was published'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='where blog posts are stored';

--
-- Dumping data for table `blog_posts`
--

INSERT INTO `blog_posts` (`post_id`, `title`, `article`, `user_id`, `publish_date`) VALUES
(29, 'My Workout Routine', 'First I start with Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste quia minima nesciunt nostrum? Facere voluptatem earum ex voluptas modi rerum in maxime accusantium quas ducimus. Corrupti soluta ipsum eum, vel nobis velit aliquam dolore dolorem perferendis sunt eos id quia natus placeat, asperiores sed ipsam nisi fugit itaque numquam? Magnam repellendus exercitationem ratione rerum deserunt illo! Esse delectus error quam, veritatis sunt ab. Deleniti, possimus quidem porro ratione dignissimos rerum aliquam expedita tenetur quisquam sequi vel! Aut iure nam quam!', 1, '2023-07-26'),
(32, 'How I Stay Motivated', 'To keep myself motivated to train I \nLorem ipsum dolor sit amet consectetur adipisicing elit. Ut quos officia, amet suscipit fuga labore tempora quisquam, debitis quasi eaque cum. Soluta unde modi vitae odit ducimus dolorem voluptatibus assumenda quaerat necessitatibus, consectetur explicabo, distinctio quod enim fuga? Quam alias maxime ad, dicta obcaecati dolorem delectus voluptatum tempore quos aliquid qui, aspernatur reiciendis, itaque excepturi molestias veniam similique corrupti error!', 10, '2023-07-27'),
(34, 'Top 10 Workout Tips', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis soluta perferendis veniam saepe, unde beatae alias, velit, iusto dolorem molestiae doloremque nihil illum et dolorum quis voluptatibus pariatur fuga officiis! Tempora, quos magnam harum quod incidunt perspiciatis libero laudantium tempore, ea vero, ratione tenetur alias laborum omnis fuga cupiditate exercitationem. Velit nemo odit, laboriosam eligendi sint qui. Odio fugit quo recusandae est commodi magnam quaerat perferendis illo dolorum nemo consequatur neque, quas, hic nostrum alias assumenda nesciunt velit qui atque?', 14, '2023-07-28');

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `booking_id` int(11) NOT NULL COMMENT 'pk for the bookings table',
  `user_id` int(11) NOT NULL COMMENT 'fk to the users table',
  `class_schedule_id` int(11) NOT NULL COMMENT 'fk to the class_schedule table',
  `trainer_id` int(11) NOT NULL COMMENT 'fk to the trainers table'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='where bookings are stored';

-- --------------------------------------------------------

--
-- Table structure for table `classes`
--

CREATE TABLE `classes` (
  `class_id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `description` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `classes`
--

INSERT INTO `classes` (`class_id`, `name`, `description`, `image`) VALUES
(2, 'Yoga', 'Join us for our Yoga class, where you will learn the basics of yoga in a supportive and friendly environment. You will explore breathing techniques, simple poses, and mindfulness exercises that will enhance your well-being.', '/images/classes/yoga.jpg'),
(3, 'Pilates', 'Join us for our Pilates class, where you will learn the fundamentals of pilates in a welcoming and comfortable setting. You will practice core stability and movement control that will improve your posture and balance.', '/images/classes/pilates.jpg'),
(4, 'Abs', 'Join us for our Abs class, where you will perform a variety of exercises that target your abdominal muscles in a fun and energetic atmosphere. You will strengthen your core and burn calories with every move.', '/images/classes/abs.jpg'),
(5, 'High-Intensity Interval Training	', 'Join us for our High-Intensity Interval Training class, where you will perform short bursts of intense exercises followed by brief recovery periods. High-Intensity Interval Training produces fast results.', '/images/classes/hiit.jpg'),
(6, 'Indoor cycling', 'Join us for our Indoor Cycling class, where you will pedal along with inspiring instructors in a safe and controlled environment. You will adjust your resistance, speed, and intensity to suit your level and goals.', '/images/classes/indoorcycling.jpg'),
(7, 'Boxing', 'Join us for our Boxing class, where you will learn the basics of boxing in a supportive and friendly environment. You will practice punching and defense skills that will improve your coordination and agility.', '/images/classes/boxing.jpg'),
(8, 'Zumba', 'Join us for our Zumba class, where you will learn the basics of Zumba in a supportive and friendly environment. You will groove to rhythms that will get your heart pumping and your body moving.', '/images/classes/zumba.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `class_schedule`
--

CREATE TABLE `class_schedule` (
  `class_schedule_id` int(11) NOT NULL,
  `class_id` int(11) NOT NULL COMMENT 'fk to the classes table',
  `start_time` datetime NOT NULL COMMENT 'the starting time of the class',
  `end_time` datetime NOT NULL COMMENT 'the ending time of the class'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `class_schedule`
--

INSERT INTO `class_schedule` (`class_schedule_id`, `class_id`, `start_time`, `end_time`) VALUES
(1, 2, '2023-07-18 10:00:00', '2023-07-18 10:30:00'),
(2, 8, '2023-07-18 10:40:00', '2023-07-18 11:30:00'),
(3, 6, '2023-07-18 11:40:00', '2023-07-18 12:00:00'),
(4, 3, '2023-07-18 12:10:00', '2023-07-18 13:30:00'),
(5, 7, '2023-07-18 13:40:00', '2023-07-18 15:00:00'),
(6, 4, '2023-07-18 15:10:00', '2023-07-18 16:10:00'),
(7, 5, '2023-07-18 16:40:00', '2023-07-18 18:00:00'),
(8, 2, '2023-07-19 10:00:00', '2023-07-19 10:30:00'),
(9, 3, '2023-07-19 10:40:00', '2023-07-19 11:10:00'),
(10, 4, '2023-07-19 11:20:00', '2023-07-19 12:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `trainers`
--

CREATE TABLE `trainers` (
  `trainer_id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `class_id` int(11) NOT NULL COMMENT 'fk to the classes table to show what class the trainer is apart of'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `trainers`
--

INSERT INTO `trainers` (`trainer_id`, `name`, `class_id`) VALUES
(2, 'Joe Sand', 2),
(3, 'Rachel Black', 2),
(4, 'Michael Red', 4),
(5, 'Jack Hive', 5),
(6, 'Lisa Brent', 8),
(7, 'Sasha Wilson', 5),
(8, 'Jane Green', 3),
(9, 'Tess Orange', 6),
(10, 'John Ray', 7);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL COMMENT 'pk for the user table',
  `user_role` tinyint(1) NOT NULL DEFAULT 0 COMMENT '0 = customer 1 = admin',
  `password` varchar(255) NOT NULL COMMENT 'the user''s password',
  `email` varchar(100) NOT NULL COMMENT 'the user''s email',
  `username` varchar(100) NOT NULL COMMENT 'the user''s username'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='the table for admin users';

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `user_role`, `password`, `email`, `username`) VALUES
(1, 1, '$2b$08$Y4Ti33YtvRE0dVN633.y/eXNK7GNNJGEyhO1TAMyKyTqL097nLDly', 'jason@gmail.com', 'JasonYoung'),
(10, 0, '$2b$08$PyHLJ64IDxCtaQ4Zc20v9O/JPXpYQL8LlVRBrTgavNqb2XdftpIxK', 'jane@gmail.com', 'JaneOwen'),
(14, 1, '$2b$08$OsaEKK0dzUyCVnyqKFfwX.kC356c.k9orEWSXRsY1t8DOaIixE7Ea', 'michael@gmail.com', 'MichaelBrown'),
(15, 0, '$2b$08$0JKyMyl.8KjGuvqe2hDTy.xZ79xjXyxkIAdd4nXJ7Z3YAiU2aMMDa', 'jack@gmail.com', 'JackBlue');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blog_posts`
--
ALTER TABLE `blog_posts`
  ADD PRIMARY KEY (`post_id`),
  ADD KEY `fk_blog_posts_user_id` (`user_id`);

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`booking_id`),
  ADD KEY `fk_bookings_user_id` (`user_id`),
  ADD KEY `fk_bookings_class_schedule_id` (`class_schedule_id`),
  ADD KEY `fk_bookings_trainer_id` (`trainer_id`);

--
-- Indexes for table `classes`
--
ALTER TABLE `classes`
  ADD PRIMARY KEY (`class_id`);

--
-- Indexes for table `class_schedule`
--
ALTER TABLE `class_schedule`
  ADD PRIMARY KEY (`class_schedule_id`),
  ADD KEY `fk_class_id` (`class_id`);

--
-- Indexes for table `trainers`
--
ALTER TABLE `trainers`
  ADD PRIMARY KEY (`trainer_id`),
  ADD KEY `fk_trainer_class_id` (`class_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blog_posts`
--
ALTER TABLE `blog_posts`
  MODIFY `post_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'pk for blog_posts table', AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `booking_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'pk for the bookings table', AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `classes`
--
ALTER TABLE `classes`
  MODIFY `class_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `class_schedule`
--
ALTER TABLE `class_schedule`
  MODIFY `class_schedule_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `trainers`
--
ALTER TABLE `trainers`
  MODIFY `trainer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'pk for the user table', AUTO_INCREMENT=25;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `blog_posts`
--
ALTER TABLE `blog_posts`
  ADD CONSTRAINT `fk_blog_posts_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `fk_bookings_class_schedule_id` FOREIGN KEY (`class_schedule_id`) REFERENCES `class_schedule` (`class_schedule_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_bookings_trainer_id` FOREIGN KEY (`trainer_id`) REFERENCES `trainers` (`trainer_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_bookings_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `class_schedule`
--
ALTER TABLE `class_schedule`
  ADD CONSTRAINT `fk_class_id` FOREIGN KEY (`class_id`) REFERENCES `classes` (`class_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `trainers`
--
ALTER TABLE `trainers`
  ADD CONSTRAINT `fk_trainer_class_id` FOREIGN KEY (`class_id`) REFERENCES `classes` (`class_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
