import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  tasks = signal([
    'Instalar Angula CLI',
    'Crear proyecto todoApp',
    'Crear Componentes',
    'Crear Servicios'
  ]);

  changeHandler(event: Event){
    const input = event.target as HTMLInputElement;
    const newtask = input.value;
    this.tasks.update((tasks) => [...tasks, newtask]);
  }

  deleteTask(idx: number){
    this.tasks.update((tasks) => tasks.filter((task, position) => position !== idx));
  }

}
