const keys = require('../../config/keys');
module.exports = survey => {
    return `
    <html>
        <body>
            <div style = "text-align : center;">
                <h3>i'd like to have your imput</h3>
                <p>Please answer the following questions</p>
                <p>${survey.body}</p>
                <div>
                    <a href ="${keys.redirectDomain}/api/surveys/thanks"= "">Yes</a>
                </div>
                <div>
                    <a href = "${keys.redirectDomain}/api/surveys/thamks">No</a>
                </div>
            </div>
        </body>
    </html> `;
};


//they are back ticks man !!