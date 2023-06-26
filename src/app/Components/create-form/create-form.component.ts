import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {DataModelInterface} from '../../interfaces/data-model.interface';
import {DocumentCreationService} from '../../services/document-creation.service';
import {map, Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css']
})
export class CreateFormComponent implements OnInit {

  documentForm!: FormGroup;
  documentType$!: Observable<DataModelInterface>;
  id!: number;
  inputTypes : Array<string> = ['string','numeric','date']

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private documentCreationService: DocumentCreationService,
    private route: ActivatedRoute
  ) {
    this.showEmptyForm();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.hasOwnProperty('id')) {
        this.id = +params['id'];
        this.loadFormFromDatabase(this.id);
      } else {
        this.showEmptyForm();
      }
    });
  }

  loadFormFromDatabase(id: number) {
    this.documentType$ = this.documentCreationService.getDocumentType(id).pipe(
      map((data: DataModelInterface) => {
        if (data && data.fields) {
          this.documentForm.patchValue({
            title: data.title
          });
          const fieldsControl = this.documentForm.get('fields');
          if (fieldsControl instanceof FormArray) {
            fieldsControl.clear();
            const fields = data.fields.map((campo) =>
              new FormGroup({
                name: new FormControl(campo.name),
                type: new FormControl(campo.type),
                required: new FormControl(campo.required)
              })
            );
            fields.forEach((field) => {
              fieldsControl.push(field);
            });
          } else {
            const fields = data.fields.map((campo) =>
              new FormGroup({
                name: new FormControl(campo.name),
                type: new FormControl(campo.type),
                required: new FormControl(campo.required)
              })
            );
            this.documentForm.addControl('fields', fields);
          }
        }
        return data;
      })
    );
  }

  showEmptyForm() {
    this.documentForm = this.formBuilder.group({
      title: ['', Validators.required],
      fields: new FormArray([])
    });
  }

  addField() {
    //Todo
  }

  onSubmit() {
    //Todo
  }

  deleteRow(id: number) {
    //Todo
  }

}
