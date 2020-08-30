import { OnDestroy, Component } from '@angular/core';
import { Unsubscribable } from 'rxjs';

// TODO: Add Angular decorator.
@Component({
    selector: 'app---',
    template: ''
  })
export abstract class AbstractSubscriptionDestroyer implements OnDestroy {
    
    private subscriptions: Array<Unsubscribable> = [];

    markForUnsubscription(subscription: Unsubscribable) {
        this.subscriptions.push(subscription);
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(s => s.unsubscribe());
    }
}