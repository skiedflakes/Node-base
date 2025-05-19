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

    const resultCount = result.rows
    if (resultCount.length == 0) {
        return {
            message: 'Taxpayer not found',
            status: 404
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
    taxpayerById: async (id) => {
    const oracle = await oracleConnection

    const result = await oracle.execute(`SELECT * FROM bpl.taxpayer_tbl where taxpayerid = :id`,{id: id})

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