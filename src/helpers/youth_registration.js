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
    const email = createEmail(values.person.email)
    const cell = createCell(values.person.cell)
    const invitedBy = createCustomField(
        field_id.invited_by,
        values.person.invited_by
    )
    const goToChurch = createCustomField(
        field_id.go_to_church,
        values.person.go_to_church
    )
    const churchIAttend = createCustomField(
        field_id.church_i_attend,
        values.person.church_i_attend
    )
    const hobbies = createCustomField(field_id.hobbies, values.person.hobbies)
    const howYouHeard = createCustomField(
        field_id.how_you_heard,
        values.person.how_you_heard
    )
    const parentsName = createCustomField(
        field_id.parents_name,
        values.person.parents_name
    )
    const parentsEmail = createCustomField(
        field_id.parents_email,
        values.person.parents_email
    )
    const snap = createCustomField(field_id.snap, values.person.snap)
    const instagram = createCustomField(
        field_id.instagram,
        values.person.instagram
    )
    const school = createCustomField(field_id.school, values.person.school)

    const twitter = createCustomField(field_id.twitter, values.person.twitter)
    const tiktok = createCustomField(field_id.tiktok, values.person.tiktok)
    const facebook = createCustomField(
        field_id.facebook,
        values.person.facebook
    )
    const todaysDate = createCustomField(
        field_id.todays_date,
        values.person.todays_date
    )
    const prayer_requests = createCustomField(
        field_id.prayer_requests,
        values.person.prayer_requests
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
        postData(fieldDataURL, invitedBy),
        postData(fieldDataURL, goToChurch),
        postData(fieldDataURL, churchIAttend),
        postData(fieldDataURL, hobbies),
        postData(fieldDataURL, howYouHeard),
        postData(fieldDataURL, parentsName),
        postData(fieldDataURL, parentsEmail),
        postData(fieldDataURL, instagram),
        postData(fieldDataURL, twitter),
        postData(fieldDataURL, tiktok),
        postData(fieldDataURL, snap),
        postData(fieldDataURL, facebook),
        postData(fieldDataURL, todaysDate),
        postData(fieldDataURL, prayer_requests),
    ])

    res.send({ created: true })
}
