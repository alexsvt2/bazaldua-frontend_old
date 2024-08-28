import { ReportFormValues } from '../types/Forms/report-form-values.types';
import { Page } from '../types/page.types';
import { Report } from '../types/report.types';
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

export async function createReport(report: ReportFormValues) {

    console.log('report', report);

    const response = await axios.post(ENDPOINT, report);
    return response;
}