import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';

import {
  FieldTypes,
  IFieldConfig,
  IDevilTableOptions,
  Topic
} from '@app/models';
import { TopicService } from './topic.service';

@Component({
  selector: 'devil-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss']
})
export class TopicComponent implements OnInit {
  options: IDevilTableOptions<Topic>;
  dataSource: Array<Topic>;

  config: IFieldConfig[];
  topics: Topic[];

  constructor(private topicService: TopicService) {}

  ngOnInit() {
    this.loadData();
  }

  private loadData() {
    this.topicService.getTopics().subscribe(
      (res: Topic[]) => {
        this.topics = res;
        this._configDataTable();
      },
      error => {
        console.log(error);
      }
    );
  }

  private _configDataTable() {
    this.options = {
      title: 'Topics list',
      dataSource: this.topics,
      columns: [
        {
          columnsDef: 'title',
          headerCell: 'Title',
          fieldType: FieldTypes.Textbox,
          fieldValidations: [Validators.required]
        },
        {
          columnsDef: 'description',
          headerCell: 'Description',
          fieldType: FieldTypes.Textbox,
          fieldValidations: [Validators.required]
        },
        {
          columnsDef: 'showOnHomePage',
          headerCell: 'Show On Home Page',
          fieldType: FieldTypes.Checkbox
        }
      ],
      displayedColumns: ['title', 'description'],
      disableCheckBox: false,
      disableEditing: true,
      add_icon: 'note_add',
      add_toolTip: 'Create new Topic',
      sortHeader: true,
      filter: true,
      pageSizeDefault: 5,
      pageSizeOptions: [2, 5, 10, 100, 150],
      showFirstLastButtons: true
    };
  }

  public checkedBox($event: any) {
    console.log($event);
  }

  public deleteTopic($event: any) {
    this.topicService.deleteTopic($event.id).subscribe(
      res => {
        this.loadData();
      },
      error => {
        console.log(error);
      }
    );
  }

  public multipleDeleteTopics($event: any) {
    console.log($event);
  }

  public addOrUpdate(data: Topic) {
    if (data.id) {
      this.topicService.updateTopic(data).subscribe(
        res => {
          console.log(res);
          this.loadData();
        },
        error => {
          console.log(error);
        }
      );
    } else {
      this.topicService.addTopic(data).subscribe(
        res => {
          console.log(res);
          this.loadData();
        },
        error => {
          console.log(error);
        }
      );
    }
  }
}
