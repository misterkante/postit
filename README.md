# Post-It

Application de prise de notes façon post-it : créer, lire, modifier, supprimer et rechercher des notes. Projet réalisé seul en septembre 2025 à la Coding Academy by Epitech (Bénin), pour apprendre Vue 3 et la gestion d'état avec Pinia.

**Démo** : https://misterkante-postit.netlify.app — voir [Limites connues](#limites-connues) : l'API de l'école n'est plus en ligne.

## Fonctionnalités

- Liste des notes en grille, avec une couleur pastel attribuée à chaque carte
- Recherche instantanée dans les notes
- Création, modification et suppression d'une note depuis des fenêtres de dialogue
- Page de détail par note (`/note/:id`) et page 404
- Squelettes de chargement pendant les requêtes, messages d'erreur réseau lisibles
- Notes gardées dans le `localStorage` pour un affichage immédiat au rechargement

## Stack

| Rôle | Outil |
|---|---|
| Framework | Vue 3 (Composition API, `<script setup>`) |
| État | Pinia |
| Routage | Vue Router 4 (mode historique) |
| Interface | Vuetify 3, Tailwind CSS |
| Tests | Vitest |
| Build | Vue CLI |
| Hébergement | Netlify |

## Architecture

```
src/
├── api/notes.js        # Appels HTTP (fetch) : get, post, put, destroy
├── store/notes.js      # Store Pinia : état des notes, synchronisation API + localStorage
├── router/index.js     # Routes : /, /note/:id, 404
├── views/              # Notes.vue (liste), Note.vue (détail), NotFound.vue
├── components/         # CardAdd, CardUpdate, CardDelete (dialogues)
└── plugins/            # Vuetify, Pinia, polices
test/
└── notes.test.js       # Tests du store
```

Les composants ne parlent jamais à l'API directement : ils appellent le store, qui passe par `src/api/notes.js`. En cas d'échec, le module API renvoie un message d'erreur lisible au lieu de lever une exception, et le store l'expose à l'interface.

## Lancer le projet

```bash
npm install
npm run serve     # serveur de développement
npm run build     # build de production dans dist/
npm run lint      # ESLint + Prettier
npm test          # tests Vitest
```

## Limites connues

Ce projet est archivé dans l'état où il a été rendu. Ce qui ne fonctionne pas aujourd'hui :

- **API hors ligne.** Les notes étaient stockées sur une API fournie par l'école (`post-it.epi-bluelock.bj`), qui n'existe plus. La démo s'affiche, mais créer ou modifier une note échoue.
- **« Supprimer tout » ne supprime rien côté serveur.** La boucle `for (let note in notes)` parcourt les clés de l'objet réactif au lieu du tableau des notes : aucune requête de suppression ne part, alors que l'écran se vide.
- **Lien direct vers une note en 404 sur Netlify.** Le routeur est en mode historique mais le site n'a pas de règle de réécriture (`public/_redirects` avec `/* /index.html 200`).
- **Tests dépendants du réseau.** Les tests du store appellent la vraie API au lieu de la simuler, et `localStorage.clear` est écrit sans parenthèses, donc le stockage n'est pas vidé entre deux tests. Le test du composant `CardAdd` est commenté.

## Auteur

Gilchrist Kanté — [github.com/misterkante](https://github.com/misterkante)
