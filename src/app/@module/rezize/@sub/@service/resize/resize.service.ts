import {Inject, Injectable} from "@angular/core";
import {ResizeConfig} from "../../@token/common.token";
import {IConfig, ResizeConfigInterface} from "../../../@res/@interface/common.interface";
import {merge, Observable} from "rxjs";
import {distinctUntilChanged, mapTo, shareReplay} from "rxjs/operators";
import {ResizeKeyEnum} from "../../../@res/@enum/common.enum";

@Injectable()
export class ResizeService {
    /**
     * */
    public get change$(): Observable<ResizeKeyEnum> {
        return this.change$_;
    }

    /**
     * */
    private change$_: Observable<ResizeKeyEnum>;

    constructor(
        @Inject(ResizeConfig) private options: ResizeConfigInterface
    ) {
        this.init();
    }

    /**
     * */
    private init ()
    {
        let config: IConfig;
        if (this.options && (config = this.options.config)) {
            this.change$_ = merge(
                this.getMathMedia(
                    ResizeKeyEnum.small,
                    0,
                    config.medium - 1
                ),
                this.getMathMedia(
                    ResizeKeyEnum.medium,
                    config.medium,
                    config.large - 1
                ),
                this.getMathMedia(
                    ResizeKeyEnum.large,
                    config.large
                ),
            ).pipe(
                distinctUntilChanged(),
                shareReplay(1)
            )
        }
    }

    /**
     * */
    private getMathMedia (
        key: ResizeKeyEnum,
        min: number,
        max?: number,
    ): Observable<ResizeKeyEnum> {
        return new Observable(
            (observer) => {
                let query = max
                    ? `(min-width: ${min}px) and (max-width: ${max}px)`
                    : `(min-width: ${min}px)`,
                    mql = window.matchMedia(query),
                    listener = (e) => {
                        if (e.matches) {
                            observer.next(true);
                        }
                    };

                /* initial run */
                listener(mql);

                /* subsctibe to listener*/
                mql.addEventListener(
                    'change',
                    listener
                )

                /* after unsubscribe remove listener */
                return () => {
                    mql.removeEventListener('change', listener)
                }
            }
        ).pipe(
            mapTo(
                key
            )
        )
    }

}