const moment = require('moment')
const bcryptJS= require('bcryptjs')

//Data
const initRoleData = [
    {
        role: 'administrador',
        state: 1
    },{
        role: 'profesional',
        state: 1
    },{
        role: 'empresa',
        state: 1
    }
]

const initUserData = [
    {
        name: 'Jose Obdulio',
        lastname: 'Rivas Velasquez',
        imgURL: 'https://www.facebook.com/photo?fbid=1713318828744667&set=a.123632741046625',
        age: 22,
        civilStatus: 'Soltero',
        numberDUI:  '00986712-3',
        numberNIT:  '0614-020898-118-0',
        address: 'Colonia ejemplo...',
        telephoneNumber: '78965413',
        birthDate: moment('1998/08/02', 'YYYY/MM/DD'),
        nationality: 'Salvadoreña',
        //Usuario.
        email: '2552772016@mail.utec.edu.sv',
        password: bcryptJS.hashSync('Password123.', 10),
        //Llave foranea.
        idRole: 1,
        state: true
    },
    {
        name: 'Anyi Alejandra',
        lastname: 'Mendez Bolaños',
        imgURL: 'https://www.facebook.com/photo?fbid=4023081681110738&set=a.109672985784980',
        age: 22,
        civilStatus: 'Soltero',
        numberDUI: '00900013-9',
        numberNIT: '0608-020898-253-1',
        address: 'Barrio del sur',
        telephoneNumber: '77397893',
        birthDate: moment('1998/07/07', 'YYYY/MM/DD'),
        nationality: 'Guatemalteca',
        //Usuario.
        email: '2507752016@mail.utec.edu.sv',
        password: bcryptJS.hashSync('Password123.', 10),
        //Llave foranea.
        idRole: 1,
        state: true
    },
    {
        name: 'Francisco Alexander',
        lastname: 'Recinos Massin',
        imgURL: 'https://www.facebook.com/franck2323/?viewas=100000686899395',
        age: 23,
        civilStatus: 'Soltero',
        numberDUI:  '00976055-6',
        numberNIT:  '0804-280797-128-6',
        address: 'Colonia ejemplo...',
        telephoneNumber: '71498040',
        birthDate: moment('1997/07/28', 'YYYY/MM/DD'),
        nationality: 'Salvadoreña',
        //Usuario.
        email: '2511012016@mail.utec.edu.sv',
        password: bcryptJS.hashSync('Password123.', 10),
        //Llave foranea.
        idRole: 1,
        state: true
    },
    {
        name: 'Yohalmo Ernesto',
        lastname: 'Esperanza',
        imgURL: 'https://www.facebook.com/photo/?fbid=10216729321689832&set=a.1427885301558',
        age: 24,
        civilStatus: 'Soltero',
        numberDUI: '05397681-0',
        numberNIT: '0614-261096-125-9',
        address: 'San marcos',
        telephoneNumber: '75346875',
        birthDate: moment('1996/10/26', 'YYYY/MM/DD'),
        nationality: 'Salvadoreña',
        //Usuario.
        email: '2556392016@mail.utec.edu.sv',
        password: bcryptJS.hashSync('Password123.', 10),
        //Llave foranea.
        idRole: 1,
        state: true
    },
    {
        name: 'Diana Rebeca',
        lastname: 'Colorado Hernandez',
        imgURL: 'https://www.facebook.com/photo?fbid=3583366658405910&set=a.108343985908212',
        age: 23,
        civilStatus: 'Soltero',
        numberDUI: '07855681-0',
        numberNIT: '7814-275846-885-9',
        address: 'X LA CARCEL',
        telephoneNumber: '75346875',
        birthDate: moment('1996/07/31', 'YYYY/MM/DD'),
        nationality: 'Salvadoreña',
        //Usuario.
        email: '2511802016@mail.utec.edu.sv',
        password: bcryptJS.hashSync('Password123.', 10),
        //Llave foranea.
        idRole: 1,
        state: true    
    }
]

module.exports = {
    initRoleData,
    initUserData
}