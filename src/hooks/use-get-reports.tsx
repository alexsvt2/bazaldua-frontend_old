import { useQuery } from "@tanstack/react-query";
import { getReports } from "../api/reports";
import { Page } from "../types/page.types";
import { Report } from "../types/report.types";

export const useGetReports = (page: number) =>
  useQuery<Page<Report>, Error>({
    queryKey: ['reports', page],
    queryFn: () => getReports(page),  
  });
