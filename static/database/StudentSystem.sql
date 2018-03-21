

CREATE TABLE `Course` (
  `id` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `credit` int(11) NOT NULL,
  `dep_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `Department` (
  `id` int(11) NOT NULL,
  `code` varchar(5) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `Enrollment` (
  `id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `section_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `Instructor` (
  `id` int(11) NOT NULL,
  `firstName` varchar(30) NOT NULL,
  `lastName` varchar(30) NOT NULL,
  `age` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `Section` (
  `id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `number` int(11) NOT NULL,
  `instructor_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `Student` (
  `id` int(11) NOT NULL,
  `firstName` varchar(30) NOT NULL,
  `lastName` varchar(30) NOT NULL,
  `age` int(11) NOT NULL,
  `gpa` float NOT NULL,
  `department_Id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


ALTER TABLE `Course`
  ADD PRIMARY KEY (`id`),
  ADD KEY `course_ibfk_1` (`dep_id`);

ALTER TABLE `Department`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `Enrollment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `enrollment1` (`student_id`),
  ADD KEY `enrollment2` (`section_id`);

ALTER TABLE `Instructor`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `Section`
  ADD PRIMARY KEY (`id`),
  ADD KEY `section_ibfk_1` (`course_id`),
  ADD KEY `section_ibfk_2` (`instructor_id`);

ALTER TABLE `Student`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `Course`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `Department`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `Enrollment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `Instructor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `Section`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `Student`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `Course`
  ADD CONSTRAINT `course_ibfk_1` FOREIGN KEY (`dep_id`) REFERENCES `Department` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `Enrollment`
  ADD CONSTRAINT `enrollment1` FOREIGN KEY (`student_id`) REFERENCES `Student` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `enrollment2` FOREIGN KEY (`section_id`) REFERENCES `Section` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `Section`
  ADD CONSTRAINT `section_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `Course` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `section_ibfk_2` FOREIGN KEY (`instructor_id`) REFERENCES `Instructor` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

