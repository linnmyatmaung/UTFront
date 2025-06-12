import apiClient from "./apiClient";

export type VoteLogRequest = {
    maleId: number;
    femaleId: number;
}

export interface BtnPass {
    id: number;
    name: string;
}

export const insertVoteLog = async (voteLog: VoteLogRequest) => {
    const response = await apiClient.post('/vote', voteLog);
    return response;
}
