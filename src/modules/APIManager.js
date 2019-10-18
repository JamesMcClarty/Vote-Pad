const remoteURL = "http://localhost:5002"

export default {

  getAllDataExpandAnother(database, altDatabase) {
    return fetch(`${remoteURL}/${database}?_expand=${altDatabase}`).then(e => e.json())
  },
  getOneDataEmbedAnother(database, id, altDatabase) {
    return fetch(`${remoteURL}/${database}/${id}?_embed=${altDatabase}`).then(e => e.json())
  },
  getOneDataExpandAnother(database, id, altDatabase) {
    return fetch(`${remoteURL}/${database}/${id}?_expand=${altDatabase}`).then(e => e.json())
  }
}