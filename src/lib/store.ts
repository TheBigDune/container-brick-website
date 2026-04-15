"use client";

import { useState, useEffect } from 'react';
import { 
  collection, 
  onSnapshot, 
  doc, 
  setDoc, 
  getDocs, 
  query, 
  limit,
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

const DEFAULT_HERO_IMAGE = "/images/hero.png";
const DEFAULT_DESK_STATUS = "Open";

export function useDataStore() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [passphrases, setPassphrases] = useState<Passphrase[]>([]);
  const [heroImage, setHeroImage] = useState<string>(DEFAULT_HERO_IMAGE);
  const [deskStatus, setDeskStatus] = useState<string>(DEFAULT_DESK_STATUS);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // 1. Projects Real-time Listener
    const projectsQuery = collection(db, 'projects');
    const unsubProjects = onSnapshot(projectsQuery, (snapshot) => {
      if (snapshot.empty && !isLoaded) {
        // Optional: Initialize with defaults if empty
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

    // 3. Settings (Hero & Status) Real-time Listener
    const settingsDoc = doc(db, 'settings', 'global');
    const unsubSettings = onSnapshot(settingsDoc, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        if (data.heroImage) setHeroImage(data.heroImage);
        if (data.deskStatus) setDeskStatus(data.deskStatus);
      } else {
        // Initialize defaults
        setDoc(settingsDoc, { 
          heroImage: DEFAULT_HERO_IMAGE, 
          deskStatus: DEFAULT_DESK_STATUS 
        });
      }
    });

    return () => {
      unsubProjects();
      unsubPass();
      unsubSettings();
    };
  }, [isLoaded]);

  const saveProjects = async (newProjects: Project[]) => {
    // Since the UI passes the whole array, we sync it
    // For a cleaner approach in production, you'd handle individual doc updates
    // but this maintains compatibility with the existing admin UI.
    
    // 1. Get current IDs to find what to delete
    const snapshot = await getDocs(collection(db, 'projects'));
    const currentIds = snapshot.docs.map(d => d.id);
    const newIds = newProjects.map(p => p.id);
    
    // 2. Delete removed projects
    const toDelete = currentIds.filter(id => !newIds.includes(id));
    for (const id of toDelete) {
      await deleteDoc(doc(db, 'projects', id));
    }
    
    // 3. Update/Add projects
    for (const project of newProjects) {
      await setDoc(doc(db, 'projects', project.id), project);
    }
  };

  const savePassphrases = async (newPassphrases: Passphrase[]) => {
    // Sync passphrases similarly
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

  const saveHeroImage = async (newUrl: string) => {
    await setDoc(doc(db, 'settings', 'global'), { heroImage: newUrl }, { merge: true });
  };

  const saveDeskStatus = async (newStatus: string) => {
    await setDoc(doc(db, 'settings', 'global'), { deskStatus: newStatus }, { merge: true });
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
