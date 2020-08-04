import axios from "axios";

export default axios.create({
    baseURL: "https://searchidols.cognitiveservices.azure.com/bing/v7.0/images",
    headers: { "Ocp-Apim-Subscription-Key": "e47af8b5a8344a46bf67ceaed1146531" }
});
