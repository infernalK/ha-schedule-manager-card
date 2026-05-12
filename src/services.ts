import type { HomeAssistant } from './types';

export class ScheduleManagerServices {
  constructor(private hass: HomeAssistant) {}

  async callService(domain: string, service: string, data: any) {
    await this.hass.callService(domain, service, data);
  }

  async enableSchedule(scheduleId: string) {
    await this.callService('schedule_manager', 'enable_schedule', { schedule_id: scheduleId });
  }

  async disableSchedule(scheduleId: string) {
    await this.callService('schedule_manager', 'disable_schedule', { schedule_id: scheduleId });
  }

  async setActiveSchedule(groupId: string, scheduleId: string) {
    await this.callService('schedule_manager', 'set_active_schedule', { group_id: groupId, schedule_id: scheduleId });
  }
}