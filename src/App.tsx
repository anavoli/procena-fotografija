import { useState, useEffect } from 'react';
import { FileUpload } from './components/FileUpload';
import { AnalysisResults } from './components/AnalysisResults';
import { analyzePhoto } from './services/analysisService';
import { initializeAI } from './services/realAIService';
import { PhotoAnalysis } from './types/analysis';
import { Camera, Loader2, Brain, Cpu } from 'lucide-react';

function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<PhotoAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiStatus, setAiStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  // Inicijalizuj AI modele pri pokretanju aplikacije
  useEffect(() => {
    const loadAI = async () => {
      try {
        setAiStatus('loading');
        await initializeAI();
        setAiStatus('ready');
      } catch (error) {
        console.error('Greška pri učitavanju AI:', error);
        setAiStatus('error');
      }
    };

    loadAI();
  }, []);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setAnalysis(null);
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    setAnalysis(null);
  };

  const handleAnalyze = async () => {
    if (!selectedFile || aiStatus !== 'ready') return;

    setIsAnalyzing(true);
    try {
      const result = await analyzePhoto(selectedFile);
      setAnalysis(result);
    } catch (error) {
      console.error('Greška pri analizi fotografije:', error);
      alert('Greška pri AI analizi. Molimo pokušajte ponovo.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleNewAnalysis = () => {
    setSelectedFile(null);
    setAnalysis(null);
  };

  const getAIStatusBadge = () => {
    switch (aiStatus) {
      case 'loading':
        return (
          <div className="flex items-center bg-yellow-500 text-white px-4 py-2 rounded-full shadow-lg">
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            <span className="font-semibold text-sm">Učitavanje AI modela...</span>
          </div>
        );
      case 'ready':
        return (
          <div className="flex items-center bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full shadow-lg">
            <Brain className="w-5 h-5 mr-2" />
            <span className="font-semibold text-sm">Prava AI analiza spremna</span>
          </div>
        );
      case 'error':
        return (
          <div className="flex items-center bg-red-500 text-white px-4 py-2 rounded-full shadow-lg">
            <Cpu className="w-5 h-5 mr-2" />
            <span className="font-semibold text-sm">AI nedostupan</span>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Camera className="w-8 h-8 text-primary-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Analiza fotografija
                </h1>
                <p className="text-gray-600">
                  Profesionalna analiza pomoću prave AI tehnologije - TensorFlow.js
                </p>
              </div>
            </div>
            
            {/* AI Status Badge */}
            {getAIStatusBadge()}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!analysis ? (
          <div className="max-w-2xl mx-auto space-y-6">
            {/* Real AI Features Banner */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <Brain className="w-6 h-6 text-green-600 mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Prava AI analiza - TensorFlow.js u browseru!
                </h2>
              </div>
              <p className="text-gray-700 mb-4">
                Koristimo stvarne AI modele (MobileNet, COCO-SSD) koji rade direktno u vašem browseru. 
                Bez slanja podataka na server - potpuna privatnost!
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-white text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                  🧠 TensorFlow.js
                </span>
                <span className="bg-white text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                  🔍 Object Detection
                </span>
                <span className="bg-white text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                  📊 Pixel Analysis
                </span>
                <span className="bg-white text-pink-700 px-3 py-1 rounded-full text-sm font-medium">
                  🔒 100% Privatno
                </span>
              </div>
            </div>

            <FileUpload 
              onFileSelect={handleFileSelect}
              selectedFile={selectedFile}
              onClearFile={handleClearFile}
            />
            
            {selectedFile && (
              <div className="text-center">
                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || aiStatus !== 'ready'}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      AI analizira fotografiju...
                    </>
                  ) : aiStatus === 'ready' ? (
                    <>
                      <Brain className="w-5 h-5 mr-2" />
                      Pokreni pravu AI analizu
                    </>
                  ) : (
                    <>
                      <Cpu className="w-5 h-5 mr-2" />
                      Čekam AI modele...
                    </>
                  )}
                </button>
                <p className="text-sm text-gray-500 mt-2">
                  {aiStatus === 'ready' ? 
                    'Prava AI analiza • TensorFlow.js • Potpuno privatno' :
                    'Učitavanje AI modela može potrajati nekoliko sekundi'
                  }
                </p>
              </div>
            )}

            {/* Informacije o AI analizi */}
            <div className="card">
              <div className="flex items-center mb-4">
                <Brain className="w-6 h-6 text-green-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Šta naša prava AI analizira?
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Tehnička analiza (Pixel-level)</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Edge detection za oštrinu</li>
                    <li>• Histogram analiza osvetljenja</li>
                    <li>• RGB balans i distribucija boja</li>
                    <li>• Noise detection algoritmi</li>
                    <li>• EXIF metadata čitanje</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">AI prepoznavanje (TensorFlow)</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• MobileNet klasifikacija objekata</li>
                    <li>• COCO-SSD detekcija pozicija</li>
                    <li>• Kompoziciona analiza na osnovu AI</li>
                    <li>• Automatsko generisanje opisa</li>
                    <li>• Personalizovane AI preporuke</li>
                  </ul>
                </div>
              </div>
              <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                <p className="text-sm text-gray-700 text-center">
                  <strong>🔒 Privatnost:</strong> Svi AI modeli rade u vašem browseru - fotografije se ne šalju nikde!
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6 text-center">
              <button
                onClick={handleNewAnalysis}
                className="btn-secondary mr-4"
              >
                Analiziraj novu fotografiju
              </button>
              <div className="inline-flex items-center text-sm text-gray-600 mt-2">
                <Brain className="w-4 h-4 mr-1 text-green-500" />
                Analizirano pomoću TensorFlow.js AI modela
              </div>
            </div>
            <AnalysisResults analysis={analysis} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-500">
            <div className="flex items-center justify-center mb-2">
              <Brain className="w-5 h-5 mr-2 text-green-500" />
              <span className="font-medium">Pokretano TensorFlow.js AI tehnologijom</span>
            </div>
            <p>© 2025 Analiza fotografija. Prava AI analiza direktno u browseru - potpuno privatno.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;