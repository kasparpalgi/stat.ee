// import testCompanyResponse from './../company/company_test_data'
// import ClusterEntity from '../../src/entities/cluster_entity'
// import CompanyEntity from '../../src/entities/company_entity'
// import {findMeaByCluster} from '../../src/data_sources/mea_static_data'
// import { findSdsByCluster } from '../../src/data_sources/sds_static_data'

// describe('Cluster', () => {
//     test('should find mea by cluster name', () => {
//         const clusterName = 'k4_1'
//         const result = findMeaByCluster(clusterName)
//         expect(result).toBeDefined()
//     })
//     test('should find sds by cluster name', () => {
//         const clusterName = 'k4_1'
//         const result = findSdsByCluster(clusterName)
//         expect(result).toBeDefined()
//     })

//     test("should clamp maximum values in the entity", () => {
//         let data = testCompanyResponse;
//         data.Kaibevarad = 250000001;
//         data.Raha = 50000001;
//         data.Lyhiajalised_nouded = 250000001;
//         data.Lyhiajalised_finantsinvesteeringud = 25000001;
//         data.Varud = 75000001;
//         data.Pohivarad = 250000001;
//         data.Pikaajalised_nouded = 250000001;
//         data.Pikaajalised_finantsinvesteeringud = 325000001;
//         data.Kinnisvarainvesteeringud = 50000001;
//         data.Materiaalne_pohivara = 250000001;
//         data.Immateriaalne_pohivara = 25000001;
//         data.Varad_kokku = 350000001;
//         data.Lyhiajalised_kohustused = 100000001;
//         data.Lyhiajalised_volad = 75000001;
//         data.Pikaajalised_kohustused = 100000001;
//         data.Pikaajalised_volad = 75000001;
//         data.Pikaajalised_laenud = 150000001;
//         data.Omakapital = 250000001;
//         data.Kohustused_Omakapital_kokku = 350000001;
//         data.Myygitulu = 150000001;
//         data.Muud_aritulud = 150000001;
//         data.Muud_arikulud = 5000001;
//         data.Toojoukulud = 15000001;
//         data.Intressikulud = 7500001;
//         data.Arikasum = 250000001;
//         data.Aruandeaasta_kasum = 125000001;
        
//         let company = CompanyEntity.deserialize(data);
//         let cluster = ClusterEntity.fromCompany(company);

//         expect(cluster.Kaibevarad).toEqual(250000000);
//         expect(cluster.Raha).toEqual(50000000);
//         expect(cluster.Lyhiajalised_nouded).toEqual(250000000);
//         expect(cluster.Lyhiajalised_finantsinvesteeringud).toEqual(25000000);
//         expect(cluster.Varud).toEqual(75000000);
//         expect(cluster.Pohivarad).toEqual(250000000);
//         expect(cluster.Pikaajalised_nouded).toEqual(250000000);
//         expect(cluster.Pikaajalised_finantsinvesteeringud).toEqual(325000000);
//         expect(cluster.Kinnisvarainvesteeringud).toEqual(50000000);
//         expect(cluster.Materiaalne_pohivara).toEqual(250000000);
//         expect(cluster.Immateriaalne_pohivara).toEqual(25000000);
//         expect(cluster.Varad_kokku).toEqual(350000000);
//         expect(cluster.Lyhiajalised_kohustused).toEqual(100000000);
//         expect(cluster.Lyhiajalised_volad).toEqual(75000000);
//         expect(cluster.Pikaajalised_kohustused).toEqual(100000000);
//         expect(cluster.Pikaajalised_volad).toEqual(75000000);
//         expect(cluster.Pikaajalised_laenud).toEqual(150000000);
//         expect(cluster.Omakapital).toEqual(250000000);
//         expect(cluster.Kohustused_Omakapital_kokku).toEqual(350000000);
//         expect(cluster.Myygitulu).toEqual(150000000);
//         expect(cluster.Muud_aritulud).toEqual(150000000);
//         expect(cluster.Muud_arikulud).toEqual(5000000);
//         expect(cluster.Toojoukulud).toEqual(15000000);
//         expect(cluster.Intressikulud).toEqual(7500000);
//         expect(cluster.Arikasum).toEqual(250000000);
//         expect(cluster.Aruandeaasta_kasum).toEqual(125000000);

//     });

//     test("should clamp minimum values in the entity", () => {
//         let data = testCompanyResponse;
//         data.Arikasum = -125000001;
//         data.Aruandeaasta_kasum = -125000001;



//         let company = CompanyEntity.deserialize(data);
//         let cluster = ClusterEntity.fromCompany(company);

//         expect(cluster.Arikasum).toEqual(-125000000);
//         expect(cluster.Aruandeaasta_kasum).toEqual(-125000000);
//     });
// })