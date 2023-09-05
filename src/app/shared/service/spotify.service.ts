import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from 'src/environments/environments.secrets';

//Models
import { Musica } from '../models/musica.model';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private client_id: string = environments.client_id_spotify;
  private client_secret: string = environments.client_secret_spotify;

  constructor(
    private http: HttpClient
    ) { }

  public async pegarToken(){
    const body = `grant_type=client_credentials`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(`${this.client_id}:${this.client_secret}`)
    });

    await this.http.post<{access_token: string}>('https://accounts.spotify.com/api/token', body, { headers }).subscribe(
      (res) => {
        localStorage.setItem("tokenSpotify", res.access_token);
      }
    );
  }

  public async listarMusicas(nomeMusica: string): Promise<any>{
    let listaMusica: Musica[] = [];
    try {
      await this.pegarToken();
      let url: string = `https://api.spotify.com/v1/search?q=${nomeMusica}&type=track&offset=1&limit=4`;
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem("tokenSpotify")
      });

      await this.http.get<Musica[]>(url, { headers }).subscribe((response: any) => {
        //console.log(response.tracks);
        for(let i = 0; i <= response.tracks.items.length; i++) {
          let objMusica: Musica = {
            id: i,
            imgCapa: response.tracks.items[i]?.album.images[0].url,
            nomeArtista: response.tracks.items[i]?.artists[0].name,
            nomeMusica: response.tracks.items[i]?.name,
            urlMusica: response.tracks.items[i]?.external_urls.spotify
          };

          if(objMusica.urlMusica) {
            listaMusica.push(objMusica);
          }
        }
      });
    } catch (err){
      console.log("Erro: " + err);
    }

    return listaMusica;
  }
}
