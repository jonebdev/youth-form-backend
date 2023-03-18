const field_id = require('../util/custom_fields')
const {
    postData,
    createAddress,
    createCell,
    createCustomField,
    createEmail,
    createPerson,
} = require('../util/http_helper')

module.exports = async (req, res) => {
    const values = req.body
    const person = createPerson(
        values.person.first_name,
        values.person.last_name,
        values.person.birthday,
        values.person.grade
    )
    const address = createAddress(
        values.person.city,
        values.person.state,
        values.person.street,
        values.person.zip
    )
    const parent_name = createCustomField(
        field_id.parent_name,
        values.person.parent_name
    )
    const email = createEmail(values.person.email)
    const cell = createCell(values.person.cell)
    const school = createCustomField(
        field_id.children_school,
        values.person.children_school
    )
    const health = createCustomField(
        field_id.children_health,
        values.person.children_health
    )
    const howYouHeard = createCustomField(
        field_id.children_how_you_heard,
        values.person.children_how_you_heard
    )

    // set up for URLS, they cant be consts
    let addressURL = ''
    let emailURL = ''
    let phoneNumberURL = ''
    let fieldDataURL = ''

    // sending the data and getting the other urls
    await postData(`${process.env.PC_URL}/people/v2/people`, person).then(
        result => {
            addressURL = result.data.data.links.addresses
            emailURL = result.data.data.links.emails
            phoneNumberURL = result.data.data.links.phone_numbers
            fieldDataURL = result.data.data.links.field_data
            return result
        }
    )

    Promise.all([
        postData(addressURL, address),
        postData(emailURL, email),
        postData(phoneNumberURL, cell),
        postData(fieldDataURL, school),
        postData(fieldDataURL, parent_name),
        postData(fieldDataURL, health),
        postData(fieldDataURL, howYouHeard),
    ])

    res.status(201).send({ created: true })
}
