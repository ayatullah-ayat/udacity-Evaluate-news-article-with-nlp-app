function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    Client.checkForName(formText)

    console.log("::: Form Submitted :::")
    submitToGetApiData({text: formText})
}
const submitToGetApiData = async (data={}) => {
    const resData = await fetch('http://localhost:8080/language', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const json = await resData.json()
    createNewElement(json)
}
function createNewElement(json) {
    const element = `<p><strong>your text:</strong> ${json.text}</p>
                    <p><strong>you have wrote:</strong> ${json.lang} language</p>
                    <p><strong>confidence:</strong> ${json.confidence}</p>`;
    document.getElementById('results').innerHTML = element;
}

export { handleSubmit }
