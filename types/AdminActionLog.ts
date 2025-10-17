export interface AdminActionLog {
  id: number;
  targetId: number;
  targetType: string;
  action: string;
  performedBy: string;
  role: string;
  notes?: string;
  createdAt: string;
}
