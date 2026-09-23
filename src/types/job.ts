export interface Job {
  id:any;
  category: string;
  snippet: string;
  tags: string[];
  publishedAt: string;
  company: string;
  directApply: boolean;
  editorial: string;
  note?: string | null;
  applyUrl: string;
  sourceUrl: string;
  onFocus: string;
  country?: string | null;
}