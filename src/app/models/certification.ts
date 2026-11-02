export interface Certification {
  title: string;
  fileName: string;
  pdf: string;
}

// shortcut: PDFs share Firestore's document limit; use object storage for larger files.
export const MAX_CERTIFICATION_PDF_SIZE = 700 * 1024;
