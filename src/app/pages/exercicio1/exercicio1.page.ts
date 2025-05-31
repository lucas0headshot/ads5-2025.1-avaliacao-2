import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonText, IonTitle, IonToolbar, ModalController } from '@ionic/angular/standalone';
import { CadastroAutorComponent } from 'src/app/components/cadastro-autor/cadastro-autor.component';
import { AutorService } from 'src/app/services/autor/autor.service';
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

  private service: AutorService = inject(AutorService);

  ngOnInit(): void
  {
    this.carregarTodos();
  }

  private async carregarTodos(): Promise<void>
  {
    this.autores = await this.service.findAll();
  }

  public async abrirAdicionar(autor?: Autor) {
    if (!autor) {
      autor = {
        nome: '',
        sobrenone: '',
        dataNascimento: new Date(),
        email: '',
        nacionalidade: 'brasileiro',
      };
    }

    const modal = await this.modalController.create({
      component: CadastroAutorComponent,
      breakpoints: [0.5, 0.75, 0.95],
      initialBreakpoint: 0.75,
      componentProps: {
        autor: autor,
        criadoOuAtualizado: async () => {
          await this.fecharErecarregar()
        }
      }
    })

    modal.present()

    modal.onDidDismiss().then(() => this.carregarTodos());
  }

  private async fecharErecarregar(): Promise<void>
  {
    await this.carregarTodos();
    this.modalController.dismiss();
  }

  async editar(autor: Autor): Promise<void>
  {
    await this.abrirAdicionar(autor);
  }

  async excluir(autor: Autor): Promise<void>
  {
    if (!confirm(`Você tem certeza que deseja excluir o autor "${autor.nome}"?`)) 
      return;

    await this.service.delete(autor);
    await this.carregarTodos();
  }
}
