const { getDataFromDB, getParticularclient, deleteClient, insertOneClient, updateClient } = require('./MongoDB')
const express = require('express')
const axios = require('axios')
const cors = require('cors')
const app = express()
const qs = require('qs')
const { GoogleGenerativeAI } = require('@google/generative-ai')
require('dotenv').config()

app.use(express.json()) // Parse incoming JSON
app.use(cors())

// lead module
app.use('/mongoDB/leads', (req, res) => { // fetch all lead
    try {
        getDataFromDB('leads').then((value) => {
            res.json(value)
        })
    } catch (error) {
        res.status(error.response ? error.response.status : 500).json({
            message: error.message,
            error: error.response ? error.response.data : null
        });
    }
})

app.use('/mongoDB/insertLead', async (req, res) => { // insert one lead
    const { indertingData } = req.body
    try {
        insertOneClient('leads', Array.isArray(indertingData) ? indertingData : [indertingData]).then((value) => {
            res.json(value)
        })
    } catch (error) {
        res.status(error.response ? error.response.status : 500).json({
            message: error.message,
            error: error.response ? error.response.data : null
        });
    }
})

app.use('/leads/find', async (req, res) => { // finding particular lead 
    let { client_ID } = req.query
    try {
        getParticularclient('leads', `${client_ID}`).then((value) => {
            res.json(value)
        })
    } catch (error) {
        res.status(error.response ? error.response.status : 500).json({
            message: error.message,
            error: error.response ? error.response.data : null
        });
    }
})

app.use('/leads/delete', async (req, res) => { // delete particualar lead delete
    let { id } = req.body
    try {
        deleteClient('leads', `${id}`).then((value) => {
            res.json(value)
        })
    } catch (error) {
        res.status(error.response ? error.response.status : 500).json({
            message: error.message,
            error: error.response ? error.response.data : null
        });
    }
})

// contact module
app.use('/mongoDB/contacts', async (req, res) => { // fetch all contact
    try {
        getDataFromDB('contacts').then((value) => {
            res.json(value)
        })
    } catch (error) {
        res.status(error.response ? error.response.status : 500).json({
            message: error.message,
            error: error.response ? error.response.data : null
        });
    }
})

app.use('/mongoDB/insertContact', async (req, res) => { // insert one contact
    const { indertingData } = req.body
    try {
        insertOneClient('contacts', Array.isArray(indertingData) ? indertingData : [indertingData]).then((value) => {
            res.json(value)
        })
    } catch (error) {
        res.status(error.response ? error.response.status : 500).json({
            message: error.message,
            error: error.response ? error.response.data : null
        });
    }
})

app.use('/contacts/find', async (req, res) => { // finding particular contact
    let { client_ID } = req.query
    try {
        getParticularclient('contacts', `${client_ID}`).then((value) => {
            res.json(value)
        })
    } catch (error) {
        res.status(error.response ? error.response.status : 500).json({
            message: error.message,
            error: error.response ? error.response.data : null
        });
    }
})

app.use('/contact/delete', async (req, res) => { // delete particualar contact delete
    let { id } = req.body
    try {
        deleteClient('contacts', `${id}`).then((value) => {
            res.json(value)
        })
    } catch (error) {
        res.status(error.response ? error.response.status : 500).json({
            message: error.message,
            error: error.response ? error.response.data : null
        });
    }
})

// update the client
app.use('/mongoDB/updateClient', async (req, res) => { // update the particular client
    let { id, updatedContent, collectionName } = req.body
    try {
        updateClient(`${collectionName}`, `${id}`, updatedContent).then((value) => {
            res.json(value)
        })
    } catch (error) {
        res.status(error.response ? error.response.status : 500).json({
            message: error.message,
            error: error.response ? error.response.data : null
        });
    }
})

// account module
app.use('/mongoDB/accounts', async (req, res) => { // get all account data
    try {
        getDataFromDB('accounts').then((value) => {
            res.json(value)
        })
    } catch (error) {
        res.status(error.response ? error.response.status : 500).json({
            message: error.message,
            error: error.response ? error.response.data : null
        });
    }
})

app.use('/mongoDB/insertAccount', async (req, res) => { // insert one account data
    const { accountData } = req.body
    try {
        insertOneClient('accounts', Array.isArray(accountData) ? accountData : [accountData]).then((value) => {
            res.json(value)
        })
    } catch (error) {
        res.status(error.response ? error.response.status : 500).json({
            message: error.message,
            error: error.response ? error.response.data : null
        });
    }
})

app.use('/account/find', async (req, res) => { // finding particular account
    let { client_ID } = req.query
    try {
        getParticularclient('accounts', `${client_ID}`).then((value) => {
            res.json(value)
        })
    } catch (error) {
        res.status(error.response ? error.response.status : 500).json({
            message: error.message,
            error: error.response ? error.response.data : null
        });
    }
})

app.use('/account/delete', async (req, res) => { // delete particualar contact delete
    let { id } = req.body
    try {
        deleteClient('accounts', `${id}`).then((value) => {
            res.json(value)
        })
    } catch (error) {
        res.status(error.response ? error.response.status : 500).json({
            message: error.message,
            error: error.response ? error.response.data : null
        });
    }
})

// deal module
app.use('/mongoDB/deal', async (req, res) => { // get all deal data
    try {
        getDataFromDB('deals').then((value) => {
            res.json(value)
        })
    } catch (error) {
        res.status(error.response ? error.response.status : 500).json({
            message: error.message,
            error: error.response ? error.response.data : null
        });
    }
})

app.use('/mongoDB/insertDeal', async (req, res) => { // insert one deal
    const { indertingData } = req.body
    try {
        insertOneClient('contacts', Array.isArray(indertingData) ? indertingData : [indertingData]).then((value) => {
            res.json(value)
        })
    } catch (error) {
        res.status(error.response ? error.response.status : 500).json({
            message: error.message,
            error: error.response ? error.response.data : null
        });
    }
})

// call Logs
app.use('/client/calllogs', async (req, res) => { // adding call Logs    
    let { callLogData } = req.body
    try {
        insertOneClient('callLogs', Array.isArray(callLogData) ? callLogData : [callLogData]).then((value) => {
            res.json(value)
        })
    } catch (error) {
        res.status(error.response ? error.response.status : 500).json({
            message: error.message,
            error: error.response ? error.response.data : null
        });
    }
})

app.use('/calllogs/find', async (req, res) => { // findind the particular call Logs    
    let { client_id } = req.query
    try {
        getParticularclient('callLogs', `${client_id}`).then((value) => {
            res.json(value)
        })
    } catch (error) {
        res.status(error.response ? error.response.status : 500).json({
            message: error.message,
            error: error.response ? error.response.data : null
        });
    }
})

// mail Logs
app.use('/client/maillogs', async (req, res) => { // adding mail Logs  
    let { mailLogData } = req.body
    try {
        insertOneClient('mailLog', Array.isArray(mailLogData) ? mailLogData : [mailLogData]).then((value) => {
            res.json(value)
        })
    } catch (error) {
        res.status(error.response ? error.response.status : 500).json({
            message: error.message,
            error: error.response ? error.response.data : null
        });
    }
})

app.use('/emailLogs/find', async (req, res) => { // findind the particular mail Logs    
    let { client_id } = req.query
    try {
        getParticularclient('mailLog', `${client_id}`).then((value) => {
            res.json(value)
        })
    } catch (error) {
        res.status(error.response ? error.response.status : 500).json({
            message: error.message,
            error: error.response ? error.response.data : null
        });
    }
})

// this post for create a meeting
app.post('/api/create', async (req, res) => {
    const session = req.body // this is session credencial
    const { extras } = req.query  // this is for get the extra information like zsoid and access token
    try {
        const response = await fetch(
            `https://meeting.zoho.com/api/v2/${extras.zsoid}/sessions.json`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Zoho-oauthtoken ${extras.access_token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(session),
            }
        );

        if (!response.ok) {
            throw new Error(`Failed to create meeting: ${response.statusText}`);
        }

        const data = await response.json();
        res.json(data)
    } catch (error) {
        res.status(500).json({ message: "Failed to create meeting", error: error.message });
    }
}
)

// this is for deleting the meeting
app.post('/api/meeting/delete', async (req, res) => {
    const { session } = await req.body
    try {
        let URL = `https://meeting.zoho.com/api/v2/${await session.zsoid}/sessions/${await session.meetingKey}.json`

        const deleteMeeting = await fetch(
            URL,
            {
                method: 'DELETE',
                headers: {
                    'Authorization': `Zoho-oauthtoken ${session.accessToken}`,
                    'Content-Type': 'application/json;charset=UTF-8',
                },
                body: JSON.stringify(session),
            }
        )
        const data = await deleteMeeting.json();
        res.json(data)
    } catch (error) {
        res.status(500).json({ message: "Failed to delete meeting", error: error.message });
    }
})

// this is for listing the Current ZOHO meetings
app.post('/api/list', async (req, res) => {
    const { session } = await req.body

    try {
        let URL = `https://meeting.zoho.com/api/v2/${await session.zsoid}/sessions.json`
        const listMeeting = await fetch(
            URL,
            {
                method: 'GET',
                headers: {
                    'Authorization': `Zoho-oauthtoken ${session.access_token}`,
                    'Content-Type': 'application/json;charset=UTF-8',
                },
            }
        )
        const data = await listMeeting.json();
        res.json(data)
    } catch (error) {
        res.status(500).json({ message: "Failed to list meeting", error: error.message });
    }
})

// this is for editing the meeting
app.post('/api/edit', async (req, res) => {
    const { session } = await req.body
    const { extras } = req.query
    try {
        let URL = `https://meeting.zoho.com/api/v2/${await extras.zsoid}/sessions/${await extras.meetingKey}.json`
        const editMeeting = await fetch(
            URL,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Zoho-oauthtoken ${await extras.access_token}`,
                },
                body: JSON.stringify({ session }),
            }
        )
        const data = await editMeeting.json();
        res.json(data)
    } catch (error) {
        res.status(500).json({ message: "Failed to list meeting", error: error.message });
    }
})


// below code is mail intergration
app.post('/api/mailAccountToken', async (req, res) => {  //  this code for get the user (accounter) detail
    const accessTokenParams = {
        code: req.body.code,
        client_id: req.body.client_id,
        client_secret: req.body.client_secret,
        redirect_uri: req.body.redirect_uri,
        grant_type: req.body.grant_type,
        location: req.body.location
    }

    try {
        const getZOHOmailAccessToken = await axios.post(`https://accounts.zoho.${accessTokenParams?.location}/oauth/v2/token`,
            accessTokenParams,// zoho must want the params in url encoded type.so that's why we send it in qs (qs is a liabrary)
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        )

        // Getting account detail
        const fecthingZOHOmailAccountDetails = await axios.get(`https://mail.zoho.${accessTokenParams?.location}/api/accounts`, // extra post request for get the user account deatil
            {
                headers: {
                    'Authorization': `Zoho-oauthtoken ${await getZOHOmailAccessToken?.data?.access_token}`
                }
            })

        const getTokensAndFetchedAccountDetail = {
            getZOHOmailAccessToken: getZOHOmailAccessToken?.data, // this sending for check the scope and do validation in client (not necessary but sending for checking purpose)
            fecthingZOHOmailAccountDetails: fecthingZOHOmailAccountDetails?.data?.data // ZOHO mail account detail
        }

        // Getting ZOHO Mail Folder detail
        const getFolderDetail = await axios.get(`https://mail.zoho.${accessTokenParams?.location}/api/accounts/${getTokensAndFetchedAccountDetail?.fecthingZOHOmailAccountDetails[0]?.accountId}/folders`, // extra post request for get the user account deatil
            {
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Zoho-oauthtoken ${await getZOHOmailAccessToken?.data?.access_token}`
                }
            })

        const getTokensAndFolderDetail = {
            getZOHOfolderAccessToken: getZOHOmailAccessToken?.data, // this sending for check the scope and do validation in client (not necessary but sending for checking purpose)
            getZOHOfolderDetails: getFolderDetail?.data?.data // ZOHO Mail folder details
        }
        // ZOHO_Meeting User Detail for getting org ID
        const ZOHO_MeetingUserDetail = await axios.get(`https://meeting.zoho.${accessTokenParams?.location}/api/v2/user.json`, // extra post request for get the user account deatil
            {
                headers: {
                    'Authorization': `Zoho-oauthtoken ${getZOHOmailAccessToken?.data?.access_token}`
                }
            })

        const meetingUserDetail = {
            getZOHOMeetingUserDetails: ZOHO_MeetingUserDetail?.data?.userDetails, // ZOHO Meeting User details
            getZOHOMeetingAccessToken: getZOHOmailAccessToken?.data // this sending for check the scope and do validation in client (not necessary but sending for checking purpose)
        }

        const allMailResponce = { // combine all things and sending all detail
            getTokensAndFetchedAccountDetail: getTokensAndFetchedAccountDetail,
            getTokensAndFolderDetail: getTokensAndFolderDetail,
            meetingUserDetail: meetingUserDetail
        }
        res.json(allMailResponce)
        return
    } catch (error) {
        res.status(error.response ? error.response.status : 500).json({
            message: error.message,
            error: error.response ? error.response.data : null
        });
    }
})

//  this code for get the user (Folder ID) detail
app.post('/api/mailFolder', async (req, res) => {
    let ZOHOmailAccountID = req.body.ZOHOmailAccountID
    const accessTokenParams = {
        code: req.body.code,
        client_id: req.body.client_id,
        client_secret: req.body.client_secret,
        redirect_uri: req.body.redirect_uri,
        grant_type: req.body.grant_type,
        location: req.body.location
    }

    try {
        const response = await axios.post(`https://accounts.zoho.${accessTokenParams.location}/oauth/v2/token`,
            qs.stringify(accessTokenParams),// zoho must want the params in url encoded type.so that's why we send it in qs (qs is a liabrary)
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        )
        const getFolderDetail = await axios.get(`https://mail.zoho.${accessTokenParams.location}/api/accounts/${ZOHOmailAccountID}/folders`, // extra post request for get the user account deatil
            {
                headers: {
                    'Authorization': `Zoho-oauthtoken ${await response?.data?.access_token}`
                }
            })

        const getTokensAndFolderDetail = {
            getZOHOfolderAccessToken: response?.data,
            getZOHOfolderDetails: getFolderDetail?.data?.data
        }
        res.json(getTokensAndFolderDetail)
        return
    } catch (error) {
        res.status(error.response ? error.response.status : 500).json({
            message: error.message,
            error: error.response ? error.response.data : null
        });
    }
})

//  this code for get the user (getZOHOmailMessageAccessToken) detail
app.post('/api/ZOHOmailMessageAccessToken', async (req, res) => {
    const accessTokenParams = {
        code: req.body.code,
        client_id: req.body.client_id,
        client_secret: req.body.client_secret,
        redirect_uri: req.body.redirect_uri,
        grant_type: req.body.grant_type
    }
    try {
        const getZOHOmailMessageAccessToken = await axios.post('https://accounts.zoho.com/oauth/v2/token',
            qs.stringify(accessTokenParams),// zoho must want the params in url encoded type.so that's why we send it in qs (qs is a liabrary)
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        )
        res.json(getZOHOmailMessageAccessToken.data)
    } catch (error) {
        res.status(error.response ? error.response.status : 500).json({
            message: error.message,
            error: error.response ? error.response.data : null
        })
    }
})

// this is for listing the Current ZOHO meetings
app.post('/api/mailList', async (req, res) => {
    const { session } = await req.body
    const mailAccessToken = session?.mailAccess_token

    try {
        let URI = `https://mail.zoho.${session.location}/api/accounts/${session.mailAccountID}/messages/view?folderId=${session.mailFolderID}&start=1&limit=200`
        const listMeeting = await fetch(URI,
            {
                method: 'GET',
                headers: {
                    'Authorization': `Zoho-oauthtoken ${mailAccessToken}`,
                },
            }
        )
        const data = await listMeeting.json()
        res.json(data)
    } catch (error) {
        res.status(500).json({ message: "Failed to list meeting", error: error.message });
    }
})

// this is for deleting the ZOHO 
app.post('/api/maildelete', async (req, res) => {
    const { session } = await req.body
    const mailAccessToken = session?.mailAccess_token

    try {
        let URL = `https://mail.zoho.${session.location}/api/accounts/${session?.mailAccountID}/folders/${session?.mailFolderID}/messages/${session?.deletingMailFolder_ID}`
        const deleteMail = await fetch(
            URL,
            {
                method: 'DELETE',
                headers: {
                    'Authorization': `Zoho-oauthtoken ${mailAccessToken}`,
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Accept': 'application/json'
                },
            }
        )
        const data = await deleteMail.json();
        res.json(data)
    } catch (error) {
        res.status(500).json({ message: "Failed to delete meeting", error: error.message });
    }
})

// this post for send the mail
app.post('/api/sendMail', async (req, res) => {
    const session = req.body // this is session credencial
    const { extras } = req.query  // this is for get the extra information like zsoid and access token 
    try {
        const response = await fetch(
            `https://mail.zoho.com/api/accounts/${extras.accountId}/messages`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Zoho-oauthtoken ${extras.access_token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(session.details),
            }
        );

        if (!response.ok) {
            throw new Error(`Failed to create meeting: ${response.statusText}`);
        }

        const data = await response.json();
        res.json(data)
    } catch (error) {
        res.status(500).json({ message: "Failed to send Mail", error: error.message });
    }
})

// this is for showing the individual mail(ZOHO) data  
app.post('/api/mailDataIndividual', async (req, res) => {
    const { session } = await req.body
    const mailAccessToken = session?.mailAccess_token

    try {
        let URLs = [
            `https://mail.zoho.${session.location}/api/accounts/${session?.mailAccountID}/folders/${session?.mailFolderID}/messages/${session?.showZOHOMailMessage}/details`,
            `https://mail.zoho.${session.location}/api/accounts/${session?.mailAccountID}/folders/${session?.mailFolderID}/messages/${session?.showZOHOMailMessage}/content`
        ]

        const responce = await Promise.all(URLs.map(async (url) => {
            const fetching = await fetch(
                url,
                {
                    method: 'GET',
                    headers: {
                        "Accept": `application/json`,
                        "Content-Type": "application/json",
                        "Authorization": `Zoho-oauthtoken ${mailAccessToken}`
                    }
                }
            )
            if (!fetching.ok) {
                throw new Error(`Failed to access individual mail`)
            }
            return fetching.json();
        }))

        const [detail, content] = responce

        res.json({ detail, content })
    } catch (error) {
        console.log(error);
        // res.status(500).json({ message: "Failed to delete meeting", error: error.message });
    }
})

// this post for reply the mail
app.post('/api/mailDataIndividualReply', async (req, res) => {
    const session = req.body // this is session credencial
    const { extras } = req.query  // this is for get the extra information like zsoid and access token 
    try {
        const response = await fetch(
            `https://mail.zoho.${extras?.location}/api/accounts/${extras?.accountId}/messages/${extras?.messageId}`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Zoho-oauthtoken ${extras?.access_token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(session?.details),
            }
        );

        if (!response.ok) {
            throw new Error(`Failed to create meeting: ${response.statusText}`);
        }

        const data = await response.json();
        res.json(data)
    } catch (error) {
        res.status(500).json({ message: "Failed to send Mail", error: error.message });
    }
})

app.post('/api/geminiAiResponce', async (req, res) => {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_TEXTENHANCER_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `Enhance the mood of the statemnt or as per the emoj mood without adding any emoj and not show any option.The statement is "${req.body.feedingValue}"`;
        // const prompt = `trasulate this to telugu and sent the statment only and use google trasulate for transulation.The statement is "${req.body.feedingValue}"`; // vinod reqiurement
        const result = await model.generateContent(prompt);
        return res.json(result.response.text())
    } catch (err) {
        return res.json(err.message)

    }
})

app.post('/api/geminiAiTrasulator', async (req, res) => {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_TEXTENHANCER_KEY)
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
        let valueOfLoop = req?.body?.trasulationCount

        let totalResonce = {};
        const translations = await Promise.all(
            valueOfLoop.map(async (value) => {
                const prompt = `Translate this to ${value} .give the responce in this language only and send the statement only ,without "\n". Use Google Translate for translation. The statement is: "${req.body.feedingValue}"`;
                const result = await model?.generateContent(prompt);
                if (!result) {
                    throw new Error('Model Failed....☹');
                }
                return { [value]: await result.response.text() };
            })
        );
        translations.forEach((translation) => Object.assign(totalResonce, translation));
        return res.json(totalResonce)
    } catch (err) {
        return res.json(err.message)
    }
})

app.use('/api/toneChanger/feedback', async (req, res) => {
    const feedbackValue = req.body
    feedbackValue['id'] = Math.floor(Math.random() * 100000)

    try {
        insertOneClient('toneChangerFeedback', Array.isArray(feedbackValue) ? feedbackValue : [feedbackValue]).then((value) => {
            res.json(value)
        })
    } catch (error) {
        res.status(error.response ? error.response.status : 500).json({
            message: error.message,
            error: error.response ? error.response.data : null
        });
    }
})

// getting the tone changer application feed back - module
app.use('/toneChanger/fecthFeedback', (req, res) => { // fetch all feedback
    try {
        getDataFromDB('toneChangerFeedback').then((value) => {
            res.json(value)
        })
    } catch (error) {
        res.status(error.response ? error.response.status : 500).json({
            message: error.message,
            error: error.response ? error.response.data : null
        });
    }
})


// running the node in 3002 port
const PORT = 3002
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
});