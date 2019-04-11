import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActuatorService {

  constructor(private httpClient: HttpClient) {}

  getTotalApiRequests(): Observable<any> {
    return this.httpClient.get('/actuator/metrics/http.server.requests');
  }

  getMemoryUsed(): Observable<any> {
    return this.httpClient.get('/actuator/metrics/jvm.memory.used');
  }

  getTotalMemory(): Observable<any> {
    return this.httpClient.get('/actuator/metrics/jvm.memory.max')
  }

  getUptime(): Observable<any> {
    return this.httpClient.get('/actuator/metrics/process.uptime')
  }
}
