import { clamp, clampBetween } from "../../application";
import { JsonProperty, SerializableEntity } from "ts-jackson";
/**
 * @module MonthlyCluster
 */

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

    /**
     * Converts the monthly metrics into a single array.
     * @returns {number[]} An array containing all the monthly metrics.
     */
    public asArray(): number[] {
        const array3D = this.toArray3D();
        return [
            ...array3D.x,
            ...array3D.y,
            ...array3D.z
        ];
    }

    /**
     * Converts the monthly metrics into a 3D array.
     * 
     * @private
     * @returns {{ x: number[], y: number[], z: number[] }} An object containing three arrays representing KMD, TSD, and TOR metrics.
     */
    private toArray3D(): { x: number[], y: number[], z: number[] } {
        return {
            x: [
                this.kmd_m_min12,
                this.kmd_m_min11,
                this.kmd_m_min10,
                this.kmd_m_min9,
                this.kmd_m_min8,
                this.kmd_m_min7,
                this.kmd_m_min6,
                this.kmd_m_min5,
                this.kmd_m_min4,
                this.kmd_m_min3,
                this.kmd_m_min2,
                this.kmd_m_min1
            ],
            y: [
                this.tsd_m_min12,
                this.tsd_m_min11,
                this.tsd_m_min10,
                this.tsd_m_min9,
                this.tsd_m_min8,
                this.tsd_m_min7,
                this.tsd_m_min6,
                this.tsd_m_min5,
                this.tsd_m_min4,
                this.tsd_m_min3,
                this.tsd_m_min2,
                this.tsd_m_min1
            ],
            z: [
                this.tor_m_min12,
                this.tor_m_min11,
                this.tor_m_min10,
                this.tor_m_min9,
                this.tor_m_min8,
                this.tor_m_min7,
                this.tor_m_min6,
                this.tor_m_min5,
                this.tor_m_min4,
                this.tor_m_min3,
                this.tor_m_min2,
                this.tor_m_min1
            ]
        };
    }

    /**
     * Clamps the values of each field based on predefined limits.
     * 
     * @returns {MonthlyCluster} The instance with clamped values.
     */
    public clamp(): MonthlyCluster {
        this.kmd_m_min1 = clampBetween(this.kmd_m_min1, -2500000, 2500000);
        this.kmd_m_min2 = clampBetween(this.kmd_m_min2, -2500000, 2500000);
        this.kmd_m_min3 = clampBetween(this.kmd_m_min3, -2500000, 2500000);
        this.kmd_m_min4 = clampBetween(this.kmd_m_min4, -2500000, 2500000);
        this.kmd_m_min5 = clampBetween(this.kmd_m_min5, -2500000, 2500000);
        this.kmd_m_min6 = clampBetween(this.kmd_m_min6, -2500000, 2500000);
        this.kmd_m_min7 = clampBetween(this.kmd_m_min7, -2500000, 2500000);
        this.kmd_m_min8 = clampBetween(this.kmd_m_min8, -2500000, 2500000);
        this.kmd_m_min9 = clampBetween(this.kmd_m_min9, -2500000, 2500000);
        this.kmd_m_min10 = clampBetween(this.kmd_m_min10, -2500000, 2500000);
        this.kmd_m_min11 = clampBetween(this.kmd_m_min11, -2500000, 2500000);
        this.kmd_m_min12 = clampBetween(this.kmd_m_min12, -2500000, 2500000);

        this.tsd_m_min1 = clamp(this.tsd_m_min1, 450000);
        this.tsd_m_min2 = clamp(this.tsd_m_min2, 450000);
        this.tsd_m_min3 = clamp(this.tsd_m_min3, 450000);
        this.tsd_m_min4 = clamp(this.tsd_m_min4, 450000);
        this.tsd_m_min5 = clamp(this.tsd_m_min5, 450000);
        this.tsd_m_min6 = clamp(this.tsd_m_min6, 450000);
        this.tsd_m_min7 = clamp(this.tsd_m_min7, 450000);
        this.tsd_m_min8 = clamp(this.tsd_m_min8, 450000);
        this.tsd_m_min9 = clamp(this.tsd_m_min9, 450000);
        this.tsd_m_min10 = clamp(this.tsd_m_min10, 450000);
        this.tsd_m_min11 = clamp(this.tsd_m_min11, 450000);
        this.tsd_m_min12 = clamp(this.tsd_m_min12, 450000);

        this.tor_m_min1 = clamp(this.tor_m_min1, 250);
        this.tor_m_min2 = clamp(this.tor_m_min2, 250);
        this.tor_m_min3 = clamp(this.tor_m_min3, 250);
        this.tor_m_min4 = clamp(this.tor_m_min4, 250);
        this.tor_m_min5 = clamp(this.tor_m_min5, 250);
        this.tor_m_min6 = clamp(this.tor_m_min6, 250);
        this.tor_m_min7 = clamp(this.tor_m_min7, 250);
        this.tor_m_min8 = clamp(this.tor_m_min8, 250);
        this.tor_m_min9 = clamp(this.tor_m_min9, 250);
        this.tor_m_min10 = clamp(this.tor_m_min10, 250);
        this.tor_m_min11 = clamp(this.tor_m_min11, 250);
        this.tor_m_min12 = clamp(this.tor_m_min12, 250);

        return this;
    }


    // Divides each field by the corresponding `sds` value based on the cluster.
    public divide(cluster: MonthlyCluster): MonthlyCluster {
        Object.keys(this).forEach(key => {
            // if the value is not a number, skip it
            if (isNaN(this[key])) {
                return;
            } else if (Object.keys(cluster).includes(key) && cluster[key] !== 0) {
                this[key] = this[key] / cluster[key]
            }

        });
        return this;
    }

    public substract(cluster: MonthlyCluster): MonthlyCluster {
        Object.keys(this).forEach(key => {
            // if the value is not a number, skip it
            if (isNaN(this[key])) {
                return;
            } else if (Object.keys(cluster).includes(key) && cluster[key] !== 0) {
                this[key] = this[key] - cluster[key]
            }
        });
        return this;
    }
}