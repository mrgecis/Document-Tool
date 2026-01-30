
import React from 'react';

export interface WorkflowDetail {
  label: string;
  content: string;
}

export interface WorkflowStep {
  id: number;
  title: string;
  shortTitle?: string;
  description: string;
  details?: string[];
  channels?: WorkflowDetail[];
  capabilities?: WorkflowDetail[];
  icon: React.ReactNode;
}

export interface Feature {
  label?: string;
  title: string;
  description: string;
  intro?: string;
  items?: string[];
  icon: React.ReactNode;
}

export interface FAQItem {
  question: string;
  answer: string;
}