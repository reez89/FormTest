import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DataModelInterface} from '../interfaces/data-model.interface';

@Injectable({
  providedIn: 'root'
})
export class DocumentCreationService {

  //Todo: inserirlo nell'env.
  private readonly apiUrl = 'http://localhost:3000';

  constructor(private readonly http: HttpClient) {
  }

  getDocumentTypes(): Observable<DataModelInterface[]> {
    const url = `${this.apiUrl}/document-types`;
    return this.http.get<DataModelInterface[]>(url);
  }

  getDocumentType(id: number): Observable<DataModelInterface> {
    const url = `${this.apiUrl}/document-types/${id}`;
    return this.http.get<DataModelInterface>(url);
  }

  createDocumentType(documentTypeData: DataModelInterface): Observable<DataModelInterface> {
    const url = `${this.apiUrl}/document-types`;
    return this.http.post<any>(url, documentTypeData);
  }

  updateDocumentType(id: number, documentTypeData: DataModelInterface): Observable<DataModelInterface> {
    const url = `${this.apiUrl}/document-types/${id}`;
    return this.http.put<DataModelInterface>(url, documentTypeData);
  }

  //Todo: da modificare per eliminare la row, e non l'intero documento.
  deleteDocumentType(id: number): Observable<any> {
    const url = `${this.apiUrl}/document-types/${id}`;
    return this.http.delete<any>(url);
  }

}
