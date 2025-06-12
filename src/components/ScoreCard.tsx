import React from 'react';

interface ScoreCardProps {
  title: string;
  score: number;
  description?: string;
  color?: 'blue' | 'green' | 'yellow' | 'red';
}

export const ScoreCard: React.FC<ScoreCardProps> = ({ 
  title, 
  score, 
  description,
  color = 'blue'
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 8) return 'bg-green-500';
    if (score >= 6) return 'bg-yellow-500';
    if (score >= 4) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getScoreText = (score: number) => {
    if (score >= 8) return 'Odličo';
    if (score >= 6) return 'Dobro';
    if (score >= 4) return 'Prosečno';
    return 'Potrebno poboljšanje';
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <div className={`score-circle ${getScoreColor(score)}`}>
          {score.toFixed(1)}
        </div>
      </div>
      <div className="mb-2">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>{getScoreText(score)}</span>
          <span>{score}/10</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full ${getScoreColor(score)}`}
            style={{ width: `${(score / 10) * 100}%` }}
          ></div>
        </div>
      </div>
      {description && (
        <p className="text-sm text-gray-600">{description}</p>
      )}
    </div>
  );
};