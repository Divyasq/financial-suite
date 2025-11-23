import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ReportView } from '../components/reports/ReportView';

export function ReportPage() {
  const { reportId } = useParams<{ reportId: string }>();
  const navigate = useNavigate();

  if (!reportId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Report Not Found</h1>
          <p className="text-gray-600 mb-4">The requested report could not be found.</p>
          <button
            onClick={() => navigate('/financial-suite/standard-reports')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Standard Reports
          </button>
        </div>
      </div>
    );
  }

  return (
    <ReportView 
      reportId={reportId} 
      onBack={() => navigate('/financial-suite/standard-reports')}
    />
  );
}
