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

Ajoutez le dépôt comme **plugin Lovelace / carte** dans HACS (repository frontend), installez **Schedule Manager Card**, puis rechargez les ressources Lovelace et ajoutez la carte.

## Configuration

Exemple minimal (tous les plannings renvoyés par le capteur) :

```yaml
type: custom:schedule-manager-card
```

Afficher un groupe ou filtrer des plannings :

```yaml
type: custom:schedule-manager-card
group_id: votre_groupe_id
# ou :
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

- Lecture des plannings et groupes via les attributs du capteur d’état
- Activation / désactivation des plannings
- Groupe exclusif : bouton pour définir le planning actif
- Mise en évidence du créneau horaire courant
