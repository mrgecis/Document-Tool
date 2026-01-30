
import React from 'react';
import { WorkflowStep, Feature, FAQItem } from './types';

export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    id: 1,
    title: "Eingang von Geschäftsdokumenten",
    shortTitle: "Eingang",
    description: "Dokumente werden automatisch aus verschiedenen Kanälen erfasst und direkt an die intelligente Visual AI übergeben.",
    channels: [
      { label: "Mail-Eingang", content: "invoice@… • accounting@… • tax@…" },
      { label: "Posteingang", content: "Eingescannte Briefpost" },
      { label: "Mobile Erfassung", content: "Fotografierte Kassenzettel oder Belege" }
    ],
    icon: <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6" fill="none" stroke="currentColor" strokeWidth="2" />
  },
  {
    id: 2,
    title: "Visual AI",
    description: "Versteht Struktur, Layout und inhaltlichen Kontext – nicht nur Text wie bei klassischer OCR.",
    capabilities: [
      { label: "1. Dokument-Kategorie erkennen", content: "Rechnungen, Steuerdokumente, Bankunterlagen sowie weitere Geschäftsdokumente" },
      { label: "2. Dokumenttyp bestimmen", content: "Eingangsrechnung, Zahlungserinnerung, SEPA-Abbuchung, Mahnung und weitere Varianten" },
      { label: "3. Relevante Informationen extrahieren", content: "Rechnungssteller, Empfänger, Adresse, Datum, Rechnungsnummer, Betrag und weitere Schlüsseldaten" }
    ],
    icon: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" fill="none" stroke="currentColor" strokeWidth="2" /><polyline points="14 2 14 8 20 8" fill="none" stroke="currentColor" strokeWidth="2" /></>
  },
  {
    id: 3,
    title: "Firmenvalidierung",
    description: "AI prüft Firmenname und Adresse auf Richtigkeit und erkennt Abweichungen. Eine passende Korrekturmail wird automatisch mit den richtigen Angaben erstellt.",
    icon: <><circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" fill="none" stroke="currentColor" strokeWidth="2" /></>
  },
  {
    id: 4,
    title: "Automatische Umbenennung",
    shortTitle: "Umbenennung",
    description: "Dokumente werden automatisch nach klar definierten, regelbasierten Vorgaben benannt. Basis sind extrahierte Geschäftsdaten und Dokumentkontext.",
    details: ["Absender/Empfänger", "Betrag/MwSt", "Kontenrahmen-Matching"],
    icon: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" fill="none" stroke="currentColor" strokeWidth="2" /><polyline points="7 10 12 15 17 10" fill="none" stroke="currentColor" strokeWidth="2" /><line x1="12" y1="15" x2="12" y2="3" fill="none" stroke="currentColor" strokeWidth="2" /></>
  },
  {
    id: 5,
    title: "Strukturierte Ablage",
    shortTitle: "Ablage",
    description: "Dokumente werden automatisch der richtigen Ordnerstruktur zugewiesen. Basiert auf erkannten Merkmalen wie Firma, Dokumenttyp und Kontext.",
    icon: <polyline points="20 6 9 17 4 12" fill="none" stroke="currentColor" strokeWidth="2" />
  }
];

export const FEATURES: Feature[] = [
  {
    label: "ERKENNEN",
    title: "Visual AI",
    description: "Versteht Dokumente wie ein Mensch – nicht wie ein Scanner.\n\nErkennt Struktur, Layout und geschäftlichen Kontext statt nur Text.",
    intro: "Erkennt automatisch:",
    items: ["Dokument-Kategorie", "Dokumenttyp", "Relevante Schlüsselinformationen"],
    icon: <><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="2" /></>
  },
  {
    label: "PRÜFEN",
    title: "Firmenvalidierung",
    description: "Abgleich hinterlegter Unternehmensdaten mit dem Dokument.\n\nErkennt Fehler bei Name oder Adresse und bereitet Korrekturmail vor.",
    icon: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M9 12l2 2 4-4" fill="none" stroke="currentColor" strokeWidth="2" /></>
  },
  {
    label: "STRUKTURIEREN",
    title: "Umbenennung",
    description: "Dokumente werden automatisch regelbasiert umbenannt.\n\nBasis sind extrahierte Schlüsselinformationen und der erkannte Dokumentkontext.",
    icon: <><path d="M12 2H2v10l9.29 9.29a2.5 2.5 0 0 0 3.54 0l6.88-6.88a2.5 2.5 0 0 0 0-3.54L12 2z" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M7 7h.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></>
  },
  {
    label: "ORGANISIEREN",
    title: "Ablage",
    description: "Dokumente werden automatisch richtig einsortiert.\n\nDie Zuordnung erfolgt zur passenden Ordnerstruktur – z. B. nach Firma, Dokumenttyp oder Kontext.",
    icon: <><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" fill="none" stroke="currentColor" strokeWidth="2" /></>
  }
];

export const FAQS: FAQItem[] = [
  {
    question: "Ersetzt Visual AI unser bisheriges OCR?",
    answer: "Visual AI baut auf Texterkennung auf, fügt aber eine entscheidende Intelligenzebene hinzu. Während OCR nur Buchstaben liest, versteht Visual AI den Aufbau und die Geschäftsrelevanz eines Dokuments – unabhängig vom Layout."
  },
  {
    question: "Ist ein On-Premise Betrieb möglich?",
    answer: "Ja. Wir bieten sowohl eine flexible Cloud-Lösung als auch eine vorkonfigurierte Appliance (z.B. auf Mac mini Basis) an, bei der die KI lokal in Ihrem Netzwerk arbeitet – ohne Cloud-Abhängigkeit."
  },
  {
    question: "Wie wird der monetäre Mehrwert gemessen?",
    answer: "Im Due-Diligence-Workshop ermitteln wir gemeinsam Ihre aktuellen Ist-Kosten pro Prozess. Nach der Implementierung messen wir die Zeitersparnis und Fehlerreduktion, um den realisierten Euro-Wert präzise abzuleiten."
  },
  {
    question: "Können wir das System an DATEV anbinden?",
    answer: "Ja, System-Integrationen (z.B. DATEV, Grau Data oder Commerzbank) sind als optionale Add-ons verfügbar, um einen nahtlosen End-to-End Workflow zu gewährleisten."
  },
  {
    question: "Wie schnell ist das System einsatzbereit?",
    answer: "Die Out-of-the-Box Features sind sofort nutzbar. Kundenspezifische Anpassungen und Integrationen dauern je nach Komplexität meist nur wenige Tage."
  }
];
