export class AppConfig {
    // URL constants
    public static readonly API_GATEWAY_URL = 'http://localhost:8083';
    public static readonly EMP_CONTEXT_PATH = '/employee-svc/api/v1';
    public static readonly DEPT_CONTEXT_PATH = '/dept-svc/api/v1'

    // Validation constants - employee
    public static readonly EMP_EMAIL_REGEX = '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}';
    public static readonly EMP_IMAGE_REGEX = '(http|https)+://[a-z0-9A-Z._%+-/]+\.(jpg|png)';
    public static readonly EMP_MOBILE_REGEX = '^[0-9]{10}$';
    // Validation constants - department
    public static readonly DEPT_LOGO_REGEX = '(http|https)+://[a-z0-9A-Z._%+-/]+\.(jpg|png)';

    // background colors for department cards
    public static readonly DEPT_BGCOLOR_LIST: {[key: number]: string} = {
        1: 'bg-primary',
        2: 'bg-danger' ,
        3: 'bg-warning',
        4: 'bg-info',
        5: 'bg-secondary',
        6: 'bg-success'
    };

    // error messages based on error code
    public static readonly EMS_ERROR: {[key: string]: string} = {
        // HTTP error codes
        "503": "The server is temporarily unable to service your request may be due to one or more services currently down, or due to maintenance downtime or capacity problems. Please try again later.",
        "404": "Oh no! We couldn't find the content you requested.",
        "500": "The page cannot be displayed because an internal server error has occurred. Please try again later.",
        // department-svc error codes
        "DEP-SVC-003": "You are currently seeing this error because you were trying to access a department with an ID that does not exist in our database.",
        "DEP-SVC-001": "You are currently seeing this error page because currently there are no departments existing in our database. Please try adding some departments.",
        // employee-svc error codes
        "EMP-SVC-001": "You are currently seeing this error page because currently there are no employees existing in our database. Please try adding some employees.",
        "EMP-SVC-003": "You are currently seeing this error because you were trying to access an employee with an ID that does not exist in our database.",
        "EMP-SVC-004": "There was en unexpected error encountered as during deleting the given employee, we were unable to persist it's employee ID in our database for future reusability.",
        "EMP-SVC-005": "You are currently seeing this error page because somehow you were trying to assign/access a non-existing department for an employee.",
        "EMP-SVC-006": "There was an unexpected error encountered as during assigning a reused employee ID we were unable to delete it from the DB in order to prevent it from getting reused again."
    }
}