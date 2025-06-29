import apiClient from "./apiClient";

export interface SelectionResponse {
  id: number;
  name: string;
  gender: string;
  profileImg?: string;
  major: string;
  hobby: string;
}

export interface CandidatePayload {
  name: string;
  gender: string;
  profileImg?: string;
  major: string;
  hobby: string;
}

export const getAllSelections = async (): Promise<SelectionResponse[]> => {
  const response = await apiClient.get("/selection");
  return response.data;
};

export const createCandidate = async (
  data: CandidatePayload
): Promise<SelectionResponse> => {
  const response = await apiClient.post("/selection", data);
  return response.data;
};

export const editCandidate = async (
  id: number,
  data: CandidatePayload
): Promise<SelectionResponse> => {
  const response = await apiClient.put(`/selection/${id}`, data);
  return response.data;
};

export const deleteCandidate = async (id: number) => {
  const response = await apiClient.delete(`/selection/${id}`);
  return response.data;
};
