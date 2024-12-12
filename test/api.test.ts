import { handleJsonRequest } from '../src/application/routes/eestat/1/elujoud/id';
import * as fs from 'fs';
import * as path from 'path';

describe('Data Handling Tests', () => {
    let json: any;
    let emptyJson: any;
    const mockCorrelationId = '123e4567-e89b-12d3-a456-426614174000';

    beforeAll(() => {
        json = JSON.parse(
            fs.readFileSync(path.join(__dirname, 'example.json'), 'utf8')
        );
        emptyJson = JSON.parse(
            fs.readFileSync(path.join(__dirname, 'null-json.json'), 'utf8')
        );
    });

    it('should successfully process valid data', async () => {
        const result = await handleJsonRequest(json, mockCorrelationId);

        // Registrikood
        expect(result.registrikood).toBe(json.aastased.jykood);
        // Aastased
        expect(result.model1y1).toEqual(expect.any(Number));
        expect(result.model1y2).toEqual(expect.any(Number));
        expect(result.model1y3).toEqual(expect.any(Number));
        expect(result.model2y1).toEqual(expect.any(Number));
        expect(result.model2y2).toEqual(expect.any(Number));
        expect(result.model2y3).toEqual(expect.any(Number));
        expect(result.model3y1).toEqual(expect.any(Number));
        expect(result.model3y2).toEqual(expect.any(Number));
        expect(result.model3y3).toEqual(expect.any(Number));
        expect(result.model4y1).toEqual(expect.any(Number));
        expect(result.model4y2).toEqual(expect.any(Number));
        expect(result.model4y3).toEqual(expect.any(Number));
        expect(result.model5y1).toEqual(expect.any(Number));
        expect(result.model5y2).toEqual(expect.any(Number));
        expect(result.model5y3).toEqual(expect.any(Number));
        // Aastased
        expect(result.prognAasta).toEqual(`${json.aastased.aasta}`);
        expect(result.EMTAK).toEqual(json.aastased.emtak);
        expect(result.sektorNo).toEqual(json.aastased.sektor_nr);
        expect(result.size).toEqual(json.aastased.ettevotte_suurusklass);
        expect(result.county).toEqual(json.aastased.maakond);
        expect(result.kov).toEqual(json.aastased.kov);
        expect(result.LVKK).toEqual(json.aastased.lvkk);
        expect(result.MVK).toEqual(json.aastased.mvk);
        expect(result.RK).toEqual(json.aastased.rk);
        expect(result.VaKK).toEqual(json.aastased.vakk);
        expect(result.LVKaK).toEqual(json.aastased.lvkak);
        expect(result.VKK).toEqual(json.aastased.vkk);
        expect(result.VK).toEqual(json.aastased.vk);
        expect(result.KOS).toEqual(json.aastased.kos);
        expect(result.IKK).toEqual(json.aastased.ikk);
        expect(result.AKM).toEqual(json.aastased.akm);
        expect(result.PKM).toEqual(json.aastased.pkm);
        expect(result.ROA).toEqual(json.aastased.roa);
        expect(result.ROE).toEqual(json.aastased.roe);
        expect(result.EffpSect).toEqual(json.aastased.sektor_efektiivsus_protsentiil);
        expect(result.Eff_n_Sect).toEqual(json.aastased.sektor_efektiivsus_n);
        expect(result.EffpSize).toEqual(json.aastased.suurusklass_efektiivsus_protse);
        expect(result.Eff_n_Size).toEqual(json.aastased.suurusklass_efektiivsus_n);
        expect(result.EffpCount).toEqual(json.aastased.maakond_efektiivsus_protsentii);
        expect(result.Eff_n_Count).toEqual(json.aastased.maakond_efektiivsus_n);
        expect(result.LiqpSect).toEqual(json.aastased.sektor_likviidsus_protsentiil);
        expect(result.Liq_n_Sect).toEqual(json.aastased.sektor_likviidsus_n);
        expect(result.LiqpSize).toEqual(json.aastased.suurusklass_likviidsus_protsen);
        expect(result.Liq_n_Size).toEqual(json.aastased.suurusklass_likviidsus_n);
        expect(result.LiqpCount).toEqual(json.aastased.maakond_likviidsus_protsentiil);
        expect(result.Liq_n_Count).toEqual(json.aastased.maakond_likviidsus_n);
        expect(result.LevpSect).toEqual(json.aastased.sektor_struktuur_protsentiil);
        expect(result.Lev_n_Sect).toEqual(json.aastased.sektor_struktuur_n);
        expect(result.LevpSize).toEqual(json.aastased.suurusklass_struktuur_protsent);
        expect(result.Lev_n_Size).toEqual(json.aastased.suurusklass_struktuur_n);
        expect(result.LevpCount).toEqual(json.aastased.maakond_struktuur_protsentiil);
        expect(result.Lev_n_Count).toEqual(json.aastased.maakond_struktuur_n);
        expect(result.RetpSect).toEqual(json.aastased.sektor_tasuvus_protsentiil);
        expect(result.Ret_n_Sect).toEqual(json.aastased.sektor_tasuvus_n);
        expect(result.RetpSize).toEqual(json.aastased.suurusklass_tasuvus_protsentii);
        expect(result.Ret_n_Size).toEqual(json.aastased.suurusklass_tasuvus_n);
        expect(result.RetpCount).toEqual(json.aastased.maakond_tasuvus_protsentiil);
        expect(result.Ret_n_Count).toEqual(json.aastased.maakond_tasuvus_n);
        // Kuised
        expect(result.hoiv).toEqual(json.kuised.tor_m_min1);
        expect(result.EmppSect).toEqual(json.kuised.protsentiil_sektor);
        expect(result.TJT).toEqual(json.kuised.kmd_tsd_min2);
        expect(result.Emp_n_Sect).toEqual(json.kuised.sektor_n);
        expect(result.EmppSize).toEqual(json.kuised.protsentiil_suurusgrupp);
        expect(result.Emp_n_Size).toEqual(json.kuised.suurusgrupp_n);
        expect(result.EmppCount).toEqual(json.kuised.protsentiil_vald);
        expect(result.Emp_n_Count).toEqual(json.kuised.vald_n);
    });

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

    it('should reject monthly data with too many missing fields', async () => {
        const invalidData = {
            ...json,
            kuised: {
                ...json.kuised,
                kmd_m_min12: null,
                kmd_m_min11: null,
                kmd_m_min10: null,
                kmd_m_min9: null  // More than 3 null values
            }
        };

        await expect(handleJsonRequest(invalidData, mockCorrelationId))
            .rejects
            .toThrow('Monthly data is not valid');
    });

    it('should handle null json values', async () => {
        
        await expect(handleJsonRequest(emptyJson, mockCorrelationId))
            .rejects
            .toThrow('Monthly data is not valid');
    });
});