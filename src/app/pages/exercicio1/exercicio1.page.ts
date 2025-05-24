import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonText, IonTitle, IonToolbar, ModalController } from '@ionic/angular/standalone';
import { CadastroAutorComponent } from 'src/app/components/cadastro-autor/cadastro-autor.component';
import { Autor } from 'src/types/Autor';

@Component({
  selector: 'app-exercicio1',
  templateUrl: './exercicio1.page.html',
  styleUrls: ['./exercicio1.page.scss'],
  standalone: true,
  imports: [IonText, IonIcon, IonButton, IonLabel, IonItem, IonList, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonButtons, IonBackButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class Exercicio1Page implements OnInit {

  public autores: Autor[] = []

  private modalController = inject(ModalController);

  ngOnInit() {
  }

  public async abrirAdicionar(autor?: Autor) {
    const modal = await this.modalController.create({
      component: CadastroAutorComponent,
      breakpoints: [0.5, 0.75, 0.95],
      initialBreakpoint: 0.75,
      componentProps: {
        autor: autor
      }
    })

    modal.present()
  }

}
