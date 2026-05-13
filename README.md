# Schedule Manager Card

Carte Lovelace pour afficher et piloter les plannings de l’intégration **Schedule Manager**.

**Dépôt :** [github.com/infernalK/ha-schedule-manager-card](https://github.com/infernalK/ha-schedule-manager-card)

## Prérequis

- Intégration [Schedule Manager](https://github.com/infernalK/ha-schedule-manager) installée et configurée (le capteur `sensor.schedule_manager_status` expose les données utilisées par la carte).

## Installation

### Manuelle

1. Cloner ce dépôt et exécuter `npm install` puis `npm run build`.
2. Copier `schedule-manager-card.js` à la racine du projet vers le dossier `www` de Home Assistant (par ex. `/config/www/`).
3. Dans **Paramètres → Tableaux de bord → trois points → Ressources**, ajouter une ressource **JavaScript module** : `/local/schedule-manager-card.js`.
4. Ajouter la carte au tableau de bord (voir Configuration ci-dessous).

### HACS

1. Dans HACS : **⋮** (menu) → **Dépôts personnalisés**.
2. Collez l’URL : `https://github.com/infernalK/ha-schedule-manager-card`
3. Catégorie : **Tableau de bord** (ou **Lovelace** selon la version de HACS) — **pas** « Intégration ».
4. Validez, puis onglet **Tableau de bord** → recherchez **Schedule Manager Card** → **Télécharger**.

Lien d’installation rapide (à adapter à votre instance) : [my.home-assistant.io → hacs_repository](https://my.home-assistant.io/create-link/?redirect=hacs_repository) avec l’URL du dépôt ci-dessus.

**Erreur HACS : « Repository structure for main is not compliant »** : HACS vérifie que le fichier indiqué dans `hacs.json` (`schedule-manager-card.js`) **existe bien à la racine de la branche `main` sur GitHub**. Sans ce fichier compilé, l’ajout du dépôt est toujours refusé. Ce dépôt inclut le JS généré ; après un clone, exécutez `npm ci && npm run build`, commitez `schedule-manager-card.js`, puis poussez vers `main`. Vous pouvez aussi lancer l’action **Build bundle** sur GitHub si elle est configurée.

Après installation HACS : **Paramètres** → **Appareils et services** → **Ressources** (ou via le tableau de bord) → vérifiez que la ressource pointe vers le fichier JS de la carte en **module JavaScript**.

## Configuration

En mode **modifier le tableau de bord**, la carte propose un sélecteur **Capteur Schedule Manager** (`ha-entity-picker`) pour choisir le capteur à utiliser (domaine `sensor`), ainsi que le filtre optionnel par **IDs de plannings**.

Exemple minimal (tous les plannings renvoyés par le capteur) :

```yaml
type: custom:schedule-manager-card
```

Filtrer les plannings affichés :

```yaml
type: custom:schedule-manager-card
schedule_ids:
  - id_planning_1
  - id_planning_2
```

Si l’entité du capteur n’est pas `sensor.schedule_manager_status` (renommage, plusieurs instances) :

```yaml
type: custom:schedule-manager-card
status_entity: sensor.votre_capteur_schedule_manager
```

## Fonctionnalités

- Lecture des plannings via les attributs du capteur d’état
- Activation / désactivation des plannings
- Mise en évidence du créneau horaire courant
