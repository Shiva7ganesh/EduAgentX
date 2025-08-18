export const whatsApi = async (req, res) => {
    const metaBody = {
        "SmsMessageSid": "SM2fad7943f9c09614a5954e305b8cd9d2",
        "NumMedia": "0",
        "ProfileName": "~Anvesh ✨",
        "MessageType": "text",
        "SmsSid": "SM2fad7943f9c09614a5954e305b8cd9d2",
        "WaId": "916309707203",
        "SmsStatus": "received",
        "Body": "Hello",
        "To": "whatsapp:+14155238886",
        "NumSegments": "1",
        "ReferralNumMedia": "0",
        "MessageSid": "SM2fad7943f9c09614a5954e305b8cd9d2",
        "AccountSid": "AC18d41cbfa2914968472873d4b5026f04",
        "ChannelMetadata": { type: "whatsapp", data: { context: { ProfileName: "~Anvesh ✨", WaId: 916309707203 } } },
        "From": "whatsapp:+916309707203",
        "ApiVersion": "2010-04-01"
    }
    try {
        const response = await fetch('https://cloud.uipath.com/eduautomaters/DefaultTenant/orchestrator_/t/0fb89d4f-c754-477e-b343-f706c3d68dce/whatsapp ', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                "Authorization": `Bearer ${process.env.UI_AUTH_TOKEN}`,
            },
            body : JSON.stringify({...metaBody, ...req.body})
        })

        const result = await response.json();

        return res.json({
            status: 'success',
            data: result,
            message: 'Data sent successfully'
        }).status(200)
    } catch (error) {
        return res.json({
            status: 'error',
            message: error.message
        }).status(400)
    }
}