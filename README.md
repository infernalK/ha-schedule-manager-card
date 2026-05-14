# Schedule Manager Card

Carte Lovelace pour afficher et piloter les plannings de l’intégration **[Schedule Manager](https://github.com/infernalK/ha-schedule-manager)**.

![Aperçu de la carte Schedule Manager](images/card-preview.png)

**Dépôt :** [github.com/infernalK/ha-schedule-manager-card](https://github.com/infernalK/ha-schedule-manager-card)

## Rôle de la carte par rapport à l’intégration

L’intégration `schedule_manager` conserve les données, calcule les créneaux actifs et exécute les actions. **Cette carte ne remplace pas l’intégration** : elle s’y branche pour l’usage quotidien sur le tableau de bord.

| Étape | Où ça se passe |
|-------|----------------|
| Données affichées (liste des plannings, plages, état) | Lecture des **attributs** du **capteur hub** de l’intégration, notamment `schedules`. |
| Créer / supprimer un planning, ajouter ou retirer une plage, activer / désactiver | La carte appelle les **services** `schedule_manager.create_schedule`, `update_schedule`, `delete_schedule`, `enable_schedule`, `disable_schedule`, etc. |

Sans la carte, les mêmes opérations restent possibles via **Paramètres → Appareils et services** (création de planning) et les **services** documentés sur le dépôt de l’intégration.

## Prérequis

- Intégration [Schedule Manager](https://github.com/infernalK/ha-schedule-manager) installée et configurée.
- Un **capteur** sur l’appareil hub « Schedule Manager » qui expose l’attribut `schedules` (c’est ce capteur que vous indiquez à la carte).

Par défaut, la carte suppose `sensor.schedule_manager_status` (libellé anglais « Status »). En interface **français**, l’entité est souvent `sensor.schedule_manager_etat` (« État »). En cas de doute : **Paramètres → Appareils et services → Schedule Manager** → ouvrir l’appareil hub → noter l’`entity_id` du capteur, ou le choisir dans l’**éditeur visuel** de la carte (`ha-entity-picker`).

## Installation

### Manuelle

1. Cloner ce dépôt et exécuter `npm install` puis `npm run build`.
2. Copier `schedule-manager-card.js` à la racine du projet vers le dossier `www` de Home Assistant (par ex. `/config/www/`).
3. Dans **Paramètres → Tableaux de bord → trois points → Ressources**, ajouter une ressource **JavaScript module** : `/local/schedule-manager-card.js`.
4. Ajouter la carte au tableau de bord (voir **Configuration** ci-dessous).

### HACS

1. Dans HACS : **⋮** (menu) → **Dépôts personnalisés**.
2. Collez l’URL : `https://github.com/infernalK/ha-schedule-manager-card`
3. Catégorie : **Tableau de bord** (ou **Lovelace** selon la version de HACS) — **pas** « Intégration ».
4. Validez, puis onglet **Tableau de bord** → recherchez **Schedule Manager Card** → **Télécharger**.

Lien d’installation rapide (à adapter à votre instance) : [my.home-assistant.io → hacs_repository](https://my.home-assistant.io/create-link/?redirect=hacs_repository) avec l’URL du dépôt ci-dessus.

**Erreur HACS : « Repository structure for main is not compliant »** : HACS vérifie que le fichier indiqué dans `hacs.json` (`schedule-manager-card.js`) **existe bien à la racine de la branche `main` sur GitHub**. Sans ce fichier compilé, l’ajout du dépôt est toujours refusé. Ce dépôt inclut le JS généré ; après un clone, exécutez `npm ci && npm run build`, commitez `schedule-manager-card.js`, puis poussez vers `main`. Vous pouvez aussi lancer l’action **Build bundle** sur GitHub si elle est configurée.

Après installation HACS : **Paramètres** → **Appareils et services** → **Ressources** (ou via le tableau de bord) → vérifiez que la ressource pointe vers le fichier JS de la carte en **module JavaScript**.

## Configuration

En mode **modifier le tableau de bord**, l’éditeur de la carte propose un sélecteur **Capteur Schedule Manager** (`ha-entity-picker`) pour choisir le capteur hub (domaine `sensor`), ainsi qu’un filtre optionnel par **IDs de plannings** (`schedule_ids`).

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

Si l’entité du capteur n’est pas celle attendue par défaut (langue, renommage, plusieurs instances) :

```yaml
type: custom:schedule-manager-card
status_entity: sensor.votre_capteur_hub
```

Les `schedule_ids` correspondent aux **clés** de l’objet `schedules` dans les attributs du capteur (identifiants UUID des plannings).

## Fonctionnalités (côté utilisateur)

- Affichage des plannings et de leurs plages (horaires, actions, payload).
- Mise en évidence du **créneau actif** lorsqu’il y en a un.
- **Activation / désactivation** par planning (aligné sur les interrupteurs et services de l’intégration).
- Création d’un planning, suppression, ajout / retrait de plages depuis l’UI (sans passer par le YAML des services pour l’édition courante).

Pour la configuration avancée des actions (YAML, plusieurs services par plage, jours de répétition), voir le [README de l’intégration](https://github.com/infernalK/ha-schedule-manager/blob/main/README.md).

## Notes pour les mainteneurs (métadonnées GitHub / HACS)

Pour que la validation HACS complète réussisse **sans** ignorer de contrôles dans la CI, sur GitHub ouvrez **About** (roue à côté de la description du dépôt) et renseignez :

- **Description** — par ex. *Carte Lovelace pour l’intégration Schedule Manager (plannings, plages, actions).*
- **Topics** — au moins un topic valide parmi ceux attendus par HACS, par ex. `home-assistant`, `hacs`, `lovelace`, `schedule-manager`.

Ensuite vous pouvez retirer `topics` et `description` de `ignore` dans `.github/workflows/ci.yml`.
