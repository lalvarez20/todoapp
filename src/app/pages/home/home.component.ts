import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Task } from '../../models/task.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  tasks = signal<Task[]>([
    {
      id: Date.now(),
      title:  'Crear proyecto todoApp',
      completed: false
    },
    {
      id: Date.now(),
      title:  'Crear Componentes',
      completed: false
    }
  ]);

  changeHandler(event: Event){
    const input = event.target as HTMLInputElement;
    const taskTitle = input.value;
    this.addTask(taskTitle);
  }

  addTask(taskTitle: string){
    const newtask = {
      id: Date.now(),
      title:  taskTitle,
      completed: false
    };
    this.tasks.update((tasks) => [...tasks, newtask]);
  }

  deleteTask(idx: number){
    this.tasks.update((tasks) => tasks.filter((task, position) => position !== idx));
  }

  updateTask(idx: number){  
    this.tasks.update((tasks) => {
      return tasks.map((task, position) => {
        if(position === idx){
          return {
            ...task,
            completed: !task.completed
          }
        }
        return task;
      })
    })
  }

}
