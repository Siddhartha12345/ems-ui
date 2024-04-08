export class AppConfig {
    // URL constants
    public static readonly EMP_BASE_URL = 'http://localhost:8083/employee-svc/api/v1';

    // Validation constants
    public static readonly EMP_EMAIL_REGEX = '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}';
    public static readonly EMP_IMAGE_REGEX = '(http|https)+://[a-z0-9A-Z._%+-/]+\.(jpg|png)';
    public static readonly EMP_MOBILE_REGEX = '^[0-9]{10}$';
}