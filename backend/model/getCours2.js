// le fichier mysqlQueries contient des fonctions qui réalisent
// les queries dans la base de données.
const queries = require('./database/mysqlQueries');

// Ici, on utilise ce que l'on appelle l'"object destructuring" de
// JavaScript afin de récupérer les fonctions sendError et sendMessage.
// Ce sont les équivalents des fonctions du même nom que vous aviez
// utilisées en PHP (voir helper.php). L'intérêt de l'object destructuring
// réside dans le fait que l'on va pouvoir appeler directement les fonctions
// sendError et sendMessage. Si l'on avait écrit :
// const message = require ("./message");
// on aurait dû, par la suite, appeler message.sendError () et
// message.sendMessage ().
const {sendError, sendMessage} = require ("./message");

// permettra de réaliser l'authentification
const auth = require ('./auth');

// Ici, pour réaliser séquentiellement plusieurs requêtes mySQL (ce
// qui devra être fait pour répondre à certaines requêtes de votre
// appli Angular, on va utiliser l'opérateur "await "(voir ci-dessous).
// A noter que toutes les fonctions qui utilisent ce mot clef doivent
// être déclarées comme asynchrones via le mot clef async
async function getCours2(req,res) {
    // On récupère la variable de session et, dans celle-ci, on
    // va récupérer l'ID du user. C'est équivalent en PHP à :
    // session_start();
    // $userId = $_SESSION['userId'];
    const session = auth.getSession (req);
    const userId = auth.getUserId(session);
    if (userId === -1)
        return sendError (res, 'not authenticated');
    // en PHP, l'instruction "die" utilisée dans sendError permettait
    // d'éviter que le script n'exécute du code après avoir transmis la
    // réponse au frontend. Ici, sendError ne peut pas faire la même
    // chose car cela stopperait tout simplement le serveur web. A la
    // place, on se contente de faire un "return sendError", ce qui
    // stoppera l'exécution de la function getCours1.

    // Contrairement à Apache/PHP, qui conserve les sessions sur le
    // serveur, en Node/Express, on ne conserve pas cette information
    // sur le serveur parce que cela pourrait induire des problèmes de
    // scalabilité (trop d'espace de stockage utilisé quand il y a
    // beaucoup d'utilisateurs). Il faut donc renvoyer le cookie de
    // session après chaque requête. Et c'est le frontend qui sauvegardera
    // cette information.
    auth.setSessionCookie (req, res, session);

    // ici, on récupère les data passées à la route : on suppose
    // que l'utilisateur a envoyé une donnée appelée maxId
    if (typeof req.body.maxId === 'undefined')
        return sendError(res, 'Vous n\'avez pas envoyé la donnée maxId');
    const maxId = req.body.maxId;

    // Maintenant que l'on est identifié et que l'on a récupéré la valeur
    // de maxId, on peut réaliser les requêtes mySQL.
    // Grâce au mot clef "await", celles-ci sont réalisées séquentiellement :
    // même si les requêtes mysql sont asynchrones, await va attendre la
    // réponse de la requête avant de passer à la suite.
    // Précisons ici que ces requêtes n'ont d'autre intérêt que de vous montrer
    // comment réaliser des requêtes séquentielles à la manière de PHP : ici,
    // on aurait pu se contenter d'une seule requête MySQL pour obtenir le
    // même résultat.
    const idsPetitsCours = await queries.getIdsPetitsCours(maxId);
    const petitsCours = await queries.getNomsPetitsCours(idsPetitsCours);

    // on renvoie au format JSON la liste des cours demandés par l'utilisateur
    sendMessage(res, petitsCours);
}


module.exports = getCours2;

