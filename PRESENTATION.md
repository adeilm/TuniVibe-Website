# 🎤 Script de Présentation - Projet TuniVibe (NoSQL & MongoDB)

Ce document est structuré pour t'aider à créer tes slides sur Canva et te servir de notes pendant ta présentation.

---

## 🟢 Slide 1 : Titre & Introduction
**Titre :** TuniVibe - Plateforme de Réservation d'Événements
**Sous-titre :** Une approche NoSQL avec MongoDB & Spring Boot
**Présenté par :** [Ton Nom]

**🗣️ Script (Ce que tu dis) :**
"Bonjour à tous. Aujourd'hui, je vais vous présenter **TuniVibe**, une application web complète pour la gestion et la réservation d'événements culturels en Tunisie. L'objectif principal de ce projet n'était pas seulement de créer un site web, mais de démontrer la puissance d'une architecture **NoSQL** avec **MongoDB** pour résoudre des problèmes que les bases de données relationnelles classiques (SQL) peinent à gérer."

---

## 🟢 Slide 2 : La Problématique (Pourquoi pas SQL ?)
**Points clés (Bullet points) :**
*   **Rigidité du Schéma :** Difficile de faire évoluer la structure des données (ex: ajouter des réseaux sociaux pour un organisateur).
*   **Performance en Lecture :** Les "Joins" (jointures) coûtent cher. Pour afficher un événement, il faut joindre les tables `Events`, `Users`, `Reviews`, `Categories`.
*   **Ratio Lecture/Écriture :** Une application événementielle est **Read-Heavy** (beaucoup plus de consultations que de réservations).

**🗣️ Script :**
"Dans une approche SQL classique, pour afficher une simple page d'événement, nous devrions faire des jointures complexes entre 4 ou 5 tables. Cela ralentit l'application. De plus, si nous voulons changer la structure d'un événement demain, nous devons modifier tout le schéma de la base. Nous avions besoin de plus de flexibilité et de rapidité."

---

## 🟢 Slide 3 : Architecture Technique
**Visuel :** [React] ↔ [Spring Boot API] ↔ [MongoDB]

**Points clés :**
*   **Frontend :** React.js + Vite (Interface utilisateur dynamique).
*   **Backend :** Spring Boot (Java).
*   **Database :** MongoDB (Base de données orientée documents).
*   **Format de données :** JSON de bout en bout (Full JSON).

**🗣️ Script :**
"Nous avons choisi la stack MERN adaptée (avec Spring Boot). L'avantage majeur est que nous manipulons du **JSON** partout. Le Frontend envoie du JSON, le Backend le traite, et MongoDB le stocke tel quel sous forme de BSON. Il n'y a pas de conversion complexe (ORM) comme avec Hibernate et SQL."

---

## 🟢 Slide 4 : Pourquoi MongoDB ? (Read-Oriented)
**Points clés :**
*   **Modèle Document :** Les données liées sont stockées ensemble.
*   **Pas de Jointures (No Joins) :** Une seule requête suffit pour tout récupérer.
*   **Scalabilité :** Facile à distribuer sur plusieurs serveurs.

**🗣️ Script :**
"MongoDB est une base de données orientée **lecture**. Au lieu de découper nos données en petits morceaux éparpillés (normalisation), nous regroupons les données qui sont affichées ensemble. C'est ce qu'on appelle la dénormalisation intelligente."

---

## 🟢 Slide 5 : Pattern 1 - Embedding (L'Imbrication)
**Concept :** Stocker les détails directement dans le document parent.

**Exemple Code (Java) :**
```java
// Event.java
@Document(collection = "events")
public class Event {
    @Id
    private String id;
    private String titre;
    
    // Embedding : Les avis sont DANS l'événement
    private List<Review> reviews = new ArrayList<>(); 
    
    // Embedding : L'organisateur est DANS l'événement
    private Organisateur organisateur; 
}
```

**🗣️ Script :**
"Voici notre premier pattern NoSQL : l'**Embedding**. Au lieu d'avoir une table `Reviews` séparée, nous stockons la liste des avis directement à l'intérieur du document `Event`.
**Résultat :** Quand je charge la page d'un événement, je récupère l'événement, son organisateur et ses avis en **une seule requête** rapide."

---

## 🟢 Slide 6 : Pattern 2 - Snapshotting (L'Instantané)
**Problème :** Si le prix d'un événement change, les anciennes factures ne doivent pas changer.
**Solution :** Copier les données au moment de l'achat.

**Exemple Code (Java) :**
```java
// Reservation.java
@Document(collection = "reservations")
public class Reservation {
    // On ne stocke pas juste l'ID, mais une COPIE de l'événement
    private EventInfo eventSnapshot; 
    private double prixPaye; // Fixé à l'instant T
}
```

**🗣️ Script :**
"Le deuxième pattern est le **Snapshotting**. Imaginez que vous réservez un billet à 50 DT. Une semaine plus tard, l'organisateur augmente le prix à 80 DT. Votre réservation ne doit pas changer ! Avec SQL, c'est complexe. Avec MongoDB, nous copions simplement les détails de l'événement dans la réservation au moment de l'achat. C'est une archive parfaite."

---

## 🟢 Slide 7 : Indexing & Recherche Textuelle
**Fonctionnalité :** Barre de recherche performante.
**Tech :** Index Textuel MongoDB.

**Exemple Code :**
```java
@TextIndexed(weight = 3)
private String titre;

@TextIndexed(weight = 2)
private String description;
```

**🗣️ Script :**
"Pour la recherche, nous n'avons pas utilisé de simples `LIKE %...%` qui sont lents. Nous avons créé des **Index Textuels** sur le titre et la description. Cela permet à MongoDB de faire de la recherche 'Full-Text' très rapide, un peu comme Google, en donnant plus de poids (d'importance) au titre qu'à la description."

---

## 🟢 Slide 8 : Aggregation Framework (Analytics)
**Fonctionnalité :** Dashboard Admin (Revenus, Top Ventes).
**Tech :** Pipeline d'agrégation (`$match`, `$group`, `$sum`).

**Exemple Code :**
```java
// StatsController.java
Aggregation aggregation = newAggregation(
    group().sum("total").as("totalRevenue")
);
```

**🗣️ Script :**
"Enfin, pour le tableau de bord administrateur, nous utilisons le puissant **Aggregation Framework** de MongoDB. Au lieu de récupérer toutes les réservations et de calculer le total en Java (ce qui utiliserait trop de mémoire), nous demandons à MongoDB de faire le calcul pour nous. C'est du traitement de données côté serveur."

---

## 🟢 Slide 9 : Conclusion & Perspectives
**Résumé :**
*   Performance accrue grâce au modèle Document.
*   Flexibilité du schéma pour le développement agile.
*   Patterns NoSQL (Embedding, Snapshotting) maîtrisés.

**Perspectives (Futur) :**
*   Déploiement sur **MongoDB Atlas** (Cloud).
*   Ajout de la **Recherche Géospatiale** (trouver des événements dans un rayon de 10km).

**🗣️ Script :**
"En conclusion, ce projet m'a permis de comprendre qu'il n'y a pas de 'meilleure' base de données, mais des outils adaptés aux besoins. Pour une application web moderne et flexible comme TuniVibe, MongoDB était le choix idéal. Merci de votre attention."
