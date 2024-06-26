import { JsonProperty, SerializableEntity } from "ts-jackson";
import { clamp, clampBetween, } from "../../application";

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

    // Divides each field by the corresponding `sds` value based on the cluster.
    public divide(cluster: YearlyCluster): YearlyCluster {
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

    public substract(cluster: YearlyCluster): YearlyCluster {
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

    // Caps each retrieved value based on a separate table defining maximum values for each field.
    public clamp(): YearlyCluster {
        this.kaibevarad = clamp(this.kaibevarad, 250000000);
        this.raha = clamp(this.raha, 50000000);
        this.lyhiajalised_nouded = clamp(this.lyhiajalised_nouded, 250000000);
        this.varud = clamp(this.varud, 75000000);
        this.pohivarad = clamp(this.pohivarad, 250000000);
        this.pikaajalised_nouded = clamp(this.pikaajalised_nouded, 250000000);
        this.kinnisvarainvesteeringud = clamp(this.kinnisvarainvesteeringud, 50000000);
        this.materiaalne_pohivara = clamp(this.materiaalne_pohivara, 250000000);
        this.immateriaalne_pohivara = clamp(this.immateriaalne_pohivara, 25000000);
        this.varad_kokku = clamp(this.varad_kokku, 350000000);
        this.lyhiajalised_kohustused = clamp(this.lyhiajalised_kohustused, 100000000);
        this.lyhiajalised_volad = clamp(this.lyhiajalised_volad, 75000000);
        this.pikaajalised_kohustused = clamp(this.pikaajalised_kohustused, 100000000);
        this.pikaajalised_volad = clamp(this.pikaajalised_volad, 75000000);
        this.pikaajalised_laenud = clamp(this.pikaajalised_laenud, 150000000);
        this.omakapital = clamp(this.omakapital, 250000000);
        this.myygitulu = clamp(this.myygitulu, 150000000);
        this.muud_aritulud = clamp(this.muud_aritulud, 150000000);
        this.muud_arikulud = clamp(this.muud_arikulud, 5000000);
        this.toojoukulud = clamp(this.toojoukulud, 15000000);
        this.intressikulud = clamp(this.intressikulud, 7500000);
        this.arikasum = clampBetween(this.arikasum, -125000000, 250000000);
        this.aruandeaasta_kasum = clampBetween(this.aruandeaasta_kasum, -125000000, 125000000);

        return this;
    }

    // to array of values
    toArray(): number[] {
        return Object.values(this);
    }
}