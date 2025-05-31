import { Injectable } from '@angular/core';
import { Autor } from 'src/types/Autor';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class AutorService {
  private readonly CACHE_PREFIX = "autores";

  async findAll(): Promise<Autor[]>
  {
    const autores = await Preferences.get({
      key: this.CACHE_PREFIX
    });

    return JSON.parse(autores.value || '[]');
  }

  async createOrUpdate(autor: Autor): Promise<void>
  {
    const autores = await this.findAll();

    if (autor.id)
    {
      const autorI = autores.findIndex(a => a.id === autor.id);
      if (autorI !== -1)
        autores[autorI] = autor;
      else
        throw new Error('Autor não encontrado');
    } else
      autores.push(autor);

    await Preferences.set({
      key: this.CACHE_PREFIX,
      value: JSON.stringify(autores)
    });
  }

  async delete(autor: Autor): Promise<void>
  {
    const autores = await this.findAll();

    const autorI = autores.findIndex(a => a.id === autor.id);
    if (autorI !== -1)
      autores.splice(autorI, 1);
    else
      throw new Error('Autor não encontrado');

    await Preferences.set({
      key: this.CACHE_PREFIX,
      value: JSON.stringify(autores)
    });
  }
}
