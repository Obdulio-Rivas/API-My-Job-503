const PRO_BD_CONFIG = {
  HOST: "be6ys2pvwdrrlqjhotnw-mysql.services.clever-cloud.com",
  USER: "ucnvccyityg6kjq6",
  PASSWORD: "l1nw6c6jSYGiJ0iyE913",
  DB: "be6ys2pvwdrrlqjhotnw",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}

const DEV_BD_CONFIG = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "",
  DB: "etps3",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}

module.exports = {
    HOST: PRO_BD_CONFIG.HOST,
    USER: PRO_BD_CONFIG.USER,
    PASSWORD: PRO_BD_CONFIG.PASSWORD,
    DB: PRO_BD_CONFIG.DB,
    dialect: PRO_BD_CONFIG.dialect,
    pool: PRO_BD_CONFIG.pool
  };