import { Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {
  welcome = 'Hola esta es una aplicación Angular!';

  tasks = signal([
    'Instalar Angula CLI',
    'Crear proyecto todoApp',
    'Crear Componentes',
    'Crear Servicios'
  ]);

  name = 'Luis';
  age = 44;
  ejemplo = 'Esto es un texto';
  disableBtn = true;
  imgUrl = 'https://www.w3schools.com/howto/img_avatar.png';

  persona = signal({
    name : 'Luis',
    age : 44,
    img : 'https://www.w3schools.com/howto/img_avatar.png'
  })

  nameSinal = signal('Luis A');

  clickHandler(){
    alert('Hiciste clic!');
  }

  inputHandler(evento: Event){
    console.log(evento)
  }

  inputChangeHandler(evento: Event){
    const input = evento.target as HTMLInputElement;
    this.nameSinal.set(input.value);
  }

  keydownHandler(evento: KeyboardEvent){
    const input = evento.target as HTMLInputElement;
    console.log(input.value)
  }

  ageHandler(evento: Event){
    const input = evento.target as HTMLInputElement;
    const newAge = input.value;
    this.persona.update( prevState => {
      return {
        ...prevState,
        age: parseInt(newAge, 10)
      }
    })
  }

  nameHandler(evento: Event){
    const input = evento.target as HTMLInputElement;
    const newName = input.value;
    this.persona.update( prevState => {
      return {
        ...prevState,
        name: newName
      }
    })
  }

  colorCtrl = new FormControl();
  widthCtrl = new FormControl(50, {
    nonNullable: true,
  });

  nameCtrl = new FormControl('Hola', {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.minLength(3),
    ]
  });
  
  constructor(){
    this.colorCtrl.valueChanges.subscribe(value =>{
      console.log(value);
    })
  }

}
