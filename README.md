# 🗿 Artifacts MMO Bot

Bot Node.js/TypeScript pour automatiser des actions sur l'API d'Artifacts MMO.

## 🚀 Fonctionnalités

- Chargement et gestion des personnages, objets, ressources, monstres et carte via l'API officielle.
- Création automatique de personnages si besoin.
- Affichage console enrichi avec icônes Unicode pour un suivi clair des actions.
- Support du mode debug pour un logging détaillé.
- Structure modulaire pour faciliter l'ajout de nouvelles commandes et services.

## 📦 Installation

1. **Cloner le dépôt :**
   ```sh
   git clone <url-du-repo>
   cd artifacts
   ```

2. **Installer les dépendances :**
   ```sh
   npm install
   ```

3. **Configurer l'environnement :**
   - Copier `.env.example` en `.env` et renseigner la variable `ARTIFACT_TOKEN` avec votre token API.

## 🛠️ Utilisation

Lancer le bot en mode développement :
```sh
npm run dev
```

## ⚙️ Configuration

- Active le mode debug pour plus de logs :
  ```sh
  npm run dev -- --debug
  ```

## 📁 Structure du projet

- `src/api/` : Accès aux endpoints de l'API Artifacts MMO.
- `src/store/` : Stores en mémoire pour les entités (items, monstres, ressources...).
- `src/services/` : Logique métier et services avancés.
- `src/commands/` : Commandes CLI (à venir).
- `src/utils/` : Fonctions utilitaires.

## 📝 Documentation

- [docs/unicode_icons.md](docs/unicode_icons.md) : Liste des icônes Unicode utilisées pour les logs console.

## 🤝 Contribuer

1. Fork le projet
2. Crée une branche (`git checkout -b feature/ma-feature`)
3. Commit tes changements (`git commit -am 'feat: ma feature'`)
4. Push la branche (`git push origin feature/ma-feature`)
5. Ouvre une Pull Request

## 📄 Licence

Ce projet est sous licence ISC.

---

> Made with ❤️ for Artifacts MMO