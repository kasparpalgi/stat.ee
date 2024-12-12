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

  static buildSuccess(
    prediction: PredictionResponse,
    monthly: MonthlyCluster | null,
    year: Company
  ): ApiResponse {


    return {
      Emp_n_Count: monthly?.vald_n ?? null,
      Emp_n_Sect: monthly?.sektor_n ?? null,
      Emp_n_Size: monthly?.suurusgrupp_n ?? null,
      EmppCount: monthly?.protsentiil_vald ?? null,
      EmppSect: monthly?.protsentiil_sektor ?? null,
      EmppSize: monthly?.protsentiil_suurusgrupp ?? null,
      hoiv: monthly?.tor_m_min1 ?? null,
      TJT: monthly?.kmd_tsd_min2 ?? null,
      AKM: year.akm,
      county: year.maakond,
      Eff_n_Count: year.maakond_efektiivsus_n,
      Eff_n_Sect: year.sektor_efektiivsus_n,
      Eff_n_Size: year.suurusklass_efektiivsus_n,
      EffpCount: year.maakond_efektiivsus_protsentii,
      EffpSect: year.sektor_efektiivsus_protsentiil,
      EffpSize: year.suurusklass_efektiivsus_protse,
      EMTAK: `${year.emtak}`,
      IKK: year.ikk,
      KOS: year.kos,
      kov: year.kov,
      Lev_n_Count: year.maakond_struktuur_n,
      Lev_n_Sect: year.sektor_struktuur_n,
      Lev_n_Size: year.suurusklass_struktuur_n,
      LevpCount: year.maakond_struktuur_protsentiil,
      LevpSect: year.sektor_struktuur_protsentiil,
      LevpSize: year.suurusklass_struktuur_protsent,
      Liq_n_Count: year.maakond_likviidsus_n,
      Liq_n_Sect: year.sektor_likviidsus_n,
      Liq_n_Size: year.suurusklass_likviidsus_n,
      LiqpCount: year.maakond_likviidsus_protsentiil,
      LiqpSect: year.sektor_likviidsus_protsentiil,
      LiqpSize: year.suurusklass_likviidsus_protsen,
      LVKaK: year.lvkak,
      LVKK: year.lvkk,
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
      MVK: year.mvk,
      PKM: year.pkm,
      prognAasta: `${year.aasta}`,
      registrikood: year.jykood,
      Ret_n_Count: year.maakond_tasuvus_n,
      Ret_n_Sect: year.sektor_tasuvus_n,
      Ret_n_Size: year.suurusklass_tasuvus_n,
      RetpCount: year.maakond_tasuvus_protsentiil,
      RetpSect: year.sektor_tasuvus_protsentiil,
      RetpSize: year.suurusklass_tasuvus_protsentii,
      RK: year.rk,
      ROA: year.roa,
      ROE: year.roe,
      sektorNo: year.sektor_nr,
      size: year.ettevotte_suurusklass,
      VaKK: year.vakk,
      VK: year.vk,
      VKK: year.vkk,
    };
  }

  static buildNull(): ApiResponse {
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
