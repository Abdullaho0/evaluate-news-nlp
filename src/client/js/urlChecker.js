// Function to validate a URL
function isValidURL(inputText) {
    const urlPattern = new RegExp(
        '^(https?:\\/\\/)?' + // protocol
        '((([a-zA-Z0-9$-_@.&+!*\'(),]|[a-zA-Z0-9-]+)+)(:[0-9]+)?(@)?)' + // username:password@
        '((\\[[0-9a-fA-F:.]+\\])|(([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,}))' + // hostname or IPv6
        '(\\:[0-9]{1,5})?' + // port
        '(\\/[a-zA-Z0-9$-_@.&+!*\'(),~]+)*' + // path
        '(\\?[a-zA-Z0-9$-_@.&+!*\'(),~=%]*)?' + // query string
        '(#[a-zA-Z0-9-_]*)?$', // fragment
        'i'
    );

    return urlPattern.test(inputText);
}

export { isValidURL };
