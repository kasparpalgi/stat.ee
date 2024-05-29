import { JsonProperty,  SerializableEntity } from "ts-jackson"

export default class CompanyEntity extends SerializableEntity {
    @JsonProperty()
    JYKOOD: number
    @JsonProperty()
    AASTA: number
    @JsonProperty()
    EMTAK: number
    @JsonProperty()
    Sektor_nr: number
    @JsonProperty()
    Sektor_txt: string
    @JsonProperty()
    Klaster: string
    @JsonProperty()
    TARV_H: number
    @JsonProperty()
    OIG_VORM: string
    @JsonProperty()
    Ettevotte_suurusklass: string
    @JsonProperty()
    ASU_KOOD: number
    @JsonProperty()
    KOV: number
    @JsonProperty()
    Maakond: number
    @JsonProperty()
    Kaibevarad: number
    @JsonProperty()
    Raha: number
    @JsonProperty()
    Lyhiajalised_nouded: number
    @JsonProperty()
    Lyhiajalised_finantsinvesteeringud: number
    @JsonProperty()
    Varud: number
    @JsonProperty()
    Pohivarad: number
    @JsonProperty()
    Pikaajalised_nouded: number
    @JsonProperty()
    Pikaajalised_finantsinvesteeringud: number
    @JsonProperty()
    Kinnisvarainvesteeringud: number
    @JsonProperty()
    Materiaalne_pohivara: number
    @JsonProperty()
    Immateriaalne_pohivara: number
    @JsonProperty()
    Varad_kokku: number
    @JsonProperty()
    Lyhiajalised_kohustused: number
    @JsonProperty()
    Lyhiajalised_volad: number
    @JsonProperty()
    Lyhiajalised_laenud: number
    @JsonProperty()
    Pikaajalised_kohustused: number
    @JsonProperty()
    Pikaajalised_volad: number
    @JsonProperty()
    Pikaajalised_laenud: number
    @JsonProperty()
    Kohustused_kokku: number
    @JsonProperty()
    Omakapital: number
    @JsonProperty()
    Kohustused_Omakapital_kokku: number
    @JsonProperty()
    Myygitulu: number
    @JsonProperty()
    Muud_aritulud: number
    @JsonProperty()
    Muud_arikulud: number
    @JsonProperty()
    Toojoukulud: number
    @JsonProperty()
    Arikasum: number
    @JsonProperty()
    Intressikulud: number
    @JsonProperty()
    Aruandeaasta_kasum: number
    @JsonProperty()
    Kaibevarad_t1: number
    @JsonProperty()
    LVKK: number
    @JsonProperty()
    MVK: number
    @JsonProperty()
    RK: number
    @JsonProperty()
    LLLK: number
    @JsonProperty()
    LLVK: number
    @JsonProperty()
    LLOK: number
    @JsonProperty()
    VaKK: number
    @JsonProperty()
    LVKaK: number
    @JsonProperty()
    VKK: number
    @JsonProperty()
    VK: number
    @JsonProperty()
    KOS: number
    @JsonProperty()
    IKK: number
    @JsonProperty()
    LKKKK: number
    @JsonProperty()
    PKKKK: number
    @JsonProperty()
    AKM: number
    @JsonProperty()
    PKM: number
    @JsonProperty()
    ROA: number
    @JsonProperty()
    ROE: number
    @JsonProperty()
    ds_Kaibevarad: number
    @JsonProperty()
    ds_Raha: number
    @JsonProperty()
    ds_Lyhiajalised_nouded: number
    @JsonProperty()
    ds_Lyhiajalised_finantsinvesteeringud: number
    @JsonProperty()
    ds_Varud: number
    @JsonProperty()
    ds_Pohivarad: number
    @JsonProperty()
    ds_Pikaajalised_nouded: number
    @JsonProperty()
    ds_Pikaajalised_finantsinvesteeringud: number
    @JsonProperty()
    ds_Kinnisvarainvesteeringud: number
    @JsonProperty()
    ds_Materiaalne_pohivara: number
    @JsonProperty()
    ds_Immateriaalne_pohivara: number
    @JsonProperty()
    ds_Varad_kokku: number
    @JsonProperty()
    ds_Lyhiajalised_kohustused: number
    @JsonProperty()
    ds_Lyhiajalised_volad: number
    @JsonProperty()
    ds_Lyhiajalised_laenud: number
    @JsonProperty()
    ds_Pikaajalised_kohustused: number
    @JsonProperty()
    ds_Pikaajalised_volad: number
    @JsonProperty()
    ds_Pikaajalised_laenud: number
    @JsonProperty()
    ds_Kohustused_kokku: number
    @JsonProperty()
    ds_Omakapital: number
    @JsonProperty()
    ds_Kohustused_Omakapital_kokku: number
    @JsonProperty()
    ds_Myygitulu: number
    @JsonProperty()
    ds_Muud_aritulud: number
    @JsonProperty()
    ds_Muud_arikulud: number
    @JsonProperty()
    ds_Toojoukulud: number
    @JsonProperty()
    ds_Arikasum: number
    @JsonProperty()
    ds_Intressikulud: number
    @JsonProperty()
    ds_Aruandeaasta_kasum: number
    @JsonProperty()
    ettevõtete_arv_sektoris: number
    @JsonProperty()
    skoor_1_likviidsus: number
    @JsonProperty()
    skoor_2_efektiivsus: number
    @JsonProperty()
    skoor_3_struktuur: number
    @JsonProperty()
    skoor_4_tasuvus: number
    @JsonProperty()
    y_skoor_1_likviidsus: number
    @JsonProperty()
    y_skoor_2_efektiivsus: number
    @JsonProperty()
    y_skoor_3_struktuur: number
    @JsonProperty()
    y_skoor_4_tasuvus: number
    @JsonProperty()
    SKP_jooksevhindades: number
    @JsonProperty()
    SKP_nominaalkasv: number
    @JsonProperty()
    SKP_pysivhindades: number
    @JsonProperty()
    SKP_reaalkasv: number
    @JsonProperty()
    Tarbijahinnaindeks: number
    @JsonProperty()
    Keskmine_kuupalk: number
    @JsonProperty()
    Palgakasv: number
    @JsonProperty()
    Tooviljakuse_kasv: number
    @JsonProperty()
    sektor_likviidsus_protsentiil: number
    @JsonProperty()
    sektor_efektiivsus_protsentiil: number
    @JsonProperty()
    sektor_struktuur_protsentiil: number
    @JsonProperty()
    sektor_tasuvus_protsentiil: number
    @JsonProperty()
    klaster_likviidsus_protsentiil: number
    @JsonProperty()
    klaster_efektiivsus_protsentiil: number
    @JsonProperty()
    klaster_struktuur_protsentiil: number
    @JsonProperty()
    klaster_tasuvus_protsentiil: number
    @JsonProperty()
    KOV_likviidsus_protsentiil: number
    @JsonProperty()
    KOV_efektiivsus_protsentiil: number
    @JsonProperty()
    KOV_struktuur_protsentiil: number
    @JsonProperty()
    KOV_tasuvus_protsentiil: number
    @JsonProperty()
    maakond_likviidsus_protsentiil: number
    @JsonProperty()
    maakond_efektiivsus_protsentiil: number
    @JsonProperty()
    maakond_struktuur_protsentiil: number
    @JsonProperty()
    maakond_tasuvus_protsentiil: number
    @JsonProperty()
    maakond_x_klaster_likviidsus_protsentiil: number
    @JsonProperty()
    maakond_x_klaster_efektiivsus_protsentiil: number
    @JsonProperty()
    maakond_x_klaster_struktuur_protsentiil: number
    @JsonProperty()
    maakond_x_klaster_tasuvus_protsentiil: number
    @JsonProperty()
    suurusklass_likviidsus_protsentiil: number
    @JsonProperty()
    suurusklass_efektiivsus_protsentiil: number
    @JsonProperty()
    suurusklass_struktuur_protsentiil: number
    @JsonProperty()
    suurusklass_tasuvus_protsentiil: number
    @JsonProperty()
    sektor_likviidsus_n: number
    @JsonProperty()
    sektor_efektiivsus_n: number
    @JsonProperty()
    sektor_struktuur_n: number
    @JsonProperty()
    sektor_tasuvus_n: number
    @JsonProperty()
    klaster_likviidsus_n: number
    @JsonProperty()
    klaster_efektiivsus_n: number
    @JsonProperty()
    klaster_struktuur_n: number
    @JsonProperty()
    klaster_tasuvus_n: number
    @JsonProperty()
    KOV_likviidsus_n: number
    @JsonProperty()
    KOV_efektiivsus_n: number
    @JsonProperty()
    KOV_struktuur_n: number
    @JsonProperty()
    KOV_tasuvus_n: number
    @JsonProperty()
    maakond_likviidsus_n: number
    @JsonProperty()
    maakond_efektiivsus_n: number
    @JsonProperty()
    maakond_struktuur_n: number
    @JsonProperty()
    maakond_tasuvus_n: number
    @JsonProperty()
    maakond_x_klaster_likviidsus_n: number
    @JsonProperty()
    maakond_x_klaster_efektiivsus_n: number
    @JsonProperty()
    maakond_x_klaster_struktuur_n: number
    @JsonProperty()
    maakond_x_klaster_tasuvus_n: number
    @JsonProperty()
    suurusklass_likviidsus_n: number
    @JsonProperty()
    suurusklass_efektiivsus_n: number
    @JsonProperty()
    suurusklass_struktuur_n: number
    @JsonProperty()
    suurusklass_tasuvus_n: number
}