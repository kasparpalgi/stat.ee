import { clamp, clampBetween } from "../../application";
import { JsonProperty, SerializableEntity } from "ts-jackson";

/**
 * Class representing a Monthly Cluster with various monthly metrics.
 *
 * @class
 * @extends {SerializableEntity}
 */
export class MonthlyCluster extends SerializableEntity {
  /**
   * The cluster name.
   * @type {string}
   */
  @JsonProperty()
  klaster: string;

  /**
   * Monthly metrics for KMD (12 months ago to 1 month ago).
   * @type {number}
   */
  @JsonProperty()
  kmd_m_min12: number;
  @JsonProperty()
  kmd_m_min11: number;
  @JsonProperty()
  kmd_m_min10: number;
  @JsonProperty()
  kmd_m_min9: number;
  @JsonProperty()
  kmd_m_min8: number;
  @JsonProperty()
  kmd_m_min7: number;
  @JsonProperty()
  kmd_m_min6: number;
  @JsonProperty()
  kmd_m_min5: number;
  @JsonProperty()
  kmd_m_min4: number;
  @JsonProperty()
  kmd_m_min3: number;
  @JsonProperty()
  kmd_m_min2: number;
  @JsonProperty()
  kmd_m_min1: number;

  /**
   * Monthly metrics for TSD (12 months ago to 1 month ago).
   * @type {number}
   */
  @JsonProperty()
  tsd_m_min12: number;
  @JsonProperty()
  tsd_m_min11: number;
  @JsonProperty()
  tsd_m_min10: number;
  @JsonProperty()
  tsd_m_min9: number;
  @JsonProperty()
  tsd_m_min8: number;
  @JsonProperty()
  tsd_m_min7: number;
  @JsonProperty()
  tsd_m_min6: number;
  @JsonProperty()
  tsd_m_min5: number;
  @JsonProperty()
  tsd_m_min4: number;
  @JsonProperty()
  tsd_m_min3: number;
  @JsonProperty()
  tsd_m_min2: number;
  @JsonProperty()
  tsd_m_min1: number;

  /**
   * Monthly metrics for TOR (12 months ago to 1 month ago).
   * @type {number}
   */
  @JsonProperty()
  tor_m_min12: number;
  @JsonProperty()
  tor_m_min11: number;
  @JsonProperty()
  tor_m_min10: number;
  @JsonProperty()
  tor_m_min9: number;
  @JsonProperty()
  tor_m_min8: number;
  @JsonProperty()
  tor_m_min7: number;
  @JsonProperty()
  tor_m_min6: number;
  @JsonProperty()
  tor_m_min5: number;
  @JsonProperty()
  tor_m_min4: number;
  @JsonProperty()
  tor_m_min3: number;
  @JsonProperty()
  tor_m_min2: number;
  @JsonProperty()
  tor_m_min1: number;

  @JsonProperty()
  kood: string;
  @JsonProperty()
  emtak08: number;
  @JsonProperty()
  emtak_estat: string;
  @JsonProperty()
  maa: number;
  @JsonProperty()
  vald: number;
  @JsonProperty()
  tarv_h: number;
  @JsonProperty()
  oig_grupp: string;
  @JsonProperty()
  sektor_nr: number;
  @JsonProperty()
  sektor: string;
  @JsonProperty()
  kmd_tsd_min1: number;
  @JsonProperty()
  kmd_tsd_min2: number;
  @JsonProperty()
  kmd_tsd_suht: number;
  @JsonProperty()
  suurusgrupp: string;
  @JsonProperty()
  protsentiil_sektor: number;
  @JsonProperty()
  sektor_n: number;
  @JsonProperty()
  protsentiil_vald: number;
  @JsonProperty()
  vald_n: number;
  @JsonProperty()
  protsentiil_suurusgrupp: number;
  @JsonProperty()
  suurusgrupp_n: number;
  @JsonProperty()
  valjavottekuu: string;

 

  /**
   * Clamps the values of each field based on predefined limits.
   *
   * @returns {MonthlyCluster} The instance with clamped values.
   */
  public clamp(): MonthlyCluster {
    const monthly = new MonthlyCluster();

    monthly.kmd_m_min1 = clampBetween(this.kmd_m_min1, -2500000, 2500000);
    monthly.kmd_m_min2 = clampBetween(this.kmd_m_min2, -2500000, 2500000);
    monthly.kmd_m_min3 = clampBetween(this.kmd_m_min3, -2500000, 2500000);
    monthly.kmd_m_min4 = clampBetween(this.kmd_m_min4, -2500000, 2500000);
    monthly.kmd_m_min5 = clampBetween(this.kmd_m_min5, -2500000, 2500000);
    monthly.kmd_m_min6 = clampBetween(this.kmd_m_min6, -2500000, 2500000);
    monthly.kmd_m_min7 = clampBetween(this.kmd_m_min7, -2500000, 2500000);
    monthly.kmd_m_min8 = clampBetween(this.kmd_m_min8, -2500000, 2500000);
    monthly.kmd_m_min9 = clampBetween(this.kmd_m_min9, -2500000, 2500000);
    monthly.kmd_m_min10 = clampBetween(this.kmd_m_min10, -2500000, 2500000);
    monthly.kmd_m_min11 = clampBetween(this.kmd_m_min11, -2500000, 2500000);
    monthly.kmd_m_min12 = clampBetween(this.kmd_m_min12, -2500000, 2500000);

    monthly.tsd_m_min1 = clamp(this.tsd_m_min1, 450000);
    monthly.tsd_m_min2 = clamp(this.tsd_m_min2, 450000);
    monthly.tsd_m_min3 = clamp(this.tsd_m_min3, 450000);
    monthly.tsd_m_min4 = clamp(this.tsd_m_min4, 450000);
    monthly.tsd_m_min5 = clamp(this.tsd_m_min5, 450000);
    monthly.tsd_m_min6 = clamp(this.tsd_m_min6, 450000);
    monthly.tsd_m_min7 = clamp(this.tsd_m_min7, 450000);
    monthly.tsd_m_min8 = clamp(this.tsd_m_min8, 450000);
    monthly.tsd_m_min9 = clamp(this.tsd_m_min9, 450000);
    monthly.tsd_m_min10 = clamp(this.tsd_m_min10, 450000);
    monthly.tsd_m_min11 = clamp(this.tsd_m_min11, 450000);
    monthly.tsd_m_min12 = clamp(this.tsd_m_min12, 450000);

    monthly.tor_m_min1 = clamp(this.tor_m_min1, 250);
    monthly.tor_m_min2 = clamp(this.tor_m_min2, 250);
    monthly.tor_m_min3 = clamp(this.tor_m_min3, 250);
    monthly.tor_m_min4 = clamp(this.tor_m_min4, 250);
    monthly.tor_m_min5 = clamp(this.tor_m_min5, 250);
    monthly.tor_m_min6 = clamp(this.tor_m_min6, 250);
    monthly.tor_m_min7 = clamp(this.tor_m_min7, 250);
    monthly.tor_m_min8 = clamp(this.tor_m_min8, 250);
    monthly.tor_m_min9 = clamp(this.tor_m_min9, 250);
    monthly.tor_m_min10 = clamp(this.tor_m_min10, 250);
    monthly.tor_m_min11 = clamp(this.tor_m_min11, 250);
    monthly.tor_m_min12 = clamp(this.tor_m_min12, 250);

    return monthly;
  }
}


 /**
   * Converts the monthly metrics into a single array.
   * @returns {number[]} An array containing all the monthly metrics.
   */
 export function convertMonthlyAsArray(cluster: MonthlyCluster): number[] {
    const array3D = toArray3D(cluster);
    return [...array3D.x, ...array3D.y, ...array3D.z];
  }

  /**
   * Converts the monthly metrics into a 3D array.
   *
   * @private
   * @returns {{ x: number[], y: number[], z: number[] }} An object containing three arrays representing KMD, TSD, and TOR metrics.
   */
  function toArray3D(cluster: MonthlyCluster): { x: number[]; y: number[]; z: number[] } {
    return {
      x: [
        cluster.kmd_m_min12,
        cluster.kmd_m_min11,
        cluster.kmd_m_min10,
        cluster.kmd_m_min9,
        cluster.kmd_m_min8,
        cluster.kmd_m_min7,
        cluster.kmd_m_min6,
        cluster.kmd_m_min5,
        cluster.kmd_m_min4,
        cluster.kmd_m_min3,
        cluster.kmd_m_min2,
        cluster.kmd_m_min1,
      ],
      y: [
        cluster.tsd_m_min12,
        cluster.tsd_m_min11,
        cluster.tsd_m_min10,
        cluster.tsd_m_min9,
        cluster.tsd_m_min8,
        cluster.tsd_m_min7,
        cluster.tsd_m_min6,
        cluster.tsd_m_min5,
        cluster.tsd_m_min4,
        cluster.tsd_m_min3,
        cluster.tsd_m_min2,
        cluster.tsd_m_min1,
      ],
      z: [
        cluster.tor_m_min12,
        cluster.tor_m_min11,
        cluster.tor_m_min10,
        cluster.tor_m_min9,
        cluster.tor_m_min8,
        cluster.tor_m_min7,
        cluster.tor_m_min6,
        cluster.tor_m_min5,
        cluster.tor_m_min4,
        cluster.tor_m_min3,
        cluster.tor_m_min2,
        cluster.tor_m_min1,
      ],
    };
  }