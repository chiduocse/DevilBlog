import { Injectable } from '@angular/core';
import { DataService } from '@app/core';
import { Topic } from '@app/models';
import { Observable } from 'rxjs';

@Injectable()
export class TopicService {
  public topicsUrl = 'api/topic';
  constructor(private dataService: DataService) {}

  public addTopic(data: Topic): Observable<Topic> {
    return this.dataService.post<Topic>(this.topicsUrl, data);
  }

  public updateTopic(data: Topic): Observable<Topic> {
    return this.dataService.put<Topic>(this.topicsUrl + '/' + data.id, data);
  }

  public getTopics(): Observable<Topic[]> {
    return this.dataService.get<Topic[]>(this.topicsUrl);
  }

  public deleteTopic(id: number): Observable<Topic> {
    return this.dataService.delete(this.topicsUrl + '/' + id);
  }
}
