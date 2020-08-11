import React from "react";
import azureApi from "./apis/azureApi";
import finalData from "./jsonFiles/final";

class DetectIdol extends React.Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.imageRef = React.createRef();
    }

    componentDidMount() {
        this.ctx = this.canvasRef.current.getContext("2d");
    }
    state = {
        term: "",
        idolName: "",
        isValid: false
    }


    handleSubmit = async () => {
        const { term } = this.state
        const detectResponse = await azureApi.post("/detect", { url: term });
        const faceId = detectResponse.data[0].faceId;
        const shape = detectResponse.data[0].faceRectangle;
        const identifyResponse = await azureApi.post("/identify", {
            "personGroupId": "vav-idols",
            "faceIds": [
                faceId
            ],
            "maxNumOfCandidatesReturned": 1,
        });
        const targetInfo = identifyResponse.data[0].candidates[0];
        if (targetInfo) {
            const foundIdolInfo = finalData.filter(individual => individual.personId === targetInfo.personId);
            this.setState({ idolName: foundIdolInfo[0].name })
            this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
            this.ctx.beginPath(); // begin
            this.ctx.drawImage(this.imageRef.current, 0, 0);
            this.ctx.rect(shape.left, shape.top, shape.width, shape.height);
            this.ctx.closePath(); // begin
            this.ctx.strokeStyle = "#FF0000";
            this.ctx.stroke();
        }else{
            this.setState({ idolName: "Cannot identify." })
        }
        // if (foundIdolInfo.length > 0) {

        // }
        // console.log(foundIdolInfo[0].name);
    }

    handleChange = (e) => {
        const value = e.target.value
        this.setState({ term: value });
    }

    render() {
        const { term } = this.setState;
        return (
            <section className="section mt-6" >
                <div className="container mt-5">
                    <div className="field has-addons">
                        <div className="control is-expanded">
                            <input
                                name="url"
                                className="input"
                                type="text"
                                placeholder="Url"
                                autoFocus=""
                                value={term}
                                onChange={(e) => this.handleChange(e)} />
                        </div>

                        <div className="control">
                            <button
                                type="submit"
                                className="input button is-primary"
                                onClick={() => this.handleSubmit()}>Search</button>
                        </div>

                    </div>
                    <div className="columns">
                        {/* <div className="column"> */}


                        <figure className="image is-square" style={{ display: "none" }} >
                            <img ref={this.imageRef} src={this.state.term} alt="idol" />
                        </figure>


                        {/* </div> */}

                        <div className="column">
                            <canvas ref={this.canvasRef} width="600px" height="400px">

                            </canvas>

                        </div>

                        <div className="column">
                            <h1 >{this.state.idolName}</h1>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default DetectIdol;