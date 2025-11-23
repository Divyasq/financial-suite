export interface StandardReport {
  id: string;
  name: string;
  description: string;
  category: string;
  icon?: string;
  isDefault?: boolean;
  isPinned?: boolean;
  lastUsed?: Date;
  usageCount?: number;
  hasCustomViews?: boolean;
  views?: ReportView[];
}

export interface ReportView {
  id: string;
  name: string;
  type: 'default' | 'personal' | 'team';
  createdBy?: string;
  createdAt: Date;
  isShared?: boolean;
  customizations?: ReportCustomization[];
}

export interface ReportCustomization {
  fieldId: string;
  fieldName: string;
  isVisible: boolean;
  order: number;
}

export interface ReportCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  isVisible: boolean;
  order: number;
  reportCount: number;
  color: string;
}

export interface BusinessTypePreset {
  id: string;
  name: string;
  description: string;
  icon: string;
  categories: string[];
  recommendedReports: string[];
}

export interface UserPreferences {
  categories: ReportCategory[];
  pinnedReports: string[];
  hiddenReports?: string[];
  businessType?: string;
  lastUsedReports: string[];
  customizations: Record<string, ReportCustomization[]>;
}
