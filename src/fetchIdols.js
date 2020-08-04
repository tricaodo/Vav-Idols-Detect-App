import React from "react";
import searchApi from "./apis/search.js";
let idolNames = [
    "Ngọc Trinh",
    "Bà Tưng",
    "Hường Hana",
    "Hoàng Thùy Linh",
    "Elly Trần",
    "Thuỷ Top",
    "Tâm Tít",
    "Diệp Lâm Anh",
    "Miu Lê",
    "YaYa Trương Nhi",
    "Khả Ngân",
    "Angela Phương Trinh"
];
let idolsInfo = [];

export const traverseIdols = async () => {
    let id = 0;
    for (let idol of idolNames) {
        const response = await searchApi.get("/search", {
            params: {
                q: idol
            }
        });
        constructIdol(id, idol, response.data);
        id++;
    }
    return idolsInfo;
    // downloadJson(idolsInfo);
}

const constructIdol = (id, name, data) => {
    let imageUrls = [];
    for (let item of data.value) {
        const thumbnailUrl = item.thumbnailUrl;
        imageUrls.push(thumbnailUrl);
    }
    idolsInfo.push({ id, name, images: imageUrls });
}

export function downloadJson(jsonObject) {
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(jsonObject));
    return (
        <a href={dataStr} download="idols.json">Download</a>
    )
    // var dlAnchorElem = document.createElement('a');
    // dlAnchorElem.setAttribute("href", dataStr);
    // dlAnchorElem.setAttribute("download", "idols.json");
    // dlAnchorElem.click();
};