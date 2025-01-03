import { PredictionResponse } from '../../../../../domain/prediction_response';
import { Company } from '../../../../../infrastructure/models/company';
import { MonthlyCluster } from '../../../../../infrastructure/models/monthly_cluster';

export class ApiResponse {

  registrikood: string | null;
  model1y1: number | null;
  model1y2: number | null;
  model1y3: number | null;
  model2y1: number | null;
  model2y2: number | null;
  model2y3: number | null;
  model3y1: number | null;
  model3y2: number | null;
  model3y3: number | null;
  model4y1: number | null;
  model4y2: number | null;
  model4y3: number | null;
  model5y1: number | null;
  model5y2: number | null;
  model5y3: number | null;
  prognAasta: string | null;
  EMTAK: string | null;
  sektorNo: number | null;
  size: number | null;
  county: number | null;
  kov: number | null;
  hoiv: number | null;
  LVKK: number | null;
  MVK: number | null;
  RK: number | null;
  VaKK: number | null;
  LVKaK: number | null;
  VKK: number | null;
  VK: number | null;
  KOS: number | null;
  IKK: number | null;
  AKM: number | null;
  PKM: number | null;
  ROA: number | null;
  ROE: number | null;
  TJT: number | null;
  EffpSect: number | null;
  Eff_n_Sect: number | null;
  EffpSize: number | null;
  Eff_n_Size: number | null;
  EffpCount: number | null;
  Eff_n_Count: number | null;
  LiqpSect: number | null;
  Liq_n_Sect: number | null;
  LiqpSize: number | null;
  Liq_n_Size: number | null;
  LiqpCount: number | null;
  Liq_n_Count: number | null;
  LevpSect: number | null;
  Lev_n_Sect: number | null;
  LevpSize: number | null;
  Lev_n_Size: number | null;
  LevpCount: number | null;
  Lev_n_Count: number | null;
  RetpSect: number | null;
  Ret_n_Sect: number | null;
  RetpSize: number | null;
  Ret_n_Size: number | null;
  RetpCount: number | null;
  Ret_n_Count: number | null;
  EmppSect: number | null;
  Emp_n_Sect: number | null;
  EmppSize: number | null;
  Emp_n_Size: number | null;
  EmppCount: number | null;
  Emp_n_Count: number | null; 

  static success(
    prediction: PredictionResponse,
    monthly: MonthlyCluster | null,
    company: Company
  ): ApiResponse {


    return {
      AKM: company.akm,
      county: company.maakond,
      Eff_n_Count: company.maakond_efektiivsus_n,
      Eff_n_Sect: company.sektor_efektiivsus_n,
      Eff_n_Size: company.suurusklass_efektiivsus_n,
      EffpCount: company.maakond_efektiivsus_protsentii,
      EffpSect: company.sektor_efektiivsus_protsentiil,
      EffpSize: company.suurusklass_efektiivsus_protse,
      Emp_n_Count: monthly?.vald_n ?? null,
      Emp_n_Sect: monthly?.sektor_n ?? null,
      Emp_n_Size: monthly?.suurusgrupp_n ?? null,
      EmppCount: monthly?.protsentiil_vald ?? null,
      EmppSect: monthly?.protsentiil_sektor ?? null,
      EmppSize: monthly?.protsentiil_suurusgrupp ?? null,
      EMTAK: `${company.emtak}`,
      hoiv: monthly?.tor_m_min1 ?? null,
      IKK: company.IKK,
      KOS: company.KOS,
      kov: company.kov,
      Lev_n_Count: company.maakond_struktuur_n,
      Lev_n_Sect: company.sektor_struktuur_n,
      Lev_n_Size: company.suurusklass_struktuur_n,
      LevpCount: company.maakond_struktuur_protsentiil,
      LevpSect: company.sektor_struktuur_protsentiil,
      LevpSize: company.suurusklass_struktuur_protsent,
      Liq_n_Count: company.maakond_likviidsus_n,
      Liq_n_Sect: company.sektor_likviidsus_n,
      Liq_n_Size: company.suurusklass_likviidsus_n,
      LiqpCount: company.maakond_likviidsus_protsentiil,
      LiqpSect: company.sektor_likviidsus_protsentiil,
      LiqpSize: company.suurusklass_likviidsus_protsen,
      LVKaK: company.LVKaK,
      LVKK: company.LVKK,
      model1y1: prediction.model1y1,
      model1y2: prediction.model1y2,
      model1y3: prediction.model1y3,
      model2y1: prediction.model2y1,
      model2y2: prediction.model2y2,
      model2y3: prediction.model2y3,
      model3y1: prediction.model3y1,
      model3y2: prediction.model3y2,
      model3y3: prediction.model3y3,
      model4y1: prediction.model4y1,
      model4y2: prediction.model4y2,
      model4y3: prediction.model4y3,
      model5y1: prediction.model5y1,
      model5y2: prediction.model5y2,
      model5y3: prediction.model5y3,
      MVK: company.MVK,
      PKM: company.pkm,
      prognAasta: `${company.aasta}`,
      registrikood: company.kood,
      Ret_n_Count: company.maakond_tasuvus_n,
      Ret_n_Sect: company.sektor_tasuvus_n,
      Ret_n_Size: company.suurusklass_tasuvus_n,
      RetpCount: company.maakond_tasuvus_protsentiil,
      RetpSect: company.sektor_tasuvus_protsentiil,
      RetpSize: company.suurusklass_tasuvus_protsentii,
      RK: company.RK,
      ROA: company.roa,
      ROE: company.roe,
      sektorNo: company.sektor_nr,
      size: company.ettevotte_suurusklass,
      TJT: monthly?.kmd_tsd_min2 ?? null,
      VaKK: company.VaKK,
      VK: company.VK,
      VKK: company.VKK,
    };
  }

  static none(): ApiResponse {
    return {
      registrikood: null,
      model1y1: null,
      model1y2: null,
      model1y3: null,
      model2y1: null,
      model2y2: null,
      model2y3: null,
      model3y1: null,
      model3y2: null,
      model3y3: null,
      model4y1: null,
      model4y2: null,
      model4y3: null,
      model5y1: null,
      model5y2: null,
      model5y3: null,
      prognAasta: null,
      EMTAK: null,
      sektorNo: null,
      size: null,
      county: null,
      kov: null,
      hoiv: null,
      LVKK: null,
      MVK: null,
      RK: null,
      VaKK: null,
      LVKaK: null,
      VKK: null,
      VK: null,
      KOS: null,
      IKK: null,
      AKM: null,
      PKM: null,
      ROA: null,
      ROE: null,
      TJT: null,
      EffpSect: null,
      Eff_n_Sect: null,
      EffpSize: null,
      Eff_n_Size: null,
      EffpCount: null,
      Eff_n_Count: null,
      LiqpSect: null,
      Liq_n_Sect: null,
      LiqpSize: null,
      Liq_n_Size: null,
      LiqpCount: null,
      Liq_n_Count: null,
      LevpSect: null,
      Lev_n_Sect: null,
      LevpSize: null,
      Lev_n_Size: null,
      LevpCount: null,
      Lev_n_Count: null,
      RetpSect: null,
      Ret_n_Sect: null,
      RetpSize: null,
      Ret_n_Size: null,
      RetpCount: null,
      Ret_n_Count: null,
      EmppSect: null,
      Emp_n_Sect: null,
      EmppSize: null,
      Emp_n_Size: null,
      EmppCount: null,
      Emp_n_Count: null,
    };
  }
}
