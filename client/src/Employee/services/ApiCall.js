import axios from "axios";

export const commonRequest = async (methods, url, header, body) => {
  let config = {
    method: methods,
    url: url,
    data: body,
    headers: header
      ? header
      : {
          "Content-Type": "application/json",
        },
  };

  //   Axios Instance

  return await axios(config)
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};
