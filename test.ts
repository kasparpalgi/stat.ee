

function a(jykood:string) {
     const pg = `SELECT YearlyCluster FROM "elujoulisuseindeks"."kuised" WHERE jykood = "${jykood}" ORDER BY year DESC LIMIT 1;`;
        const oracle = `
            SELECT * FROM
            (SELECT YearlyCluster FROM "elujoulisuseindeks"."kuised" WHERE jykood = '${jykood}' ORDER BY year DESC)
            WHERE ROWNUM = 1;
        `;

        console.log(pg);

        console.log(oracle);
} 

a('ABC');