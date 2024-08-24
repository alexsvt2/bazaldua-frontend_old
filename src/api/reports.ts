import { Page } from '../types/page.types';
import { axios } from './axios';

const ENDPOINT = '/reports';

export async function getReports(
    page?: number
) {
    const { data } = await axios.get<Page<Report>>(ENDPOINT, {
        params: { page },
    });
    return data;
}