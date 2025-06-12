import apiClient from "./apiClient";

export interface AgendaDataRequest {
  title: string;
  name: string;
  info: string;
}
export interface AgendaDataResponse {
  id: number;
  time: string;
  title: string;
  name: string;
  info: string;
  current: boolean;
}

export const getAllAgendas = async (): Promise<AgendaDataResponse[]> => {
  const response = await apiClient.get("/agenda");
  return response.data;
};
export const createAgendas = async (
  agendas: AgendaDataRequest[]
): Promise<AgendaDataResponse[]> => {
  const response = await apiClient.post("/agenda", agendas);
  return response.data;
};

export const updateCurrentAgenda = async (
  selectedId: number
): Promise<AgendaDataResponse> => {
  const response = await apiClient.put(`/agenda/current/${selectedId}`);
  return response.data;
};
