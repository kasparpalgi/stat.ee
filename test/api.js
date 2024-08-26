const ids = [12712965, 11273535, 10266384, 11351324, 12083363, 14888415, 10224144, 12045908, 11499653, 10647962, 14483297, 14438368, 10509154, 14566166, 11168494, 14589612, 11335733, 16147226, 14649426, 11982249, 14810902, 11300899, 12389151, 14647611, 14796257,];
const apiEndpoint = "http://localhost/eestat/1/elujoud";

async function testApiWithIds(id) {
    for (let id of ids) {
        try {
            const response = await fetch(`${apiEndpoint}/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
            console.log(`Success for ID: ${id}`);
        } catch (error) {
            console.error("Error: for ID: ", id, error);
        }
    }
}

testApiWithIds(ids);