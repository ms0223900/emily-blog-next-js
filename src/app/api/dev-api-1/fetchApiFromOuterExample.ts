export async function fetchApiFromOuterExample() {
    return await fetch("https://www.travel.taipei/open-api/zh-tw/Attractions/All?page=1", {
        headers: {
            accept: "application/json"
        },
    }).then(res => res.json());
}
