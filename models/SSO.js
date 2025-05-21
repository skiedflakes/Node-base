const oracleConnection = require('../config/oracle')

const SSO = {
    taxpayers : async () => {
        const oracle = await oracleConnection

        const result = await oracle.execute(
        `SELECT * FROM bpl.TAXPAYER_TBL WHERE active = 'Y'`
        );
    const columnNames = result.metaData.map(value => value.name)

    const data = result.rows.map(row => {
        let obj = {};
        row.forEach((value, index) => {
        obj[columnNames[index]] = value;
        });
        return obj;
    }); 

    return data

    },
    taxpayer : async (firstname,middlename,lastname) => {
    const oracle = await oracleConnection

    const date = new Date()
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const yyyy = date.getFullYear();
    const bday = `${mm}/${dd}/${yyyy}`

    const result = await oracle.execute(`SELECT * FROM bpl.taxpayer_tbl where active ='Y' and tplastname = :lastname 
        and tpgivenname = :firstname and tpmiddlename = :middlename 
            `,{
            lastname: lastname,
            firstname: firstname,
            middlename: middlename,
            //dateofbirth: bday
        })

    const rows = result.rows
    if (rows.length == 0) {
        return false
    }

    const columnNames = result.metaData.map(value => value.name)

    const data = result.rows.map(row => {
        let obj = {};
        row.forEach((value, index) => {
        obj[columnNames[index]] = value;
        });
        return obj;
    }); 

    return data[0]
    },

    taxpayerGetBusiness: async (id) => {
    const oracle = await oracleConnection

    const result = await oracle.execute(`select a.*,b.taxpayerid
    from bpl.business_tbl a
    join bpl.taxpayer_tbl b 
    on a.taxpayerid = b.taxpayerid
    where a.taxpayerid = :id`,{id: id})

    const resultCount = result.rows
    if (resultCount.length == 0) {
        return {
            message: 'Taxpayer not found',
            status: 404,
            success:false,
        }
    }

    const columnNames = result.metaData.map(value => value.name)

    const data = result.rows.map(row => {
        let obj = {};
        row.forEach((value, index) => {
        obj[columnNames[index]] = value;
        });
        return obj;
    }); 

    return data[0]
    
    },
    business : async (ban) => {
        const oracle = await oracleConnection

        const result = await oracle.execute(`select * from bpl.business_tbl 
        where businessid = :ban`,{ban: ban})

        const resultCount = result.rows
        if (resultCount.length == 0) {
            return {
                message: 'Business not found',
                status: 404,
                success:false,
            }
        }

        const columnNames = result.metaData.map(value => value.name)

        const data = result.rows.map(row => {
            let obj = {};
            row.forEach((value, index) => {
            obj[columnNames[index]] = value;
            });
            return obj;
        }); 

        return data[0]
        
    },
    getBusinessHistory : async (ban) => {
        const oracle = await oracleConnection

        const result = await oracle.execute(`select * from bpl.bpapplication_tbl 
        where businessid = :ban`,{ban: ban})

        const resultCount = result.rows
        if (resultCount.length == 0) {
            return {
                message: 'Business not found',
                status: 404,
                success:false,
            }
        }

        const columnNames = result.metaData.map(value => value.name)

        const data = result.rows.map(row => {
            let obj = {};
            row.forEach((value, index) => {
            obj[columnNames[index]] = value;
            });
            return obj;
        }); 

        return data[0]
    },
    taxpayerById : async (taxpayerid) => {
        const oracle = await oracleConnection

        const result = await oracle.execute(`select * from bpl.taxpayer_tbl 
        where taxpayerid = :taxpayerid`,{taxpayerid: taxpayerid})

        const resultCount = result.rows
        if (resultCount.length == 0) {
            return {
                message: 'Taxpayer not found',
                status: 404,
                success:false,
            }
        }

        const columnNames = result.metaData.map(value => value.name)

        const data = result.rows.map(row => {
            let obj = {};
            row.forEach((value, index) => {
            obj[columnNames[index]] = value;
            });
            return obj;
        }); 

        return data[0]
        
    }

}

module.exports  = SSO;