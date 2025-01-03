import { JsonProperty, SerializableEntity } from "ts-jackson";
import { YearlyCluster } from './year_cluster';

export class Company extends SerializableEntity {
  @JsonProperty()
  kood: string;
  @JsonProperty()
  aasta: number;
  @JsonProperty()
  emtak: number;
  @JsonProperty()
  sektor_nr: number;
  @JsonProperty()
  sektor_txt: string;
  @JsonProperty()
  klaster: string;
  @JsonProperty()
  tarv_h: number;
  @JsonProperty()
  oig_grupp: string;
  @JsonProperty()
  ettevotte_suurusklass: number;
  @JsonProperty()
  asu_kood: number;
  @JsonProperty()
  kov: number;
  @JsonProperty()
  maakond: number;
  @JsonProperty()
  kaibevarad: number;
  @JsonProperty()
  raha: number;
  @JsonProperty()
  lyhiajalised_nouded: number;
  @JsonProperty()
  lyhiajalised_finantsinvesteeri: number;
  @JsonProperty()
  varud: number;
  @JsonProperty()
  pohivarad: number;
  @JsonProperty()
  pikaajalised_nouded: number;
  @JsonProperty()
  pikaajalised_finantsinvesteeri: number;
  @JsonProperty()
  kinnisvarainvesteeringud: number;
  @JsonProperty()
  materiaalne_pohivara: number;
  @JsonProperty()
  immateriaalne_pohivara: number;
  @JsonProperty()
  varad_kokku: number;
  @JsonProperty()
  lyhiajalised_kohustused: number;
  @JsonProperty()
  lyhiajalised_volad: number;
  @JsonProperty()
  lyhiajalised_laenud: number;
  @JsonProperty()
  pikaajalised_kohustused: number;
  @JsonProperty()
  pikaajalised_volad: number;
  @JsonProperty()
  pikaajalised_laenud: number;
  @JsonProperty()
  kohustused_kokku: number;
  @JsonProperty()
  omakapital: number;
  @JsonProperty()
  kohustused_omakapital_kokku: number;
  @JsonProperty()
  myygitulu: number;
  @JsonProperty()
  muud_aritulud: number;
  @JsonProperty()
  muud_arikulud: number;
  @JsonProperty()
  toojoukulud: number;
  @JsonProperty()
  arikasum: number;
  @JsonProperty()
  intressikulud: number;
  @JsonProperty()
  aruandeaasta_kasum: number;
  @JsonProperty()
  LVKK: number;
  @JsonProperty()
  MVK: number;
  @JsonProperty()
  RK: number;
  @JsonProperty()
  VaKK: number;
  @JsonProperty()
  LVKaK: number;
  @JsonProperty()
  VKK: number;
  @JsonProperty()
  VK: number;
  @JsonProperty()
  KOS: number;
  @JsonProperty()
  IKK: number;
  @JsonProperty()
  akm: number;
  @JsonProperty()
  pkm: number;
  @JsonProperty()
  roa: number;
  @JsonProperty()
  roe: number;
  @JsonProperty()
  ds_kaibevarad: number;
  @JsonProperty()
  ds_raha: number;
  @JsonProperty()
  ds_lyhiajalised_nouded: number;
  @JsonProperty()
  ds_lyhiajalised_finantsinveste: number;
  @JsonProperty()
  ds_varud: number;
  @JsonProperty()
  ds_pohivarad: number;
  @JsonProperty()
  ds_pikaajalised_nouded: number;
  @JsonProperty()
  ds_pikaajalised_finantsinveste: number;
  @JsonProperty()
  ds_kinnisvarainvesteeringud: number;
  @JsonProperty()
  ds_materiaalne_pohivara: number;
  @JsonProperty()
  ds_immateriaalne_pohivara: number;
  @JsonProperty()
  ds_varad_kokku: number;
  @JsonProperty()
  ds_lyhiajalised_kohustused: number;
  @JsonProperty()
  ds_lyhiajalised_volad: number;
  @JsonProperty()
  ds_lyhiajalised_laenud: number;
  @JsonProperty()
  ds_pikaajalised_kohustused: number;
  @JsonProperty()
  ds_pikaajalised_volad: number;
  @JsonProperty()
  ds_pikaajalised_laenud: number;
  @JsonProperty()
  ds_kohustused_kokku: number;
  @JsonProperty()
  ds_omakapital: number;
  @JsonProperty()
  ds_kohustused_omakapital_kokku: number;
  @JsonProperty()
  ds_myygitulu: number;
  @JsonProperty()
  ds_muud_aritulud: number;
  @JsonProperty()
  ds_muud_arikulud: number;
  @JsonProperty()
  ds_toojoukulud: number;
  @JsonProperty()
  ds_arikasum: number;
  @JsonProperty()
  ds_intressikulud: number;
  @JsonProperty()
  ds_aruandeaasta_kasum: number;
  @JsonProperty()
  maakond_efektiivsus_protsentii: number;
  @JsonProperty()
  sektor_efektiivsus_protsentiil: number;
  @JsonProperty()
  sektor_likviidsus_protsentiil: number;
  @JsonProperty()
  sektor_struktuur_protsentiil: number;
  @JsonProperty()
  sektor_tasuvus_protsentiil: number;
  @JsonProperty()
  maakond_likviidsus_protsentiil: number;
  @JsonProperty()
  maakond_struktuur_protsentiil: number;
  @JsonProperty()
  maakond_tasuvus_protsentiil: number;
  @JsonProperty()
  suurusklass_likviidsus_protsen: number;
  @JsonProperty()
  suurusklass_efektiivsus_protse: number;
  @JsonProperty()
  suurusklass_struktuur_protsent: number;
  @JsonProperty()
  suurusklass_tasuvus_protsentii: number;
  @JsonProperty()
  sektor_likviidsus_n: number;
  @JsonProperty()
  sektor_efektiivsus_n: number;
  @JsonProperty()
  sektor_struktuur_n: number;
  @JsonProperty()
  sektor_tasuvus_n: number;
  @JsonProperty()
  maakond_likviidsus_n: number;
  @JsonProperty()
  maakond_efektiivsus_n: number;
  @JsonProperty()
  maakond_struktuur_n: number;
  @JsonProperty()
  maakond_tasuvus_n: number;
  @JsonProperty()
  suurusklass_likviidsus_n: number;
  @JsonProperty()
  suurusklass_efektiivsus_n: number;
  @JsonProperty()
  suurusklass_struktuur_n: number;
  @JsonProperty()
  suurusklass_tasuvus_n: number;
  @JsonProperty()
  skp_jooksevhindades: number;
  @JsonProperty()
  skp_nominaalkasv: number;
  @JsonProperty()
  skp_pysivhindades: number;
  @JsonProperty()
  skp_reaalkasv: number;
  @JsonProperty()
  tarbijahinnaindeks: number;
  @JsonProperty()
  keskmine_kuupalk: number;
  @JsonProperty()
  palgakasv: number;
  @JsonProperty()
  tooviljakuse_kasv: number;

  public toCluster(): YearlyCluster {
    return YearlyCluster.deserialize(this.serialize());
  }

  public ovverideWithCluster(cluster: YearlyCluster): Company {
    const serialized = cluster.serialize();
    Object.keys(serialized).forEach((key) => {
      this[key] = serialized[key];
    });
    return this;
  }
}
