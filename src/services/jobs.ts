const API_URL = 'https://frontedlenspanel.onrender.com';

export async function getJobs() {
  const response = await fetch(`${API_URL}/jobs`, {
    signal: AbortSignal.timeout(60000) 
  });

  if (!response.ok) {
    throw new Error(`Error ${response.status}: No se pudieron cargar las ofertas`);
  }

  return response.json();
}