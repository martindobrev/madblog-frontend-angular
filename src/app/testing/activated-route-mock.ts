import {Observable, of} from 'rxjs';
import {Type} from '@angular/core';
import {ActivatedRoute,Route,ActivatedRouteSnapshot,UrlSegment,Params,Data, ParamMap } from '@angular/router';

export class MockActivatedRoute implements ActivatedRoute {
    url: Observable<UrlSegment[]>;
    params: Observable<Params>;
    queryParams: Observable<Params>;
    fragment: Observable<string>;
    data: Observable<Data>;
    outlet: string;
    component: string | Type<any>;
    snapshot: ActivatedRouteSnapshot;
    routeConfig: Route;
    root: ActivatedRoute;
    parent: ActivatedRoute;
    firstChild: ActivatedRoute;
    children: ActivatedRoute[];
    pathFromRoot: ActivatedRoute[];
    paramMap: Observable<ParamMap>;
    queryParamMap: Observable<ParamMap>;

    toString(): string {
        return "";
    };

    constructor(data: Data) {
        this.data = of(data);
    }
}
