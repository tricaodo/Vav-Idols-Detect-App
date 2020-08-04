import axios from "axios";

export default axios.create({
    baseURL: "https://idols.cognitiveservices.azure.com/face/v1.0/",
    headers: {
        "Ocp-Apim-Subscription-Key": "f4960f7b38f54d0f88adb4992219ab85",
        "Content-Type": "application/json"
    },
})

