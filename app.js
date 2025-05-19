const express= require('express')
const app = express()
const port = 3000
const oracledb = require('oracledb');
const SSO = require('./models/SSO');
const { getToken, verifyToken } = require('./utils/getToken');

// Enable Thick Mode
//oracledb.initOracleClient({
//  libDir: "C:/instantclient_23_8"  // Adjust to your actual path
//});


// OracleDB connection configuration
const dbConfig = {
  user: "rnavalesca",
  password: "M!tcsPa55w0rd",
  connectString: "172.16.10.4/prodtwo"  // Update as needed
};

// Endpoint to test database connection
app.get("/api", async (req, res) => {
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `SELECT ID, FIRSTNAME, LASTNAME, DEPTCODE FROM bpl.acs_users_tbl WHERE active = 'Y'`
    );

    // Send the list of names
    const names = result.rows.map(([id, firstName, lastName, deptCode]) => ({
      id,
      firstName,
      lastName,
      deptCode
    }));    
res.status(200).json({ names });

  } catch (err) {
    res.status(500).json({ error: "Database connection failed", details: err.message });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
});


app.get("/api/users", async (req, res) => {
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);
    const query = `
      SELECT ID, FIRSTNAME, LASTNAME, DEPTCODE, USERNAME
      FROM bpl.acs_users_tbl 
      WHERE active = 'Y'
    `;

    const result = await connection.execute(query);

    // Map result to objects with named keys
    const users = result.rows.map(row => ({

      firstName: row[1],
      lastName: row[2]
    }));

    res.status(200).json({ users });

  } catch (err) {
    res.status(500).json({ error: "Database connection failed", details: err.message });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
});


app.post('/test',async(req,res) => {
  const data = await SSO.taxpayer('MAAN','DE VILLA','BIASCA')

  const token = getToken({
    taxpayerId : data.TAXPAYERID
  })

  console.log(verifyToken(token));

  res.send({
    success: true,
    status: 200,
    token: token
  })

})

app.post('/taxpayer', async (req,res) => {
  const data = await SSO.taxpayerById(75255)
  
  res.send(data)
})



app.listen(3000, () => {
  console.log("Server is running on port 3000");
});


