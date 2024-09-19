export interface CatFact {
  fact: string;
  length: number;
}

export const fetchCatFact = async (): Promise<CatFact> => {
  const response = await fetch('https://catfact.ninja/fact');
  if (!response.ok) {
    throw new Error('Failed to fetch cat fact');
  }
  return await response.json();
};
