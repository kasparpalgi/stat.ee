# elujõu normaliseerimine (viimane täisaasta)
d <- read.csv('/home/hans.horak@intra.rmv/xketas/ATAO/Eksperimentaalstatistika/Projektid/MKM/Elujõulisuse\ indeks/SISENDANDMED/ARUANNE_ALL_29_02_2024.csv', sep="\t")
# Kaibevarad: max 5.0e+08
# Raha: max       1e+08
# lyh nouded max  5.0e+08
# lyh fin invest: 5.0e+07
# varud           1.5e+08
# pohivarad       5.0e+08
# pik nouded      5.0e+08
# pik_fin_invest  6.5e+08
# kinnisvara      1e+08
# materiaalne poh 5.0e+08
# immater         5.0e+07
# varad kokku     7.0e+08
# lyh koh         2.0e+08
# lyh volad       1.5e+08
# lyh laenud      2.0e+08
# pik kohust      2.0e+08
# pik volad       1.5e+08
# pik laenud      3.0e+08
# kohust kokk     5.0e+08
# omakapit        5.0e+08
# kohust oma koku 7.0e+08
# myygitulu       3.0e+08
# muud aritulud   3.0e+08
# muud arikulud   1.0e+07
# toojpukulud     3.0e+07
# ariaksum        3.0e+08 (negatiivne ots ka !!, aga -1e+08)
# intressikulud   1.5e+07
# aruandea-kasum  3.0e+08 (negatiivne ots maha)
normaliseerimise_aasta <- 2022

klastrid <- c("k4_1", "k4_2" ,"k4_3" ,"k4_4")

varnames <- c("Kaibevarad","Raha","Lyhiajalised_nouded","Lyhiajalised_finantsinvesteeringud",
              "Varud","Pohivarad","Pikaajalised_nouded","Pikaajalised_finantsinvesteeringud",
              "Kinnisvarainvesteeringud","Materiaalne_pohivara","Immateriaalne_pohivara","Varad_kokku",
              "Lyhiajalised_kohustused","Lyhiajalised_volad","Lyhiajalised_laenud","Pikaajalised_kohustused",
              "Pikaajalised_volad","Pikaajalised_laenud","Kohustused_kokku","Omakapital",
              "Kohustused_Omakapital_kokku","Myygitulu","Muud_aritulud","Muud_arikulud","Toojoukulud",
              "Arikasum","Intressikulud","Aruandeaasta_kasum","ds_Kaibevarad","ds_Raha","ds_Lyhiajalised_nouded",
              "ds_Lyhiajalised_finantsinvesteeringud","ds_Varud","ds_Pohivarad","ds_Pikaajalised_nouded",
              "ds_Pikaajalised_finantsinvesteeringud","ds_Kinnisvarainvesteeringud","ds_Materiaalne_pohivara",
              "ds_Immateriaalne_pohivara","ds_Varad_kokku","ds_Lyhiajalised_kohustused","ds_Lyhiajalised_volad",
              "ds_Lyhiajalised_laenud","ds_Pikaajalised_kohustused","ds_Pikaajalised_volad","ds_Pikaajalised_laenud",
              "ds_Kohustused_kokku","ds_Omakapital","ds_Kohustused_Omakapital_kokku","ds_Myygitulu","ds_Muud_aritulud",
              "ds_Muud_arikulud","ds_Toojoukulud","ds_Arikasum","ds_Intressikulud","ds_Aruandeaasta_kasum",
              "SKP_jooksevhindades","SKP_nominaalkasv","SKP_pysivhindades","SKP_reaalkasv",
              "Tarbijahinnaindeks","Keskmine_kuupalk","Palgakasv","Tooviljakuse_kasv")

aastased <- c("SKP_jooksevhindades","SKP_nominaalkasv","SKP_pysivhindades","SKP_reaalkasv",
              "Tarbijahinnaindeks","Keskmine_kuupalk","Palgakasv","Tooviljakuse_kasv")

# siin valin mingit müra makromajanduise tunnustele, et igal real sama väärtus ei ole, peamiselt releventne treenimiseks
# d[,"SKP_jooksevhindades"]<- d[,"SKP_jooksevhindades"]+ rnorm(length(d$KOOD),0, 200)
# d[,"SKP_nominaalkasv"]   <- d[,"SKP_nominaalkasv"]   + rnorm(length(d$KOOD),0, 0.002)
# d[,"SKP_pysivhindades"]  <- d[,"SKP_pysivhindades"]  + rnorm(length(d$KOOD),0, 150)
# d[,"SKP_reaalkasv"]      <- d[,"SKP_reaalkasv"]      + rnorm(length(d$KOOD),0, 0.002)
# d[,"Tarbijahinnaindeks"] <- d[,"Tarbijahinnaindeks"] + rnorm(length(d$KOOD),0, 0.002)
# d[,"Keskmine_kuupalk"]   <- d[,"Keskmine_kuupalk"]   + rnorm(length(d$KOOD),0, 5)
# d[,"Palgakasv"]          <- d[,"Palgakasv"]          + rnorm(length(d$KOOD),0, 0.002)
# d[,"Tooviljakuse_kasv"]  <- d[,"Tooviljakuse_kasv"]  + rnorm(length(d$KOOD),0, 0.0003)
# võta algsed tasemed - igast aastast üks v22rtus - sellest saab keskmise- kas standarhälve võtta pärast müra kogutabelist?

#jj <- d[,aastased]
#  valisin sellised variatsioonid mürale
xx <- c(200,0.002, 150,0.002,0.002,5,0.002,0.0003)
ms <- c()
i<-0
for (a in aastased) {
  i<-i+1
  #see periood, mis treeningul oli - kas 2023 sisse v mitte?
  for(y in 2016:normaliseerimise_aasta){
    print(paste0(a,y))
  #assign(paste0("m_", a), )
    m <- mean(d[which(d$AASTA==y),a][1:100], na.rm=T)
    ms <- c(ms, m)
    print(ms)
  }
  assign(paste0("m_", a), mean(ms))
  assign(paste0("s_", a), sd(ms))
  # kõigepealt liidab müra ja siis normaliseerib - testimisel/kasutamisel po.le müra vaja!! lihtsalt neid keskmisei ja sd-sid on vaja
  d[,a] <- ((d[,a]+rnorm(length(d$KOOD), 0 , xx[i]))-mean(ms, na.rm=T))/sd(ms, na.rm=T)
  
  ms<- c()
}

da <- d[which(d$AASTA==normaliseerimise_aasta),c(varnames, "Klaster_4")]

# bilansinäitajatel kõrgemad otsad maha.
da[which(da[, 1] >= (5.0e+08)*0.5 ), 1] <- (5.0e+08)*0.5
da[which(da[, 2] >= (1e+08  )*0.5 ), 2] <- (1e+08 )*0.5
da[which(da[, 3] >= (5.0e+08)*0.5 ), 3] <- (5.0e+08)*0.5
da[which(da[, 4] >= (5.0e+07)*0.5 ), 4] <- (5.0e+07)*0.5
da[which(da[, 5] >= (1.5e+08)*0.5 ), 5] <- (1.5e+08)*0.5
da[which(da[, 6] >= (5.0e+08)*0.5 ), 6] <- (5.0e+08)*0.5
da[which(da[, 7] >= (5.0e+08)*0.5 ), 7] <- (5.0e+08)*0.5
da[which(da[, 8] >= (6.5e+08)*0.5 ), 8] <- (6.5e+08)*0.5
da[which(da[, 9] >= (1e+08  )*0.5 ), 9] <- (1e+08 )*0.5
da[which(da[,10] >= (5.0e+08)*0.5 ),10] <- (5.0e+08)*0.5
da[which(da[,11] >= (5.0e+07)*0.5 ),11] <- (5.0e+07)*0.5
da[which(da[,12] >= (7.0e+08)*0.5 ),12] <- (7.0e+08)*0.5
da[which(da[,13] >= (2.0e+08)*0.5 ),13] <- (2.0e+08)*0.5
da[which(da[,14] >= (1.5e+08)*0.5 ),14] <- (1.5e+08)*0.5
da[which(da[,15] >= (2.0e+08)*0.5 ),15] <- (2.0e+08)*0.5
da[which(da[,16] >= (2.0e+08)*0.5 ),16] <- (2.0e+08)*0.5
da[which(da[,17] >= (1.5e+08)*0.5 ),17] <- (1.5e+08)*0.5
da[which(da[,18] >= (3.0e+08)*0.5 ),18] <- (3.0e+08)*0.5
da[which(da[,19] >= (5.0e+08)*0.5 ),19] <- (5.0e+08)*0.5
da[which(da[,20] >= (5.0e+08)*0.5 ),20] <- (5.0e+08)*0.5
da[which(da[,21] >= (7.0e+08)*0.5 ),21] <- (7.0e+08)*0.5
da[which(da[,22] >= (3.0e+08)*0.5 ),22] <- (3.0e+08)*0.5
da[which(da[,23] >= (3.0e+08)*0.5 ),23] <- (3.0e+08)*0.5
da[which(da[,24] >= (1.0e+07)*0.5 ),24] <- (1.0e+07)*0.5
da[which(da[,25] >= (3.0e+07)*0.5 ),25] <- (3.0e+07)*0.5
da[which(da[,26] >= (2.5e+08)*0.5 ),26] <- (2.5e+08)*0.5
da[which(da[,27] >= (1.5e+07)*0.5 ),27] <- (1.5e+07)*0.5
da[which(da[,28] >= (2.5e+08)*0.5 ),28] <- (2.5e+08)*0.5
da[which(da[,26] <= (-2.5e+08)*0.5 ),26] <- -2.5e+08 *0.5
da[which(da[,28] <= (-2.5e+08)*0.5 ),28] <- -2.5e+08 *0.5 

# krt kas ikka ds_... tunnuseid saab niimoodi käsitleda, et lihtsalt 0 panna .... 
# praegu saab küll, seal on Jaanus juba teinud vastavad liigutused, puuduvaid ei ole ja skaala -1...1000
da[1:56][is.na(da[1:56])] <- 0

mj <- c(m_SKP_jooksevhindades,
m_SKP_nominaalkasv,
m_SKP_pysivhindades,
m_SKP_reaalkasv,
m_Tarbijahinnaindeks,
m_Keskmine_kuupalk,
m_Palgakasv,
m_Tooviljakuse_kasv)

sj <- c(s_SKP_jooksevhindades,
s_SKP_nominaalkasv,
s_SKP_pysivhindades,
s_SKP_reaalkasv,
s_Tarbijahinnaindeks,
s_Keskmine_kuupalk,
s_Palgakasv,
s_Tooviljakuse_kasv)

means_K1 <- c(colMeans(da[which(da$Klaster_4=="k4_1"),1:56], na.rm = T),mj)#, "k4_1")
sds_K1 <- c(apply(da[which(da$Klaster_4=="k4_1"),1:56], 2, sd, na.rm=T), sj)#, "k4_1")

means_K2 <- c(colMeans(da[which(da$Klaster_4=="k4_2"),1:56], na.rm = T),mj)#, "k4_2")
sds_K2 <- c(apply(da[which(da$Klaster_4=="k4_2"),1:56], 2, sd, na.rm=T), sj)#, "k4_2")

means_K3 <- c(colMeans(da[which(da$Klaster_4=="k4_3"),1:56], na.rm = T),mj)#, "k4_3")
sds_K3 <- c(apply(da[which(da$Klaster_4=="k4_3"),1:56], 2, sd, na.rm=T), sj)#, "k4_3")

means_K4 <- c(colMeans(da[which(da$Klaster_4=="k4_4"),1:56], na.rm = T),mj)#, "k4_4")
sds_K4 <- c(apply(da[which(da$Klaster_4=="k4_4"),1:56], 2, sd, na.rm=T), sj)#, "k4_4")

sdstabel <- as.data.frame(rbind(sds_K1,sds_K2,sds_K3,sds_K4))
names(sdstabel) <- c(varnames)
sdstabel$klaster <- c("k4_1","k4_2","k4_3","k4_4")
meatabel <- as.data.frame(rbind(means_K1,means_K2,means_K3,means_K4))
names(meatabel) <- c(varnames)
meatabel$klaster <- c("k4_1","k4_2","k4_3","k4_4")



#write.table(sdstabel, '/home/hans.horak@intra.rmv/xketas/ATAO/Eksperimentaalstatistika/Projektid/MKM/Elujõulisuse\ indeks/andmehoive/sds_64_2022_2023_normaliseerimiseks.csv', sep="\t", row.names = F)
#write.table(meatabel, '/home/hans.horak@intra.rmv/xketas/ATAO/Eksperimentaalstatistika/Projektid/MKM/Elujõulisuse\ indeks/andmehoive/mea_64_2022_2023_normaliseerimiseks.csv', sep="\t", row.names = F)