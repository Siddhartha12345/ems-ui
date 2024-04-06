import { Router } from "@angular/router";

export class EmployeeUtil {

    // for reloading the current url - /employee
    static reloadCurrentRoute(router: Router) {
        console.log('Inside reloadCurrentRoute() util method...');
        let currentUrl = router.url;
        router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            router.navigate([currentUrl]);
        });
    }
}