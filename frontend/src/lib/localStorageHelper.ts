export type LocalStorageKey = "seasonings" | "ingredients";

export const getItem = <T>(key: LocalStorageKey, defaultValue: T): T => {
  const item = localStorage.getItem(key);
  if (!item) return defaultValue;
  try {
    return JSON.parse(item);
  } catch (error) {
    return defaultValue;
  }
};

export const setItem = <T>(key: LocalStorageKey, value: T): boolean => {
  if (!localStorage) return false;
  
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    return false;
  }
};

export const removeItem = (key: LocalStorageKey): boolean => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    return false;
  }
};

export const clear = (): boolean => {
  try {
    localStorage.clear();
    return true;
  } catch (error) {
    return false;
  }
};

export const length = (): number => localStorage.length;
export const key = (index: number): string | null => localStorage.key(index);
