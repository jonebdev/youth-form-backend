const axios = require("axios")

module.exports = {    
    //will only limit to planning center but there is going to be more that i am gonna have to do
    async postData(url, body){
        return axios({
            method: 'post',
            url: url,
            data: body, 
            auth: {
                username: process.env.PC_API_KEY,
                password: process.env.PC_API_SECRET
            }
        })
        // .then(res =>  JSON.stringify(res))
        .catch(err =>  console.log(err))
    },


    createPerson(first_name, last_name, birthday, grade, url){
        const reqbody = {
            data: {
                attributes: {
                    first_name: first_name,
                    last_name: last_name,
                    birthdate: birthday,
                    grade: grade
                }
            }
        }
        return reqbody
    },

    createEmail(address, url) {
        const reqbody = {
            data: {
                attributes: {
                    address: address,
                    location: 'Home'
                }
            }
        }
        return reqbody
    },

    createCell(number, url) {
        const reqbody = {
            data: {
                attributes: {
                    number: number,
                    location: 'Cell'
                }
            }
        }
        return reqbody
    },

    createAddress(city, state, street, zip, url){
        const reqbody = {
            data: {
                attributes: {
                    city: city,
                    state: state,
                    street: street,
                    zip: zip,
                    location: "Home"
                }
            }
        }
        return reqbody
    },

    createCustomField(id, value, url){
        const reqbody = {
            data: {
                attributes: {
                    field_definition_id: id,
                    value: value
                }
            }
        }
        return reqbody
    },
}