import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-titles',
  templateUrl: './titles.component.html',
  styleUrls: ['./titles.component.css']
})
export class TitlesComponent implements OnInit {

  formdata: any;
  result: any;
  id = 0;

  constructor(private api: ApiService) {

  }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.id = 0;
    this.api.get("titles").subscribe((result: any) => {
      this.result = result.data;
    });
    this.formdata = new FormGroup({
      name: new FormControl("", Validators.compose([Validators.required]))
    });
  }

  edit(id: any) {
    this.id = id;
    this.api.get("titles/" + id).subscribe((result: any) => {
      this.formdata = new FormGroup({
        name: new FormControl(result.data.name, Validators.compose([Validators.required]))
      })
    })
  }

  delete(id:any){
    if(confirm("Sure to delete?")){
      this.api.delete("titles/" + id).subscribe((result:any)=>{
        this.load();
      });
    }
  }

  submit(data: any) {
    if (this.id == 0) {
      this.api.post("titles", data).subscribe((result: any) => {
        this.load();
      })
    }
    else {
      this.api.put("titles/" + this.id, data).subscribe((result: any) => {
        this.load();
      })
    }
  }
}
