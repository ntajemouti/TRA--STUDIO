# 🎬 TRA Studio — Plateforme Officielle de Réservation & Production

Plateforme web haut de gamme conçue pour **TRA Studio** (Témara, Maroc).
Elle permet aux clients de réserver des séances de production en studio (Podcast, Shooting photo/vidéo, Contenu réseaux sociaux, Branding, Clips cinématiques) et offre à l'administrateur un **contrôle total** sur son activité.

---

## 🌟 Fonctionnalités Clés

### 📱 Espace Client
- **Catalogue Immersif** : Présentation cinématique des 6 prestations avec badges, photos haute résolution et atouts inclus.
- **Tunnel de Réservation Fluide** :
  1. Choix de la prestation et exploration de ses équipements.
  2. Coordonnées client (Nom, Téléphone, Email, Compte Instagram, Nombre de personnes, Notes).
  3. Calendrier interactif avec créneaux horaires dynamiques (en tenant compte des jours d'ouverture et des indisponibilités).
  4. Récapitulatif clair et confirmation instantanée.
- **Tableau de Bord Client** : Suivi de la réservation en temps réel avec modification possible des coordonnées.
- **Demande de Devis Personnalisé** : Formulaire interactif pour les projets sur mesure.
- **Design Responsive & Moderne** : Optimisé pour mobile (iPhone/Android sans zoom automatique), tablette et PC avec thème sombre studio.

### 🔒 Espace Administrateur Secret (`#admin`)
- **Accès Sécurisé** : Protégé par mot de passe maître (par défaut : `TRA@Studio#Master2026!`).
- **Statistiques en Temps Réel au Sommet** :
  - Chiffre d'affaires encaissé et revenus en attente.
  - Panier moyen et total des heures studio facturées.
  - Graphiques de performance par prestation et analyse des créneaux de pointe.
  - Filtre par période (Tout, Ce mois-ci, 30 derniers jours, 7 jours).
- **Gestion des Réservations** :
  - Confirmation, mise en attente, clôture ou annulation en 1 clic.
  - Bouton **WhatsApp direct** : Ouvre une conversation pré-remplie avec le client en 1 clic.
  - Modification des détails ou ajout manuel de réservations pour clients téléphoniques.
- **Gestion des Devis Sur Mesure** : Suivi des demandes personnalisées et contact WhatsApp immédiat.
- **Catalogue & Tarifs (Prestations)** :
  - Ajout, modification complète (titre, prix, durée, photos, atouts, badge).
  - Suppression définitive avec boîte de dialogue de confirmation.
  - Affichage / masquage en direct.
- **Disponibilités & Calendrier** :
  - Blocage de dates complètes (jours fériés, congés, maintenance).
  - Blocage de créneaux horaires spécifiques.
  - Choix des jours d'ouverture de la semaine.
- **Paramètres du Studio (Contrôle Total)** :
  - Modification des coordonnées : Téléphone d'appel, WhatsApp officiel, Instagram, Email, Ville/Adresse.
  - Bandeau d'annonce / Promo activable en haut du site client.
  - Modification du mot de passe maître de l'espace admin.
- **Synchronisation Cloud Universelle Multi-Appareils** :
  - Tout changement fait sur PC est immédiatement reflété sur le téléphone de n'importe quel client en quelques secondes sans rechargement.

---

## 🚀 Installation & Lancement Local

### Prérequis
- [Node.js](https://nodejs.org/) (version 18 ou supérieure recommandée)
- `npm` ou `yarn`

### 1. Installer les dépendances
```bash
npm install
```

### 2. Démarrer le serveur de développement local
```bash
npm run dev
```
Le site sera accessible sur : `http://localhost:5173` (ou le port affiché dans le terminal).

### 3. Compiler pour la production
```bash
npm run build
```
Les fichiers prêts à être hébergés seront générés dans le dossier `dist/`.

---

## 📤 Comment Pousser le Projet sur GitHub (Guide Simple)

Si vous souhaitez héberger votre code sur GitHub :

1. **Créez un nouveau dépôt sur GitHub** (par exemple : `tra-studio-booking`) sans cocher "Initialize with README".
2. **Ouvrez un terminal dans ce dossier** et lancez :
```bash
git init
git add .
git commit -m "Initial commit - TRA Studio official booking platform"
git branch -M main
git remote add origin https://github.com/VOTRE_PSEUDO/tra-studio-booking.git
git push -u origin main
```

---

## 🌐 Comment Héberger le Site Gratuitement en 1 Clic

### Option 1 : Déploiement sur Vercel (Recommandé - Gratuit & Instantané)
1. Allez sur [vercel.com](https://vercel.com) et connectez-vous avec votre compte GitHub.
2. Cliquez sur **« Add New Project »** et importez votre dépôt `tra-studio-booking`.
3. Cliquez directement sur **« Deploy »** (les réglages Vite sont détectés automatiquement).
4. En 30 secondes, votre site est en ligne avec un lien sécurisé HTTPS !

### Option 2 : Déploiement sur Netlify (Gratuit)
1. Allez sur [netlify.com](https://netlify.com) et connectez-vous.
2. Cliquez sur **« Add new site » -> « Import an existing project »** depuis GitHub.
3. Commande de build : `npm run build` | Dossier de publication : `dist`
4. Cliquez sur **« Deploy »**.

### Option 3 : Déploiement sur Surge
```bash
npm run build
npx surge dist tra-studio-officiel.surge.sh
```

---

## 🔑 Accès Espace Administrateur

- **URL Secrète :** `https://votre-site.com/#admin` (ou en cliquant sur le cadenas en bas de page).
- **Mot de Passe Maître initial :** `TRA@Studio#Master2026!`
- *(Le mot de passe peut être modifié à tout moment depuis l'onglet « Paramètres Studio » de votre tableau de bord).*

---

## 🛠️ Technologies Utilisées
- **React 18** avec **TypeScript**
- **Vite** (Build ultra-rapide)
- **Tailwind CSS** (Styles sur mesure & animations fluides)
- **Lucide React** (Icônes professionnelles)
- **NTFY Cloud Channel** (Synchronisation en temps réel sans serveur backend lourd)

---
© TRA Studio Témara. Tous droits réservés.
