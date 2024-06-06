import GrowthEntity from "../entities/growth_entity";
import { checkMissingProperties } from "../utils/validator";


export default function getGrowthData() : number[] {
  const data =  GrowthEntity.deserialize(staticData3).clamp();
  checkMissingProperties(data,3);
  return data.toArray();
}

const staticData = {
    "KOOD": 11344091,
    "EMTAK08": 74901,
    "EMTAK_ESTAT": "G45201",
    "MAA": 37,
    "vald": 784,
    "TARV_H": 1,
    "OIG_GRUPP": "ETTEV",
    "Sektor_nr": 21,
    "Sektor": "Kultuuri ja vabaaja kaupade jaemüük",
    "kmd_M_min12": 955765.48,
    "kmd_M_min11": 0,
    "kmd_M_min10": 0,
    "kmd_M_min9": 0,
    "kmd_M_min8": 0,
    "kmd_M_min7": 6722.58,
    "kmd_M_min6": 0,
    "kmd_M_min5": 7327.32,
    "kmd_M_min4": 34300,
    "kmd_M_min3": 3162.1,
    "kmd_M_min2": 0.01,
    "kmd_M_min1": 5654.62,
    "tsd_M_min12": 0,
    "tsd_M_min11": 0,
    "tsd_M_min10": 0,
    "tsd_M_min9": 0,
    "tsd_M_min8": 1696.43,
    "tsd_M_min7": 1189.79,
    "tsd_M_min6": 3229.42,
    "tsd_M_min5": 1973.55,
    "tsd_M_min4": 0,
    "tsd_M_min3": 0,
    "tsd_M_min2": 3294.27,
    "tsd_M_min1": 46641.1,
    "tor_M_min12": 1,
    "tor_M_min11": 1,
    "tor_M_min10": 1,
    "tor_M_min9": 1,
    "tor_M_min8": 2,
    "tor_M_min7": 20,
    "tor_M_min6": 13,
    "tor_M_min5": 1,
    "tor_M_min4": 1,
    "tor_M_min3": 4,
    "tor_M_min2": 2,
    "tor_M_min1": 10,
    "kmd_tsd_min1": 0.00000917,
    "kmd_tsd_min2": 13.55780227,
    "kmd_tsd_suht": -0.8649720174,
    "suurusgrupp": "1)_1_kuni_9",
    "protsentiil_sektor": 0.8505803,
    "protsentiil_vald": 0.3210892,
    "protsentiil_suurusgrupp": 0.9276668,
    "sektor_n": 915,
    "vald_n": 7467,
    "suurusgrupp_n": 97038,
    "valjavottekuu": 202405,
    "Klaster": "k4_4"
};

const staticData2 = {
  KOOD: 11344091,
  EMTAK08: 74901,
  EMTAK_ESTAT: "G45201",
  MAA: 37,
  vald: 784,
  TARV_H: 1,
  OIG_GRUPP: "ETTEV",
  Sektor_nr: 21,
  Sektor: "Kultuuri ja vabaaja kaupade jaemüük",
  kmd_M_min12: 1.2,
  kmd_M_min11: 1.2,
  kmd_M_min10: 1.2,
  kmd_M_min9: 1.2,
  kmd_M_min8: 1.2,
  kmd_M_min7: 1.25,
  kmd_M_min6: 1.28,
  kmd_M_min5: 1.31,
  kmd_M_min4: 1.33,
  kmd_M_min3: 1.38,
  kmd_M_min2: 1.43,
  kmd_M_min1: 1.5,
  tsd_M_min12: 0.7,
  tsd_M_min11: 0.7,
  tsd_M_min10: 0.7,
  tsd_M_min9: 0.7,
  tsd_M_min8: 0.7,
  tsd_M_min7: 0.69,
  tsd_M_min6: 0.69,
  tsd_M_min5: 0.68,
  tsd_M_min4: 0.675,
  tsd_M_min3: 0.67,
  tsd_M_min2: 0.66,
  tsd_M_min1: 0.655,
  tor_M_min12: -0.331,
  tor_M_min11: -0.331,
  tor_M_min10: -0.331,
  tor_M_min9: -0.331,
  tor_M_min8: -0.331,
  tor_M_min7: -0.331,
  tor_M_min6: -0.331,
  tor_M_min5: -0.331,
  tor_M_min4: -0.331,
  tor_M_min3: -0.331,
  tor_M_min2: -0.331,
  tor_M_min1: -0.331,
  kmd_tsd_min1: 0.00000917,
  kmd_tsd_min2: 13.55780227,
  kmd_tsd_suht: -0.8649720174,
  suurusgrupp: "1)_1_kuni_9",
  protsentiil_sektor: 0.8505803,
  protsentiil_vald: 0.3210892,
  protsentiil_suurusgrupp: 0.9276668,
  sektor_n: 915,
  vald_n: 7467,
  suurusgrupp_n: 97038,
  valjavottekuu: 202405,
  Klaster: "k4_4",
};

const staticData3 = {
  KOOD: 11344092,
  EMTAK08: 74901,
  EMTAK_ESTAT: "G45201",
  MAA: 37,
  vald: 784,
  TARV_H: 1,
  OIG_GRUPP: "ETTEV",
  Sektor_nr: 21,
  Sektor: "Kultuuri ja vabaaja kaupade jaemüük",
  kmd_M_min12: 1.5,
  kmd_M_min11: 1.43,
  kmd_M_min10: 1.38,
  kmd_M_min9: 1.33,
  kmd_M_min8: 1.31,
  kmd_M_min7: 1.28,
  kmd_M_min6: 1.25,
  kmd_M_min5: 1.2,
  kmd_M_min4: 1.2,
  kmd_M_min3: 1.15,
  kmd_M_min2: 1.13,
  kmd_M_min1: 1.1,
  tsd_M_min12: 0.655,
  tsd_M_min11: 0.66,
  tsd_M_min10: 0.67,
  tsd_M_min9: 0.675,
  tsd_M_min8: 0.68,
  tsd_M_min7: 0.69,
  tsd_M_min6: 0.69,
  tsd_M_min5: 0.7,
  tsd_M_min4: 0.7,
  tsd_M_min3: 0.709,
  tsd_M_min2: 0.712,
  tsd_M_min1: 0.719,
  tor_M_min12: 0.2,
  tor_M_min11: 0.2,
  tor_M_min10: 0.2,
  tor_M_min9: 0.2,
  tor_M_min8: 0.2,
  tor_M_min7: 0.2,
  tor_M_min6: 0.2,
  tor_M_min5: 0.2,
  tor_M_min4: 0.2,
  tor_M_min3: 0.2,
  tor_M_min2: 0.2,
  tor_M_min1: 0.2,
  kmd_tsd_min1: 0.00000917,
  kmd_tsd_min2: 13.55780227,
  kmd_tsd_suht: -0.8649720174,
  suurusgrupp: "1)_1_kuni_9",
  protsentiil_sektor: 0.8505803,
  protsentiil_vald: 0.3210892,
  protsentiil_suurusgrupp: 0.9276668,
  sektor_n: 915,
  vald_n: 7467,
  suurusgrupp_n: 97038,
  valjavottekuu: 202405,
  Klaster: "k4_4",
};