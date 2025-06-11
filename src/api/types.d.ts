// Réponse générique d'API (ex: { data: T })
export interface ApiResponse<T> {
  data: T;
  total?: number;
  page?: number;
  size?: number;
  pages?: number;
}


