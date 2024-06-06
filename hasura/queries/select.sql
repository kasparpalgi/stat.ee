SELECT * 
FROM  "elujoulisuseindeks"."aastased"
WHERE "jykood" = 16147226
ORDER BY "aastased".aasta DESC
LIMIT 1;

SELECT * 
FROM  "elujoulisuseindeks"."aastased"
WHERE "jykood" = 16147226
AND "maa_protsent" >= 0.9
ORDER BY "aastased".aasta DESC
LIMIT 1;