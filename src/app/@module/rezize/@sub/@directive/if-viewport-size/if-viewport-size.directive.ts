import {Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {ResizeKeyEnum} from "../../../@res/@enum/common.enum";
import {ResizeService} from "../../@service/resize/resize.service";
import {Subscription} from "rxjs";

@Directive({
  selector: '[ifViewportSize]'
})
export class IfViewportSizeDirective implements OnDestroy, OnInit{

  @Input() ifViewportSize!: ResizeKeyEnum;

  /**
   * */
  private subscription: Subscription;



  constructor(
      private resizeService: ResizeService,
      private temlateRef: TemplateRef<any>,
      private viewContainerRef: ViewContainerRef,
  ) { }

  ngOnInit(): void {
    this.subscription = this.resizeService.change$.subscribe(
        (key) => {
          this.update(key);

        }
    )
  }

  ngOnDestroy(): void {
   if ( this.subscription) {
     this.subscription.unsubscribe();
   }
  }

  private update (
      currentSize: ResizeKeyEnum
  )
  {
    if (currentSize === this.ifViewportSize) {
      this.viewContainerRef.createEmbeddedView(
          this.temlateRef
      );
    } else {
      this.viewContainerRef.clear();
    }
  }

}
