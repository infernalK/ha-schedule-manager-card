export interface TimeBlock {
  start_time: string;
  end_time: string;
  action_type: string;
  action_payload: any;
}

export interface Schedule {
  id: string;
  name: string;
  time_blocks: TimeBlock[];
  enabled: boolean;
  repeat_days: number[];
}

export interface ScheduleGroup {
  id: string;
  name: string;
  schedules: string[];
  exclusive: boolean;
  active_schedule?: string;
  enabled: boolean;
}

export interface CardConfig {
  type: string;
  group_id?: string;
  schedule_ids?: string[];
}