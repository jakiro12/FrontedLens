
import { API_URL } from "../utils/api_url";

export async function createCustomer(customerData: any) {
  if (!customerData) {
    throw new Error("No se recibieron los datos del cliente.");
  }

  if (!customerData.name?.trim()) {
    throw new Error("El nombre es obligatorio.");
  }

  if (!customerData.email?.trim()) {
    throw new Error("El email es obligatorio.");
  }

  if (!customerData.linkedinUrl?.trim()) {
    throw new Error("El perfil de LinkedIn es obligatorio.");
  }

  if (!Array.isArray(customerData.technologies) || customerData.technologies.length === 0) {
    throw new Error("Seleccioná al menos una tecnología.");
  }

  if (!customerData.seniority?.trim()) {
    throw new Error("La seniority es obligatoria.");
  }

  if (!customerData.deliveryDay?.trim()) {
    throw new Error("El día de entrega es obligatorio.");
  }

  const response = await fetch(`${API_URL}/customers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...customerData,
      name: customerData.name.trim(),
      email: customerData.email.trim().toLowerCase(),
      linkedinUrl: customerData.linkedinUrl.trim(),
    }),
  });

  if (!response.ok) {
    throw new Error(`Error ${response.status}: No se pudo crear el cliente.`);
  }
  
  return response.json();
}
