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

insert into courses(name, code, presentation) VALUES ('UML','BINV-2041','ce cours aborde le sujet des différents diagrames' );
insert into quizzes(course, isOnline) values (1,false);
insert into questions(quizz, number, content) VALUES (1,1, 'comment appelle-t-on une relation qui est une forme agrégation');
insert into questions (quizz, number, content) values (1, 2, 'comment appelle t-on un changement de état considéré comme instantané');
insert into questions (quizz, number, content) values (1, 3, 'c est quoi une classe abstraite ?');


insert into answers (question, content, correct, good_answer_feedback) VALUES (1,'une spécialisation', false, 'on va donner des feedback après check pour le moment ton cours');
insert into answers (question, content, correct, good_answer_feedback) values (1,'une généralisation', false, 'on va donner des feedback après check pour le moment ton cours');
insert into answers (question, content, correct, good_answer_feedback) values (1,'une composition', true,'bravo');
insert into answers (question, content, correct, good_answer_feedback) values (1,'une classification', false,'on va donner des feedback après check pour le moment ton cours' );

insert into answers (question, content, correct, good_answer_feedback) VALUES (2,'un changement instantané ', false, 'on va donner des feedback après check pour le moment ton cours');
insert into answers (question, content, correct, good_answer_feedback) values (2,'une transition', true, 'on va donner des feedback après check pour le moment ton cours');
insert into answers (question, content, correct, good_answer_feedback) values (2,'un bouleversement ', false,'bravo');
insert into answers (question, content, correct, good_answer_feedback) values (2,'une alternance', false,'on va donner des feedback après check pour le moment ton cours' );


insert into answers (question, content, correct, good_answer_feedback) VALUES (3,'une classe dont son implémentation n est pas complète ', true, 'yessssss ');
insert into answers (question, content, correct, good_answer_feedback) values (3,'une classe qui n est pas destinée à être instancier', true, 'good job');
insert into answers (question, content, correct, good_answer_feedback) values (3,'tout classe qui possède une méthode abstraite ', true,'bravo');
insert into answers (question, content, correct, good_answer_feedback) values (3,'une classe incompréhensible à cause de son abstraction', false,'on va donner des feedback après check pour le moment ton cours' );



