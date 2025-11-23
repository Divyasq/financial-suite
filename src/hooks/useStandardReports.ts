import { useState, useEffect } from 'react';
import { StandardReport, ReportCategory, UserPreferences, BusinessTypePreset } from '../types/standardReports';
import { standardReports, reportCategories, businessTypePresets } from '../data/standardReportsData';

const STORAGE_KEY = 'standardReportsPreferences';

export function useStandardReports() {
  const [reports, setReports] = useState<StandardReport[]>(standardReports);
  const [categories, setCategories] = useState<ReportCategory[]>(reportCategories);
  const [preferences, setPreferences] = useState<UserPreferences>({
    categories: reportCategories,
    pinnedReports: [],
    lastUsedReports: [],
    customizations: {}
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBusinessType, setSelectedBusinessType] = useState<string>('');

  // Load preferences from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsedPreferences = JSON.parse(stored);
        setPreferences(parsedPreferences);
        setCategories(parsedPreferences.categories || reportCategories);
        setSelectedBusinessType(parsedPreferences.businessType || '');
      } catch (error) {
        console.error('Error loading preferences:', error);
      }
    }
  }, []);

  // Save preferences to localStorage
  const savePreferences = (newPreferences: Partial<UserPreferences>) => {
    const updated = { ...preferences, ...newPreferences };
    setPreferences(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  // Toggle category visibility
  const toggleCategoryVisibility = (categoryId: string) => {
    const updatedCategories = categories.map(cat =>
      cat.id === categoryId ? { ...cat, isVisible: !cat.isVisible } : cat
    );
    setCategories(updatedCategories);
    savePreferences({ categories: updatedCategories });
  };

  // Reorder categories
  const reorderCategories = (startIndex: number, endIndex: number) => {
    const result = Array.from(categories);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    
    const reorderedCategories = result.map((cat, index) => ({
      ...cat,
      order: index + 1
    }));
    
    setCategories(reorderedCategories);
    savePreferences({ categories: reorderedCategories });
  };

  // Toggle report pin status
  const toggleReportPin = (reportId: string) => {
    const updatedPinned = preferences.pinnedReports.includes(reportId)
      ? preferences.pinnedReports.filter(id => id !== reportId)
      : [...preferences.pinnedReports, reportId];
    
    savePreferences({ pinnedReports: updatedPinned });
  };

  // Apply business type preset
  const applyBusinessTypePreset = (presetId: string) => {
    const preset = businessTypePresets.find(p => p.id === presetId);
    if (!preset) return;

    const updatedCategories = categories.map(cat => ({
      ...cat,
      isVisible: preset.categories.includes(cat.id)
    }));

    const updatedPinned = preset.recommendedReports;

    setCategories(updatedCategories);
    setSelectedBusinessType(presetId);
    savePreferences({
      categories: updatedCategories,
      pinnedReports: updatedPinned,
      businessType: presetId
    });
  };

  // Reset to defaults
  const resetToDefaults = () => {
    setCategories(reportCategories);
    setSelectedBusinessType('');
    savePreferences({
      categories: reportCategories,
      pinnedReports: [],
      businessType: '',
      customizations: {}
    });
  };

  // Track report usage
  const trackReportUsage = (reportId: string) => {
    const updatedLastUsed = [
      reportId,
      ...preferences.lastUsedReports.filter(id => id !== reportId)
    ].slice(0, 10); // Keep last 10

    savePreferences({ lastUsedReports: updatedLastUsed });

    // Update report usage count
    setReports(prev => prev.map(report =>
      report.id === reportId
        ? { ...report, usageCount: (report.usageCount || 0) + 1, lastUsed: new Date() }
        : report
    ));
  };

  // Get filtered reports
  const getFilteredReports = () => {
    return reports.filter(report => {
      const matchesSearch = searchTerm === '' ||
        report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const categoryVisible = categories.find(cat => cat.id === report.category)?.isVisible !== false;
      
      return matchesSearch && categoryVisible;
    });
  };

  // Get reports by category
  const getReportsByCategory = (categoryId: string) => {
    return getFilteredReports().filter(report => report.category === categoryId);
  };

  // Get pinned reports
  const getPinnedReports = () => {
    if (!preferences.pinnedReports) return [];
    return reports.filter(report => preferences.pinnedReports.includes(report.id));
  };

  // Get recent reports
  const getRecentReports = () => {
    if (!preferences.lastUsedReports) return [];
    return preferences.lastUsedReports
      .map(id => reports.find(report => report.id === id))
      .filter(Boolean) as StandardReport[];
  };

  // Get visible categories
  const getVisibleCategories = () => {
    return categories
      .filter(cat => cat.isVisible !== false)
      .sort((a, b) => (a.order || 0) - (b.order || 0));
  };

  // Get suggestions for business type
  const getSuggestionsForBusinessType = () => {
    if (!selectedBusinessType) {
      return {
        hiddenCategories: [],
        unpinnedRecommended: []
      };
    }
    
    const preset = businessTypePresets.find(p => p.id === selectedBusinessType);
    if (!preset) {
      return {
        hiddenCategories: [],
        unpinnedRecommended: []
      };
    }

    const hiddenCategories = categories.filter(cat => 
      !cat.isVisible && preset.categories.includes(cat.id)
    );

    const unpinnedRecommended = preset.recommendedReports.filter(
      reportId => !preferences.pinnedReports.includes(reportId)
    );

    return {
      hiddenCategories,
      unpinnedRecommended: unpinnedRecommended.map(id => 
        reports.find(r => r.id === id)
      ).filter(Boolean) as StandardReport[]
    };
  };

  return {
    reports,
    categories,
    preferences,
    searchTerm,
    setSearchTerm,
    selectedBusinessType,
    businessTypePresets,
    toggleCategoryVisibility,
    reorderCategories,
    toggleReportPin,
    applyBusinessTypePreset,
    resetToDefaults,
    trackReportUsage,
    getFilteredReports,
    getReportsByCategory,
    getPinnedReports,
    getRecentReports,
    getVisibleCategories,
    getSuggestionsForBusinessType,
    savePreferences
  };
}
