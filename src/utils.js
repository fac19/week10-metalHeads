const errIfNot200ish = (res) => {
    if (!res.ok) {
        console.log("Bad HTTP Error Code:", res);
        throw new Error("Bad HTTP error code");
    }
    return res;
};
const decodeJSONOrDie = (res) => {
    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("json")) return res.json();
    console.log("Could not decode JSON", res);
    throw new Error("Could not decode JSON");
};

export {errIfNot200ish, decodeJSONOrDie};
