import axios from "axios"

const URL = 'http://localhost:8000'

export const getVideogInfo = async (url: string) => {
    console.log(url)
//     const info = await fetch(URL+'/yt-info', {
//     method: 'POST',
//     mode: 'no-cors',
//      headers: {
//                  "Content-Type": "application/json"
//             },
//     body: JSON.stringify({ url })

// })
const info = await axios.post(URL+'/yt-info', {
  url
})
return info
}