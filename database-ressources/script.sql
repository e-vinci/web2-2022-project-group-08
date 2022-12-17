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

create unique index courses_name_uindex
    on courses (name);

create table quizzes
(
    quizz_id      INTEGER not null
        primary key autoincrement,
    creation_date timestamp default (DATETIME(CURRENT_TIMESTAMP, 'LOCALTIME')) not null,
    course        INTEGER not null
        references courses,
    isOnline      boolean   default false not null
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
    possible_answer      varchar(200) not null,
    correct              boolean      not null,
    good_answer_feedback varchar(200)
);

create table sqlite_master
(
    type     text,
    name     text,
    tbl_name text,
    rootpage int,
    sql      text
);

create table sqlite_sequence
(
    name,
    seq
);

create table students
(
    student_id    INTEGER
        primary key autoincrement,
    mail          varchar(100) not null
        unique,
    user_password varchar(100) not null
);

create table personal_user_notes
(
    id_personal_note INTEGER not null
        primary key autoincrement,
    content          varchar(5000),
    student          INTEGER not null
        references students,
    date_creation    timestamp default (DATETIME(CURRENT_TIMESTAMP, 'LOCALTIME')) not null
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

create table teachers
(
    teacher_id    INTEGER      not null
        primary key autoincrement,
    mail          varchar(100) not null
        unique,
    user_password varchar(100) not null,
    is_admin      boolean default false not null
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

insert into courses(name, code, presentation, picture)VALUES('Uml','BINV2010',"Le langage UML (Unified Modeling Language, ou langage de modélisation unifié) a été pensé pour être un langage de modélisation visuelle commun, et riche sémantiquement et syntaxiquement. Il est destiné à l'architecture, la conception et la mise en œuvre de systèmes logiciels ",'./img/uml.jpg')
insert into courses(name, code, presentation, picture) VALUES ('JavaScript','BINV1010','JavaScript est un langage de programmation de scripts principalement employé dans les pages web interactives et à ce titre est une partie essentielle des applications web. ','./img/javaScript.jpg')
insert into courses(name, code, presentation, picture)VALUES('Sql','BINV3010',"SQL est un langage informatique normalisé servant à exploiter des bases de données relationnelles. La partie langage de manipulation des données de SQL permet de rechercher, d'ajouter, de modifier ou de supprimer des données dans les bases de données ",'./img/sql.jpg')
insert into quizzes(course, isOnline) values (1,false);
insert into questions(quizz, content) VALUES (1, 'comment appelle-t-on une relation qui est une forme agrégation');
insert into questions (quizz,content) values (1,  'comment appelle t-on un changement de état considéré comme instantané');
insert into questions (quizz, content) values (1,  'c est quoi une classe abstraite ?');


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



