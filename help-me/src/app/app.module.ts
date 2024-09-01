import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from  '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import{BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SupabaseAuthSettingService } from './supabase-auth-setting.service';
import { IonicStorageModule, Storage } from '@ionic/storage-angular';
import { Drivers } from '@ionic/storage';
import { TokenInterceptor } from './servcies/http-interceptor.service';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { HttpService } from './http.service';
@NgModule({ declarations: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    bootstrap: [AppComponent], imports: [BrowserModule, BrowserAnimationsModule, IonicModule, IonicModule.forRoot({
            platform: {
                /** The default `desktop` function returns false for devices with a touchscreen.
                * This is not always wanted, so this function tests the User Agent instead.
                **/
                'desktop': (win) => {
                    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(win.navigator.userAgent);
                    return !isMobile;
                }
            },
        }),
        IonicStorageModule.forRoot({
            name: '__mydb',
            driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
        }), AppRoutingModule], providers: [HttpService, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, SupabaseAuthSettingService, Storage,
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideAuth(() => getAuth()), provideHttpClient(withInterceptorsFromDi()),] })
// app module
export class AppModule {}
