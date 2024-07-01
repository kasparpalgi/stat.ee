# stat-ee

## TODO

* ~~Jaaniga kohtumine~~
* ~~Hansuga kohtumine~~
* ~~Ülesande püstitus lühidalt~~
* Hans saatis mudelid meilile ja https://mail.google.com/mail/u/1/#search/marre/FMfcgzGxSbvNCHtjhVNnkttbqZhJGWQZ
* ~~ER välja mõelda~~ Hansuga koos
* Gitlab šeeri
* Hans kommenteeris failis
* Import (`SQL*Loader` vs `oracledb` ja JS script)
* [mudelid1 valjund](https://github.com/kvartiil/mudelid1valjund) - ei ole kõige hilisemad variandid, kuid töötavad ja katsetamiseks sobivad. JSON failis on struktuur kenasti kirjas, 64 sisendit peaks olema kõigil. Mis ma sellega teen?

## Ülesande püstitus

![diagram](./ülesande_püstituse_diagram.png)

0. Võtta ettevõtte reg. koodi järgi `jykood` Oracle'st rida (kui see eksisteerib) selle ettevõtte viimase baasis oleva `aasta` 64 välja alates `kaibevarad` väljast. Kõikide väljade vaikimisi väärtus on `0` (kui datat pole, siis on 0).
2. Kõrgemad otsad maha (Hans või Jaan - viita, kust ma saan iga 64 välja kohta info, et mis on max ehk siis näiteks, et `kaibevarad` 100 ja kui mõnel ettevõttel on 101 või miljard, siis mina kasutan ikka 100). Kas see 100 on näide või ongi 100 see number?
3. Ettevõtte sektori järgi valida 4 õiget mudelit 20st. k4_1 ... k4_4
4. Kõigist 64 arvust lahutada vastav number `mea` [tabelist](https://docs.google.com/spreadsheets/d/1xQovBVylikPfnDzzJF7qJADa06Ya8ozLGXptgo3dVHE) sõltuvalt mudelist (punkt 3)
5. Kõik 64 arvu jagada vastava numbriga `sds` [tabelist](https://docs.google.com/spreadsheets/d/17mh7DMQhR5eGZYDO6faO6yTC3hE_LGEs69whnb73eKA) sõltuvalt mudelist
6. Saadud numbrid array'sse ja TS npm JS library'ga saame uued numbrid `tf.tensor2d([arv1, arv2, ..., arv64], [1, 64])` ja `tf.loadLayersModel('oige_mudl_kettal')` ja `laetudMudel.predict(andmete_array)`
7. Iga mudel annab 3 numbrit välja (madala tõenäosus, keskmise tõenäosus ja kõrge tõenäosus). Kuidas ma kolmest numbris ühe saan, et anda tagasi:
```json
{
	"registCo": "12345678",
	"model1y1": 0.34,
	"model1y2": 0.26,
	"model1y3": 0.40,
	"model2y1": 0.90,
	"model2y2": 0.08,
	"model2y3": 0.02,
	"model3y1": 0.70,
	"model3y2": 0.15,
	"model3y3": 0.15,
	"model4y1": 0.30,
	"model4y2": 0.35,
	"model4y3": 0.35,
	"model5y1": 0.93,
	"model5y2": 0.03,
	"model5y3": 0.04,
	"sektorNo": 35,
	"size_min": 1, // need kaks: https://i.imgur.com/04Te6hu.png
	"size_max": 9,
	"county": 37, // https://imgur.com/oFr7UnQ
	"kov": 784, // https://i.imgur.com/PtzXCS2.png
	"LVKK": 0.34, // töötlemata kujul see number? https://i.imgur.com/8Xhif3T.png
	"MVK": 2.33, // töötlemata kujul see number? https://i.imgur.com/DaFL0oN.png (antud näite puhul 0)
	"RK": 2.42, // töötlemata kujul see number? https://i.imgur.com/cjW1Alu.png
	"LLLK": 0.34, // jne kuni `ROE` - kas kõik numbrid saan baasist ja annan töötlemata kujul tagasi?
	"LLVK": 0.44,
	"LLOK": 0.53,
	"VaKK": 1.22,
	"LVKaK": 1.82,
	"VKK": 2.54,
	"VK": 0.35,
	"KOS": 0.65,
	"LKKKK": 0.89,
	"PKKKK": 0.14,
	"AKM": 0.03,
	"PKM": 0.03,
	"ROA": 0.23,
	"ROE": 0.45,
	"Eff%Sect": 0.34, // protsentiil sektor efektiivsus - kust need kuni lõpuni välja tulevad?
	"Eff%Size": 0.45, // protsentiil suurusgrupp efektiivsus
	"Eff%Count": 0.23, // protsentiil piirkond efektiivsus
	"Liq%Sect": 0.24, // protsentiil sektor maksevõime
	"Liq%Size": 0.56, // protsentiil suurusgrupp maksevõime
	"Liq%Count": 0.76, // protsentiil piirkond maksevõime
	"Lev%Sect": 0.21, // protsentiil sektor finantsvõimendus
	"Lev%Size": 0.53, // protsentiil suurusgrupp finantsvõimendus
	"Lev%Count": 0.77, // protsentiil piirkond finantsvõimendus
	"Ret%Sect": 0.24, // protsentiil sektor tasuvus
	"Ret%Size": 0.55, // protsentiil suurusgrupp tasuvus
	"Ret%Count": 0.72, // protsentiil piirkond tasuvus
	"Emp%Sect": 0.34, // protsentiil sektor tööjõu tootlikkus
	"Emp%Size": 0.26, // protsentiil suurusgrupp tööjõu tootlikkus
	"Emp%Count": 0.77 // protsentiil piirkond tööjõu tootlikkus
}
```
8. Kuskilt Gitist kontrollin (kui tihti?), et kas on uus mudel alla laadida?

Viis mudelit 20st
JSONi struktuur on olemas
Oracle andmebaas skeem
Mittefunktsionaalsete nõuete loetelu
Logima ma ei pea midagi
Loe sisse ja jäta - GTP kui palju kasutajaid
OpenAI connecti tüüpi ühendus. Sertidega saab piirata.

## Märkmed

https://github.com/kvartiil/mudelid1valjund

## id_d_taustatunnused (ID-d ja taustatunnused)
 	id
 	aasta
 	jy_kood
 	emtak
 	sektor_nr
 	sektor_txt, string
 	klaster, string
 	kov
 	maakond
 	ettevotte_suurusklass
## norm_sisendvektor (normaliseerimata sisendvektor MAA mudelite jaoks=
 	kaibevarad
 	raha
 	lyh_nouded (lühiajalised nõuded)
 	lyh_fin_invest (lühiajalised finantsinvesteeringud)
 	varud
 	pohivarad
 	pikaajalised_nouded
 	pikad_finan_invest (Pikaajalised finantsinvesteeringud)
 	kinnisvara_invest
 	mat_pohivara (Matiaalne põhivara)
 	imm_pohivare (Immateriaalne põhivara)
 	varad_kokku
 	lyh_kohustused (Lühiajalised kohustused)
 	lyh_volad
 	lyh_laenud
 	pik_kohustused (Pikaajalised kohustused)
 	pik_volad
 	pik_laenud
 	kohustused_kokku
 	omakapital
 	kohustused_omakapital (Kohustused ja omakapital kokku)
 	myygitulu
 	muud_aritulud
 	muud_arikulud
 	toojoukulud
 	arikasum
 	intressikulud
 	aruandeaasta_kasum
 	ds_kaibevarad
 	ds_raha
 	ds_lyh_nouded
 	ds_lyh_fin_invest
 	ds_varud
 	ds_pohivarad
 	ds_pik_nouded
 	ds_pik_finan_invest
 	ds_kinnisvara_invest
 	ds_mat_pohivara
 	ds_immat_pohivara
 	ds_varad_kokku
 	ds_lyh_kohustused
 	ds_lyh_volad
 	ds_lyh_laenud
 	ds_pik_kohustused
 	ds_pik_volad
 	ds_pik_laenud
 	ds_koh_kokku (Kohustused kokku)
 	ds_omakapital
 	ds_koh_omakapital_kokku
 	ds_myygitulu
 	ds_muud_aritulud
 	ds_muud_arikulud
 	ds_oojoukulud
 	ds_arikasum
 	ds_intressikulud
 	ds_aruandeaasta_kasum
 	skp_jooksevhindades
 	skp_nominaalkasv
 	skp_pysivhindades
 	skp_reaalkasv
 	tarbijahinnaindeks
 	keskmine_kuupalk
 	palgakasv
 	tooviljakuse_kasv
## do nohetk_kuva (Hetkeseisu kuvamised)
 	sek_likv_prots (Sektori likviidsus protsendiil)
    sek_likv_n
    sek_struk_prots (Sektori struktuur protsendiil)
    sek_struk_n
    sek_efekt_prots
    sekt_efekt_n
    sekt_tasuv_prots
    sekt_tasuv_n
    kov_likv_prots
    kov_likv_n
    kov_struk_prots
    kov_struk_n
    kov_efekt_prots
    kov_efekt_n
    kov_tasuv_prots
    kov_tasuv_n
    maak_x_klas_likv_prots
    maak_x_klas_likv_n
    maak_x_klas_struk_prots
    maak_x_klas_struk_n
    maak_x_klas_efekt_prots
    maak_x_klas_efekt_n
    maak_x_klas_tasuv_prots
    maak_x_klas_tasuv_n
    klastri_likv_prots
    klast_likv_n
    klast_strukt_prots (Klastri struktuur protsendiil)
    klast_strukt_n
    klast_efekt_prots
    klast_efekt_n
    klast_tasuv_prots
    klast_tasuv_n
    suurusk_likv_prots (Suurusklassi likviidsus protsendiil)
    suurusk_likv_n
    suurusk_strukt_prots
    suurusk_strukt_n
    suurusk_efekt_prots
    suurusk_efekt_n
    suurusk_tasuv_prots
    suurusk_tasuv_n


    See konkreetne 64-ne jupp on normaliseerimata sisendvektor masinõppemudelile. Seal tuleb kõigepealt kerge eeltöötlus (R failis – mis tunnustel kust maalt otsad ära clippida) ja siis normaliseerimine:l tuleb lahutada vastava klastri keskmine ja jagada standardhälbega (need on need vastavad abitabelid).
Pärast normaliseerimist saab vektori sisse sööta neljale mudelile (mudeli valik klastri järgi) millest tulevad välja 4 x 3 tõenäosust (madala, keskmise ja kõrge elujõu tõenäosused iga mudeli kohta)

```text
Kaibevarad
Raha
Lyhiajalised_nouded
Lyhiajalised_finantsinvesteeringud
Varud
Pohivarad
Pikaajalised_nouded
Pikaajalised_finantsinvesteeringud
Kinnisvarainvesteeringud
Materiaalne_pohivara
Immateriaalne_pohivara
Varad_kokku
Lyhiajalised_kohustused
Lyhiajalised_volad
Lyhiajalised_laenud
Pikaajalised_kohustused
Pikaajalised_volad
Pikaajalised_laenud
Kohustused_kokku
Omakapital
Kohustused_Omakapital_kokku
Myygitulu
Muud_aritulud
Muud_arikulud
Toojoukulud
Arikasum
Intressikulud
Aruandeaasta_kasum
ds_Kaibevarad
ds_Raha
ds_Lyhiajalised_nouded
ds_Lyhiajalised_finantsinvesteeringud
ds_Varud
ds_Pohivarad
ds_Pikaajalised_nouded
ds_Pikaajalised_finantsinvesteeringud
ds_Kinnisvarainvesteeringud
ds_Materiaalne_pohivara
ds_Immateriaalne_pohivara
ds_Varad_kokku
ds_Lyhiajalised_kohustused
ds_Lyhiajalised_volad
ds_Lyhiajalised_laenud
ds_Pikaajalised_kohustused
ds_Pikaajalised_volad
ds_Pikaajalised_laenud
ds_Kohustused_kokku
ds_Omakapital
ds_Kohustused_Omakapital_kokku
ds_Myygitulu
ds_Muud_aritulud
ds_Muud_arikulud
ds_Toojoukulud
ds_Arikasum
ds_Intressikulud
ds_Aruandeaasta_kasum
SKP_jooksevhindades
SKP_nominaalkasv
SKP_pysivhindades
SKP_reaalkasv
Tarbijahinnaindeks
Keskmine_kuupalk
Palgakasv
Tooviljakuse_kasv
```

Esialgu võiks alustada ehk umbes selliste väljadega andmebaasist. Kõik peale kõik peale "Sektor_txt" ja "klaster" peaks olema arvulised (double float). See peaks katma ära kõik peale kuiste andmete mudelite, need tuleb eraldi teha, seal andmed teise struktuuriga ja kasutus ka veidi teine.
