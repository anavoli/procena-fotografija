export interface TechnicalAnalysis {
  sharpness: number;
  focus: number;
  lighting: number;
  exposure: number;
  colorBalance: number;
  resolution: number;
  imageQuality: number;
  noise: number;
  artifacts: number;
}

export interface CompositionAnalysis {
  elementArrangement: number;
  ruleOfThirds: number;
  leadingLines: number;
  balance: number;
  symmetry: number;
  depthOfField: number;
}

export interface ContentDescription {
  mainSubject: string;
  background: string;
  environment: string;
  colors: string;
  tones: string;
  mood: string;
  atmosphere: string;
  story: string;
}

export interface ImprovementSuggestions {
  technical: string[];
  compositional: string[];
  presentation: string[];
}

export interface PhotoAnalysis {
  technical: TechnicalAnalysis;
  composition: CompositionAnalysis;
  content: ContentDescription;
  improvements: ImprovementSuggestions;
  overallScore: number;
  imageUrl: string;
  fileName: string;
  analysisDate: string;
}