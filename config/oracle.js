const oracledb= require('oracledb')
oracledb.initOracleClient({
    libDir:  "C:/instantclient_23_8" // Adjust to your actual path
 // libDir: "C:/instantclient_21_17"
});

const oracleConfig =  {
  user: "rnavalesca",
  password: "M!tcsPa55w0rd",
  connectString: "172.16.10.4/prodtwo"  // Update as needed
};

async function oracleConnect(){
  let connection;
    try {
    connection = await oracledb.getConnection(oracleConfig)
    return connection
    } catch (error) {
    console.log('Connection Failed: ' + error);
    }
}

const oracleConnection = oracleConnect()

module.exports = oracleConnection