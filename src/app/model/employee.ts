import { Department } from "./department";

export interface Employee {
    employeeId?: string,
    firstName: string,
    lastName: string,
    role: string,
    designation: string,
    gender: string,
    salary: number,
    address: string,
    emailId: string,
    image: string,
    mobileNo: string,
    maritalStatus: string,
    employeeInfo: string,
    department?: Department
}