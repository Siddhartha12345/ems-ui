import { Department } from "./department";

export interface BasicDetail {
    employeeId?: string,
    firstName: string,
    lastName: string,
    role: string,
    image: string,
    department?: Department
}