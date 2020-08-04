import React from "react";
import idols from "./jsonFiles/filter.js";
import azureApi from "./apis/azureApi";
import { traverseIdols, downloadJson } from "./fetchIdols.js";

class Home extends React.Component {
    state = {
        idolsInfo: []
    };
    async componentDidMount() {
        // let data = await traverseIdols();
        // this.setState({idolsInfo: data});
        this.setState({ idolsInfo: idols })
    }

    renderIdolsInfo() {
        return this.state.idolsInfo.map((idolInfo, userIdx) => {
            return (
                <React.Fragment key={idolInfo.name}>
                    <div className="columns" >
                        <div className="column">
                            <h1 className="title is-2">{idolInfo.name}</h1>
                        </div>
                    </div>
                    <div className="columns is-multiline">
                        {this.renderImages(idolInfo.images, userIdx)}
                    </div>
                </React.Fragment>
            )
        })
    }

    deleteImage = (userIdx, imageIdx) => {
        const newState = [...this.state.idolsInfo];
        const profile = newState[userIdx];
        console.log("Before", profile.images);
        profile.images.splice(imageIdx, 1);
        console.log("After", profile.images);
        this.setState({ idolsInfo: newState })
    }


    renderImages(images, userIdx) {
        return images.map((image, imageIdx) => (
            <div className="column is-one-quarter" key={image}>
                <figure className="image is-256x256">
                    <img src={image} alt={image} />
                    <div className=" has-text-centered mt-2"> 
                    <button className="button is-danger is-small" onClick={() => { this.deleteImage(userIdx, imageIdx) }}>Delete {imageIdx}</button>
                    </div>
                </figure>
            </div>
        ))
    }

    trainModel = async () => {
        const groupId = "vav-idols";
        const { idolsInfo } = this.state;
        for (let idolInfo of idolsInfo) {
            const res = await azureApi.post(`persongroups/${groupId}/persons`, { "name": idolInfo.name, "userData": idolInfo.id });
            if (res.status === 200) {
                console.log(`======== Create profile for ${idolInfo.name} successfully. ========`);
                for (let i = 0; i < idolInfo.images.length; i++) {
                    await this.insertImage(res.data.personId, idolInfo.images[i], groupId, i)
                    this.sleep(4 * 1000);
                }
            }
        }
        // const res = await azureApi.post(`persongroups/${groupId}/persons`, { "name": idolsInfo[0].name, "userData": idolsInfo[0].id });
        // this.insertImage(res.data.personId, idolsInfo[0].images[0], groupId)
        // console.log(res);

    }

    insertImage = async (userId, imageUrl, groupId, imgIdx) => {
        try {
            const res = await azureApi.post(`persongroups/${groupId}/persons/${userId}/persistedFaces`, { url: imageUrl });
            console.log(res);
        } catch (error) {
            console.log(`***************** ${imgIdx} *****************`);
            console.error(error);
        }
    }

    sleep = (time) => {
        console.log('Begin Sleep');
        var stop = new Date().getTime();
        while (new Date().getTime() < stop + time) {
            ;
        }
        console.log('End Sleep');
    }

    render() {
        return (
            <section className="section mt-6">
                <div className="container">
                    <button onClick={() => this.trainModel()} className="button is-small is-info is-outlined mr-3">Train Models</button>
                    <a
                        href={`data: text/json;charset=utf-8, ${encodeURIComponent(JSON.stringify(this.state.idolsInfo))}`}
                        className="button is-small is-success is-outlined"
                        download="data.json">Download</a>
                    {this.renderIdolsInfo()};
                </div>
            </section>
        );
    }
}

export default Home;