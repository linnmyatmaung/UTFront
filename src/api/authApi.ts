// src/api/authApi.ts
import apiClient from './apiClient';


export interface CodeLoginRequest {
    Rcode: string;
}

export interface AdminLoginRequest {
    username: string;
    password: string;
}

export const CodeLogin = async (code: CodeLoginRequest) => {
  const response = await apiClient.post('/auth/Plogin', code);
  return response;
};

export const AdminLogin = async (data : AdminLoginRequest)=> {
    const response = await apiClient.post('/auth/Alogin', data);
    return response;
  };
  

export const getPinCodeStatus = async () => {
    const response = await apiClient.get('/pinCode/status');
    return response;
  }