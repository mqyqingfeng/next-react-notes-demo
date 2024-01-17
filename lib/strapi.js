export async function getAllNotes() {
  const response = await fetch(`http://localhost:1337/api/notes`)
  const data = await response.json();

  const res = {};

  data.data.forEach(({id, attributes: {title, content, slug, updatedAt}}) => {
    res[slug] = JSON.stringify({
      title,
      content,
      updateTime: updatedAt
    })
  })

  return res
}

export async function addNote(data) {
  const response = await fetch(`http://localhost:1337/api/notes`, {
    method: 'POST',
    headers: {
      Authorization: 'bearer 80985bb38cf749e5568e51c637d796c69c7a6b1e820152a1d144369d9b1568b26eae1070a42f06f691febb07a5134b0a5a00e24e69c298b50414f28c3299ead4b05b9f876883020868c5769a726ae5ca02ef31b2a5786efbccfe041b7131e609eb56680a60e38a973dae25d26d1e4ac56e7651d4d1c6a4e1fe7f68999dbb4eed',
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      data: JSON.parse(data)
    })
  })
  const res = await response.json();
  return res.data.attributes.slug
}

export async function updateNote(uuid, data) {
  const {id} = await getNote(uuid);
  const response = await fetch(`http://localhost:1337/api/notes/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: 'bearer 80985bb38cf749e5568e51c637d796c69c7a6b1e820152a1d144369d9b1568b26eae1070a42f06f691febb07a5134b0a5a00e24e69c298b50414f28c3299ead4b05b9f876883020868c5769a726ae5ca02ef31b2a5786efbccfe041b7131e609eb56680a60e38a973dae25d26d1e4ac56e7651d4d1c6a4e1fe7f68999dbb4eed',
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      data: JSON.parse(data)
    })
  })
  const res = await response.json()
}

export async function getNote(uuid) {
  const response = await fetch(`http://localhost:1337/api/notes?filters[slug][$eq]=${uuid}`)
  const data = await response.json();
  return {
    title: data.data[0].attributes.title,
    content: data.data[0].attributes.content,
    updateTime: data.data[0].attributes.updatedAt,
    id: data.data[0].id
  }
}

export async function delNote(uuid) {
  const {id} = await getNote(uuid);
  const response = await fetch(`http://localhost:1337/api/notes/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: 'bearer 80985bb38cf749e5568e51c637d796c69c7a6b1e820152a1d144369d9b1568b26eae1070a42f06f691febb07a5134b0a5a00e24e69c298b50414f28c3299ead4b05b9f876883020868c5769a726ae5ca02ef31b2a5786efbccfe041b7131e609eb56680a60e38a973dae25d26d1e4ac56e7651d4d1c6a4e1fe7f68999dbb4eed',
      "Content-Type": "application/json"
    }
  })
  const res = await response.json()
}
