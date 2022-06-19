const field_id  = require("../util/custom_fields")
const  {
        postData, 
        createAddress, 
        createCell, 
        createCustomField, 
        createEmail, 
        createPerson
    } = require('../util/http_helper')


module.exports = async (req, res) => {
    console.log('hi')
    console.log(req.body)
    const values = req.body
    const person = createPerson(values.person.first_name, values.person.last_name, values.person.birthday, null)
    const address = createAddress(values.person.city, values.person.state, values.person.street, values.person.zip);
    const email = createEmail(values.person.email);
    const cell = createCell(values.person.cell);
    const howYouHeard = createCustomField(field_id.lcf_how_you_heard, values.person.how_you_heard)
    const todaysDate = createCustomField(field_id.lcf_todays_date, values.person.todays_date)
    const prayer_requests = createCustomField(field_id.lcf_prayer_requests, values.person.prayer_requests)
    const likeToKnowAbout = createCustomField(field_id.lcf_like_to_know_about, values.person.like_to_know_about)

    //set up for URLS, they cant be consts
    let addressURL = ''
    let emailURL = ''
    let phoneNumberURL = ''
    let fieldDataURL = '' 

    // sending the data and getting the other urls
    await postData(`${process.env.PC_URL}/people/v2/people`, person)
        .then(result => {
            addressURL = result.data.data.links.addresses
            emailURL = result.data.data.links.emails
            phoneNumberURL =  result.data.data.links.phone_numbers
            fieldDataURL = result.data.data.links.field_data
            return result
        })
    
    Promise.all([
        postData(addressURL, address),
        postData(emailURL, email),
        postData(phoneNumberURL, cell),
        postData(fieldDataURL, howYouHeard),
        postData(fieldDataURL, todaysDate),
        postData(fieldDataURL, prayer_requests),
        postData(fieldDataURL, likeToKnowAbout)
    ])

    res.send({'created': true})
}