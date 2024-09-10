import phaseprogress from './phaseprogress.model';

export default interface phase {
  phase_id: number;
  fundraising_id: number;
  project_start_date: string;
  project_end_date: string;
  phase_start_date: string;
  phase_end_date: string;
  phase_title: string;
  required_amount: string;
  phase_action_planDoc: string;
  reason_for_change: null | string;
  status: string;
  isCashed: boolean;
  createdAt: string;
  updatedAt: string;
  phases: phaseprogress[];
}
