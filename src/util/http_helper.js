const axios = require('axios')

module.exports = {
    async postData(url, body) {
        return (
            axios({
                method: 'post',
                url,
                data: body,
                auth: {
                    username: process.env.PC_API_KEY,
                    password: process.env.PC_API_SECRET,
                },
            })
                // .then(res =>  JSON.stringify(res))
                .catch(err => console.log(err))
        )
    },

    createPerson(first_name, last_name, birthday, grade) {
        const reqbody = {
            data: {
                attributes: {
                    first_name,
                    last_name,
                    birthdate: birthday,
                    grade,
                },
            },
        }
        return reqbody
    },

    createEmail(address) {
        const reqbody = {
            data: {
                attributes: {
                    address,
                    location: 'Home',
                },
            },
        }
        return reqbody
    },

    createCell(number) {
        const reqbody = {
            data: {
                attributes: {
                    number,
                    location: 'Cell',
                },
            },
        }
        return reqbody
    },

    createAddress(city, state, street, zip) {
        const reqbody = {
            data: {
                attributes: {
                    city,
                    state,
                    street,
                    zip,
                    location: 'Home',
                },
            },
        }
        return reqbody
    },

    createCustomField(id, value) {
        const reqbody = {
            data: {
                attributes: {
                    field_definition_id: id,
                    value,
                },
            },
        }
        return reqbody
    },
}
