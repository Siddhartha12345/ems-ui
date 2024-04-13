export class AppConfig {
    // URL constants
    public static readonly API_GATEWAY_URL = 'http://localhost:8083';
    public static readonly EMP_CONTEXT_PATH = '/employee-svc/api/v1';
    public static readonly DEPT_CONTEXT_PATH = '/dept-svc/api/v1'

    // Validation constants
    public static readonly EMP_EMAIL_REGEX = '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}';
    public static readonly EMP_IMAGE_REGEX = '(http|https)+://[a-z0-9A-Z._%+-/]+\.(jpg|png)';
    public static readonly EMP_MOBILE_REGEX = '^[0-9]{10}$';

    // background colors for department cards
    public static readonly DEPT_BGCOLOR_LIST: {[key: number]: string} = {
        1: 'bg-primary',
        2: 'bg-danger' ,
        3: 'bg-warning',
        4: 'bg-info',
        5: 'bg-secondary',
        6: 'bg-success'
    };
}