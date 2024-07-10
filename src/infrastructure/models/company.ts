import { JsonProperty, SerializableEntity } from "ts-jackson";
import { YearlyCluster as YearlyCluster } from "./year_cluster";



export class Company extends SerializableEntity {
    @JsonProperty()
    jykood: string;
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
    oig_vorm: string;
    @JsonProperty()
    ettevotte_suurusklass: number;
    @JsonProperty()
    asu_kood: number;
    @JsonProperty()
    kov: number;
    @JsonProperty()
    maakond: number;
    @JsonProperty()
    sektor_likviidsus_protsentiil: number;
    @JsonProperty()
    sektor_efektiivsus_protsentiil: number;
    @JsonProperty()
    sektor_struktuur_protsentiil: number;
    @JsonProperty()
    sektor_tasuvus_protsentiil: number;
    @JsonProperty()
    klaster_likviidsus_protsentiil: number;
    @JsonProperty()
    klaster_efektiivsus_protsentii: number;
    @JsonProperty()
    klaster_struktuur_protsentiil: number;
    @JsonProperty()
    klaster_tasuvus_protsentiil: number;
    @JsonProperty()
    kov_likviidsus_protsentiil: number;
    @JsonProperty()
    kov_efektiivsus_protsentiil: number;
    @JsonProperty()
    kov_struktuur_protsentiil: number;
    @JsonProperty()
    kov_tasuvus_protsentiil: number;
    @JsonProperty()
    maakond_likviidsus_protsentiil: number;
    @JsonProperty()
    maakond_efektiivsus_protsentii: number;
    @JsonProperty()
    maakond_struktuur_protsentiil: number;
    @JsonProperty()
    maakond_tasuvus_protsentiil: number;
    @JsonProperty()
    maakond_x_klaster_likviidsus_p: number;
    @JsonProperty()
    maakond_x_klaster_efektiivsus_: number;
    @JsonProperty()
    maakond_x_klaster_struktuur_pr: number;
    @JsonProperty()
    maakond_x_klaster_tasuvus_prot: number;
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
    klaster_likviidsus_n: number;
    @JsonProperty()
    klaster_efektiivsus_n: number;
    @JsonProperty()
    klaster_struktuur_n: number;
    @JsonProperty()
    klaster_tasuvus_n: number;
    @JsonProperty()
    kov_likviidsus_n: number;
    @JsonProperty()
    kov_efektiivsus_n: number;
    @JsonProperty()
    kov_struktuur_n: number;
    @JsonProperty()
    kov_tasuvus_n: number;
    @JsonProperty()
    maakond_likviidsus_n: number;
    @JsonProperty()
    maakond_efektiivsus_n: number;
    @JsonProperty()
    maakond_struktuur_n: number;
    @JsonProperty()
    maakond_tasuvus_n: number;
    @JsonProperty()
    maakond_x_klaster_likviidsus_n: number;
    @JsonProperty()
    maakond_x_klaster_efektiivsusn: number;
    @JsonProperty()
    maakond_x_klaster_struktuur_n: number;
    @JsonProperty()
    maakond_x_klaster_tasuvus_n: number;
    @JsonProperty()
    suurusklass_likviidsus_n: number;
    @JsonProperty()
    suurusklass_efektiivsus_n: number;
    @JsonProperty()
    suurusklass_struktuur_n: number;
    @JsonProperty()
    suurusklass_tasuvus_n: number;
    @JsonProperty()
    maa_protsent: number;


    public toCluster(): YearlyCluster {
        return YearlyCluster.deserialize(this.serialize());
    }

    public ovverideWithCluster(cluster: YearlyCluster): Company {
        const serialized = cluster.serialize();
        Object.keys(serialized).forEach(key => {
            this[key] = serialized[key];
        });
        return this;
    }
}