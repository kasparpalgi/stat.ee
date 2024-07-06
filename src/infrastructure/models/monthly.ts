import { JsonProperty, SerializableEntity } from "ts-jackson";
import { MonthlyCluster } from "./monthly_cluster";

export class Monthly extends SerializableEntity {
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
    @JsonProperty()
    klaster: string;

    public toCluster(): MonthlyCluster {
        return MonthlyCluster.deserialize(this.serialize());
    }
}