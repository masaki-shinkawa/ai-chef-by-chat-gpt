import useSWR from "swr";
import { BareFetcher, PublicConfiguration } from "swr/_internal";

export interface MasterResponse {
  timings: string[];
  categories: string[];
  seasonings: string[];
  ingredients: string[];
}

export const useApiMaster = (
  config?: Partial<
    PublicConfiguration<MasterResponse, any, BareFetcher<MasterResponse>>
  >
) => {
  return useSWR<MasterResponse>("/master", config);
};
