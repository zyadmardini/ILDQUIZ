import patientStephanieImage from '@/assets/images/patient-stephanie.png';
import stephanieScan1 from '@/assets/images/stephanie-scan-1.png';
import stephanieScan2 from '@/assets/images/stephanie-scan-2.png';
import patientJulieImage from '@/assets/images/patient-julie.png';
import julieScan1 from '@/assets/images/julie-scan-1.png';
import julieScan2 from '@/assets/images/julie-scan-2.png';
import patientCarolineImage from '@/assets/images/patient-caroline.png';
import carolineScan1 from '@/assets/images/caroline-scan-1.png';
import carolineScan2 from '@/assets/images/caroline-scan-2.png';
import patientRobertImage from '@/assets/images/patient-robert.png';
import robertScan1 from '@/assets/images/robert-scan-1.png';
import robertScan2 from '@/assets/images/robert-scan-2.png';

export type PatientQuizConfig = {
  patientId: string;
  name: string;
  condition: string;
  introImage: string;
  introText: {
    heading: string;
    paragraphs: string[];
    highlights?: string[];
    captions?: string[];
  };
  quizOptions: string[];
  correctAnswers: string[];
  scanImages: {
    quiz: string;
    results: string;
  };
  references?: string[];
  results: {
    correct: {
      heading: string;
      paragraphs: string[];
      diagnosis: {
        heading: string;
        text: string[];
      };
    };
    incorrect: {
      heading: string;
      paragraphs: string[];
      diagnosis: {
        heading: string;
        text: string[];
      };
    };
  };
};

export const PATIENT_CONFIGS: Record<string, PatientQuizConfig> = {
  stephanie: {
    patientId: 'stephanie',
    name: 'STEPHANIE',
    condition: 'SSC-ILD PATIENT',
    introImage: patientStephanieImage,
    introText: {
      heading: 'STEPHANIE HAS SSc-ILD',
      paragraphs: [
        'Stephanie is an accountant and single mother in her early 40s. She was diagnosed 3 years ago with limited cutaneous systemic sclerosis (IcSSc). At diagnosis she had no respiratory symptoms and a baseline chest HRCT did not show evidence of ILD. Furthermore, PFTs did not show evidence of impairment.',
        '',
        '3 YEARS AFTER HER IcSSc DIAGNOSIS, STEPHANIE NOW PRESENTS WITH:',
        '• Dyspnoea on exertion (apparent over the last 5 months)',
        '• Dry cough',
        '• Mild inspiratory bibasilar fine crackles on auscultation',
        '• FVC:* 82% predicted',
        '• DLco:† 65% predicted',
        '',
        'A new HRCT scan is performed',
        '',
        '',
        '',
        '*FVC, forced vital capacity',
        '*DLco, diffusing capacity for carbon monoxide',
        '',
        'Not an actual patient',
      ],
    },
    quizOptions: [
      'Honeycombing',
      'Ground glass opacity',
      'Reticulation',
      'Traction bronchiectasis',
      'Air trapping',
      'Subpleural sparing',
      'Cyst',
    ],
    correctAnswers: [
      'Ground glass opacity',
      'Reticulation',
      'Subpleural sparing',
    ],
    scanImages: {
      quiz: stephanieScan1,
      results: stephanieScan2,
    },
    references: [
      '1. Silver KC, Silver RM. Management of Systemic-Sclerosis-Associated Interstitial Lung Disease. Rheum Dis Clin North Am. 2015;41(3):439-457.',
      '2. Chowanie M, Skoczynska M, Sokolik R, et al. Interstitial lung disease in systemic sclerosis: challenges in early diagnosis and management.',
      'Reumatologia. 2018;56(4):249-254.',
      '3. Cottin V, Brown KK. Interstitial lung disease associated with systemic sclerosis (SSc-ILD). Respir Res. 2019;20(1):13.',
      '4. Molberg O, Hoffmann-Vold A-M. Interstitial lung disease in systemic sclerosis: progress in screening and early diagnosis. Curr Opin',
      'Rheumatol. 2016;28(6):613-618.',
    ],
    results: {
      correct: {
        heading: 'YOU CHOSE ALL OF THE\nCORRECT FEATURES',
        paragraphs: [
          "Stephanie's HRCT scan reveals bilateral ground opacities, reticulation and subpleural sparing.",
          'These features are consistent with a non-specific interstitial pneumonia (NSIP) HRCT pattern. This pattern is common in patients with SSc-ILD. 1.2',
          '',
          '',
        ],
        diagnosis: {
          heading: 'DIAGNOSIS: SSc-ILD',
          text: [
            'Baseline HRCT in SSc is critical for ILD',
            'detection.2-4',
          ],
        },
      },
      incorrect: {
        heading: "YOU DIDN'T CHOOSE ALL OF ALL OF THE CORRECT FEATURES",
        paragraphs: [
          "Stephanie's HRCT scan reveals bilateral ground opacities, reticulation and subpleural sparing.",
          'These features are consistent with a non-specific interstitial pneumonia (NSIP) HRCT pattern. This pattern is common in patients with SSc-ILD. 1.2',
          '',
          '',
        ],
        diagnosis: {
          heading: 'DIAGNOSIS: SSc-ILD',
          text: [
            'Baseline HRCT in SSc is critical for ILD',
            'detection.2-4',
          ],
        },
      },
    },
  },
  julie: {
    patientId: 'julie',
    name: 'JULIE',
    condition: 'RA-ILD PATIENT',
    introImage: patientJulieImage,
    introText: {
      heading: 'JULIE HAS RA-ILD',
      paragraphs: [
        'Julie is a home health aide and mother of three in her 50s. She has been suffering from swollen joints, joint stiffness and fatigue as well as experiencing dyspnoea.',
        '',
        'JULIE PRESENTS WITH:',
        ' Elevated CRP and ESR*',
        '• X-ray findings of joint erosion in knees and elbows',
        '• FVC: 61% predicted',
        '• DLco:# 59% predicted',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '*CRP, C-reactive protein, ESR, erythrocyte sedimentation rate',
        '*FVC, forced vital capacity',
        '*DLco, diffusing capacity for carbon monoxide',
        '',
        'Not an actual patient',
      ],
    },
    quizOptions: [
      'Honeycombing',
      'Ground glass opacity',
      'Peripheral reticulation',
      'Traction bronchiectasis',
      'Subpleural sparing',
    ],
    correctAnswers: [
      'Honeycombing',
      'Peripheral reticulation',
      'Traction bronchiectasis',
    ],
    scanImages: {
      quiz: julieScan1,
      results: julieScan2,
    },
    references: [
      '1. Meyer KC. Diagnosis and management of interstitial lung disease. Transl Respir Med. 2014;2:4.',
    ],
    results: {
      correct: {
        heading: 'YOU CHOSE ALL OF THE\nCORRECT FEATURES',
        paragraphs: [
          "Julie's HRCT scan reveals honeycombing with reticulation and traction bronchiectasis. These features are consistent with a UIP HRCT pattern and a diagnosis of RA-ILD.",
          '',
          '',
        ],
        diagnosis: {
          heading: 'DIAGNOSIS: RA-ILD',
          text: [
            'In RA-ILD, routine monitoring is necessary to',
            "assess the progression of pulmonary fibrosis.'",
          ],
        },
      },
      incorrect: {
        heading: "YOU DIDN'T CHOOSE ALL OF ALL OF THE CORRECT FEATURES",
        paragraphs: [
          "Julie's HRCT scan reveals honeycombing with reticulation and traction bronchiectasis. These features are consistent with a UIP HRCT pattern and a diagnosis of RA-ILD.",
          '',
          '',
        ],
        diagnosis: {
          heading: 'DIAGNOSIS: RA-ILD',
          text: [
            'In RA-ILD, routine monitoring is necessary to',
            "assess the progression of pulmonary fibrosis.'",
          ],
        },
      },
    },
  },
  caroline: {
    patientId: 'caroline',
    name: 'CAROLINE',
    condition: 'IPF PATIENT',
    introImage: patientCarolineImage,
    introText: {
      heading: 'CAROLINE HAS IPF',
      paragraphs: [
        'She is a guidance counselor in her early 60s. She has worsening dyspnoea and a chronic cough.',
        '',
        'CAROLINE PRESENTS WITH:',
        '• Fine Velcro-like auscultation',
        '• Dyspnoea and chronic cough',
        '• Previously diagnosed with asthma but',
        'unresponsive to bronchodilator therapy',
        '• FVC:* 86% predicted',
        '• DLco: 74% predicted',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '*FVC, forced vital capacity',
        '*DLco, diffusing capacity for carbon monoxide',
        '',
        'Not an actual patient',
      ],
    },
    quizOptions: [
      'Honeycombing',
      'Ground glass opacity',
      'Reticulation',
      'Traction bronchiectasis',
      'Air trapping',
      'Subpleural sparing',
    ],
    correctAnswers: [
      'Honeycombing',
      'Reticulation',
      'Traction bronchiectasis',
    ],
    scanImages: {
      quiz: carolineScan1,
      results: carolineScan2,
    },
    references: [
      '1. Raghu G, Collard HR, Egan JJ, et al; on behalf of the ATS/ERS/JRS/ALAT Committee on Idiopathic Pulmonary Fibrosis. An official',
      'ATS/ERS/JRS/ALAT statement: idiopathic pulmonary fibrosis: evidence-based guidelines for diagnosis and management. Am J Respir Crit',
      'Care Med. 2011;183(6):788-824.',
      '2. Molina-Molina M, Aburto M, Acosta O, et al. Importance of early diagnosis and treatment in idiopathic pulmonary fibrosis. Expert Rev Respir Med. 2018;12(7):537-539.',
    ],
    results: {
      correct: {
        heading: 'YOU CHOSE ALL OF THE\nCORRECT FEATURES',
        paragraphs: [
          "Caroline's HRCT scan reveals honeycombing, reticulation and traction bronchiectasis. These features are consistent with a usual interstitial pneumonia (UIP) HRCT pattern and a diagnosis of IPF.1",
          '',
          '',
        ],
        diagnosis: {
          heading: 'DIAGNOSIS: IPF',
          text: [
            'Identify pulmonary fibrosis in patients as early as possible1.2',
          ],
        },
      },
      incorrect: {
        heading: "YOU DIDN'T CHOOSE ALL OF ALL OF THE CORRECT FEATURES",
        paragraphs: [
          "Caroline's HRCT scan reveals honeycombing, reticulation and traction bronchiectasis. These features are consistent with a usual interstitial pneumonia (UIP) HRCT pattern and a diagnosis of IPF.1",
          '',
          '',
        ],
        diagnosis: {
          heading: 'DIAGNOSIS: IPF',
          text: [
            'Identify pulmonary fibrosis in patients as early as possible1.2',
          ],
        },
      },
    },
  },
  robert: {
    patientId: 'robert',
    name: 'ROBERT',
    condition: 'CHP PATIENT',
    introImage: patientRobertImage,
    introText: {
      heading: 'ROBERT HAS CHP',
      paragraphs: [
        'He is a banker in his late 60s. He has worsening dyspnoea, unexplained weight loss and has also potentially been exposed to visible mould in his',
        'basement. Initial testing detected precipitating antibodies.',
        '',
        'ROBERT PRESENTS WITH:',
        ' Inspiratory crackles on auscultation',
        '• Worsening dyspnoea despite removal of',
        'exposure and treatment with an',
        'immunosuppressant for 3 months',
        '• FVC:* 71% predicted',
        '• DLco:+ 43% predicted',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '*FVC, forced vital capacity',
        '*DLco, diffusing capacity for carbon monoxide',
        '',
        'Not an actual patient',
      ],
    },
    quizOptions: [
      'Honeycombing',
      'Peripheral reticulation',
      'Traction bronchiectasis',
      'Air trapping',
      'Cyst',
    ],
    correctAnswers: [
      'Air trapping',
      'Peripheral reticulation',
    ],
    scanImages: {
      quiz: robertScan1,
      results: robertScan2,
    },
    references: [
      '1. Vourlekis JS, Schwarz MI, Cherniack RM, et al. The effect of pulmonary fibrosis on survival in patients with hypersensitivity pneumonitis.',
      'Am J Med. 2004;1 16(10):662-668.',
      '2. Cottin V, Hirani NA, Hotchkin DL, et al. Presentation, diagnosis and clinical course of the spectrum of progressive-fibrosing interstitial lung',
      'diseases. Eur Respir Rev. 2018;27(150):pii: 180076.',
    ],
    results: {
      correct: {
        heading: 'YOU CHOSE ALL OF THE\nCORRECT FEATURES',
        paragraphs: [
          "Robert's expiratory HRCT scan demonstrates air trapping, which is visible as areas of mosaic attenuation on a corresponding inspiratory HRCT",
          'scan (which is not shown here). In addition there is peripheral reticulation but no evidence of honeycombing. These features are consistent with a diagnosis of chronic hypersensitivity pneumonitis (cHP).',
          '',
        ],
        diagnosis: {
          heading: 'DIAGNOSIS: CHP',
          text: [
            'In cHP, complete avoidance of the exposure and immunosuppresants are used to manage the disease. However, worsening respiratory symptoms despite immunomodulatory therapy may indicate progressive disease. 1,2',
          ],
        },
      },
      incorrect: {
        heading: "YOU DIDN'T CHOOSE ALL OF THE\nCORRECT FEATURES",
        paragraphs: [
          "Robert's expiratory HRCT scan demonstrates air trapping, which is visible as areas of mosaic attenuation on a corresponding inspiratory HRCT",
          'scan (which is not shown here). In addition there is peripheral reticulation but no evidence of honeycombing. These features are consistent with a diagnosis of chronic hypersensitivity pneumonitis (cHP).',
          '',
        ],
        diagnosis: {
          heading: 'DIAGNOSIS: CHP',
          text: [
            'In cHP, complete avoidance of the exposure and immunosuppresants are used to manage the disease. However, worsening respiratory symptoms despite immunomodulatory therapy may indicate progressive disease. 1,2',
          ],
        },
      },
    },
  },
};

/**
 * Get patient configuration by ID
 */
export function getPatientConfig(patientId: string): PatientQuizConfig | undefined {
  return PATIENT_CONFIGS[patientId];
}

/**
 * Get all patient IDs
 */
export function getAllPatientIds(): string[] {
  return Object.keys(PATIENT_CONFIGS);
}

