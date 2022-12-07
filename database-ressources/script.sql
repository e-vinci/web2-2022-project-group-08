DROP TABLE IF EXISTS personal_notes ;
DROP TABLE IF EXISTS registered_questions ;
DROP TABLE IF EXISTS answers ;
DROP TABLE IF EXISTS questions ;
DROP TABLE IF EXISTS quizzes ;
DROP TABLE IF EXISTS professors_courses;
DROP TABLE IF EXISTS courses ;
DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS teachers;


create table courses
(
    course_id    INTEGER      not null
        primary key autoincrement,
    name         varchar(50)  not null,
    code         varchar(10)  not null
        unique,
    presentation varchar(200) not null,
    picture      varchar(100)
);

create table quizzes
(
    quizz_id      INTEGER not null
        primary key autoincrement,
    creation_date date    not null,
    course        INTEGER not null
        references courses,
    isOnline      boolean default false not null
);

create table questions
(
    question_id INTEGER      not null
        primary key autoincrement,
    quizz       INTEGER      not null
        references quizzes,
    number      INTEGER      not null,
    content     varchar(200) not null,
    unique (question_id, number)
);

create table answers
(
    answers_id           INTEGER      not null
        primary key autoincrement,
    question             INTEGER      not null
        references questions,
    content              varchar(200) not null,
    correct              boolean      not null,
    good_answer_feedback varchar(200)
);



create table students
(
    student_id    INTEGER
        primary key autoincrement,

    mail          varchar(100) not null
        unique,
    user_password varchar(100) not null
);

create table registered_questions
(
    id_registered_question INTEGER not null
        primary key autoincrement,
    question               INTEGER not null
        references questions,
    student                INTEGER not null
        references students
);

create table personal_notes
(
    id_personal_note    INTEGER not null
        primary key autoincrement,
    content             varchar(500),
    registered_question INTEGER not null
        references registered_questions,
    registered_date     date    not null
);

create table teachers
(
    teacher_id    INTEGER      not null
        primary key autoincrement,
    mail          varchar(100) not null
        unique,
    user_password varchar(100) not null
);

create table professors_courses
(
    teacher INTEGER not null
        references teachers,
    course  INTEGER not null
        references courses,
    primary key (teacher, course)
);

INSERT INTO teachers( mail, user_password) VALUES ('manal@vinci.be','mdp') ;
INSERT INTO teachers( mail, user_password) VALUES ('steven@vinci.be','mdp') ;
INSERT INTO teachers( mail, user_password) VALUES ('ramtin@vinci.be','mdp') ;
INSERT INTO teachers( mail, user_password) VALUES ('kevin@vinci.be','mdp') ;
INSERT INTO teachers( mail, user_password) VALUES ('dorcas@vinci.be','mdp') ;




INSERT INTO students( mail, user_password) VALUES ('stud@student.vinci.be','mdp');
INSERT INTO students ( mail, user_password) VALUES ('etudiant@student.vinci.be','mdp');


