
import { JsonProperty, SerializableEntity } from "ts-jackson"
import { PredictionResponse } from "./prediction_response"
import { Company, CompanyYear } from "src/infrastructure"


export interface ApiResponse {
    registrikood: string
    model1y1: number
    model1y2: number
    model1y3: number
    model2y1: number
    model2y2: number
    model2y3: number
    model3y1: number
    model3y2: number
    model3y3: number
    model4y1: number
    model4y2: number
    model4y3: number
    model5y1: number
    model5y2: number
    model5y3: number
    prognAasta: string
    EMTAK: string
    sektorNo: number
    size: number
    county: number
    kov: number
    hoiv: number
    LVKK: number
    MVK: number
    RK: number
    VaKK: number
    LVKaK: number
    VKK: number
    VK: number
    KOS: number
    IKK: number
    AKM: number
    PKM: number
    ROA: number
    ROE: number
    TJT: number
    EffpSect: number
    Eff_n_Sect: number
    EffpSize: number
    Eff_n_Size: number
    EffpCount: number
    Eff_n_Count: number
    LiqpSect: number
    Liq_n_Sect: number
    LiqpSize: number
    Liq_n_Size: number
    LiqpCount: number
    Liq_n_Count: number
    LevpSect: number
    Lev_n_Sect: number
    LevpSize: number
    Lev_n_Size: number
    LevpCount: number
    Lev_n_Count: number
    RetpSect: number
    Ret_n_Sect: number
    RetpSize: number
    Ret_n_Size: number
    RetpCount: number
    Ret_n_Count: number
    EmppSect: number
    Emp_n_Sect: number
    EmppSize: number
    Emp_n_Size: number
    EmppCount: number
    Emp_n_Count: number
}
