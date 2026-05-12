# Schedule Manager Card

Lovelace card for visualizing and controlling Schedule Manager schedules.

## Installation

1. Build the card: `npm run build`
2. Copy `dist/schedule-manager-card.js` to your Home Assistant `www` directory.
3. Add the resource in Lovelace: `/local/schedule-manager-card.js`
4. Add the card to your dashboard.

## Configuration

```yaml
type: custom:schedule-manager-card
group_id: optional_group_id
schedule_ids:
  - schedule_id1
  - schedule_id2
```

## Features

- Display schedules and time blocks
- Enable/disable schedules
- Set active schedule in exclusive groups
- Visual indication of active time blocks