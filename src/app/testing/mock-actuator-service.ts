import { of, Observable } from 'rxjs';

export class MockActuatorService {

    public getTotalApiRequests(): Observable<any> {
        return of({});
    }

}