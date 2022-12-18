DROP TABLE IF EXISTS personal_user_notes;
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
    content      varchar(200) not null,
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

insert into courses(name, code, presentation, picture)VALUES('Uml','BINV2010','Le langage UML (Unified Modeling Language, ou langage de modélisation unifié) a été pensé pour être un langage de modélisation visuelle commun, et riche sémantiquement et syntaxiquement. Il est destiné à l''architecture, la conception et la mise en œuvre de systèmes logiciels ','./img/uml.jpg');
insert into courses(name, code, presentation, picture) VALUES ('JavaScript','BINV1010','JavaScript est un langage de programmation de scripts principalement employé dans les pages web interactives et à ce titre est une partie essentielle des applications web. ','./img/javaScript.jpg');
insert into courses(name, code, presentation, picture)VALUES('Sql','BINV3010','SQL est un langage informatique normalisé servant à exploiter des bases de données relationnelles. La partie langage de manipulation des données de SQL permet de rechercher, d''ajouter, de modifier ou de supprimer des données dans les bases de données ','./img/sql.jpg');
insert into quizzes(course, isOnline) values (1,false);
insert into questions(quizz, number,content) VALUES (1,  1,'comment appelle-t-on une relation qui indique l''inclusion d''un élément dans un autre ');
insert into questions (quizz,number,content) values (1,  2,'comment appelle t-on un changement de état considéré comme instantané');
insert into questions (quizz, number,content) values (1,  3,'c''est quoi une classe abstraite ?');
insert into questions (quizz, number,content) values (1,  4,'c''est quoi la navigation ');
insert into questions (quizz, number,content) values (1,  5,'quel est la convention concernant le nom d''un diagramme de classe ? ');
insert into questions (quizz, number,content) values (1,  6,'qu''est ce qu''un super état ? ');
insert into questions (quizz, number,content) values (1,  7,'quelle est la différence entre le noeud de décision et le noeud de fusion ?  ');
insert into questions (quizz, number,content) values (1,  8,'qu''est ce qu''une barre de synchronization  ? ');
insert into questions (quizz, number,content) values (1,  9,'quelle est l''intrus ? ');
insert into questions (quizz, number,content) values (1,  10,'Dans un diagramme d''etat, qu''est ce qui est mis généralement entre crochets ?  ');





insert into answers (question, content, correct, good_answer_feedback) VALUES (1,'une spécialisation', false, 'une agrégation');
insert into answers (question, content, correct, good_answer_feedback) values (1,'une généralisation', false, 'une agrégation');
insert into answers (question, content, correct, good_answer_feedback) values (1,'une composition', false,'bravo');
insert into answers (question, content, correct, good_answer_feedback) values (1,'une agrégation', true,'une agrégation' );

insert into answers (question, content, correct, good_answer_feedback) VALUES (2,'un changement instantané ', false, 'une transition');
insert into answers (question, content, correct, good_answer_feedback) values (2,'une transition', true, 'une transition');
insert into answers (question, content, correct, good_answer_feedback) values (2,'un bouleversement ', false,'bravo');
insert into answers (question, content, correct, good_answer_feedback) values (2,'une alternance', false,'une transition' );


insert into answers (question, content, correct, good_answer_feedback) VALUES (3,'une classe dont son implémentation n est pas complète ', true, 'bravo');
insert into answers (question, content, correct, good_answer_feedback) values (3,'une classe qui n est pas destinée à être instancier', true, 'bravo');
insert into answers (question, content, correct, good_answer_feedback) values (3,'toute classe qui possède une méthode abstraite', true,'bravo');
insert into answers (question, content, correct, good_answer_feedback) values (3,'une classe incompréhensible à cause de son abstraction', false,'c''est une classe qui n''est  pas destiné à être instancier ' );

insert into answers (question, content, correct, good_answer_feedback) VALUES (4,'c''est le fait pour les classes de naviger entres elles  ', false,'la naviagtion permet d''indiquer la classe qui prends la responsabilité de l''association ' );
insert into answers (question, content, correct, good_answer_feedback) values (4,'information permettant d''indiquer la classe qui prends la responsabilité de l''association ', true,'bravo' );
insert into answers (question, content, correct, good_answer_feedback) values (4,'c''est une bidirection  ', false,'la naviagtion permet d''indiquer la classe qui prends la responsabilité de l''association ');
insert into answers (question, content, correct, good_answer_feedback) values (4,'association qui permet d''indiquer la direction des classes', false,'la naviagtion permet d''indiquer la classe qui prends la responsabilité de l''association  ' );

insert into answers (question, content, correct, good_answer_feedback) VALUES (5,'le nom doit être en minuscule ', false,'le nom doit toujours commencer par une lettre majuscule et être au singulier ' );
insert into answers (question, content, correct, good_answer_feedback) values (5,'le nom doit être en majuscule ', false,'le nom doit toujours commencer par une lettre majuscule et être au singulier' );
insert into answers (question, content, correct, good_answer_feedback) values (5,'le nom doit commencer par une lettre minuscule et être au pluriel ', false,'le nom doit toujours commencer par une lettre majuscule et être au singulier');
insert into answers (question, content, correct, good_answer_feedback) values (5,'le nom doit commencer par ue lettre majuscule et être au singulier', true,'bravo' );

insert into answers (question, content, correct, good_answer_feedback) VALUES (6,'Etat le plus important du diagramme', false,'Ensemble d''etats à partir du quel une action peut être généré' );
insert into answers (question, content, correct, good_answer_feedback) values (6,'Etant bloquant ', false,'Ensemble d''etats à partir du quel une action peut être généré' );
insert into answers (question, content, correct, good_answer_feedback) values (6,'Ensemble d''etats à partir du quel une action peut être généré', true,'bravo');
insert into answers (question, content, correct, good_answer_feedback) values (6,'Etat qui définit l''action la plus difficile à réaliser ', false,'Ensemble d''etats à partir du quel une action peut être généré' );

insert into answers (question, content, correct, good_answer_feedback) VALUES (7,'le noeud de décision permet de prendre plusieurs décisions et le noeud de fusion permet de les fusionner ', false,'le noeud de décision représente une transition entrante et plusieurs sortantes tandis que le noeud de fusion rassemble plusieurs transitions entrante  en une seule sortante' );
insert into answers (question, content, correct, good_answer_feedback) values (7,'le noeud de décision représente une transition entrante et plusieurs sortantes tandis que le noeud de fusion rassemble plusieurs transitions entrante  en une seule sortante ', true,'bravo' );
insert into answers (question, content, correct, good_answer_feedback) values (7,'le noeud de décision représente plusieurs transitions  entrantes et une sortante tandis que le noeud de fusion représente plusieurs transitions sortante fusionées en une seule sortante ', false,'le noeud de décision représente une transition entrante et plusieurs sortantes tandis que le noeud de fusion rassemble plusieurs transitions entrante  en une seule sortante');
insert into answers (question, content, correct, good_answer_feedback) values (7,'aucune réponse n''est juste ', false,'le noeud de décision représente une transition entrante et plusieurs sortantes tandis que le noeud de fusion rassemble plusieurs transitions entrante  en une seule sortante' );

insert into answers (question, content, correct, good_answer_feedback) VALUES (8,'c''est une barre qui représente la synchronisation des états', false,'c''est une barre qui représente la synchronisation des transition' );
insert into answers (question, content, correct, good_answer_feedback) values (8,'c''est une barre qui représente la synchronisation des transition ', true,'bravo' );
insert into answers (question, content, correct, good_answer_feedback) values (8,'c''est une barre qui permet de synchronizer les transitions  ', false,'c''est une barre qui représente la synchronisation des transition');
insert into answers (question, content, correct, good_answer_feedback) values (8,'c''est une barre qui indique que des tâches s''effectuent e paralleles ', false,'c''est une barre qui représente la synchronisation des transition' );

insert into answers (question, content, correct, good_answer_feedback) VALUES (9,'le signal', false,'contexte : diagrame de classe ' );
insert into answers (question, content, correct, good_answer_feedback) values (9,'l''appel', false,'contexte : diagrame de classe' );
insert into answers (question, content, correct, good_answer_feedback) values (9,'la synchronisation ', false,'contexte : diagrame de classe');
insert into answers (question, content, correct, good_answer_feedback) values (9,'la semantique', true,'bravo' );

insert into answers (question, content, correct, good_answer_feedback) VALUES (10,'la semantique ', false,'condition de garde car elle doit être vérifié pour que l''évènement déclenche la transition ' );
insert into answers (question, content, correct, good_answer_feedback) values (10,'les conditions de garde ', true,'bravo' );
insert into answers (question, content, correct, good_answer_feedback) values (10,'la condition ', false,'condition de garde car elle doit être vérifié pour que l''évènement déclenche la transition');
insert into answers (question, content, correct, good_answer_feedback) values (10,'le test', false,'condition de garde car elle doit être vérifié pour que l''évènement déclenche la transition' );