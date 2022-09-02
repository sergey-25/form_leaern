const KEYS = {
    orders: 'orders',
    orderId: 'orderId',
    departmentId:'departmentId'
}

// export const getDepartmentCollection = () => ([
//     { id: '1', title: 'Одяг' },
//     { id: '2', title: 'Взуття' },
//     { id: '3', title: 'Інше' }
// ])






export function insertEmployee(data) {
    let orders = getAllEmployees();
    data['id'] = generateEmployeeId()
    orders.push(data)
    localStorage.setItem(KEYS.orders, JSON.stringify(orders))
    window.location.reload();
}

export function updateEmployee(data) {
    let orders = getAllEmployees();
    let recordIndex = orders.findIndex(x => x.id === data.id);
    orders[recordIndex] = { ...data }
    localStorage.setItem(KEYS.orders, JSON.stringify(orders));
    window.location.reload();
}

export function deleteEmployee(id) {
    let orders = getAllEmployees();
    orders = orders.filter(x => x.id !== id)
    localStorage.setItem(KEYS.orders, JSON.stringify(orders));
    window.location.reload();
}

export function generateEmployeeId() {
    if (localStorage.getItem(KEYS.orderId) == null)
        localStorage.setItem(KEYS.orderId, '0')
    let id = parseInt(localStorage.getItem(KEYS.orderId))
    localStorage.setItem(KEYS.orderId, (++id).toString())
    return id;
}

export function getAllEmployees() {
    if (localStorage.getItem(KEYS.orders) == null)
        localStorage.setItem(KEYS.orders, JSON.stringify([]))
    //map departmentID to department title
    // let departments = getDepartmentCollection();
    return JSON.parse(localStorage.getItem(KEYS.orders))
}
