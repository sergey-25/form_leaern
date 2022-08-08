const KEYS = {
    requests: 'requests',
    requestId: 'requestId'
}

export const getDepartmentCollection = () => ([
    // { id: '1', title: 'Development' },
    // { id: '2', title: 'Marketing' },
    // { id: '3', title: 'Accounting' },
    // { id: '4', title: 'HR' },
])

export function insertRequest(data) {
    let requests = getAllRequests();
    data['id'] = generateRequestId()
    requests.push(data)
    localStorage.setItem(KEYS.requests, JSON.stringify(requests))
}

export function updateRequest(data) {
    let requests = getAllRequests();
    let recordIndex = requests.findIndex(x => x.id === data.id);
    requests[recordIndex] = { ...data }
    localStorage.setItem(KEYS.requests, JSON.stringify(requests));
}

export function deleteRequest(id) {
    let requests = getAllRequests();
    requests = requests.filter(x => x.id !== id)
    localStorage.setItem(KEYS.requests, JSON.stringify(requests));
}

export function generateRequestId() {
    if (localStorage.getItem(KEYS.requestId) == null)
        localStorage.setItem(KEYS.requestId, '0')
    let id = parseInt(localStorage.getItem(KEYS.requestId))
    localStorage.setItem(KEYS.requestId, (++id).toString())
    return id;
}

export function getAllRequests() {
    if (localStorage.getItem(KEYS.requests) == null)
        localStorage.setItem(KEYS.requests, JSON.stringify([]))
    let requests = JSON.parse(localStorage.getItem(KEYS.requests));
    //map departmentID to department title
    let departments = getDepartmentCollection();
    return requests.map(x => ({
        ...x,
        department: departments[x.departmentId - 1]//.title
    }))
}
