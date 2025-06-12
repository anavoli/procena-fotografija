import React from 'react';
import { PhotoAnalysis } from '../types/analysis';
import { ScoreCard } from './ScoreCard';
import { Camera, Eye, Palette, Lightbulb, Brain, Cpu, Zap } from 'lucide-react';

interface AnalysisResultsProps {
  analysis: PhotoAnalysis;
}

export const AnalysisResults: React.FC<AnalysisResultsProps> = ({ analysis }) => {
  const technicalAverage = Object.values(analysis.technical).reduce((a, b) => a + b, 0) / Object.values(analysis.technical).length;
  const compositionAverage = Object.values(analysis.composition).reduce((a, b) => a + b, 0) / Object.values(analysis.composition).length;

  return (
    <div className="space-y-8">
      {/* Real AI Analysis Header */}
      <div className="text-center bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
        <div className="flex items-center justify-center mb-3">
          <Brain className="w-8 h-8 text-green-600 mr-2" />
          <h2 className="text-2xl font-bold text-gray-900">Prava AI Analiza završena</h2>
        </div>
        <p className="text-gray-600 mb-4">
          TensorFlow.js modeli su analizirali vašu fotografiju koristeći napredne algoritme za computer vision
        </p>
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-white text-3xl font-bold">
          {analysis.overallScore.toFixed(1)}
        </div>
        <p className="text-sm text-gray-500 mt-2">AI ocena • {analysis.analysisDate}</p>
        <div className="flex items-center justify-center mt-3 space-x-4 text-xs text-green-600">
          <div className="flex items-center">
            <Cpu className="w-3 h-3 mr-1" />
            TensorFlow.js
          </div>
          <div className="flex items-center">
            <Zap className="w-3 h-3 mr-1" />
            MobileNet
          </div>
          <div className="flex items-center">
            <Eye className="w-3 h-3 mr-1" />
            COCO-SSD
          </div>
        </div>
      </div>

      {/* Pregled fotografije */}
      <div className="card">
        <img 
          src={analysis.imageUrl} 
          alt="Analizirana fotografija"
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">{analysis.fileName}</h3>
          <div className="flex items-center text-sm text-green-600">
            <Brain className="w-4 h-4 mr-1" />
            TensorFlow.js AI
          </div>
        </div>
      </div>

      {/* Tehnička procena */}
      <div>
        <div className="flex items-center mb-4">
          <Camera className="w-6 h-6 text-primary-600 mr-2" />
          <h3 className="text-xl font-bold text-gray-900">Tehnička procena</h3>
          <span className="ml-auto text-lg font-semibold text-primary-600">
            {technicalAverage.toFixed(1)}/10
          </span>
          <div className="ml-2 flex items-center text-xs text-green-600">
            <Cpu className="w-3 h-3 mr-1" />
            Pixel analiza
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ScoreCard title="Oštrina" score={analysis.technical.sharpness} description="Edge detection algoritam" />
          <ScoreCard title="Fokus" score={analysis.technical.focus} description="Gradient analiza" />
          <ScoreCard title="Osvetljenje" score={analysis.technical.lighting} description="Histogram analiza" />
          <ScoreCard title="Ekspozicija" score={analysis.technical.exposure} description="EXIF + pixel analiza" />
          <ScoreCard title="Balans boja" score={analysis.technical.colorBalance} description="RGB distribucija" />
          <ScoreCard title="Rezolucija" score={analysis.technical.resolution} description="Megapixel analiza" />
          <ScoreCard title="Kvalitet slike" score={analysis.technical.imageQuality} description="Kombinovana metrika" />
          <ScoreCard title="Šum" score={analysis.technical.noise} description="Noise detection" />
          <ScoreCard title="Artefakti" score={analysis.technical.artifacts} description="Kompresija analiza" />
        </div>
      </div>

      {/* Kompoziciona analiza */}
      <div>
        <div className="flex items-center mb-4">
          <Eye className="w-6 h-6 text-primary-600 mr-2" />
          <h3 className="text-xl font-bold text-gray-900">Kompoziciona analiza</h3>
          <span className="ml-auto text-lg font-semibold text-primary-600">
            {compositionAverage.toFixed(1)}/10
          </span>
          <div className="ml-2 flex items-center text-xs text-green-600">
            <Eye className="w-3 h-3 mr-1" />
            Object detection
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ScoreCard title="Raspored elemenata" score={analysis.composition.elementArrangement} description="AI detekcija preklapanja" />
          <ScoreCard title="Pravilo trećine" score={analysis.composition.ruleOfThirds} description="Poziciona analiza objekata" />
          <ScoreCard title="Vodeće linije" score={analysis.composition.leadingLines} description="Geometrijska analiza" />
          <ScoreCard title="Balans" score={analysis.composition.balance} description="Vizuelna težina objekata" />
          <ScoreCard title="Simetrija" score={analysis.composition.symmetry} description="Mirror detection" />
          <ScoreCard title="Dubina polja" score={analysis.composition.depthOfField} description="Blur gradient analiza" />
        </div>
      </div>

      {/* AI opis sadržaja */}
      <div>
        <div className="flex items-center mb-4">
          <Palette className="w-6 h-6 text-primary-600 mr-2" />
          <h3 className="text-xl font-bold text-gray-900">AI prepoznavanje sadržaja</h3>
          <div className="ml-auto flex items-center text-xs text-green-600">
            <Brain className="w-3 h-3 mr-1" />
            MobileNet + COCO-SSD
          </div>
        </div>
        <div className="card space-y-4">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">AI klasifikacija glavnog subjekta</h4>
            <p className="text-gray-700">{analysis.content.mainSubject}</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Detektovani objekti i pozadina</h4>
            <p className="text-gray-700">{analysis.content.background}</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Okruženje (AI klasifikacija)</h4>
            <p className="text-gray-700">{analysis.content.environment}</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Analiza boja (RGB histogram)</h4>
            <p className="text-gray-700">{analysis.content.colors}</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Tonalna analiza</h4>
            <p className="text-gray-700">{analysis.content.tones}</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">AI procena raspoloženja</h4>
            <p className="text-gray-700">{analysis.content.mood}</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Atmosfera (AI analiza)</h4>
            <p className="text-gray-700">{analysis.content.atmosphere}</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">AI interpretacija priče</h4>
            <p className="text-gray-700">{analysis.content.story}</p>
          </div>
        </div>
      </div>

      {/* AI preporuke za poboljšanje */}
      <div>
        <div className="flex items-center mb-4">
          <Lightbulb className="w-6 h-6 text-primary-600 mr-2" />
          <h3 className="text-xl font-bold text-gray-900">AI preporuke za poboljšanje</h3>
          <div className="ml-auto flex items-center text-xs text-green-600">
            <Brain className="w-3 h-3 mr-1" />
            Personalizovano na osnovu analize
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="card">
            <div className="flex items-center mb-3">
              <div className="w-2 h-2 bg-primary-500 rounded-full mr-2"></div>
              <h4 className="font-semibold text-gray-900">Tehnički aspekti (AI)</h4>
            </div>
            <ul className="space-y-2">
              {analysis.improvements.technical.map((suggestion, index) => (
                <li key={index} className="text-sm text-gray-700 flex items-start">
                  <span className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
          <div className="card">
            <div className="flex items-center mb-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <h4 className="font-semibold text-gray-900">Kompozicija (AI)</h4>
            </div>
            <ul className="space-y-2">
              {analysis.improvements.compositional.map((suggestion, index) => (
                <li key={index} className="text-sm text-gray-700 flex items-start">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
          <div className="card">
            <div className="flex items-center mb-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
              <h4 className="font-semibold text-gray-900">Prezentacija (AI)</h4>
            </div>
            <ul className="space-y-2">
              {analysis.improvements.presentation.map((suggestion, index) => (
                <li key={index} className="text-sm text-gray-700 flex items-start">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Real AI Footer */}
      <div className="text-center p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
        <div className="flex items-center justify-center mb-2">
          <Brain className="w-5 h-5 mr-2 text-green-600" />
          <span className="font-semibold text-gray-900">Analiza završena pomoću TensorFlow.js AI modela</span>
        </div>
        <p className="text-sm text-gray-600 mb-2">
          MobileNet za klasifikaciju • COCO-SSD za detekciju • Pixel-level analiza
        </p>
        <p className="text-xs text-gray-500">
          🔒 Potpuna privatnost - svi AI modeli rade lokalno u vašem browseru
        </p>
      </div>
    </div>
  );
};