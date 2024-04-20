import { Router } from "@angular/router";

export class EMSUtil {

    // for reloading the current url - eg: /employee, /department, etc
    static reloadCurrentRoute(router: Router) {
        console.log('Inside reloadCurrentRoute() util method...');
        let currentUrl = router.url;
        router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            router.navigate([currentUrl]);
        });
    }
}