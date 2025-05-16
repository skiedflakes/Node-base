const oracledb= require('oracledb')
oracledb.initOracleClient({
  libDir: "C:/instantclient_21_17"  // Adjust to your actual path
});

const oracleConfig =  {
  user: "rnavalesca",
  password: "M!tcsPa55w0rd",
  connectString: "172.16.10.4/prodtwo"  // Update as needed
};

async function oracleConnect(){
    const connection = await oracledb.getConnection(oracleConfig)
    return connection
}

const connection = oracleConnect()

console.log(connection);

module.exports = connection;
