import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonButtons, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonLabel, IonItem, IonButton, IonIcon, IonText, ModalController } from '@ionic/angular/standalone';
import { Observable, of } from 'rxjs';
import { Livro } from 'src/types/Livro';
import { CadastroLivroComponent } from 'src/app/components/cadastro-livro/cadastro-livro.component';

@Component({
  selector: 'app-exercicio2',
  templateUrl: './exercicio2.page.html',
  styleUrls: ['./exercicio2.page.scss'],
  standalone: true,
  imports: [IonText, IonIcon, IonButton, IonItem, IonLabel, IonList, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonButtons, IonBackButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, AsyncPipe]
})
export class Exercicio2Page implements OnInit {

  public livros$!: Observable<Livro[]>;
  
  private modalController = inject(ModalController)

  ngOnInit() {
  }

  public async abrirAdicionar(livro?: Livro) {
    const modal = await this.modalController.create({
      component: CadastroLivroComponent,
      breakpoints: [0.5, 0.75, 0.95],
      initialBreakpoint: 0.75,
      componentProps: {
        livro: livro
      }
    })

    modal.present()
  }
}
