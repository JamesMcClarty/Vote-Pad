const remoteURL = "http://localhost:5002"

export default {

  getAllDataExpandAnother(database, altDatabase) {
    return fetch(`${remoteURL}/${database}?_expand=${altDatabase}`).then(e => e.json())
  },
  getAllDataEmbedAnother(database, id, altDatabase) {
    return fetch(`${remoteURL}/${database}?_embed=${altDatabase}`).then(e => e.json())
  },
  getOneDataEmbedAnother(database, id, altDatabase) {
    return fetch(`${remoteURL}/${database}/${id}?_embed=${altDatabase}`).then(e => e.json())
  },
  getOneDataExpandAnother(database, id, altDatabase) {
    return fetch(`${remoteURL}/${database}/${id}?_expand=${altDatabase}`).then(e => e.json())
  },
  getOne(database, id) {
    return fetch(`${remoteURL}/${database}/${id}`).then(e => e.json())
  },
  getAllByCondition(database, condition ,value) {
    return fetch(`${remoteURL}/${database}?${condition}=${value}`).then(e => e.json())
  },
  getAllByConditionAndExpand(database, condition ,value, altDatabase) {
    return fetch(`${remoteURL}/${database}?${condition}=${value}&_expand=${altDatabase}`).then(e => e.json())
  },
  getAllByConditionAndEmbed(database, condition ,value, altDatabase) {
    return fetch(`${remoteURL}/${database}?${condition}=${value}&_embed=${altDatabase}`).then(e => e.json())
  },
  getOneExpandAndEmbed(database, id, embed, expand) {
    return fetch(`${remoteURL}/${database}/${id}/?_embed=${embed}&_expand=${expand}`).then(e => e.json())
  }
}