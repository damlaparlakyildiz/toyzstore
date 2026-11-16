import { INITIAL_TOYS } from '../Interfaces/toy.interface';

const STORAGE_KEY = 'toystore_catalog_v5';
const CART_STORAGE_KEY = 'toystore_cart_v5';

export const getStoredToys = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_TOYS));
      return INITIAL_TOYS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_TOYS;
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

export const getStoredCart = () => {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const saveStoredCart = (cartItems) => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  } catch (error) {
    console.error('Cart LocalStorage hatası:', error);
  }
};
