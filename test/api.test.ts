import { handleJsonRequest } from '../src/application/routes/eestat/1/elujoud/id';
import * as fs from 'fs';
import * as path from 'path';

describe('Data Handling Tests', () => {
    let dataJson: any;
    let nullJson: any;
    let responseJSON: any;
    const mockCorrelationId = '123e4567-e89b-12d3-a456-426614174000';

    beforeAll(() => {
        dataJson = JSON.parse(
            fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8')
        );
        nullJson = JSON.parse(
            fs.readFileSync(path.join(__dirname, 'null.json'), 'utf8')
        );
        responseJSON = JSON.parse(
            fs.readFileSync(path.join(__dirname, 'response.json'), 'utf8')
        );
    });

    describe('Basic Data Validation', () => {
        it('should reject invalid company ID', async () => {
            const invalidData = {
                ...dataJson,
                company: { ...dataJson.company, kood: '123' }
            };
            await expect(handleJsonRequest(invalidData, mockCorrelationId))
                .rejects
                .toThrow('ID must be an 8-digit number');
        });

        it('should reject invalid cluster', async () => {
            const invalidData = {
                ...dataJson,
                company: { ...dataJson.company, klaster: 'muu' }
            };
            await expect(handleJsonRequest(invalidData, mockCorrelationId))
                .rejects
                .toThrow('Cluster is not valid');
        });

        it('should reject when all fields are null', async () => {
            await expect(handleJsonRequest(nullJson, mockCorrelationId))
                .rejects
                .toThrow('All fields are null');
        });
    });

    describe('Annual Data Processing', () => {
        it('should correctly process registrikood', async () => {
            const result = await handleJsonRequest(dataJson, mockCorrelationId);
            expect(result.registrikood).toBe(dataJson.company.kood);
        });

        it('should correctly process basic annual fields', async () => {
            const result = await handleJsonRequest(dataJson, mockCorrelationId);
            expect(result.prognAasta).toEqual(`${dataJson.company.aasta}`);
            expect(result.EMTAK).toEqual(dataJson.company.emtak);
            expect(result.sektorNo).toEqual(dataJson.company.sektor_nr);
            expect(result.size).toEqual(dataJson.company.ettevotte_suurusklass);
            expect(result.county).toEqual(dataJson.company.maakond);
            expect(result.kov).toEqual(dataJson.company.kov);
        });

        it('should correctly process financial ratios', async () => {
            const result = await handleJsonRequest(dataJson, mockCorrelationId);
            expect(result.LVKK).toEqual(dataJson.company.LVKK);
            expect(result.MVK).toEqual(dataJson.company.MVK);
            expect(result.RK).toEqual(dataJson.company.RK);
            expect(result.VaKK).toEqual(dataJson.company.VaKK);
            expect(result.LVKaK).toEqual(dataJson.company.LVKaK);
            expect(result.VKK).toEqual(dataJson.company.VKK);
            expect(result.VK).toEqual(dataJson.company.VK);
            expect(result.KOS).toEqual(dataJson.company.KOS);
            expect(result.IKK).toEqual(dataJson.company.IKK);
        });

        it('should correctly process performance metrics', async () => {
            const result = await handleJsonRequest(dataJson, mockCorrelationId);
            expect(result.AKM).toEqual(dataJson.company.akm);
            expect(result.PKM).toEqual(dataJson.company.pkm);
            expect(result.ROA).toEqual(dataJson.company.roa);
            expect(result.ROE).toEqual(dataJson.company.roe);
        });
    });

    describe('Model Predictions', () => {
        it('should generate all model predictions for valid data', async () => {
            const result = await handleJsonRequest(dataJson, mockCorrelationId);
            for (let i = 1; i <= 5; i++) {
                for (let j = 1; j <= 3; j++) {
                    expect(result[`model${i}y${j}`]).toEqual(expect.any(Number));
                }
            }
        });

        it('should handle missing monthly data correctly', async () => {
            const mockJson = {
                ...dataJson,
                monthly: {
                    ...nullJson.monthly
                }
            };
            const result = await handleJsonRequest(mockJson, mockCorrelationId);
            
            // Models 1-4 should still work
            for (let i = 1; i <= 4; i++) {
                for (let j = 1; j <= 3; j++) {
                    expect(result[`model${i}y${j}`]).toEqual(expect.any(Number));
                }
            }
            
            // Model 5 should be null due to missing monthly data
            expect(result.model5y1).toBeNull();
            expect(result.model5y2).toBeNull();
            expect(result.model5y3).toBeNull();
        });
    });

    describe('Monthly Data Processing', () => {
        it('should correctly process valid monthly metrics', async () => {
            const result = await handleJsonRequest(dataJson, mockCorrelationId);
            expect(result.hoiv).toEqual(dataJson.monthly.tor_m_min1);
            expect(result.EmppSect).toEqual(dataJson.monthly.protsentiil_sektor);
            expect(result.TJT).toEqual(dataJson.monthly.kmd_tsd_min2);
            expect(result.Emp_n_Sect).toEqual(dataJson.monthly.sektor_n);
        });

        it('should handle null monthly metrics correctly', async () => {
            const mockJson = {
                ...dataJson,
                monthly: {
                    ...nullJson.monthly
                }
            };
            const result = await handleJsonRequest(mockJson, mockCorrelationId);
            expect(result.model5y1).toBeNull();
            expect(result.hoiv).toBeNull();
            expect(result.EmppSect).toBeNull();
            expect(result.TJT).toBeNull();
            expect(result.Emp_n_Sect).toBeNull();
        });

        it('should handle partially missing monthly data', async () => {
            const partiallyMissingData = {
                ...dataJson,
                monthly: {
                    ...dataJson.monthly,
                    kmd_m_min12: null,
                    kmd_m_min11: null,
                    kmd_m_min10: null
                }
            };
            const result = await handleJsonRequest(partiallyMissingData, mockCorrelationId);
            expect(result.model5y1).toEqual(expect.any(Number));
            expect(result.model5y2).toEqual(expect.any(Number));
        });

        it('should handle too many missing monthly fields', async () => {
            const tooManyMissingFields = {
                ...dataJson,
                monthly: {
                    ...dataJson.monthly,
                    kmd_m_min12: null,
                    kmd_m_min11: null,
                    kmd_m_min10: null,
                    kmd_m_min9: null
                }
            };
            const result = await handleJsonRequest(tooManyMissingFields, mockCorrelationId);
            expect(result.model5y1).toBeNull();
            expect(result.model5y2).toBeNull();
        });
    });

    describe('Statistical Metrics', () => {
        it('should correctly process sector statistics', async () => {
            const result = await handleJsonRequest(dataJson, mockCorrelationId);
            expect(result.EffpSect).toEqual(dataJson.company.sektor_efektiivsus_protsentiil);
            expect(result.Eff_n_Sect).toEqual(dataJson.company.sektor_efektiivsus_n);
            expect(result.LiqpSect).toEqual(dataJson.company.sektor_likviidsus_protsentiil);
            expect(result.Liq_n_Sect).toEqual(dataJson.company.sektor_likviidsus_n);
        });

        it('should correctly process size-based statistics', async () => {
            const result = await handleJsonRequest(dataJson, mockCorrelationId);
            expect(result.EffpSize).toEqual(dataJson.company.suurusklass_efektiivsus_protse);
            expect(result.Eff_n_Size).toEqual(dataJson.company.suurusklass_efektiivsus_n);
            expect(result.LiqpSize).toEqual(dataJson.company.suurusklass_likviidsus_protsen);
            expect(result.Liq_n_Size).toEqual(dataJson.company.suurusklass_likviidsus_n);
        });

        it('should correctly process county statistics', async () => {
            const result = await handleJsonRequest(dataJson, mockCorrelationId);
            expect(result.EffpCount).toEqual(dataJson.company.maakond_efektiivsus_protsentii);
            expect(result.Eff_n_Count).toEqual(dataJson.company.maakond_efektiivsus_n);
            expect(result.LiqpCount).toEqual(dataJson.company.maakond_likviidsus_protsentiil);
            expect(result.Liq_n_Count).toEqual(dataJson.company.maakond_likviidsus_n);
        });
    });

    describe('Response Format Validation', () => {
        it('should match the expected response schema', async () => {
            const result = await handleJsonRequest(dataJson, mockCorrelationId);
            const expectedKeys = Object.keys(responseJSON);
            const resultKeys = Object.keys(result);

            // Check that all expected keys are present
            expect(resultKeys.sort()).toEqual(expectedKeys.sort());

            // Check that all values have the correct type
            for (const key of expectedKeys) {
                expect(typeof result[key]).toBe(typeof responseJSON[key]);
                if (typeof responseJSON[key] === 'number') {
                    expect(result[key]).toEqual(expect.any(Number));
                }
            }
        });

        it('should have all required model prediction fields', async () => {
            const result = await handleJsonRequest(dataJson, mockCorrelationId);
            
            // Check all model predictions (model1y1 through model5y3)
            for (let model = 1; model <= 5; model++) {
                for (let year = 1; year <= 3; year++) {
                    const field = `model${model}y${year}`;
                    expect(result).toHaveProperty(field);
                    expect(typeof result[field]).toBe('number');
                }
            }
        });

        it('should have all required statistical fields', async () => {
            const result = await handleJsonRequest(dataJson, mockCorrelationId);
            
            const requiredFields = [
                'AKM', 'PKM', 'ROA', 'ROE',
                'LVKK', 'MVK', 'RK', 'VaKK', 'LVKaK', 'VKK', 'VK', 'KOS', 'IKK',
                'EffpSect', 'Eff_n_Sect', 'LiqpSect', 'Liq_n_Sect',
                'EffpSize', 'Eff_n_Size', 'LiqpSize', 'Liq_n_Size',
                'EffpCount', 'Eff_n_Count', 'LiqpCount', 'Liq_n_Count'
            ];

            for (const field of requiredFields) {
                expect(result).toHaveProperty(field);
                expect(typeof result[field]).toBe('number');
            }
        });

        it('should have all required metadata fields', async () => {
            const result = await handleJsonRequest(dataJson, mockCorrelationId);
            
            const metadataFields = [
                'registrikood', 'prognAasta', 'EMTAK', 
                'sektorNo', 'size', 'county', 'kov'
            ];

            for (const field of metadataFields) {
                expect(result).toHaveProperty(field);
                expect(result[field]).not.toBeNull();
            }
        });
    });
});
