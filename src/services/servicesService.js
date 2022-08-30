const KEYS = {
    services: 'services',
    serviceId: 'serviceId',
    departmentId:'departmentId'
}

export const getDepartmentCollection = () => ([
    { id: '1', title: 'Одяг' },
    { id: '2', title: 'Взуття' },
    { id: '3', title: 'Інше' }
])

export function insertService(data) {
    let services = getAllServices();
    data['id'] = generateServiceId()
    services.push(data)
    localStorage.setItem(KEYS.services, JSON.stringify(services))
}

export function updateService(data) {
    let services = getAllServices();
    let recordIndex = services.findIndex(x => x.id === data.id);
    services[recordIndex] = { ...data }
    localStorage.setItem(KEYS.services, JSON.stringify(services));
}

export function deleteEmployee(id) {
    let services = getAllServices();
    services = services.filter(x => x.id !== id)
    localStorage.setItem(KEYS.services, JSON.stringify(services));
}

export function generateServiceId() {
    if (localStorage.getItem(KEYS.serviceId) == null)
        localStorage.setItem(KEYS.serviceId, '0')
    let id = parseInt(localStorage.getItem(KEYS.serviceId))
    localStorage.setItem(KEYS.serviceId, (++id).toString())
    return id;
}

export function getAllServices() {
    if (localStorage.getItem(KEYS.services) == null)
        localStorage.setItem(KEYS.services, JSON.stringify([]))
    return JSON.parse(localStorage.getItem(KEYS.services))
    //map departmentID to department title
    // let departments = getDepartmentCollection();

    //     .map(x => ({
    //     ...x,
    //     department: departments[x.departmentId -1]//.title
    // }))
}
