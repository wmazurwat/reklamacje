import axios from "axios";

const URL = "http://localhost:8000";
export const getVideoInfo = async (url: string) => {
  const info = await axios
    .post(URL + "/yt-info", {
      url,
    })
    .then((resp) => resp.data);
  return info;
};

export const getMp3 = async (url: string) => {
  const x = await fetch(URL + "/yt-new", {
    method: "POST",
    body: JSON.stringify({ url }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.body)
    .then((body) => {
      const reader = body?.getReader();
      return new ReadableStream({
        start(controller) {
          return pump();
          // @ts-ignore
          function pump() {
            return reader?.read().then(({ done, value }) => {
              // When no more data needs to be consumed, close the stream
              if (done) {
                controller.close();
                return;
              }
              // Enqueue the next data chunk into our target stream
              controller.enqueue(value);
              return pump();
            });
          }
        },
      });
    })
    .then((stream) => new Response(stream))
    .then((response) => response.blob())
    .catch((err) => console.error(err));
  return x;
};
