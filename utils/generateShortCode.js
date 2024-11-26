// function to create shortId . By default the length is set to 6 if not provided explicitly.

function generateShortCode(length = 6){
    
    let shortCode = '' ;
    const uniqueCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789' ;

    for(let i=0 ; i<length ; i++){
        shortCode += uniqueCharacters.charAt(Math.floor(Math.random() * uniqueCharacters.length));
    }

    return shortCode ;

}

export default generateShortCode