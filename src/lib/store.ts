"use client";

import { useState, useEffect } from 'react';
import { 
  collection, 
  onSnapshot, 
  doc, 
  setDoc, 
  getDocs, 
  deleteDoc
} from 'firebase/firestore';
import { db } from './firebase';

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

export type GlobalSettings = {
  heroImage: string;
  deskStatus: string;
  heroTitle: string;
  heroSubtitle: string;
  aboutTitle: string;
  aboutText: string;
  contactWhatsApp: string;
  contactSecondary: string;
  contactEmail: string;
  locationText: string;
};

const DEFAULT_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'The Blue Oasis',
    description: 'A three-container conversion into a luxury residential home with open-plan living and panoramic glass walls.',
    date: 'March 2024',
    featured: true,
    images: ['/images/hero.png'],
  },
  {
    id: '2',
    title: 'TechHub Studio',
    description: 'Compact and efficient single-container workspace designed for a software development team.',
    date: 'January 2024',
    featured: true,
    images: ['/images/office.png'],
  },
  {
    id: '3',
    title: 'Harbor Cafe',
    description: 'Innovative pop-up cafe located at the city waterfront, utilizing modular container design.',
    date: 'December 2023',
    featured: false,
    images: ['/images/cafe.png'],
  }
];

const DEFAULT_PASSPHRASES: Passphrase[] = [
  { id: '1', value: 'Prefabs1#' }
];

const DEFAULT_SETTINGS: GlobalSettings = {
  heroImage: "/images/hero.png",
  deskStatus: "Open",
  heroTitle: "Reimagining Spaces with Modular Elegance.",
  heroSubtitle: "We convert industrial shipping containers into sustainable, high-performance residential spaces and modern commercial infrastructure.",
  aboutTitle: "Uncompromising Structural Integrity",
  aboutText: "Transforming robust shipping containers into sustainable, highly isolated modular environments that stand the test of time while offering premium architectural finishes and superior insulation.",
  contactWhatsApp: "+234 701 701 7722",
  contactSecondary: "+234 810 106 3676",
  contactEmail: "containerbrickng@gmail.com",
  locationText: "Lagos, Nigeria"
};

export function useDataStore() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [passphrases, setPassphrases] = useState<Passphrase[]>([]);
  const [globalSettings, setGlobalSettings] = useState<GlobalSettings>(DEFAULT_SETTINGS);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // 1. Projects Real-time Listener
    const projectsQuery = collection(db, 'projects');
    const unsubProjects = onSnapshot(projectsQuery, (snapshot) => {
      if (snapshot.empty && !isLoaded) {
        DEFAULT_PROJECTS.forEach(p => setDoc(doc(db, 'projects', p.id), p));
      } else {
        const projectData = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Project));
        setProjects(projectData);
      }
      setIsLoaded(true);
    });

    // 2. Passphrases Real-time Listener
    const passQuery = collection(db, 'passphrases');
    const unsubPass = onSnapshot(passQuery, (snapshot) => {
      if (snapshot.empty && !isLoaded) {
        DEFAULT_PASSPHRASES.forEach(p => setDoc(doc(db, 'passphrases', p.id), p));
      } else {
        const passData = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Passphrase));
        setPassphrases(passData);
      }
    });

    // 3. Settings (Global) Real-time Listener
    const settingsDoc = doc(db, 'settings', 'global');
    const unsubSettings = onSnapshot(settingsDoc, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data() as Partial<GlobalSettings>;
        setGlobalSettings(prev => ({ ...prev, ...data }));
      } else {
        // Initialize defaults
        setDoc(settingsDoc, DEFAULT_SETTINGS);
      }
    });

    return () => {
      unsubProjects();
      unsubPass();
      unsubSettings();
    };
  }, [isLoaded]);

  const saveProjects = async (newProjects: Project[]) => {
    const snapshot = await getDocs(collection(db, 'projects'));
    const currentIds = snapshot.docs.map(d => d.id);
    const newIds = newProjects.map(p => p.id);
    
    const toDelete = currentIds.filter(id => !newIds.includes(id));
    for (const id of toDelete) {
      await deleteDoc(doc(db, 'projects', id));
    }
    
    for (const project of newProjects) {
      await setDoc(doc(db, 'projects', project.id), project);
    }
  };

  const savePassphrases = async (newPassphrases: Passphrase[]) => {
    const snapshot = await getDocs(collection(db, 'passphrases'));
    const currentIds = snapshot.docs.map(d => d.id);
    const newIds = newPassphrases.map(p => p.id);
    
    const toDelete = currentIds.filter(id => !newIds.includes(id));
    for (const id of toDelete) {
      await deleteDoc(doc(db, 'passphrases', id));
    }
    
    for (const pass of newPassphrases) {
      await setDoc(doc(db, 'passphrases', pass.id), pass);
    }
  };

  const saveGlobalSettings = async (newSettings: Partial<GlobalSettings>) => {
    await setDoc(doc(db, 'settings', 'global'), newSettings, { merge: true });
  };

  return { 
    projects, 
    passphrases, 
    globalSettings,
    isLoaded, 
    saveProjects, 
    savePassphrases, 
    saveGlobalSettings,
    // Keep backward compatibility for older components during refactoring
    heroImage: globalSettings.heroImage,
    deskStatus: globalSettings.deskStatus,
    saveHeroImage: async (url: string) => saveGlobalSettings({ heroImage: url }),
    saveDeskStatus: async (status: string) => saveGlobalSettings({ deskStatus: status }),
  };
}
