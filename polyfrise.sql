-- Création de la base de données
CREATE DATABASE IF NOT EXISTS polyfrise_development;

-- Utilisation de la base de données
USE polyfrise_development;

CREATE TABLE IF NOT EXISTS submissions (
    id VARCHAR(36) PRIMARY KEY,
    type ENUM('CREATE', 'UPDATE', 'DELETE') NOT NULL,
    new_date YEAR,
    new_title VARCHAR(255),
    new_description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Création de la table generations_informatique
CREATE TABLE IF NOT EXISTS generations_informatique (
    id INT PRIMARY KEY AUTO_INCREMENT,
    annee_debut INT,
    annee_fin INT, 
    nom_generation VARCHAR(50),
    description TEXT
);

-- Insertion des données dans la table generations_informatique
INSERT INTO generations_informatique (annee_debut, annee_fin, nom_generation, description) VALUES
    (1940, 1950, 'Première génération', 'Des relais aux lampes'),
    (1950, 1960, 'Deuxième génération', 'Les transistors'),
    (1960, 1970, 'Troisième génération', 'Les circuits intégrés'),
    (1970, 1980, 'Quatrième génération', 'Les microprocesseurs'),
    (1980, 2024, 'Cinquième génération', 'Puces VLSI et Intelligence Artificielle');

-- Création de la table generations_informatique
CREATE TABLE IF NOT EXISTS categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(50)
);

-- Insertion des données dans la table generations_informatique
INSERT INTO categories (nom) VALUES
    ('avancees'),
    ('personnalites'),
    ('programmes'),
    ('entreprises'),
    ('evenements_historique'),
    ('evenements_informatiques'),
    ('domaines'),
    ('generations_informatiques'),
    ('distinctions');


-- Création de la table evenements_informatiques
CREATE TABLE IF NOT EXISTS evenements_informatiques (
    id INT PRIMARY KEY AUTO_INCREMENT,
    annee INT,
    evenement TEXT
);

-- Insertion des données dans la table evenements_informatiques
INSERT INTO evenements_informatiques (nom,annee, evenement) VALUES
    ('La règle à calculer',1632, ' William Oughtred imagine dès 1620 et réalise en 1632 les premières règles à calculer.'),
    ('La Pascaline ',1645, ' Blaise Pascal invente la machine à calculer.'),
    ('ENIAC',1946, ' le premier ordinateur électronique, est mis en service aux États-Unis'),
    ("Création d'Internet",1973, " Le réseau ARPANET est opérationnel"),
    ('UNIVAC I',1951, ' le premier ordinateur commercial, est installé aux États-Unis.'),
    ('Microsoft',1983, 'Lancement du système d''exploitation Microsoft Windows 1.0.'),
    ('Création',1991, 'Création du World Wide Web par Tim Berners-Lee.'),
    ('Apple Ipod',2001, 'Introduction de l''iPod par Apple, révolutionnant la musique portable.'),
    ('Apple Iphone',2007, 'Lancement de l''iPhone, marquant l''ère des smartphones modernes.'),
    ('Apple Ipad',2010, 'Sortie du premier iPad, popularisant les tablettes électroniques.'),
    ('NSA',2013, 'Révélation des fuites d''Edward Snowden sur la surveillance de la NSA.'),
    ('Googlz',2016, 'AlphaGo de Google DeepMind bat le champion du monde de Go, marquant un jalon en intelligence artificielle.'),
    ('Premier trou noir',2018, 'Annonce du premier trou noir photographié par l''Event Horizon Telescope.'),
    ('Covid 19',2020, 'Pandémie de COVID-19 accélérant la transition vers le travail à distance et l''importance des technologies de l''information.'),
    ('Intel',1971, 'Lancement du microprocesseur Intel 4004, le premier microprocesseur commercial.'),
    ('Python',1989, 'Invention du langage de programmation Python par Guido van Rossum.'),
    ('Navigateur web graphique',1993, 'Premier navigateur web graphique, Mosaic, développé par le NCSA.'),
    ('Facebook',2004, 'Lancement de Facebook, plateforme de médias sociaux, par Mark Zuckerberg.'),
    ('Mozilla',2010, 'Introduction du langage de programmation Rust par Mozilla.'),
    ('Accord de Paris',2015, 'Accord de Paris sur le climat signé en utilisant une signature électronique.'),
    ('Réalité virtuelle',2016, 'Lancement de la réalité virtuelle grand public avec Oculus Rift.'),
    ('Cryptommonnaie',2019, 'Annonce du projet de cryptomonnaie Libra (plus tard renommé Diem) par Facebook.'),
    ('Cybersécurité',2021, 'Attaque du ransomware Colonial Pipeline, soulignant les vulnérabilités de la cybersécurité des infrastructures critiques.'),
    ('Télescope spatial',2022, 'Lancement du télescope spatial James Webb, successeur du télescope spatial Hubble.');

-- Création de la table pour les programmes informatiques
CREATE TABLE IF NOT EXISTS programmes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255),
    date_creation DATE,
    description TEXT
);


-- Insertion des événements significatifs
INSERT INTO programmes (nom, date_creation, description) VALUES  
    ('UNIX', '1969-11-03', 'Système d''exploitation multitâche et multi-utilisateur développé par Ken Thompson, Dennis Ritchie et d''autres chez Bell Labs.'),
    ('Microsoft Windows', '1985-11-20', 'Système d''exploitation développé par Microsoft, devenu l''un des systèmes d''exploitation les plus utilisés au monde.'),
    ('Linux Kernel', '1991-09-17', 'Noyau du système d''exploitation Linux, créé par Linus Torvalds.'),
    ('Apache HTTP Server', '1995-04-01', 'Serveur web open-source, l''un des plus populaires et utilisés sur Internet.'),
    ('MySQL', '1995-05-23', 'Système de gestion de base de données relationnelle open-source.'),
    ('Java', '1995-05-23', 'Langage de programmation orienté objet développé par Sun Microsystems.'),
    ('Mozilla Firefox', '2002-11-09', 'Navigateur web open-source, concurrent de Internet Explorer.'),
    ('Google Chrome', '2008-09-02', 'Navigateur web développé par Google, devenu l''un des navigateurs les plus populaires.'),
    ('Python', '1991-02-20', 'Langage de programmation interprété, polyvalent et facile à lire et écrire.'),
    ('Docker', '2013-03-20', 'Plateforme de virtualisation légère pour le développement, la mise en œuvre et l''exécution d''applications dans des conteneurs logiciels.'),
    ('Adobe Photoshop', '1988-02-19', 'Logiciel de retouche d''images, devenu une référence dans le domaine de la conception graphique.'),
    ('GNU Emacs', '1976-03-20', 'Éditeur de texte extensible et personnalisable, souvent utilisé pour la programmation.'),
    ('Microsoft Office', '1989-08-01', 'Suite bureautique de Microsoft, comprenant des applications comme Word, Excel et PowerPoint.'),
    ('WordPress', '2003-05-27', 'Système de gestion de contenu (CMS) pour la création de sites web et de blogs.'),
    ('Adobe Illustrator', '1987-03-19', 'Logiciel de création vectorielle utilisé pour le dessin et la conception graphique.'),
    ('MySQL', '1995-05-23', 'Système de gestion de base de données relationnelle open-source.'),
    ('Eclipse IDE', '2001-11-07', 'Environnement de développement intégré (IDE) utilisé pour le développement Java et d''autres langages.'),
    ('TensorFlow', '2015-11-09', 'Bibliothèque open-source d''apprentissage automatique développée par Google.'),
    ('AngularJS', '2010-10-20', 'Framework JavaScript développé par Google pour la création d''applications web à une seule page.'),
    ('Git', '2005-04-03', 'Système de gestion de versions distribué, largement utilisé pour le suivi des modifications dans le code source.'), 
    ('C++', '1983-10-01', 'Langage de programmation orienté objet dérivé du langage C, largement utilisé dans le développement logiciel.'),
    ('C', '1972-01-01', 'Langage de programmation impératif, à la base de nombreux autres langages.'),
    ('HTML', '1991-01-01', 'Langage de balisage utilisé pour la création et la structuration de contenu sur le web.'),
    ('CSS', '1996-12-17', 'Feuilles de style en cascade, utilisées pour la présentation visuelle des documents HTML.'),
    ('JavaScript', '1995-12-04', 'Langage de script côté client pour le développement web interactif.'),
    ('PHP', '1994-06-08', 'Langage de script côté serveur, souvent utilisé pour le développement web dynamique.'),
    ('Ruby', '1995-02-24', 'Langage de programmation interprété, axé sur la simplicité et la productivité.'),
    ('Swift', '2014-06-02', 'Langage de programmation développé par Apple pour le développement d''applications iOS et macOS.'),
    ('TypeScript', '2012-10-01', 'Langage de programmation superset de JavaScript, avec ajout de typage statique.'),
    ('Go (Golang)', '2009-11-10', 'Langage de programmation développé par Google, axé sur la simplicité et la performance.');

-- Création de la table pour les personnalités
CREATE TABLE IF NOT EXISTS personnalites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255),
    date_naissance INT,
    date_fin INT, 
    biographie TEXT
);

-- Insertion des personnalités influentes
INSERT INTO personnalites (nom, date_naissance , date_fin ,biographie)
VALUES
    ('Alan Turing',1912,1954, 'Mathématicien et cryptanalyste britannique, considéré comme le père de l''informatique. Concepteur de la machine de Turing.'),
    ('Ada Lovelace',1815,1862, 'Mathématicienne anglaise, souvent considérée comme la première programmeuse. Collaboratrice de Charles Babbage.'),
    ('Bill Gates',1955,2024, 'Co-fondateur de Microsoft, philanthrope.'),
    ('Steve Jobs',1955,2011, 'Co-fondateur d''Apple Inc. et de Pixar Animation Studios.'),
    ('Tim Berners-Lee',1955,2024, 'Physicien et informaticien britannique, inventeur du World Wide Web.'),
    ('Linus Torvalds',1969,2024, 'Créateur du noyau Linux.'),
    ('Grace Hopper',1906,1992, 'Informaticienne américaine, pionnière dans le domaine des langages de programmation.'),
    ('John McCarthy',1927,2011, 'Informaticien américain, fondateur de l''intelligence artificielle.'),
    ('Larry Page',1973,2024, 'Co-fondateur de Google.'),
    ('Mark Zuckerberg',1984,2024, 'Co-fondateur de Facebook.'),
    ('Vinton Cerf',1943,2024, 'Informaticien américain, co-créateur du protocole TCP/IP.'),
    ('Margaret Hamilton',1936,2024, 'Informaticienne américaine, directrice du développement logiciel pour le programme Apollo de la NASA. '),
    ('Richard Stallman',1953,2024, 'Programmeur et défenseur du logiciel libre, fondateur de la Free Software Foundation. '),
    ('Satya Nadella',1967,2024, 'PDG de Microsoft.'),
    ('Sheryl Sandberg',1969,2024, 'COO de Facebook, auteure et militante.'),
    ('Elon Musk', 1971,2024,'Entrepreneur et ingénieur, fondateur de SpaceX et Tesla. '),
    ('Andrew Ng', 1976,2024,'Informaticien et chercheur en intelligence artificielle, co-fondateur de Coursera.');

-- Création de la table pour les entreprises
CREATE TABLE IF NOT EXISTS entreprises (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255),
    fondation YEAR,
    developpements_majeurs TEXT
);

-- Insertion des entreprises informatiques
INSERT INTO entreprises (nom, fondation, developpements_majeurs)
VALUES
    ('Microsoft', 1975, 'Windows, Microsoft Office, Xbox, Azure.'),
    ('Apple Inc.', 1976, 'Macintosh, iPhone, iPad, iOS.'),
    ('Google', 1998, 'Moteur de recherche, Android, Google Maps, Gmail.'),
    ('IBM', 1911, 'Ordinateurs IBM, IBM Watson, Système d''exploitation OS/360.'),
    ('Intel Corporation', 1968, 'Microprocesseurs Intel, x86 architecture.'),
    ('Oracle Corporation', 1977, 'Oracle Database, Java, Oracle Cloud.'),
    ('Amazon', 1994, 'Amazon Web Services (AWS), Kindle, Amazon Echo.'),
    ('Cisco Systems', 1984, 'Équipements réseau, Routeurs, Commutateurs.'),
    ('Facebook', 2004, 'Facebook, WhatsApp, Instagram, Oculus VR.'),
    ('NVIDIA', 1993, 'Cartes graphiques GeForce, GPU NVIDIA Tesla.'),
    ('Adobe Systems', 1982, 'Adobe Photoshop, Adobe Acrobat, Creative Cloud.'),
    ('Samsung Electronics', 1969, 'Téléviseurs, Smartphones, Semi-conducteurs.'),
    ('HP (Hewlett-Packard)', 1939, 'Imprimantes, Ordinateurs personnels, Serveurs.'),
    ('Sony Corporation', 1946, 'PlayStation, Walkman, Sony Xperia, Sony Bravia.'),
    ('Lenovo', 1984, 'Ordinateurs ThinkPad, ThinkCentre, Motorola.'),
    ('Tesla, Inc.', 2003, 'Véhicules électriques, Autopilot, Powerwall.');

-- Création de la table pour les distinctions
CREATE TABLE IF NOT EXISTS distinctions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255),
    creation YEAR,
    recompense TEXT
);

-- Insertion des distinctions
INSERT INTO distinctions (nom, creation, recompense)
VALUES
    ('Prix Turing', 1966, 'Reconnaît les contributions exceptionnelles à l''informatique.'),
    ('Médaille Fields', 1936, 'Distinction en mathématiques, mais souvent associée à des avancées informatiques.'),
    ('Prix Nobel d''Informatique', 2021, 'Reconnaissance pour des avancées exceptionnelles en informatique.'),
    ('Prix Grace Murray Hopper', 1971, 'Distinction en informatique, remise par l''Association for Computing Machinery (ACM).'),
    ('Médaille John von Neumann', 1956, 'Reconnaît les contributions exceptionnelles en informatique.'),
    ('Prix Alan Turing de l''ACM', 2007, 'Récompense pour des contributions majeures à l''informatique.'),
    ('Prix A.M. Turing de l''IEEE', 1999, 'Distinction pour des réalisations exceptionnelles en informatique.'),
    ('Prix Fields de l''Informatique', 2002, 'Distinction en informatique associée à des avancées significatives.'),
    ('Prix IEEE Computer Society', 1971, 'Reconnaissance pour des contributions exceptionnelles à l''informatique.'),
    ('Prix Donald E. Knuth', 1996, 'Distinction pour des contributions exceptionnelles à l''art de la programmation informatique.'),
    ('Médaille Babbage', 1988, 'Reconnaît des réalisations exceptionnelles en ingénierie informatique.'),
    ('Prix Ada Lovelace', 2008, 'Distinction pour des contributions exceptionnelles aux sciences informatiques.'),
    ('Prix Nevanlinna', 1982, 'Distinction pour des contributions exceptionnelles en mathématiques, y compris en informatique théorique.'),
    ('Prix Turing de l''European Association for Theoretical Computer Science (EATCS)', 2019, 'Récompense pour des contributions exceptionnelles à la recherche en informatique théorique.'),
    ('Prix Knuth', 2019, 'Distinction pour des réalisations exceptionnelles en conception d''algorithmes et en programmation informatique.'),
    ('Prix Gödel', 1992, 'Reconnaît des contributions exceptionnelles en logique, informatique théorique et domaines connexes.'),
    ('Prix IEEE-CS Seymour Cray', 1997, 'Récompense pour des contributions exceptionnelles à la conception de systèmes informatiques.'),
    ('Prix Dijkstra', 2002, 'Distinction pour des contributions exceptionnelles aux principes, aux pratiques ou à la compréhension des systèmes informatiques.'),
    ('Prix Wiener', 1975, 'Reconnaît des contributions exceptionnelles aux domaines de la communication et du traitement des signaux.'),
    ('Médaille Copley de la Royal Society', 2001, 'Distinction scientifique pour des réalisations exceptionnelles dans divers domaines, y compris l''informatique.'),
    ('Prix Turing de l''Association for Computing Machinery (ACM)', 1966, 'Distinction pour des contributions exceptionnelles à l''informatique.'),
    ('Médaille IEEE John von Neumann', 1997, 'Reconnaît des contributions exceptionnelles en informatique et en ingénierie informatique.');

-- Création de la table pour les avancées majeures
CREATE TABLE IF NOT EXISTS avancees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255),
    date_avancee YEAR,
    description TEXT
);

-- Insertion des avancées majeures
INSERT INTO avancees (nom, date_avancee, description)
VALUES
    ('Développement du langage de programmation C', 1972, 'Création du langage C par Dennis Ritchie et Ken Thompson chez Bell Labs.'),
    ('Invention du microprocesseur', 1971, 'Intel lance le premier microprocesseur, le 4004.'),
    ('Création de l''Internet', 1969, 'Lancement du réseau ARPANET, l''ancêtre de l''Internet, par le département américain de la Défense.'),
    ('Invention du World Wide Web', 1989, 'Tim Berners-Lee invente le World Wide Web au CERN, permettant la navigation sur Internet.'),
    ('Première puce RISC (Reduced Instruction Set Computing)', 1980, 'Lancement de la puce RISC I chez IBM, révolutionnant la conception des processeurs.'),
    ('Introduction du langage de programmation Java', 1995, 'Sun Microsystems lance Java, un langage de programmation portable.'),
    ('Création du premier navigateur web graphique', 1993, 'Le navigateur Mosaic est développé, marquant le début de la navigation web graphique.'),
    ('Invention du système d''exploitation Linux', 1991, 'Linus Torvalds crée le noyau Linux, un système d''exploitation open-source.'),
    ('Lancement de la première version d''Android', 2008, 'Google lance la première version du système d''exploitation mobile Android.'),
    ('Développement de l''intelligence artificielle Deep Learning', 2012, 'Succès remarquable du deep learning avec des réseaux neuronaux profonds, notamment dans la vision par ordinateur et la reconnaissance vocale.'),
    ('Création du langage de programmation Python', 1991, 'Guido van Rossum développe Python, un langage de programmation interprété.'),
    ('Lancement du premier iPhone', 2007, 'Apple présente l''iPhone, marquant le début de l''ère des smartphones modernes.'),
    ('Invention de la blockchain', 2008, 'Publication du livre blanc de Bitcoin par Satoshi Nakamoto, introduisant la technologie de la blockchain.'),
    ('Développement de la réalité augmentée', 1968, 'Ivan Sutherland crée le premier système de réalité augmentée, baptisé « Sword of Damocles ».'),
    ('Lancement de Wikipedia', 2001, 'Jimmy Wales et Larry Sanger créent Wikipedia, une encyclopédie collaborative en ligne.'),
    ('Introduction de la technologie NFC (Near Field Communication)', 2002, 'La technologie NFC est standardisée, permettant des communications sans fil à courte distance.'),
    ('Invention du réseau de neurones convolutifs (CNN) pour la vision par ordinateur', 1998, 'Yann LeCun et al. présentent les CNN, une avancée majeure en vision par ordinateur.'),
    ('Annonce du projet de voiture autonome Waymo par Google', 2009, 'Google lance le projet Waymo, visant à développer des voitures autonomes.'),
    ('Découverte des cristaux de quasicristal', 1984, 'Découverte par Dan Shechtman, une avancée en cristallographie qui défie la symétrie cristalline classique.'),
    ('Introduction du système d''exploitation Windows 95', 1995, 'Microsoft lance Windows 95, introduisant une interface utilisateur graphique améliorée.');

-- Création de la table pour les domaines spécifiques
CREATE TABLE IF NOT EXISTS domaines (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255),
    date_creation YEAR
);

-- Insertion des domaines spécifiques avec des dates de création
INSERT INTO domaines (nom, date_creation) VALUES 
    ('Intelligence artificielle', 1956), 
    ('Réalité virtuelle', 1968), 
    ('Apprentissage automatique', 1959),
    ('Réseaux de neurones', 1943),
    ('Traitement du langage naturel', 1950),
    ('Vision par ordinateur', 1966),
    ('Robotique', 1956),
    ('Cybersécurité', 1971),
    ('Internet des objets (IoT)', 1982),
    ('Blockchain', 2008),
    ('Informatique quantique', 1981),
    ('Biotechnologie informatique', 1990),
    ('Traitement du signal', 1920),
    ('Informatique mobile', 1973),
    ('Systèmes embarqués', 1960),
    ('Génie logiciel', 1968),
    ('Analyse de données', 1960),
    ('Cloud computing', 2006),
    ('Réseaux informatiques', 1969),
    ('Bioinformatique', 1970),
    ('Technologies éducatives', 1990),
    ('Informatique environnementale', 2005);


-- Création de la table pour les événements dans les domaines spécifiques
CREATE TABLE IF NOT EXISTS evenements_domaine (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_evenement INT,
    id_domaine INT,
    date_evenement DATE,
    description TEXT
);

-- Insertion des événements dans les domaines spécifiques
INSERT INTO evenements_domaine (id_evenement, id_domaine, date_evenement, description)
VALUES
    (1, 1, '1997-01-01', 'IBM Deep Blue bat Garry Kasparov aux échecs. Première victoire d''une machine sur un champion du monde d''échecs.'),
    (2, 2, '2012-01-01', 'Fondation de Oculus VR. Développement de technologies de réalité virtuelle.'),(3, 3, '2018-10-01', 'Lancement d''AlphaZero par DeepMind, une IA qui apprend à jouer aux échecs, au shogi et au Go sans connaissance préalable des règles.'),
    (4, 4, '2019-06-01', 'Première image d''un trou noir capturée par le télescope Event Horizon Telescope.'),
    (5, 5, '2009-01-03', 'Création de Bitcoin par Satoshi Nakamoto, introduisant la technologie de la blockchain.'),
    (6, 6, '2011-10-04', 'Annonce de Siri par Apple, assistant virtuel basé sur le traitement du langage naturel.'),
    (7, 7, '2000-03-10', 'Honda lance ASIMO, un robot humanoïde capable de marcher et de courir.'),
    (8, 8, '2017-05-12', 'Attaque mondiale de ransomware WannaCry, soulignant les défis de la cybersécurité mondiale.'),
    (9, 9, '2015-02-19', 'Cisco annonce le lancement de la plateforme IoE (Internet of Everything) pour l''IoT.'),
    (10, 10, '2016-05-03', 'Publication du livre blanc Ethereum par Vitalik Buterin, formalisant la création de contrats intelligents sur la blockchain.'),
    (11, 11, '2019-10-23', 'Google atteint la suprématie quantique avec Sycamore, réalisant un calcul hors de portée pour les supercalculateurs classiques.'),
    (12, 12, '2002-12-15', 'Publication du premier séquençage complet du génome humain par le projet génome humain.'),
    (13, 13, '2008-11-11', 'Lancement du langage de programmation Python 3, apportant des améliorations significatives à la version précédente.'),
    (14, 14, '2010-06-24', 'Steve Jobs dévoile l''iPhone 4 avec l''écran Retina, marquant une avancée majeure dans les écrans mobiles.'),
    (15, 15, '2008-10-31', 'Publication du livre blanc de Bitcoin par Satoshi Nakamoto, introduisant la technologie de la blockchain.'),
    (16, 16, '1998-05-23', 'Larry Page et Sergey Brin fondent Google, initiant une transformation majeure dans la recherche en ligne.'),
    (17, 17, '2009-02-05', 'Lancement du projet Apache Hadoop, marquant le début du traitement distribué de grandes quantités de données.'),
    (18, 18, '2006-08-23', 'Lancement du service de stockage en nuage Amazon S3, révolutionnant le stockage de données en ligne.'),
    (19, 19, '1969-10-29', 'Premier message envoyé sur ARPANET, l''ancêtre d''Internet, marquant le début de la communication informatique à longue distance.'),
    (20, 20, '2001-02-12', 'Lancement de Wikipedia, une encyclopédie en ligne collaborative.'),
    (21, 21, '2009-08-21', 'Lancement de Android OS, le système d''exploitation mobile open source pour smartphones.'),
    (22, 22, '2015-12-08', 'Lancement de Microsoft Azure, la plateforme de cloud computing de Microsoft.');

-- Création de la table pour les événements historiques
CREATE TABLE IF NOT EXISTS evenements_historiques (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255),
    date_evenement DATE,
    description TEXT
);

-- Insertion des événements historiques
INSERT INTO evenements_historiques (nom,date_evenement, description)
VALUES
    ("Passage à l'an 2000", '2000-01-01', "L'effet Y2K. Préoccupations liées à la programmation informatique et à la stabilité des systèmes liées au passage à l'an 2000."),
    ('Machine de Turing','1936-05-01', 'Alan Turing publie son article fondateur sur la machine de Turing et la notion de calculabilité.'),
    ("Base théorie de l'information",'1945-12-10', 'Claude Shannon publie "A Mathematical Theory of Communication", jetant les bases de la théorie de l''information.'),
    ("Debut de l' IA",'1956-08-17', 'John McCarthy organise la Conférence de Dartmouth, considérée comme le point de départ de l''intelligence artificielle.'),
    ('Lancement premier message','1969-04-07', 'Lancement du premier message sur ARPANET, le précurseur d''Internet.'),
    ('Lancement microprocesseur','1971-04-01', 'Lancement du microprocesseur Intel 4004, le premier microprocesseur commercial.'),
    ('Premier email','1973-10-29', 'Raymond Tomlinson envoie le premier e-mail, marquant le début de la communication électronique.'),
    ('Lancement UNIX','1983-03-15', 'Lancement du système d''exploitation UNIX, qui a une influence majeure sur le développement des systèmes d''exploitation.'),
    ('Lancement du web','1990-08-06', 'Lancement du World Wide Web par Tim Berners-Lee au CERN, marquant le début de l''ère Internet moderne.'),
    ('Lancement de Windows 95','1995-07-16', 'Lancement de Windows 95, marquant l''introduction de l''interface utilisateur graphique de Microsoft.'),
    ('Facebook','2004-02-04', 'Mark Zuckerberg lance Facebook depuis sa chambre à l''Université Harvard.'),
    ('Premier ordinateur','1951-05-21', 'Premier ordinateur commercial UNIVAC I livré aux États-Unis.'),
    ('IBM 650','1953-09-21', 'IBM annonce l''IBM 650, le premier ordinateur à semi-conducteurs disponible en location.'),
    ('IBM System 60','1964-04-01', 'IBM lance le System/360, une famille de mainframes compatibles.'),
    ("Fondation d'Apple",'1976-04-01', 'Steve Jobs et Steve Wozniak fondent Apple Inc.'),
    ('Pac-Man','1980-12-12', 'Lancement du premier jeu vidéo d''arcade populaire, Pac-Man.'),
    ('WWW','1989-03-12', 'Tim Berners-Lee propose son idée de ce qui deviendra le World Wide Web.'),
    ('Premier site web','1991-08-06', 'Lancement du premier site Web public par Tim Berners-Lee.'),
    ("Nouveau champion d'échec",'1997-05-23', 'IBM Deep Blue bat le champion du monde d''échecs Garry Kasparov.'),
    ('Premier Iphone','2007-06-29', 'Lancement du premier iPhone par Apple, marquant le début de l''ère des smartphones.'),
    ('Faille de sécurité','2013-06-06', 'Edward Snowden révèle des documents sur la surveillance mondiale par les agences de renseignement.');


-- Sélection de toutes les données dans les tables
SELECT * FROM submissions;
SELECT * FROM generations_informatique;
SELECT * FROM evenements_informatiques;
SELECT * FROM evenements_historiques;
SELECT * FROM evenements_domaine;
SELECT * FROM domaines;
SELECT * FROM avancees;
SELECT * FROM distinctions;
SELECT * FROM entreprises;
SELECT * FROM personnalites;
SELECT * FROM programmes;