CREATE TABLE users
(
    id SERIAL,
    full_name varchar(255) NOT NULL,
	  email varchar(255) NOT NULL,
		birth_day timestamp(6) with time zone DEFAULT null,
		gender VARCHAR(255) DEFAULT null,
		password VARCHAR(255) NOT NULL,
		phone VARCHAR(255) DEFAULT null,
		address VARCHAR(255) DEFAULT null,
		avatar TEXT DEFAULT null,
		role integer DEFAULT 3, -- role 1: admin  / 2: teacher  / 3: student
		status INTEGER NOT NULL DEFAULT 0, -- status 0: INACTIVED, 1: ACTIVED
    created_at timestamp(6) with time zone NOT NULL DEFAULT now(),
    updated_at timestamp(6) with time zone NOT NULL DEFAULT now(),
    CONSTRAINT users_pkey PRIMARY KEY (id)
);
ALTER TABLE users ADD CONSTRAINT users_unique UNIQUE (id);

CREATE TABLE classes
(
    id SERIAL,
    name varchar(255) NOT NULL,
	  code varchar(255) NOT NULL,
	  slot_date VARCHAR,
	  slot VARCHAR,
	  course_id INT,
		student_max_number integer DEFAULT 0,
		status integer DEFAULT 0, -- status 0: INACTIVED, 1: ACTIVED
    created_at timestamp(6) with time zone NOT NULL DEFAULT now(),
    updated_at timestamp(6) with time zone NOT NULL DEFAULT now(),
    CONSTRAINT classes_pkey PRIMARY KEY (id)
);
ALTER TABLE classes ADD CONSTRAINT classes_unique UNIQUE (id, code, name);


CREATE TABLE courses
(
    id SERIAL,
    name varchar(255) NOT NULL,
	  content varchar(255) NOT NULL,
		code varchar(255) NOT NULL,
		user_id integer not null, -- ai tao course
		status integer DEFAULT 0, -- status 0: INACTIVED, 1: ACTIVED
    created_at timestamp(6) with time zone NOT NULL DEFAULT now(),
    updated_at timestamp(6) with time zone NOT NULL DEFAULT now(),
    CONSTRAINT courses_pkey PRIMARY KEY (id)
);
ALTER TABLE courses ADD CONSTRAINT courses_unique UNIQUE (id, code);


CREATE TABLE user_courses_classes
(
    id SERIAL,
    class_id INTEGER NOT NULL DEFAULT 0,
	course_id INTEGER NOT NULL DEFAULT 0,
	user_id INTEGER NOT NULL DEFAULT 0,
    created_at timestamp(6) with time zone NOT NULL DEFAULT now(),
    updated_at timestamp(6) with time zone NOT NULL DEFAULT now(),
    CONSTRAINT user_courses_classes_pkey PRIMARY KEY (id)
);
ALTER TABLE user_courses_classes ADD CONSTRAINT user_courses_classes_unique UNIQUE (id);

CREATE TABLE exercises
(
    id SERIAL,
    title varchar(255) NOT NULL,
	content varchar(255) NOT NULL,
	deadline timestamp(6) with time zone DEFAULT now(),
	type integer DEFAULT null,
	file TEXT DEFAULT null,
	status INTEGER NOT NULL DEFAULT 0, -- status 0: INACTIVED, 1: ACTIVED
	user_id integer not null, -- ai tạo bài tập
    created_at timestamp(6) with time zone NOT NULL DEFAULT now(),
    updated_at timestamp(6) with time zone NOT NULL DEFAULT now(),
    CONSTRAINT exercises_pkey PRIMARY KEY (id)
);
ALTER TABLE exercises ADD CONSTRAINT exercises_unique UNIQUE (id);


CREATE TABLE student_has_exercises
(
    id SERIAL,
    exercise_id INTEGER NOT NULL DEFAULT 0,
	  student_id BIGINT NOT NULL DEFAULT 0,
		class_id BIGINT NOT NULL,
		file TEXT NULL,
		mark float not null DEFAULT 0,
    created_at timestamp(6) with time zone NOT NULL DEFAULT now(),
    updated_at timestamp(6) with time zone NOT NULL DEFAULT now(),
    CONSTRAINT student_has_exercises_pkey PRIMARY KEY (id)
);
ALTER TABLE student_has_exercises ADD CONSTRAINT student_has_exercises_unique UNIQUE (id);
