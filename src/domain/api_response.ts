
export interface ApiResponse {
    jykood: string | null;
    aasta: number | null;
    emtak: number | null;
    sektor_nr: number | null;
    sektor_txt: string | null;
    klaster: string | null;
    tarv_h: number | null;
    oig_vorm: string | null;
    ettevotte_suurusklass: number | null;
    asu_kood: number | null;
    kov: number | null;
    maakond: number | null;
    sektor_likviidsus_protsentiil: number | null;
    sektor_efektiivsus_protsentiil: number | null;
    sektor_struktuur_protsentiil: number | null;
    sektor_tasuvus_protsentiil: number | null;
    klaster_likviidsus_protsentiil: number | null;
    klaster_efektiivsus_protsentii: number | null;
    klaster_struktuur_protsentiil: number | null;
    klaster_tasuvus_protsentiil: number | null;
    kov_likviidsus_protsentiil: number | null;
    kov_efektiivsus_protsentiil: number | null;
    kov_struktuur_protsentiil: number | null;
    kov_tasuvus_protsentiil: number | null;
    maakond_likviidsus_protsentiil: number | null;
    maakond_efektiivsus_protsentii: number | null;
    maakond_struktuur_protsentiil: number | null;
    maakond_tasuvus_protsentiil: number | null;
    maakond_x_klaster_likviidsus_p: number | null;
    maakond_x_klaster_efektiivsus_: number | null;
    maakond_x_klaster_struktuur_pr: number | null;
    maakond_x_klaster_tasuvus_prot: number | null;
    suurusklass_likviidsus_protsen: number | null;
    suurusklass_efektiivsus_protse: number | null;
    suurusklass_struktuur_protsent: number | null;
    suurusklass_tasuvus_protsentii: number | null;
    sektor_likviidsus_n: number | null;
    sektor_efektiivsus_n: number | null;
    sektor_struktuur_n: number | null;
    sektor_tasuvus_n: number | null;
    klaster_likviidsus_n: number | null;
    klaster_efektiivsus_n: number | null;
    klaster_struktuur_n: number | null;
    klaster_tasuvus_n: number | null;
    kov_likviidsus_n: number | null;
    kov_efektiivsus_n: number | null;
    kov_struktuur_n: number | null;
    kov_tasuvus_n: number | null;
    maakond_likviidsus_n: number | null;
    maakond_efektiivsus_n: number | null;
    maakond_struktuur_n: number | null;
    maakond_tasuvus_n: number | null;
    maakond_x_klaster_likviidsus_n: number | null;
    maakond_x_klaster_efektiivsusn: number | null;
    maakond_x_klaster_struktuur_n: number | null;
    maakond_x_klaster_tasuvus_n: number | null;
    suurusklass_likviidsus_n: number | null;
    suurusklass_efektiivsus_n: number | null;
    suurusklass_struktuur_n: number | null;
    suurusklass_tasuvus_n: number | null;
    maa_protsent: number | null;
    kaibevarad: number | null;
    raha: number | null;
    lyhiajalised_nouded: number | null;
    lyhiajalised_finantsinvesteeri: number | null;
    varud: number | null;
    pohivarad: number | null;
    pikaajalised_nouded: number | null;
    pikaajalised_finantsinvesteeri: number | null;
    kinnisvarainvesteeringud: number | null;
    materiaalne_pohivara: number | null;
    immateriaalne_pohivara: number | null;
    varad_kokku: number | null;
    lyhiajalised_kohustused: number | null;
    lyhiajalised_volad: number | null;
    lyhiajalised_laenud: number | null;
    pikaajalised_kohustused: number | null;
    pikaajalised_volad: number | null;
    pikaajalised_laenud: number | null;
    kohustused_kokku: number | null;
    omakapital: number | null;
    kohustused_omakapital_kokku: number | null;
    myygitulu: number | null;
    muud_aritulud: number | null;
    muud_arikulud: number | null;
    toojoukulud: number | null;
    arikasum: number | null;
    intressikulud: number | null;
    aruandeaasta_kasum: number | null;
    ds_kaibevarad: number | null;
    ds_raha: number | null;
    ds_lyhiajalised_nouded: number | null;
    ds_lyhiajalised_finantsinveste: number | null;
    ds_varud: number | null;
    ds_pohivarad: number | null;
    ds_pikaajalised_nouded: number | null;
    ds_pikaajalised_finantsinveste: number | null;
    ds_kinnisvarainvesteeringud: number | null;
    ds_materiaalne_pohivara: number | null;
    ds_immateriaalne_pohivara: number | null;
    ds_varad_kokku: number | null;
    ds_lyhiajalised_kohustused: number | null;
    ds_lyhiajalised_volad: number | null;
    ds_lyhiajalised_laenud: number | null;
    ds_pikaajalised_kohustused: number | null;
    ds_pikaajalised_volad: number | null;
    ds_pikaajalised_laenud: number | null;
    ds_kohustused_kokku: number | null;
    ds_omakapital: number | null;
    ds_kohustused_omakapital_kokku: number | null;
    ds_myygitulu: number | null;
    ds_muud_aritulud: number | null;
    ds_muud_arikulud: number | null;
    ds_toojoukulud: number | null;
    ds_arikasum: number | null;
    ds_intressikulud: number | null;
    ds_aruandeaasta_kasum: number | null;
    skp_jooksevhindades: number | null;
    skp_nominaalkasv: number | null;
    skp_pysivhindades: number | null;
    skp_reaalkasv: number | null;
    tarbijahinnaindeks: number | null;
    keskmine_kuupalk: number | null;
    palgakasv: number | null;
    tooviljakuse_kasv: number | null;
    model1y1: number | null;
    model1y2: number | null;
    model1y3: number | null;
    model2y1: number | null;
    model2y2: number | null;
    model2y3: number | null;
    model3y1: number | null;
    model3y2: number | null;
    model3y3: number | null;
    model4y1: number | null;
    model4y2: number | null;
    model4y3: number | null;
    model5y1: number | null;
    model5y2: number | null;
    model5y3: number | null;
}

 export function nullApiResponse() : ApiResponse {
     return {
         jykood: null,
         aasta: null,
         emtak: null,
         sektor_nr: null,
         sektor_txt: null,
         klaster: null,
         tarv_h: null,
         oig_vorm: null,
         ettevotte_suurusklass: null,
         asu_kood: null,
         kov: null,
         maakond: null,
         sektor_likviidsus_protsentiil: null,
         sektor_efektiivsus_protsentiil: null,
         sektor_struktuur_protsentiil: null,
         sektor_tasuvus_protsentiil: null,
         klaster_likviidsus_protsentiil: null,
         klaster_efektiivsus_protsentii: null,
         klaster_struktuur_protsentiil: null,
         klaster_tasuvus_protsentiil: null,
         kov_likviidsus_protsentiil: null,
         kov_efektiivsus_protsentiil: null,
         kov_struktuur_protsentiil: null,
         kov_tasuvus_protsentiil: null,
         maakond_likviidsus_protsentiil: null,
         maakond_efektiivsus_protsentii: null,
         maakond_struktuur_protsentiil: null,
         maakond_tasuvus_protsentiil: null,
         maakond_x_klaster_likviidsus_p: null,
         maakond_x_klaster_efektiivsus_: null,
         maakond_x_klaster_struktuur_pr: null,
         maakond_x_klaster_tasuvus_prot: null,
         suurusklass_likviidsus_protsen: null,
         suurusklass_efektiivsus_protse: null,
         suurusklass_struktuur_protsent: null,
         suurusklass_tasuvus_protsentii: null,
         sektor_likviidsus_n: null,
         sektor_efektiivsus_n: null,
         sektor_struktuur_n: null,
         sektor_tasuvus_n: null,
         klaster_likviidsus_n: null,
         klaster_efektiivsus_n: null,
         klaster_struktuur_n: null,
         klaster_tasuvus_n: null,
         kov_likviidsus_n: null,
         kov_efektiivsus_n: null,
         kov_struktuur_n: null,
         kov_tasuvus_n: null,
         maakond_likviidsus_n: null,
         maakond_efektiivsus_n: null,
         maakond_struktuur_n: null,
         maakond_tasuvus_n: null,
         maakond_x_klaster_likviidsus_n: null,
         maakond_x_klaster_efektiivsusn: null,
         maakond_x_klaster_struktuur_n: null,
         maakond_x_klaster_tasuvus_n: null,
         suurusklass_likviidsus_n: null,
         suurusklass_efektiivsus_n: null,
         suurusklass_struktuur_n: null,
         suurusklass_tasuvus_n: null,
         maa_protsent: null,
         kaibevarad: null,
         raha: null,
         lyhiajalised_nouded: null,
         lyhiajalised_finantsinvesteeri: null,
         varud: null,
         pohivarad: null,
         pikaajalised_nouded: null,
         pikaajalised_finantsinvesteeri: null,
         kinnisvarainvesteeringud: null,
         materiaalne_pohivara: null,
         immateriaalne_pohivara: null,
         varad_kokku: null,
         lyhiajalised_kohustused: null,
         lyhiajalised_volad: null,
         lyhiajalised_laenud: null,
         pikaajalised_kohustused: null,
         pikaajalised_volad: null,
         pikaajalised_laenud: null,
         kohustused_kokku: null,
         omakapital: null,
         kohustused_omakapital_kokku: null,
         myygitulu: null,
         muud_aritulud: null,
         muud_arikulud: null,
         toojoukulud: null,
         arikasum: null,
         intressikulud: null,
         aruandeaasta_kasum: null,
         ds_kaibevarad: null,
         ds_raha: null,
         ds_lyhiajalised_nouded: null,
         ds_lyhiajalised_finantsinveste: null,
         ds_varud: null,
         ds_pohivarad: null,
         ds_pikaajalised_nouded: null,
         ds_pikaajalised_finantsinveste: null,
         ds_kinnisvarainvesteeringud: null,
         ds_materiaalne_pohivara: null,
         ds_immateriaalne_pohivara: null,
         ds_varad_kokku: null,
         ds_lyhiajalised_kohustused: null,
         ds_lyhiajalised_volad: null,
         ds_lyhiajalised_laenud: null,
         ds_pikaajalised_kohustused: null,
         ds_pikaajalised_volad: null,
         ds_pikaajalised_laenud: null,
         ds_kohustused_kokku: null,
         ds_omakapital: null,
         ds_kohustused_omakapital_kokku: null,
         ds_myygitulu: null,
         ds_muud_aritulud: null,
         ds_muud_arikulud: null,
         ds_toojoukulud: null,
         ds_arikasum: null,
         ds_intressikulud: null,
         ds_aruandeaasta_kasum: null,
         skp_jooksevhindades: null,
         skp_nominaalkasv: null,
         skp_pysivhindades: null,
         skp_reaalkasv: null,
         tarbijahinnaindeks: null,
         keskmine_kuupalk: null,
         palgakasv: null,
         tooviljakuse_kasv: null,
         model1y1: null,
         model1y2: null,
         model1y3: null,
         model2y1: null,
         model2y2: null,
         model2y3: null,
         model3y1: null,
         model3y2: null,
         model3y3: null,
         model4y1: null,
         model4y2: null,
         model4y3: null,
         model5y1: null,
         model5y2: null,
         model5y3: null
     };
 }