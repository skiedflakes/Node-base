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
            `,{  // and trunc("DATEOFBIRTH") = TO_DATE(:dateofbirth, 'MM/DD/YYYY')
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

    const result = await oracle.execute(`select a.*,b.*
    from bpl.taxpayer_tbl a
    join bpl.business_tbl b 
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
    
    }

}

module.exports  = SSO;