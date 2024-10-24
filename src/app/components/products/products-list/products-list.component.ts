import { AfterViewInit, Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { IProduct } from '../../../interfaces';
import { AdminRoleGuard } from '../../../guards/admin-role.guard';
import { RoleGuardDirective } from '../../directive/role-guard.directive';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [RoleGuardDirective],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export class ProductsListComponent {
  @Input() title: string  = '';
  @Input() products: IProduct[] = [];
  @Input() areActionsAvailable: boolean = false;
  @Output() callModalAction: EventEmitter<IProduct> = new EventEmitter<IProduct>();
  @Output() callDeleteAction: EventEmitter<IProduct> = new EventEmitter<IProduct>();
}
