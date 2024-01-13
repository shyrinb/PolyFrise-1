-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jan 12, 2024 at 10:49 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `polyfrise_development`
--

-- --------------------------------------------------------

--
-- Table structure for table `avancees`
--

CREATE TABLE `avancees` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `date_avancee` date DEFAULT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `avancees`
--

INSERT INTO `avancees` (`id`, `nom`, `date_avancee`, `description`) VALUES
(1, 'Développement du langage de programmation C', '1972-01-01', 'Création du langage C par Dennis Ritchie et Ken Thompson chez Bell Labs.'),
(2, 'Invention du microprocesseur', '1971-01-01', 'Intel lance le premier microprocesseur, le 4004.'),
(3, 'Création de l\'Internet', '1969-01-01', 'Lancement du réseau ARPANET, l\'ancêtre de l\'Internet, par le département américain de la Défense.'),
(4, 'Invention du World Wide Web', '1989-01-01', 'Tim Berners-Lee invente le World Wide Web au CERN, permettant la navigation sur Internet.'),
(5, 'Première puce RISC (Reduced Instruction Set Computing)', '1980-01-01', 'Lancement de la puce RISC I chez IBM, révolutionnant la conception des processeurs.'),
(6, 'Introduction du langage de programmation Java', '1995-01-01', 'Sun Microsystems lance Java, un langage de programmation portable.'),
(7, 'Création du premier navigateur web graphique', '1993-01-01', 'Le navigateur Mosaic est développé, marquant le début de la navigation web graphique.'),
(8, 'Invention du système d\'exploitation Linux', '1991-01-01', 'Linus Torvalds crée le noyau Linux, un système d\'exploitation open-source.'),
(9, 'Lancement de la première version d\'Android', '2008-01-01', 'Google lance la première version du système d\'exploitation mobile Android.'),
(10, 'Développement de l\'intelligence artificielle Deep Learning', '2012-01-01', 'Succès remarquable du deep learning avec des réseaux neuronaux profonds, notamment dans la vision par ordinateur et la reconnaissance vocale.'),
(11, 'Création du langage de programmation Python', '1991-01-01', 'Guido van Rossum développe Python, un langage de programmation interprété.'),
(12, 'Lancement du premier iPhone', '2007-01-01', 'Apple présente l\'iPhone, marquant le début de l\'ère des smartphones modernes.'),
(13, 'Invention de la blockchain', '2008-01-01', 'Publication du livre blanc de Bitcoin par Satoshi Nakamoto, introduisant la technologie de la blockchain.'),
(14, 'Développement de la réalité augmentée', '1968-01-01', 'Ivan Sutherland crée le premier système de réalité augmentée, baptisé « Sword of Damocles ».'),
(15, 'Lancement de Wikipedia', '2001-01-01', 'Jimmy Wales et Larry Sanger créent Wikipedia, une encyclopédie collaborative en ligne.'),
(16, 'Introduction de la technologie NFC (Near Field Communication)', '2002-01-01', 'La technologie NFC est standardisée, permettant des communications sans fil à courte distance.'),
(17, 'Invention du réseau de neurones convolutifs (CNN) pour la vision par ordinateur', '1998-01-01', 'Yann LeCun et al. présentent les CNN, une avancée majeure en vision par ordinateur.'),
(18, 'Annonce du projet de voiture autonome Waymo par Google', '2009-01-01', 'Google lance le projet Waymo, visant à développer des voitures autonomes.'),
(19, 'Découverte des cristaux de quasicristal', '1984-01-01', 'Découverte par Dan Shechtman, une avancée en cristallographie qui défie la symétrie cristalline classique.'),
(20, 'Introduction du système d\'exploitation Windows 95', '1995-01-01', 'Microsoft lance Windows 95, introduisant une interface utilisateur graphique améliorée.');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
('1', 'avancees'),
('2', 'personnalites'),
('3', 'programmes'),
('4', 'entreprises'),
('5', 'evenements_historique'),
('6', 'evenements_informatiques'),
('7', 'domaines'),
('8', 'generations_informatiques'),
('9', 'distinctions');

-- --------------------------------------------------------

--
-- Table structure for table `distinctions`
--

CREATE TABLE `distinctions` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `creation` date DEFAULT NULL,
  `recompense` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `distinctions`
--

INSERT INTO `distinctions` (`id`, `nom`, `creation`, `recompense`) VALUES
(1, 'Prix Turing', '1966-01-01', 'Reconnaît les contributions exceptionnelles à l\'informatique.'),
(2, 'Médaille Fields', '1936-01-01', 'Distinction en mathématiques, mais souvent associée à des avancées informatiques.'),
(3, 'Prix Nobel d\'Informatique', '2021-01-01', 'Reconnaissance pour des avancées exceptionnelles en informatique.'),
(4, 'Prix Grace Murray Hopper', '1971-01-01', 'Distinction en informatique, remise par l\'Association for Computing Machinery (ACM).'),
(5, 'Médaille John von Neumann', '1956-01-01', 'Reconnaît les contributions exceptionnelles en informatique.'),
(6, 'Prix Alan Turing de l\'ACM', '2007-01-01', 'Récompense pour des contributions majeures à l\'informatique.'),
(7, 'Prix A.M. Turing de l\'IEEE', '1999-01-01', 'Distinction pour des réalisations exceptionnelles en informatique.'),
(8, 'Prix Fields de l\'Informatique', '2002-01-01', 'Distinction en informatique associée à des avancées significatives.'),
(9, 'Prix IEEE Computer Society', '1971-01-01', 'Reconnaissance pour des contributions exceptionnelles à l\'informatique.'),
(10, 'Prix Donald E. Knuth', '1996-01-01', 'Distinction pour des contributions exceptionnelles à l\'art de la programmation informatique.'),
(11, 'Médaille Babbage', '1988-01-01', 'Reconnaît des réalisations exceptionnelles en ingénierie informatique.'),
(12, 'Prix Ada Lovelace', '2008-01-01', 'Distinction pour des contributions exceptionnelles aux sciences informatiques.'),
(13, 'Prix Nevanlinna', '1982-01-01', 'Distinction pour des contributions exceptionnelles en mathématiques, y compris en informatique théorique.'),
(14, 'Prix Turing de l\'European Association for Theoretical Computer Science (EATCS)', '2019-01-01', 'Récompense pour des contributions exceptionnelles à la recherche en informatique théorique.'),
(15, 'Prix Knuth', '2019-01-01', 'Distinction pour des réalisations exceptionnelles en conception d\'algorithmes et en programmation informatique.'),
(16, 'Prix Gödel', '1992-01-01', 'Reconnaît des contributions exceptionnelles en logique, informatique théorique et domaines connexes.'),
(17, 'Prix IEEE-CS Seymour Cray', '1997-01-01', 'Récompense pour des contributions exceptionnelles à la conception de systèmes informatiques.'),
(18, 'Prix Dijkstra', '2002-01-01', 'Distinction pour des contributions exceptionnelles aux principes, aux pratiques ou à la compréhension des systèmes informatiques.'),
(19, 'Prix Wiener', '1975-01-01', 'Reconnaît des contributions exceptionnelles aux domaines de la communication et du traitement des signaux.'),
(20, 'Médaille Copley de la Royal Society', '2001-01-01', 'Distinction scientifique pour des réalisations exceptionnelles dans divers domaines, y compris l\'informatique.'),
(21, 'Prix Turing de l\'Association for Computing Machinery (ACM)', '1966-01-01', 'Distinction pour des contributions exceptionnelles à l\'informatique.'),
(22, 'Médaille IEEE John von Neumann', '1997-01-01', 'Reconnaît des contributions exceptionnelles en informatique et en ingénierie informatique.');

-- --------------------------------------------------------

--
-- Table structure for table `domaines`
--

CREATE TABLE `domaines` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `date_creation` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `domaines`
--

INSERT INTO `domaines` (`id`, `nom`, `date_creation`) VALUES
(1, 'Intelligence artificielle', '1956-01-01'),
(2, 'Réalité virtuelle', '1968-01-01'),
(3, 'Apprentissage automatique', '1959-01-01'),
(4, 'Réseaux de neurones', '1943-01-01'),
(5, 'Traitement du langage naturel', '1950-01-01'),
(6, 'Vision par ordinateur', '1966-01-01'),
(7, 'Robotique', '1956-01-01'),
(8, 'Cybersécurité', '1971-01-01'),
(9, 'Internet des objets (IoT)', '1982-01-01'),
(10, 'Blockchain', '2008-01-01'),
(11, 'Informatique quantique', '1981-01-01'),
(12, 'Biotechnologie informatique', '1990-01-01'),
(13, 'Traitement du signal', '1920-01-01'),
(14, 'Informatique mobile', '1973-01-01'),
(15, 'Systèmes embarqués', '1960-01-01'),
(16, 'Génie logiciel', '1968-01-01'),
(17, 'Analyse de données', '1960-01-01'),
(18, 'Cloud computing', '2006-01-01'),
(19, 'Réseaux informatiques', '1969-01-01'),
(20, 'Bioinformatique', '1970-01-01'),
(21, 'Technologies éducatives', '1990-01-01'),
(22, 'Informatique environnementale', '2005-01-01');

-- --------------------------------------------------------

--
-- Table structure for table `entreprises`
--

CREATE TABLE `entreprises` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `fondation` date DEFAULT NULL,
  `developpements_majeurs` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `entreprises`
--

INSERT INTO `entreprises` (`id`, `nom`, `fondation`, `developpements_majeurs`) VALUES
(1, 'Microsoft', '1975-04-04', 'Windows, Microsoft Office, Xbox, Azure.'),
(2, 'Apple Inc.', '1976-04-01', 'Macintosh, iPhone, iPad, iOS.'),
(3, 'Google', '1998-09-04', 'Moteur de recherche, Android, Google Maps, Gmail.'),
(4, 'IBM', '1911-06-16', 'Ordinateurs IBM, IBM Watson, Système d\'exploitation OS/360.'),
(5, 'Intel Corporation', '1968-07-18', 'Microprocesseurs Intel, x86 architecture.'),
(6, 'Oracle Corporation', '1977-06-16', 'Oracle Database, Java, Oracle Cloud.'),
(7, 'Amazon', '1994-07-05', 'Amazon Web Services (AWS), Kindle, Amazon Echo.'),
(8, 'Cisco Systems', '1984-12-10', 'Équipements réseau, Routeurs, Commutateurs.'),
(9, 'Facebook', '2004-02-04', 'Facebook, WhatsApp, Instagram, Oculus VR.'),
(10, 'NVIDIA', '1993-01-04', 'Cartes graphiques GeForce, GPU NVIDIA Tesla.'),
(11, 'Adobe Systems', '1982-12-11', 'Adobe Photoshop, Adobe Acrobat, Creative Cloud.'),
(12, 'Samsung Electronics', '1969-01-13', 'Téléviseurs, Smartphones, Semi-conducteurs.'),
(13, 'HP (Hewlett-Packard)', '1939-01-01', 'Imprimantes, Ordinateurs personnels, Serveurs.'),
(14, 'Sony Corporation', '1946-05-07', 'PlayStation, Walkman, Sony Xperia, Sony Bravia.'),
(15, 'Lenovo', '1984-11-01', 'Ordinateurs ThinkPad, ThinkCentre, Motorola.'),
(16, 'Tesla, Inc.', '2003-06-01', 'Véhicules électriques, Autopilot, Powerwall.');

-- --------------------------------------------------------

--
-- Table structure for table `evenements_historiques`
--

CREATE TABLE `evenements_historiques` (
  `id` int(11) NOT NULL,
  `nom` text DEFAULT NULL,
  `date_evenement` date DEFAULT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `evenements_historiques`
--

INSERT INTO `evenements_historiques` (`id`, `nom`, `date_evenement`, `description`) VALUES
(1, 'Passage à l\'an 2000', '2000-01-01', 'L\'effet Y2K. Préoccupations liées à la programmation informatique et à la stabilité des systèmes liées au passage à l\'an 2000.'),
(2, 'Machine de Turing', '1936-05-01', 'Alan Turing publie son article fondateur sur la machine de Turing et la notion de calculabilité.'),
(3, 'Base théorie de l\'information', '1945-12-10', 'Claude Shannon publie \"A Mathematical Theory of Communication\", jetant les bases de la théorie de l\'information.'),
(4, 'Debut de l\' IA', '1956-08-17', 'John McCarthy organise la Conférence de Dartmouth, considérée comme le point de départ de l\'intelligence artificielle.'),
(5, 'Lancement premier message', '1969-04-07', 'Lancement du premier message sur ARPANET, le précurseur d\'Internet.'),
(6, 'Lancement microprocesseur', '1971-04-01', 'Lancement du microprocesseur Intel 4004, le premier microprocesseur commercial.'),
(7, 'Premier email', '1973-10-29', 'Raymond Tomlinson envoie le premier e-mail, marquant le début de la communication électronique.'),
(8, 'Lancement UNIX', '1983-03-15', 'Lancement du système d\'exploitation UNIX, qui a une influence majeure sur le développement des systèmes d\'exploitation.'),
(9, 'Lancement du web', '1990-08-06', 'Lancement du World Wide Web par Tim Berners-Lee au CERN, marquant le début de l\'ère Internet moderne.'),
(10, 'Lancement de Windows 95', '1995-07-16', 'Lancement de Windows 95, marquant l\'introduction de l\'interface utilisateur graphique de Microsoft.'),
(11, 'Facebook', '2004-02-04', 'Mark Zuckerberg lance Facebook depuis sa chambre à l\'Université Harvard.'),
(12, 'Premier ordinateur', '1951-05-21', 'Premier ordinateur commercial UNIVAC I livré aux États-Unis.'),
(13, 'IBM 650', '1953-09-21', 'IBM annonce l\'IBM 650, le premier ordinateur à semi-conducteurs disponible en location.'),
(14, 'IBM System 60', '1964-04-01', 'IBM lance le System/360, une famille de mainframes compatibles.'),
(15, 'Fondation d\'Apple', '1976-04-01', 'Steve Jobs et Steve Wozniak fondent Apple Inc.'),
(16, 'Pac-Man', '1980-12-12', 'Lancement du premier jeu vidéo d\'arcade populaire, Pac-Man.'),
(17, 'WWW', '1989-03-12', 'Tim Berners-Lee propose son idée de ce qui deviendra le World Wide Web.'),
(18, 'Premier site web', '1991-08-06', 'Lancement du premier site Web public par Tim Berners-Lee.'),
(19, 'Nouveau champion d\'échec', '1997-05-23', 'IBM Deep Blue bat le champion du monde d\'échecs Garry Kasparov.'),
(20, 'Premier Iphone', '2007-06-29', 'Lancement du premier iPhone par Apple, marquant le début de l\'ère des smartphones.'),
(21, 'Faille de sécurité', '2013-06-06', 'Edward Snowden révèle des documents sur la surveillance mondiale par les agences de renseignement.');

-- --------------------------------------------------------

--
-- Table structure for table `evenements_informatiques`
--

CREATE TABLE `evenements_informatiques` (
  `id` int(11) NOT NULL,
  `nom` text DEFAULT NULL,
  `annee` date DEFAULT NULL,
  `evenement` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `evenements_informatiques`
--

INSERT INTO `evenements_informatiques` (`id`, `nom`, `annee`, `evenement`) VALUES
(1, 'La règle à calculer', '1632-01-01', 'William Oughtred imagine dès 1620 et réalise en 1632 les premières règles à calculer.'),
(2, 'La Pascaline ', '1645-01-01', 'Blaise Pascal invente la machine à calculer.'),
(3, 'ENIAC', '1946-01-01', 'Le premier ordinateur électronique, est mis en service aux États-Unis.'),
(4, 'Création d\'Internet', '1973-01-01', 'Le réseau ARPANET est opérationnel.'),
(5, 'UNIVAC I', '1951-01-01', 'Le premier ordinateur commercial, est installé aux États-Unis.'),
(6, 'Microsoft', '1983-01-01', 'Lancement du système d\'exploitation Microsoft Windows 1.0.'),
(7, 'Création', '1991-01-01', 'Création du World Wide Web par Tim Berners-Lee.'),
(8, 'Apple Ipod', '2001-01-01', 'Introduction de l\'\'iPod par Apple, révolutionnant la musique portable.'),
(9, 'Apple Iphone', '2007-01-01', 'Lancement de l\'\'iPhone, marquant l\'\'ère des smartphones modernes.'),
(10, 'Apple Ipad', '2010-01-01', 'Sortie du premier iPad, popularisant les tablettes électroniques.'),
(11, 'NSA', '2013-01-01', 'Révélation des fuites d\'\'Edward Snowden sur la surveillance de la NSA.'),
(12, 'Googlz', '2016-01-01', 'AlphaGo de Google DeepMind bat le champion du monde de Go, marquant un jalon en intelligence artificielle.'),
(13, 'Premier trou noir', '2018-01-01', 'Annonce du premier trou noir photographié par l\'\'Event Horizon Telescope.'),
(14, 'Covid 19', '2020-01-01', 'Pandémie de COVID-19 accélérant la transition vers le travail à distance et l\'\'importance des technologies de l\'\'information.'),
(15, 'Intel', '1971-01-01', 'Lancement du microprocesseur Intel 4004, le premier microprocesseur commercial.'),
(16, 'Python', '1989-01-01', 'Invention du langage de programmation Python par Guido van Rossum.'),
(17, 'Navigateur web graphique', '1993-01-01', 'Premier navigateur web graphique, Mosaic, développé par le NCSA.'),
(18, 'Facebook', '2004-01-01', 'Lancement de Facebook, plateforme de médias sociaux, par Mark Zuckerberg.'),
(19, 'Mozilla', '2010-01-01', 'Introduction du langage de programmation Rust par Mozilla.'),
(20, 'Accord de Paris', '2015-01-01', 'Accord de Paris sur le climat signé en utilisant une signature électronique.'),
(21, 'Réalité virtuelle', '2016-01-01', 'Lancement de la réalité virtuelle grand public avec Oculus Rift.'),
(22, 'Cryptommonnaie', '2019-01-01', 'Annonce du projet de cryptomonnaie Libra (plus tard renommé Diem) par Facebook.'),
(23, 'Cybersécurité', '2021-01-01', 'Attaque du ransomware Colonial Pipeline, soulignant les vulnérabilités de la cybersécurité des infrastructures critiques.'),
(24, 'Télescope spatial', '2022-01-01', 'Lancement du télescope spatial James Webb, successeur du télescope spatial Hubble.');

-- --------------------------------------------------------

--
-- Table structure for table `generations_informatique`
--

CREATE TABLE `generations_informatique` (
  `id` int(11) NOT NULL,
  `annee_debut` date DEFAULT NULL,
  `annee_fin` date DEFAULT NULL,
  `nom` varchar(50) DEFAULT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `generations_informatique`
--

INSERT INTO `generations_informatique` (`id`, `annee_debut`, `annee_fin`, `nom`, `description`) VALUES
(1, '1940-01-01', '1950-01-01', 'Première génération', 'Des relais aux lampes'),
(2, '1950-01-01', '1960-01-01', 'Deuxième génération', 'Les transistors'),
(3, '1960-01-01', '1970-01-01', 'Troisième génération', 'Les circuits intégrés'),
(4, '1970-01-01', '1980-01-01', 'Quatrième génération', 'Les microprocesseurs'),
(5, '1980-01-01', '2024-01-01', 'Cinquième génération', 'Puces VLSI et Intelligence Artificielle');

-- --------------------------------------------------------

--
-- Table structure for table `personnalites`
--

CREATE TABLE `personnalites` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `date_naissance` date DEFAULT NULL,
  `date_fin` date DEFAULT NULL,
  `biographie` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `personnalites`
--

INSERT INTO `personnalites` (`id`, `nom`, `date_naissance`, `date_fin`, `biographie`) VALUES
(1, 'Alan Turing', '1912-06-23', '1954-06-07', 'Mathématicien et cryptanalyste britannique, considéré comme le père de l\'informatique. Concepteur de la machine de Turing.'),
(2, 'Ada Lovelace', '1815-12-10', '1852-11-27', 'Mathématicienne anglaise, souvent considérée comme la première programmeuse. Collaboratrice de Charles Babbage.'),
(3, 'Bill Gates', '1955-10-28', '2024-01-01', 'Co-fondateur de Microsoft, philanthrope.'),
(4, 'Steve Jobs', '1955-02-24', '2011-10-05', 'Co-fondateur d\'Apple Inc. et de Pixar Animation Studios.'),
(5, 'Tim Berners-Lee', '1955-06-08', '2024-01-01', 'Physicien et informaticien britannique, inventeur du World Wide Web.'),
(6, 'Linus Torvalds', '1969-12-28', '2024-01-01', 'Créateur du noyau Linux.'),
(7, 'Grace Hopper', '1906-12-09', '1992-01-01', 'Informaticienne américaine, pionnière dans le domaine des langages de programmation.'),
(8, 'John McCarthy', '1927-09-04', '2011-10-24', 'Informaticien américain, fondateur de l\'intelligence artificielle.'),
(9, 'Larry Page', '1973-03-26', '2024-01-01', 'Co-fondateur de Google.'),
(10, 'Mark Zuckerberg', '1984-05-14', '2024-01-01', 'Co-fondateur de Facebook.'),
(11, 'Vinton Cerf', '1943-06-23', '2024-01-01', 'Informaticien américain, co-créateur du protocole TCP/IP.'),
(12, 'Margaret Hamilton', '1936-08-17', '2024-01-01', 'Informaticienne américaine, directrice du développement logiciel pour le programme Apollo de la NASA.'),
(13, 'Richard Stallman', '1953-03-16', '2024-01-01', 'Programmeur et défenseur du logiciel libre, fondateur de la Free Software Foundation.'),
(14, 'Satya Nadella', '1967-08-19', '2024-01-01', 'PDG de Microsoft.'),
(15, 'Sheryl Sandberg', '1969-08-28', '2024-01-01', 'COO de Facebook, auteure et militante.'),
(16, 'Elon Musk', '1971-06-28', '2024-01-01', 'Entrepreneur et ingénieur, fondateur de SpaceX et Tesla.'),
(17, 'Andrew Ng', '1976-04-18', '2024-01-01', 'Informaticien et chercheur en intelligence artificielle, co-fondateur de Coursera.');

-- --------------------------------------------------------

--
-- Table structure for table `programmes`
--

CREATE TABLE `programmes` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `date_creation` date DEFAULT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `programmes`
--

INSERT INTO `programmes` (`id`, `nom`, `date_creation`, `description`) VALUES
(1, 'UNIX', '1969-11-03', 'Système d\'exploitation multitâche et multi-utilisateur développé par Ken Thompson, Dennis Ritchie et d\'autres chez Bell Labs.'),
(2, 'Microsoft Windows', '1985-11-20', 'Système d\'exploitation développé par Microsoft, devenu l\'un des systèmes d\'exploitation les plus utilisés au monde.'),
(3, 'Linux Kernel', '1991-09-17', 'Noyau du système d\'exploitation Linux, créé par Linus Torvalds.'),
(4, 'Apache HTTP Server', '1995-04-01', 'Serveur web open-source, l\'un des plus populaires et utilisés sur Internet.'),
(5, 'MySQL', '1995-05-23', 'Système de gestion de base de données relationnelle open-source.'),
(6, 'Java', '1995-05-23', 'Langage de programmation orienté objet développé par Sun Microsystems.'),
(7, 'Mozilla Firefox', '2002-11-09', 'Navigateur web open-source, concurrent de Internet Explorer.'),
(8, 'Google Chrome', '2008-09-02', 'Navigateur web développé par Google, devenu l\'un des navigateurs les plus populaires.'),
(9, 'Python', '1991-02-20', 'Langage de programmation interprété, polyvalent et facile à lire et écrire.'),
(10, 'Docker', '2013-03-20', 'Plateforme de virtualisation légère pour le développement, la mise en œuvre et l\'exécution d\'applications dans des conteneurs logiciels.'),
(11, 'Adobe Photoshop', '1988-02-19', 'Logiciel de retouche d\'images, devenu une référence dans le domaine de la conception graphique.'),
(12, 'GNU Emacs', '1976-03-20', 'Éditeur de texte extensible et personnalisable, souvent utilisé pour la programmation.'),
(13, 'Microsoft Office', '1989-08-01', 'Suite bureautique de Microsoft, comprenant des applications comme Word, Excel et PowerPoint.'),
(14, 'WordPress', '2003-05-27', 'Système de gestion de contenu (CMS) pour la création de sites web et de blogs.'),
(15, 'Adobe Illustrator', '1987-03-19', 'Logiciel de création vectorielle utilisé pour le dessin et la conception graphique.'),
(16, 'MySQL', '1995-05-23', 'Système de gestion de base de données relationnelle open-source.'),
(17, 'Eclipse IDE', '2001-11-07', 'Environnement de développement intégré (IDE) utilisé pour le développement Java et d\'autres langages.'),
(18, 'TensorFlow', '2015-11-09', 'Bibliothèque open-source d\'apprentissage automatique développée par Google.'),
(19, 'AngularJS', '2010-10-20', 'Framework JavaScript développé par Google pour la création d\'applications web à une seule page.'),
(20, 'Git', '2005-04-03', 'Système de gestion de versions distribué, largement utilisé pour le suivi des modifications dans le code source.'),
(21, 'C++', '1983-10-01', 'Langage de programmation orienté objet dérivé du langage C, largement utilisé dans le développement logiciel.'),
(22, 'C', '1972-01-01', 'Langage de programmation impératif, à la base de nombreux autres langages.'),
(23, 'HTML', '1991-01-01', 'Langage de balisage utilisé pour la création et la structuration de contenu sur le web.'),
(24, 'CSS', '1996-12-17', 'Feuilles de style en cascade, utilisées pour la présentation visuelle des documents HTML.'),
(25, 'JavaScript', '1995-12-04', 'Langage de script côté client pour le développement web interactif.'),
(26, 'PHP', '1994-06-08', 'Langage de script côté serveur, souvent utilisé pour le développement web dynamique.'),
(27, 'Ruby', '1995-02-24', 'Langage de programmation interprété, axé sur la simplicité et la productivité.'),
(28, 'Swift', '2014-06-02', 'Langage de programmation développé par Apple pour le développement d\'applications iOS et macOS.'),
(29, 'TypeScript', '2012-10-01', 'Langage de programmation superset de JavaScript, avec ajout de typage statique.'),
(30, 'Go (Golang)', '2009-11-10', 'Langage de programmation développé par Google, axé sur la simplicité et la performance.');

-- --------------------------------------------------------

--
-- Table structure for table `submissions`
--

CREATE TABLE `submissions` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `type` enum('CREATE','UPDATE','DELETE') NOT NULL,
  `new_date` date DEFAULT NULL,
  `new_title` varchar(255) DEFAULT NULL,
  `new_description` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `submission_category`
--

CREATE TABLE `submission_category` (
  `submission_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `CategoryId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `login` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `avancees`
--
ALTER TABLE `avancees`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `distinctions`
--
ALTER TABLE `distinctions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `domaines`
--
ALTER TABLE `domaines`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `entreprises`
--
ALTER TABLE `entreprises`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `evenements_historiques`
--
ALTER TABLE `evenements_historiques`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `evenements_informatiques`
--
ALTER TABLE `evenements_informatiques`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `generations_informatique`
--
ALTER TABLE `generations_informatique`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `personnalites`
--
ALTER TABLE `personnalites`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `programmes`
--
ALTER TABLE `programmes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `submissions`
--
ALTER TABLE `submissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `submission_category`
--
ALTER TABLE `submission_category`
  ADD PRIMARY KEY (`submission_id`,`CategoryId`),
  ADD KEY `CategoryId` (`CategoryId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`login`),
  ADD UNIQUE KEY `login` (`login`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `avancees`
--
ALTER TABLE `avancees`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `distinctions`
--
ALTER TABLE `distinctions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `domaines`
--
ALTER TABLE `domaines`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `entreprises`
--
ALTER TABLE `entreprises`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `evenements_historiques`
--
ALTER TABLE `evenements_historiques`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `evenements_informatiques`
--
ALTER TABLE `evenements_informatiques`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `generations_informatique`
--
ALTER TABLE `generations_informatique`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `personnalites`
--
ALTER TABLE `personnalites`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `programmes`
--
ALTER TABLE `programmes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `submission_category`
--
ALTER TABLE `submission_category`
  ADD CONSTRAINT `submission_category_ibfk_1` FOREIGN KEY (`submission_id`) REFERENCES `submissions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `submission_category_ibfk_2` FOREIGN KEY (`CategoryId`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
