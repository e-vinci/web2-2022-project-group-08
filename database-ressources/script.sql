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
    content     varchar(200) not null
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

insert into courses(name, code, presentation, picture)VALUES('Uml','BINV2010','Le langage UML (Unified Modeling Language, ou langage de mod??lisation unifi??) a ??t?? pens?? pour ??tre un langage de mod??lisation visuelle commun, et riche s??mantiquement et syntaxiquement. Il est destin?? ?? l''architecture, la conception et la mise en ??uvre de syst??mes logiciels ','https://www.apollo-formation.com/wp-content/uploads/Unified_Modeling_Language-250x250.png');
insert into courses(name, code, presentation, picture) VALUES ('JavaScript','BINV1010','JavaScript est un langage de programmation de scripts principalement employ?? dans les pages web interactives et ?? ce titre est une partie essentielle des applications web. ','https://www.freepnglogos.com/uploads/javascript-png/javascript-logo-transparent-logo-javascript-images-3.png');
insert into courses(name, code, presentation, picture)VALUES('Sql','BINV3010','SQL est un langage informatique normalis?? servant ?? exploiter des bases de donn??es relationnelles. La partie langage de manipulation des donn??es de SQL permet de rechercher, d''ajouter, de modifier ou de supprimer des donn??es dans les bases de donn??es ','https://w7.pngwing.com/pngs/509/412/png-transparent-microsoft-sql-server-microsoft-azure-sql-database-table-table-furniture-text-logo.png');
insert into quizzes(course, isOnline) values (1,false);
insert into questions(quizz,content) VALUES (1,  'comment appelle-t-on une relation qui indique l''inclusion d''un ??l??ment dans un autre ');
insert into questions (quizz,content) values (1,  'comment appelle t-on un changement de ??tat consid??r?? comme instantan??');
insert into questions (quizz,content) values (1,  'c''est quoi une classe abstraite ?');
insert into questions (quizz,content) values (1,  'c''est quoi la navigation ');
insert into questions (quizz,content) values (1,  'quel est la convention concernant le nom d''un diagramme de classe ? ');
insert into questions (quizz,content) values (1,  'qu''est ce qu''un super ??tat ? ');
insert into questions (quizz,content) values (1,  'quelle est la diff??rence entre le noeud de d??cision et le noeud de fusion ?  ');
insert into questions (quizz,content) values (1,'qu''est ce qu''une barre de synchronization  ? ');
insert into questions (quizz,content) values (1,'quelle est l''intrus ? ');
insert into questions (quizz,content) values (1,'Dans un diagramme d''etat, qu''est ce qui est mis g??n??ralement entre crochets ?  ');





insert into answers (question, content, correct, good_answer_feedback) VALUES (1,'une sp??cialisation', false, 'une agr??gation');
insert into answers (question, content, correct, good_answer_feedback) values (1,'une g??n??ralisation', false, 'une agr??gation');
insert into answers (question, content, correct, good_answer_feedback) values (1,'une composition', false,'bravo');
insert into answers (question, content, correct, good_answer_feedback) values (1,'une agr??gation', true,'une agr??gation' );

insert into answers (question, content, correct, good_answer_feedback) VALUES (2,'un changement instantan?? ', false, 'une transition');
insert into answers (question, content, correct, good_answer_feedback) values (2,'une transition', true, 'une transition');
insert into answers (question, content, correct, good_answer_feedback) values (2,'un bouleversement ', false,'bravo');
insert into answers (question, content, correct, good_answer_feedback) values (2,'une alternance', false,'une transition' );


insert into answers (question, content, correct, good_answer_feedback) VALUES (3,'une classe dont son impl??mentation n est pas compl??te ', true, 'bravo');
insert into answers (question, content, correct, good_answer_feedback) values (3,'une classe qui n est pas destin??e ?? ??tre instancier', true, 'bravo');
insert into answers (question, content, correct, good_answer_feedback) values (3,'toute classe qui poss??de une m??thode abstraite', true,'bravo');
insert into answers (question, content, correct, good_answer_feedback) values (3,'une classe incompr??hensible ?? cause de son abstraction', false,'c''est une classe qui n''est  pas destin?? ?? ??tre instancier ' );

insert into answers (question, content, correct, good_answer_feedback) VALUES (4,'c''est le fait pour les classes de naviger entres elles  ', false,'la naviagtion permet d''indiquer la classe qui prends la responsabilit?? de l''association ' );
insert into answers (question, content, correct, good_answer_feedback) values (4,'information permettant d''indiquer la classe qui prends la responsabilit?? de l''association ', true,'bravo' );
insert into answers (question, content, correct, good_answer_feedback) values (4,'c''est une bidirection  ', false,'la naviagtion permet d''indiquer la classe qui prends la responsabilit?? de l''association ');
insert into answers (question, content, correct, good_answer_feedback) values (4,'association qui permet d''indiquer la direction des classes', false,'la naviagtion permet d''indiquer la classe qui prends la responsabilit?? de l''association  ' );

insert into answers (question, content, correct, good_answer_feedback) VALUES (5,'le nom doit ??tre en minuscule ', false,'le nom doit toujours commencer par une lettre majuscule et ??tre au singulier ' );
insert into answers (question, content, correct, good_answer_feedback) values (5,'le nom doit ??tre en majuscule ', false,'le nom doit toujours commencer par une lettre majuscule et ??tre au singulier' );
insert into answers (question, content, correct, good_answer_feedback) values (5,'le nom doit commencer par une lettre minuscule et ??tre au pluriel ', false,'le nom doit toujours commencer par une lettre majuscule et ??tre au singulier');
insert into answers (question, content, correct, good_answer_feedback) values (5,'le nom doit commencer par ue lettre majuscule et ??tre au singulier', true,'bravo' );

insert into answers (question, content, correct, good_answer_feedback) VALUES (6,'Etat le plus important du diagramme', false,'Ensemble d''etats ?? partir du quel une action peut ??tre g??n??r??' );
insert into answers (question, content, correct, good_answer_feedback) values (6,'Etant bloquant ', false,'Ensemble d''etats ?? partir du quel une action peut ??tre g??n??r??' );
insert into answers (question, content, correct, good_answer_feedback) values (6,'Ensemble d''etats ?? partir du quel une action peut ??tre g??n??r??', true,'bravo');
insert into answers (question, content, correct, good_answer_feedback) values (6,'Etat qui d??finit l''action la plus difficile ?? r??aliser ', false,'Ensemble d''etats ?? partir du quel une action peut ??tre g??n??r??' );

insert into answers (question, content, correct, good_answer_feedback) VALUES (7,'le noeud de d??cision permet de prendre plusieurs d??cisions et le noeud de fusion permet de les fusionner ', false,'le noeud de d??cision repr??sente une transition entrante et plusieurs sortantes tandis que le noeud de fusion rassemble plusieurs transitions entrante  en une seule sortante' );
insert into answers (question, content, correct, good_answer_feedback) values (7,'le noeud de d??cision repr??sente une transition entrante et plusieurs sortantes tandis que le noeud de fusion rassemble plusieurs transitions entrante  en une seule sortante ', true,'bravo' );
insert into answers (question, content, correct, good_answer_feedback) values (7,'le noeud de d??cision repr??sente plusieurs transitions  entrantes et une sortante tandis que le noeud de fusion repr??sente plusieurs transitions sortante fusion??es en une seule sortante ', false,'le noeud de d??cision repr??sente une transition entrante et plusieurs sortantes tandis que le noeud de fusion rassemble plusieurs transitions entrante  en une seule sortante');
insert into answers (question, content, correct, good_answer_feedback) values (7,'aucune r??ponse n''est juste ', false,'le noeud de d??cision repr??sente une transition entrante et plusieurs sortantes tandis que le noeud de fusion rassemble plusieurs transitions entrante  en une seule sortante' );

insert into answers (question, content, correct, good_answer_feedback) VALUES (8,'c''est une barre qui repr??sente la synchronisation des ??tats', false,'c''est une barre qui repr??sente la synchronisation des transition' );
insert into answers (question, content, correct, good_answer_feedback) values (8,'c''est une barre qui repr??sente la synchronisation des transition ', true,'bravo' );
insert into answers (question, content, correct, good_answer_feedback) values (8,'c''est une barre qui permet de synchronizer les transitions  ', false,'c''est une barre qui repr??sente la synchronisation des transition');
insert into answers (question, content, correct, good_answer_feedback) values (8,'c''est une barre qui indique que des t??ches s''effectuent e paralleles ', false,'c''est une barre qui repr??sente la synchronisation des transition' );

insert into answers (question, content, correct, good_answer_feedback) VALUES (9,'le signal', false,'contexte : diagrame de classe ' );
insert into answers (question, content, correct, good_answer_feedback) values (9,'l''appel', false,'contexte : diagrame de classe' );
insert into answers (question, content, correct, good_answer_feedback) values (9,'la synchronisation ', false,'contexte : diagrame de classe');
insert into answers (question, content, correct, good_answer_feedback) values (9,'la semantique', true,'bravo' );

insert into answers (question, content, correct, good_answer_feedback) VALUES (10,'la semantique ', false,'condition de garde car elle doit ??tre v??rifi?? pour que l''??v??nement d??clenche la transition ' );
insert into answers (question, content, correct, good_answer_feedback) values (10,'les conditions de garde ', true,'bravo' );
insert into answers (question, content, correct, good_answer_feedback) values (10,'la condition ', false,'condition de garde car elle doit ??tre v??rifi?? pour que l''??v??nement d??clenche la transition');
insert into answers (question, content, correct, good_answer_feedback) values (10,'le test', false,'condition de garde car elle doit ??tre v??rifi?? pour que l''??v??nement d??clenche la transition' );