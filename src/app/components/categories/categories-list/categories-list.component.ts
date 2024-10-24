import { AfterViewInit, Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { ICategory } from '../../../interfaces';
import { RoleGuardDirective } from '../../directive/role-guard.directive';


@Component({
  selector: 'app-categories-list',
  standalone: true,
  imports: [RoleGuardDirective],
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.scss'
})
export class CategoriesListComponent {
  @Input() title: string  = '';
  @Input() categories: ICategory[] = [];
  @Output() callModalAction: EventEmitter<ICategory> = new EventEmitter<ICategory>();
  @Output() callDeleteAction: EventEmitter<ICategory> = new EventEmitter<ICategory>();
}
