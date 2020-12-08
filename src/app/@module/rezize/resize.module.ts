import {ModuleWithProviders, NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {IConfig, ResizeConfigInterface} from "./@res/@interface/common.interface";
import {ResizeConfig} from "./@sub/@token/common.token";
import {ResizeService} from "./@sub/@service/resize/resize.service";
import { IfViewportSizeDirective } from './@sub/@directive/if-viewport-size/if-viewport-size.directive';

@NgModule(
    {
        imports: [
            CommonModule
        ],
        exports: [
            IfViewportSizeDirective
        ],
        declarations: [IfViewportSizeDirective],
    }
)
export class ResizeModule {
    static forRoot (
        config: IConfig,
        debounce = 25
    ): ModuleWithProviders{
        return {
            ngModule: ResizeModule,
            providers: [
                ResizeService,
                {
                    provide: ResizeConfig,
                    useValue: <ResizeConfigInterface>{
                        config: config,
                        debounce: debounce
                    }
                }
            ]
        }
    }
}