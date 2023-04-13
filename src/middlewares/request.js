const Request = (methodWaited, req) => methodWaited?.toLowerCase() === req?.method?.toLowerCase()

export default Request