import { JsonProperty, SerializableEntity } from "ts-jackson"
import { clamp, clampBetween } from "../utils/value_clamp"
import { Array3D } from "../utils/interfaces"

export default class GrowthEntity extends SerializableEntity {
    @JsonProperty()
    kmd_M_min12: number
    @JsonProperty()
    kmd_M_min11: number
    @JsonProperty()
    kmd_M_min10: number
    @JsonProperty()
    kmd_M_min9: number
    @JsonProperty()
    kmd_M_min8: number
    @JsonProperty()
    kmd_M_min7: number
    @JsonProperty()
    kmd_M_min6: number
    @JsonProperty()
    kmd_M_min5: number
    @JsonProperty()
    kmd_M_min4: number
    @JsonProperty()
    kmd_M_min3: number
    @JsonProperty()
    kmd_M_min2: number
    @JsonProperty()
    kmd_M_min1: number
    @JsonProperty()
    tsd_M_min12: number
    @JsonProperty()
    tsd_M_min11: number
    @JsonProperty()
    tsd_M_min10: number
    @JsonProperty()
    tsd_M_min9: number
    @JsonProperty()
    tsd_M_min8: number
    @JsonProperty()
    tsd_M_min7: number
    @JsonProperty()
    tsd_M_min6: number
    @JsonProperty()
    tsd_M_min5: number
    @JsonProperty()
    tsd_M_min4: number
    @JsonProperty()
    tsd_M_min3: number
    @JsonProperty()
    tsd_M_min2: number
    @JsonProperty()
    tsd_M_min1: number
    @JsonProperty()
    tor_M_min12: number
    @JsonProperty()
    tor_M_min11: number
    @JsonProperty()
    tor_M_min10: number
    @JsonProperty()
    tor_M_min9: number
    @JsonProperty()
    tor_M_min8: number
    @JsonProperty()
    tor_M_min7: number
    @JsonProperty()
    tor_M_min6: number
    @JsonProperty()
    tor_M_min5: number
    @JsonProperty()
    tor_M_min4: number
    @JsonProperty()
    tor_M_min3: number
    @JsonProperty()
    tor_M_min2: number
    @JsonProperty()
    tor_M_min1: number

    public toArray() : number[]{
        const array3D = this.toArray3D();
        return [
            ...array3D.x,
            ...array3D.y,
            ...array3D.z
        ]
    }

    /// Regarding the naming of the features, the numbers should go in reverse order,
    /// not as kmd_m_1...12 but as kmd_m12...kmd_m1.
    //  The "m" stands for minus. So, "kmd_m12" means "kmd" from 12 months ago.
    public toArray3D(): Array3D {
        return {
            x: [
                this.kmd_M_min12,
                this.kmd_M_min11,
                this.kmd_M_min10,
                this.kmd_M_min9,
                this.kmd_M_min8,
                this.kmd_M_min7,
                this.kmd_M_min6,
                this.kmd_M_min5,
                this.kmd_M_min4,
                this.kmd_M_min3,
                this.kmd_M_min2,
                this.kmd_M_min1
            ],
            y: [
                this.tsd_M_min12,
                this.tsd_M_min11,
                this.tsd_M_min10,
                this.tsd_M_min9,
                this.tsd_M_min8,
                this.tsd_M_min7,
                this.tsd_M_min6,
                this.tsd_M_min5,
                this.tsd_M_min4,
                this.tsd_M_min3,
                this.tsd_M_min2,
                this.tsd_M_min1
            ],
            z: [
                this.tor_M_min12,
                this.tor_M_min11,
                this.tor_M_min10,
                this.tor_M_min9,
                this.tor_M_min8,
                this.tor_M_min7,
                this.tor_M_min6,
                this.tor_M_min5,
                this.tor_M_min4,
                this.tor_M_min3,
                this.tor_M_min2,
                this.tor_M_min1
            ]
        }
    }

    // Caps each retrieved value based on a separate table defining maximum values for each field.
    public clamp(): GrowthEntity {
        this.kmd_M_min1 = clampBetween(this.kmd_M_min1, -2500000, 2500000);
        this.kmd_M_min2 = clampBetween(this.kmd_M_min2, -2500000, 2500000);
        this.kmd_M_min3 = clampBetween(this.kmd_M_min3, -2500000, 2500000);
        this.kmd_M_min4 = clampBetween(this.kmd_M_min4, -2500000, 2500000);
        this.kmd_M_min5 = clampBetween(this.kmd_M_min5, -2500000, 2500000);
        this.kmd_M_min6 = clampBetween(this.kmd_M_min6, -2500000, 2500000);
        this.kmd_M_min7 = clampBetween(this.kmd_M_min7, -2500000, 2500000);
        this.kmd_M_min8 = clampBetween(this.kmd_M_min8, -2500000, 2500000);
        this.kmd_M_min9 = clampBetween(this.kmd_M_min9, -2500000, 2500000);
        this.kmd_M_min10 = clampBetween(this.kmd_M_min10, -2500000, 2500000);
        this.kmd_M_min11 = clampBetween(this.kmd_M_min11, -2500000, 2500000);
        this.kmd_M_min12 = clampBetween(this.kmd_M_min12, -2500000, 2500000);

        this.tsd_M_min1 = clamp(this.tsd_M_min1, 450000);
        this.tsd_M_min2 = clamp(this.tsd_M_min2, 450000);
        this.tsd_M_min3 = clamp(this.tsd_M_min3, 450000);
        this.tsd_M_min4 = clamp(this.tsd_M_min4, 450000);
        this.tsd_M_min5 = clamp(this.tsd_M_min5, 450000);
        this.tsd_M_min6 = clamp(this.tsd_M_min6, 450000);
        this.tsd_M_min7 = clamp(this.tsd_M_min7, 450000);
        this.tsd_M_min8 = clamp(this.tsd_M_min8, 450000);
        this.tsd_M_min9 = clamp(this.tsd_M_min9, 450000);
        this.tsd_M_min10 = clamp(this.tsd_M_min10, 450000);
        this.tsd_M_min11 = clamp(this.tsd_M_min11, 450000);
        this.tsd_M_min12 = clamp(this.tsd_M_min12, 450000);

        this.tor_M_min1 = clamp(this.tor_M_min1, 250);
        this.tor_M_min2 = clamp(this.tor_M_min2, 250);
        this.tor_M_min3 = clamp(this.tor_M_min3, 250);
        this.tor_M_min4 = clamp(this.tor_M_min4, 250);
        this.tor_M_min5 = clamp(this.tor_M_min5, 250);
        this.tor_M_min6 = clamp(this.tor_M_min6, 250);
        this.tor_M_min7 = clamp(this.tor_M_min7, 250);
        this.tor_M_min8 = clamp(this.tor_M_min8, 250);
        this.tor_M_min9 = clamp(this.tor_M_min9, 250);
        this.tor_M_min10 = clamp(this.tor_M_min10, 250);
        this.tor_M_min11 = clamp(this.tor_M_min11, 250);
        this.tor_M_min12 = clamp(this.tor_M_min12, 250);

        return this;
    }
}