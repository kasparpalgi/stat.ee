import { JsonProperty, SerializableEntity } from "ts-jackson";
import { clamp, clampBetween } from '../../application/utils/value_clamp';

/**
 * The values of the fields in this class are used to calculate the prediction for a company.
 * In domain terms, this class is a `predictable` response.
 * @param id - The company identifier identifier.
 * @returns A promise that resolves to the monthly cluster data.
 */
export class YearlyCluster extends SerializableEntity {
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

  // Caps each retrieved value based on a separate table defining maximum values for each field.
  public clamp(): YearlyCluster {
    const yearly = new YearlyCluster();

    yearly.kaibevarad = clamp(this.kaibevarad, 250000000);
    yearly.raha = clamp(this.raha, 50000000);
    yearly.lyhiajalised_nouded = clamp(this.lyhiajalised_nouded, 250000000);
    yearly.varud = clamp(this.varud, 75000000);
    yearly.pohivarad = clamp(this.pohivarad, 250000000);
    yearly.pikaajalised_nouded = clamp(this.pikaajalised_nouded, 250000000);
    yearly.kinnisvarainvesteeringud = clamp(
      this.kinnisvarainvesteeringud,
      50000000
    );
    yearly.materiaalne_pohivara = clamp(this.materiaalne_pohivara, 250000000);
    yearly.immateriaalne_pohivara = clamp(
      this.immateriaalne_pohivara,
      25000000
    );
    yearly.varad_kokku = clamp(this.varad_kokku, 350000000);
    yearly.lyhiajalised_kohustused = clamp(
      this.lyhiajalised_kohustused,
      100000000
    );
    yearly.lyhiajalised_volad = clamp(this.lyhiajalised_volad, 75000000);
    yearly.pikaajalised_kohustused = clamp(
      this.pikaajalised_kohustused,
      100000000
    );
    yearly.pikaajalised_volad = clamp(this.pikaajalised_volad, 75000000);
    yearly.pikaajalised_laenud = clamp(this.pikaajalised_laenud, 150000000);
    yearly.omakapital = clamp(this.omakapital, 250000000);
    yearly.myygitulu = clamp(this.myygitulu, 150000000);
    yearly.muud_aritulud = clamp(this.muud_aritulud, 150000000);
    yearly.muud_arikulud = clamp(this.muud_arikulud, 5000000);
    yearly.toojoukulud = clamp(this.toojoukulud, 15000000);
    yearly.intressikulud = clamp(this.intressikulud, 7500000);
    yearly.arikasum = clampBetween(this.arikasum, -125000000, 250000000);
    yearly.aruandeaasta_kasum = clampBetween(
      this.aruandeaasta_kasum,
      -125000000,
      125000000
    );

    return yearly;
  }
}

/**
 * Converts the monthly metrics into a single array.
 * @returns {number[]} An array containing all the monthly metrics.
 */
export function convertYearlyAsArray(cluster: YearlyCluster): number[] {
  return Object.values(cluster);
}
