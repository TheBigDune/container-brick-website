"use client";

import { useState, useEffect } from 'react';

export type Project = {
  id: string;
  title: string;
  description: string;
  date: string;
  featured: boolean;
  images: string[];
};

export type Passphrase = {
  id: string;
  value: string;
};

const DEFAULT_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'The Blue Oasis',
    description: 'A three-container conversion into a luxury residential home with open-plan living and panoramic glass walls.',
    date: 'March 2024',
    featured: true,
    images: ['https://picsum.photos/seed/101/800/600'],
  },
  {
    id: '2',
    title: 'TechHub Studio',
    description: 'Compact and efficient single-container workspace designed for a software development team.',
    date: 'January 2024',
    featured: true,
    images: ['https://picsum.photos/seed/102/800/600'],
  },
  {
    id: '3',
    title: 'Harbor Cafe',
    description: 'Innovative pop-up cafe located at the city waterfront, utilizing modular container design.',
    date: 'December 2023',
    featured: false,
    images: ['https://picsum.photos/seed/103/800/600'],
  }
];

const DEFAULT_PASSPHRASES: Passphrase[] = [
  { id: '1', value: 'Prefabs1#' }
];

const DEFAULT_HERO_IMAGE = "https://picsum.photos/seed/architecture/1920/1080";
const DEFAULT_DESK_STATUS = "Open";

export function useDataStore() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [passphrases, setPassphrases] = useState<Passphrase[]>([]);
  const [heroImage, setHeroImage] = useState<string>(DEFAULT_HERO_IMAGE);
  const [deskStatus, setDeskStatus] = useState<string>(DEFAULT_DESK_STATUS);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedProjects = localStorage.getItem('cb_projects');
    const savedPassphrases = localStorage.getItem('cb_passphrases');
    const savedHeroImage = localStorage.getItem('cb_hero_image');
    const savedDeskStatus = localStorage.getItem('cb_desk_status');

    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    } else {
      setProjects(DEFAULT_PROJECTS);
      localStorage.setItem('cb_projects', JSON.stringify(DEFAULT_PROJECTS));
    }

    if (savedPassphrases) {
      setPassphrases(JSON.parse(savedPassphrases));
    } else {
      setPassphrases(DEFAULT_PASSPHRASES);
      localStorage.setItem('cb_passphrases', JSON.stringify(DEFAULT_PASSPHRASES));
    }

    if (savedHeroImage) {
      setHeroImage(savedHeroImage);
    } else {
      setHeroImage(DEFAULT_HERO_IMAGE);
      localStorage.setItem('cb_hero_image', DEFAULT_HERO_IMAGE);
    }

    if (savedDeskStatus) {
      setDeskStatus(savedDeskStatus);
    } else {
      setDeskStatus(DEFAULT_DESK_STATUS);
      localStorage.setItem('cb_desk_status', DEFAULT_DESK_STATUS);
    }
    
    setIsLoaded(true);
  }, []);

  const saveProjects = (newProjects: Project[]) => {
    setProjects(newProjects);
    localStorage.setItem('cb_projects', JSON.stringify(newProjects));
  };

  const savePassphrases = (newPassphrases: Passphrase[]) => {
    setPassphrases(newPassphrases);
    localStorage.setItem('cb_passphrases', JSON.stringify(newPassphrases));
  };

  const saveHeroImage = (newUrl: string) => {
    setHeroImage(newUrl);
    localStorage.setItem('cb_hero_image', newUrl);
  };

  const saveDeskStatus = (newStatus: string) => {
    setDeskStatus(newStatus);
    localStorage.setItem('cb_desk_status', newStatus);
  };

  return { 
    projects, 
    passphrases, 
    heroImage, 
    deskStatus, 
    isLoaded, 
    saveProjects, 
    savePassphrases, 
    saveHeroImage, 
    saveDeskStatus 
  };
}
