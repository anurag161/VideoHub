import { NgModule } from '@angular/core';
import { AuthModule } from 'angular-auth-oidc-client';

@NgModule({
    imports: [AuthModule.forRoot({
        config: {
            authority: 'http://localhost:8089',
            redirectUrl: typeof window !== 'undefined' ? window.location.origin : 'http://localhost:4200/',
            clientId: 'bRIK6jW083RQ7Zbk7uGJyOUY5dv73TdD',
            scope: 'openid profile offline_access',
            responseType: 'code',
            silentRenew: true,
            useRefreshToken: true,
            secureRoutes: ['http://localhost:8000'],
            customParamsAuthRequest: {
              audience: 'http://localhost:8089/'
            }
        }
      })],
    exports: [AuthModule],
})
export class AuthConfigModule {}
