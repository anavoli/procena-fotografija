import { PhotoAnalysis } from '../types/analysis';
import { initializeAI, analyzePhotoWithRealAI } from './realAIService';

// Glavna funkcija koja koristi pravu AI analizu
export const analyzePhoto = async (file: File): Promise<PhotoAnalysis> => {
  try {
    // Inicijalizuj AI modele ako nisu već učitani
    await initializeAI();
    
    // Pokreni pravu AI analizu
    return await analyzePhotoWithRealAI(file);
    
  } catch (error) {
    console.error('Greška u AI analizi:', error);
    throw new Error('AI analiza nije uspešna. Molimo pokušajte ponovo.');
  }
};