DROP TABLE IF EXISTS personal_notes ;
DROP TABLE IF EXISTS registered_questions ;
DROP TABLE IF EXISTS answers ;
DROP TABLE IF EXISTS questions ;
DROP TABLE IF EXISTS quizzes ;
DROP TABLE IF EXISTS professors_courses;
DROP TABLE IF EXISTS courses ;
DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS teachers;



CREATE TABLE teachers(
    teacher_id SERIAL PRIMARY KEY,
    last_name varchar(25) NOT NULL,
    mail varchar(100)unique NOT NULL,
    user_password varchar(100) NOT NULL
);


CREATE TABLE courses(
    course_id SERIAL PRIMARY KEY,
    name varchar(50) NOT NULL,
    code varchar(10) unique NOT NULL,
    presentation varchar(200) NOT NULL,
    picture varchar(100) NULL

);

CREATE TABLE students(
    student_id SERIAL PRIMARY KEY,
    last_name varchar(25) NOT NULL,
    mail varchar(100) unique NOT NULL ,
    user_password varchar(100) NOT NULL
);


CREATE TABLE professors_courses (
    teacher integer NOT NULL REFERENCES teachers(teacher_id),
    course integer NOT NULL REFERENCES courses(course_id),
    PRIMARY KEY (teacher, course)
);


CREATE TABLE quizzes (
    quizz_id SERIAL PRIMARY KEY,
    creation_date date NOT NULL,
    course integer NOT NULL REFERENCES courses(course_id),
    isOnline boolean NOT NULL DEFAULT false
);


CREATE TABLE questions (
    question_id SERIAL PRIMARY KEY,
    quizz integer NOT NULL REFERENCES quizzes(quizz_id),
    number SERIAL NOT NULL,
    content varchar(200) NOT NULL,
    UNIQUE (question_id, number)
);

CREATE TABLE answers (
    answers_id SERIAL PRIMARY KEY,
    question integer NOT NULL REFERENCES questions(question_id),
    content varchar(200) NOT NULL,
    correct boolean NOT NULL,
    good_answer_feedback varchar(200)
);

CREATE TABLE registered_questions (
    id_registered_question SERIAL PRIMARY KEY,
    question integer NOT NULL REFERENCES questions(question_id),
    student integer NOT NULL references students(student_id)
);


CREATE TABLE personal_notes (
    id_personal_note SERIAL PRIMARY KEY ,
    content varchar(500),
    registered_question integer NOT NULL references registered_questions(id_registered_question),
    registered_date date NOT NULL
);


INSERT INTO teachers(teacher_id, last_name, mail, user_password) VALUES (1,'prof','prof@email.vinci.be','mdp');
INSERT INTO students(student_id, last_name, mail, user_password) VALUES (2,'etud','stud@email.student.vinci.be','mdp');

