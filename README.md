# Schedule Manager Card — carte pour le tableau de bord

Cette **carte** s’affiche sur votre **tableau de bord** Home Assistant (écran d’accueil ou vue que vous consultez souvent). Elle sert à **voir** vos plannings et à **les modifier** sans passer par des fichiers de configuration complexes.

![Aperçu de la carte Schedule Manager](images/card-preview.png)

**Dépôt :** [github.com/infernalK/ha-schedule-manager-card](https://github.com/infernalK/ha-schedule-manager-card)

---

## Ordre à respecter (très important)

1. **D’abord** : installer l’intégration **[Schedule Manager](https://github.com/infernalK/ha-schedule-manager)** sur le **même** Home Assistant et l’**ajouter** dans **Paramètres** → **Appareils et services** (suivre le README de l’intégration).
2. **Ensuite seulement** : installer **cette carte** et l’ajouter à un tableau de bord.

Sans l’intégration, la carte n’a **aucune donnée** à afficher et les boutons ne pourront pas fonctionner.

---

## En bref : comment la carte et l’intégration travaillent ensemble

- L’**intégration** enregistre vos plannings et exécute les actions aux heures prévues.
- La **carte** lit les informations sur le **capteur** de l’appareil « Schedule Manager » et envoie des commandes à l’intégration (création de planning, modification des plages, marche / arrêt, etc.) quand vous cliquez dans l’interface.

Vous n’avez pas besoin de connaître les noms techniques des services pour l’usage courant : la carte les utilise pour vous.

---

## Installation avec HACS (méthode recommandée)

1. Dans **HACS**, menu **⋮** → **Dépôts personnalisés**.
2. URL : `https://github.com/infernalK/ha-schedule-manager-card`  
   - Catégorie : **Tableau de bord** ou **Lovelace** (selon votre version de HACS) — **pas** « Intégration ».
3. **Ajouter**, puis dans l’onglet **Tableau de bord** (ou **Frontend**) de HACS, cherchez **Schedule Manager Card** → **Télécharger**.
4. Après le téléchargement, vérifiez que Home Assistant a bien enregistré une **ressource** de type **module JavaScript** pointant vers le fichier de la carte :  
   **Paramètres** → **Tableaux de bord** (ou **Appareils et services** → **Ressources** selon la version) → le chemin ressemble souvent à `/hacsfiles/schedule_manager_card/schedule-manager-card.js` ou équivalent affiché par HACS.

Lien rapide pour ouvrir HACS depuis un navigateur : [my.home-assistant.io → dépôt HACS](https://my.home-assistant.io/create-link/?redirect=hacs_repository) avec l’URL du dépôt ci-dessus.

---

## Installation manuelle (si vous n’utilisez pas HACS)

1. Téléchargez la dernière version du fichier **`schedule-manager-card.js`** (fourni à la racine du dépôt sur GitHub, ou généré avec `npm install` puis `npm run build` si vous clonez le projet).
2. Copiez ce fichier dans le dossier **`www`** de votre configuration Home Assistant (chemin typique : `/config/www/`).
3. **Paramètres** → **Tableaux de bord** → menu **⋮** → **Ressources** → **Ajouter une ressource** : type **JavaScript module**, URL **`/local/schedule-manager-card.js`** (le dossier `www` est servi sous `/local/`).
4. Enregistrez, puis **rafraîchissez** la page du navigateur (parfois un redémarrage de Home Assistant est nécessaire).

---

## Ajouter la carte sur un tableau de bord (pas à pas)

1. Ouvrez le tableau de bord voulu.
2. Cliquez sur les **⋮** en haut à droite → **Modifier le tableau de bord**.
3. **Ajouter une carte** (bouton en bas à droite ou selon votre thème).
4. Si **Schedule Manager** apparaît dans la liste des cartes personnalisées, choisissez-la. Sinon, faites défiler jusqu’à **Carte manuelle** / **YAML** et collez :

```yaml
type: custom:schedule-manager-card
```

5. **Enregistrer** le tableau de bord, puis quittez le mode édition.

En **mode édition**, vous pouvez ouvrir la carte → **crayon** (modifier) : un sélecteur permet souvent de choisir le **bon capteur** si la carte affiche une erreur.

---

## Configuration (pour aller plus loin)

### Cas le plus courant

Rien d’autre que le YAML minimal ci-dessus, **si** le capteur par défaut correspond à votre installation. La carte cherche en priorité un capteur nommé comme `sensor.schedule_manager_status` (interface en anglais). En **français**, Home Assistant nomme souvent ce capteur `sensor.schedule_manager_etat`. Si rien ne s’affiche, ouvrez l’**éditeur** de la carte et sélectionnez le capteur sous l’appareil **Schedule Manager**, ou ajoutez :

```yaml
type: custom:schedule-manager-card
status_entity: sensor.schedule_manager_etat
```

(remplacez par l’identifiant exact affiché sous **Paramètres** → **Appareils et services** → appareil **Schedule Manager** → entité de type capteur).

### N’afficher que certains plannings

Utile si vous avez beaucoup de plannings et voulez une carte par « famille » :

```yaml
type: custom:schedule-manager-card
schedule_ids:
  - collez_ici_le_premier_uuid
  - collez_ici_le_second_uuid
```

Les **UUID** sont les clés visibles dans les **attributs** du capteur hub, section `schedules` (**Outils de développement** → **États**). Ce champ est optionnel : sans lui, tous les plannings du capteur sont listés.

---

## Ce que vous pouvez faire dans la carte (sans YAML)

- Voir la liste des plannings et les **créneaux** (heures de début / fin).
- **Activer ou désactiver** un planning.
- **Créer** un nouveau planning ou **supprimer** un planning.
- **Ajouter** ou **retirer** une plage horaire et renseigner les actions (selon les options affichées par la version de la carte).

Pour des scénarios très avancés (plusieurs actions par plage, jours de répétition en YAML, etc.), voir le [README de l’intégration Schedule Manager](https://github.com/infernalK/ha-schedule-manager/blob/main/README.md).

---

## Si ça ne fonctionne pas (dépannage rapide)

| Problème | Piste |
|----------|--------|
| La carte est vide ou « capteur introuvable » | Vérifiez que l’**intégration** Schedule Manager est bien installée et qu’un **capteur** existe sous l’appareil Schedule Manager. Ajustez `status_entity` ou le sélecteur dans l’éditeur de carte. |
| Erreur au chargement de la page | Vérifiez la **ressource** JavaScript (chemin, type **module**) et rechargez le navigateur sans cache. |
| HACS refuse le dépôt (« structure non conforme ») | Le fichier `schedule-manager-card.js` doit être **présent à la racine** de la branche sur GitHub (voir le dépôt public). En clone local : `npm ci && npm run build`, puis commit du fichier généré. |
