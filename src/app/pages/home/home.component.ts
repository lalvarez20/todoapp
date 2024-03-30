import { Component, computed, effect, inject, Injector, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { Task } from '../../models/task.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  tasks = signal<Task[]>([]);

  injector = inject(Injector)

  ngOnInit(){
    const storage = localStorage.getItem('tasks');
    if(storage){
      const tasks = JSON.parse(storage);
      this.tasks.set(tasks);
    }
    this.trackTask();
  }

  trackTask() {
    effect(() => {
      const tasks = this.tasks();
      console.log(tasks);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }, {injector: this.injector});
  }

  //type FilterBy = "all" | "pending" | "completed";
  filter = signal<'all' | 'pending' | 'completed'>('all');

  //Estados computados
  tasksByFilter = computed(() => {
    const filter = this.filter();
    const tasks = this.tasks();
    if(filter === 'pending'){
      return tasks.filter(task => !task.completed);
    }
    if(filter === 'completed'){
      return tasks.filter(task => task.completed);
    }
    return tasks;
  })

  newTaskCtrl = new FormControl('',{
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/),
    ]
  });

  changeHandler(){
    if(this.newTaskCtrl.valid){
      const taskTitle = this.newTaskCtrl.value.trim();
      if(taskTitle !== ''){
        this.addTask(taskTitle);
        this.newTaskCtrl.setValue('');
      }
    }
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

  updateEditMode(idx: number){
    this.tasks.update((tasks) => {
      return tasks.map((task, position) => {
        if(position === idx){
          return {
            ...task,
            editing: true
          }
        }
        return {
          ...task,
          editing: false
        }
      })
    })
  }

  updateTaskTitle(idx: number, event: Event){
    const input = event.target as HTMLInputElement
    this.tasks.update((tasks) => {
      return tasks.map((task, position) => {
        if(position === idx){
          return {
            ...task,
            editing: false,
            title: input.value
          }
        }
        return task;
      })
    })
  }

  changFilter(filter: 'all' | 'pending' | 'completed'){
    this.filter.set(filter);
  }

}
