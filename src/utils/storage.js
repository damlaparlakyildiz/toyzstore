import { INITIAL_TOYS } from '../Interfaces/toy.interface';

const STORAGE_KEY = 'mattel_toy_store_items_v1';

export const getStoredToys = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_TOYS));
      return INITIAL_TOYS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_TOYS;
  } catch (error) {
    console.error('LocalStorage okuma hatası:', error);
    return INITIAL_TOYS;
  }
};

export const saveStoredToys = (toys) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toys));
  } catch (error) {
    console.error('LocalStorage kaydetme hatası:', error);
  }
};

export const resetStoredToys = () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_TOYS));
    return INITIAL_TOYS;
  } catch (error) {
    console.error('LocalStorage sıfırlama hatası:', error);
    return INITIAL_TOYS;
  }
};
