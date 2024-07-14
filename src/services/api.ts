const checkResponse = <T>(res: Response): Promise<T> =>
  res.ok ? res.json() : res.json().then((err) => Promise.reject(err));


export const getEvents = async () =>
  fetch(`http://localhost:1337/admin/event/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then((res) => checkResponse(res))
