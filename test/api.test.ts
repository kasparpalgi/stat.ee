import { handleJsonRequest } from '../src/application/routes/eestat/1/elujoud/id';
import * as fs from 'fs';
import * as path from 'path';

describe('Data Handling Tests', () => {
    let json: any;
    let nullJson: any;
    const mockCorrelationId = '123e4567-e89b-12d3-a456-426614174000';

    beforeAll(() => {
        json = JSON.parse(
            fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8')
        );
        nullJson = JSON.parse(
            fs.readFileSync(path.join(__dirname, 'null.json'), 'utf8')
        );
    });

    describe('Basic Data Validation', () => {
        it('should reject invalid company ID', async () => {
            const invalidData = {
                ...json,
                aastased: { ...json.aastased, jykood: '123' }
            };
            await expect(handleJsonRequest(invalidData, mockCorrelationId))
                .rejects
                .toThrow('ID must be an 8-digit number');
        });

        it('should reject invalid cluster', async () => {
            const invalidData = {
                ...json,
                aastased: { ...json.aastased, klaster: 'muu' }
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
            const result = await handleJsonRequest(json, mockCorrelationId);
            expect(result.registrikood).toBe(json.aastased.jykood);
        });

        it('should correctly process basic annual fields', async () => {
            const result = await handleJsonRequest(json, mockCorrelationId);
            expect(result.prognAasta).toEqual(`${json.aastased.aasta}`);
            expect(result.EMTAK).toEqual(json.aastased.emtak);
            expect(result.sektorNo).toEqual(json.aastased.sektor_nr);
            expect(result.size).toEqual(json.aastased.ettevotte_suurusklass);
            expect(result.county).toEqual(json.aastased.maakond);
            expect(result.kov).toEqual(json.aastased.kov);
        });

        it('should correctly process financial ratios', async () => {
            const result = await handleJsonRequest(json, mockCorrelationId);
            expect(result.LVKK).toEqual(json.aastased.lvkk);
            expect(result.MVK).toEqual(json.aastased.mvk);
            expect(result.RK).toEqual(json.aastased.rk);
            expect(result.VaKK).toEqual(json.aastased.vakk);
            expect(result.LVKaK).toEqual(json.aastased.lvkak);
            expect(result.VKK).toEqual(json.aastased.vkk);
            expect(result.VK).toEqual(json.aastased.vk);
            expect(result.KOS).toEqual(json.aastased.kos);
            expect(result.IKK).toEqual(json.aastased.ikk);
        });

        it('should correctly process performance metrics', async () => {
            const result = await handleJsonRequest(json, mockCorrelationId);
            expect(result.AKM).toEqual(json.aastased.akm);
            expect(result.PKM).toEqual(json.aastased.pkm);
            expect(result.ROA).toEqual(json.aastased.roa);
            expect(result.ROE).toEqual(json.aastased.roe);
        });
    });

    describe('Model Predictions', () => {
        it('should generate all model predictions for valid data', async () => {
            const result = await handleJsonRequest(json, mockCorrelationId);
            for (let i = 1; i <= 5; i++) {
                for (let j = 1; j <= 3; j++) {
                    expect(result[`model${i}y${j}`]).toEqual(expect.any(Number));
                }
            }
        });

        it('should handle missing monthly data correctly', async () => {
            const mockJson = {
                ...json,
                kuised: {
                    ...nullJson.kuised
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
            const result = await handleJsonRequest(json, mockCorrelationId);
            expect(result.hoiv).toEqual(json.kuised.tor_m_min1);
            expect(result.EmppSect).toEqual(json.kuised.protsentiil_sektor);
            expect(result.TJT).toEqual(json.kuised.kmd_tsd_min2);
            expect(result.Emp_n_Sect).toEqual(json.kuised.sektor_n);
        });

        it('should handle null monthly metrics correctly', async () => {
            const mockJson = {
                ...json,
                kuised: {
                    ...nullJson.kuised
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
                ...json,
                kuised: {
                    ...json.kuised,
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
                ...json,
                kuised: {
                    ...json.kuised,
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
            const result = await handleJsonRequest(json, mockCorrelationId);
            expect(result.EffpSect).toEqual(json.aastased.sektor_efektiivsus_protsentiil);
            expect(result.Eff_n_Sect).toEqual(json.aastased.sektor_efektiivsus_n);
            expect(result.LiqpSect).toEqual(json.aastased.sektor_likviidsus_protsentiil);
            expect(result.Liq_n_Sect).toEqual(json.aastased.sektor_likviidsus_n);
        });

        it('should correctly process size-based statistics', async () => {
            const result = await handleJsonRequest(json, mockCorrelationId);
            expect(result.EffpSize).toEqual(json.aastased.suurusklass_efektiivsus_protse);
            expect(result.Eff_n_Size).toEqual(json.aastased.suurusklass_efektiivsus_n);
            expect(result.LiqpSize).toEqual(json.aastased.suurusklass_likviidsus_protsen);
            expect(result.Liq_n_Size).toEqual(json.aastased.suurusklass_likviidsus_n);
        });

        it('should correctly process county statistics', async () => {
            const result = await handleJsonRequest(json, mockCorrelationId);
            expect(result.EffpCount).toEqual(json.aastased.maakond_efektiivsus_protsentii);
            expect(result.Eff_n_Count).toEqual(json.aastased.maakond_efektiivsus_n);
            expect(result.LiqpCount).toEqual(json.aastased.maakond_likviidsus_protsentiil);
            expect(result.Liq_n_Count).toEqual(json.aastased.maakond_likviidsus_n);
        });
    });
});
