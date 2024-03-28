import { Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule],
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
}
