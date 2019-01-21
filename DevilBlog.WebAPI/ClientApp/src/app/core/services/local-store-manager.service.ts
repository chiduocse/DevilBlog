import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Utilities } from './utilities';

@Injectable({
  providedIn: 'root'
})
export class LocalStoreManagerService {
  private static syncListenerInitialised = false;
    public static readonly DBKEY_USER_DATA = 'user_data';
    private static readonly DBKEY_SYNC_KEYS = 'sync_keys';
  private syncKeys: string[] = [];
  private initEvent = new Subject();

  private reservedKeys: string[] = ['sync_keys', 'addToSyncKeys', 'removeFromSyncKeys',
    'getSessionStorage', 'setSessionStorage', 'addToSessionStorage', 'removeFromSessionStorage', 'clearAllSessionsStorage'];


  public initialiseStorageSyncListener() {
    if (LocalStoreManagerService.syncListenerInitialised === true) {
      return;
    }

    LocalStoreManagerService.syncListenerInitialised = true;
    window.addEventListener('storage', this.sessionStorageTransferHandler, false);
    this.syncSessionStorage();
  }

  public deinitialiseStorageSyncListener() {

    window.removeEventListener('storage', this.sessionStorageTransferHandler, false);

    LocalStoreManagerService.syncListenerInitialised = false;
  }


  private sessionStorageTransferHandler = (event: StorageEvent) => {
    if (!event.newValue) {
      return;
    }

    if (event.key == 'getSessionStorage') {
      if (sessionStorage.length) {
        this.localStorageSetItem('setSessionStorage', sessionStorage);
        localStorage.removeItem('setSessionStorage');
      }
    }
    else if (event.key == 'setSessionStorage') {
      if (!this.syncKeys.length)
        this.loadSyncKeys();
      let data = JSON.parse(event.newValue);

      for (let key in data) {
        if (this.syncKeysContains(key))
          this.sessionStorageSetItem(key, JSON.parse(data[key]));
      }
      this.onInit();
    }
    else if (event.key == 'addToSessionStorage') {
      let data = JSON.parse(event.newValue);
      this.addToSessionStorageHelper(data['data'], data['key']);
    }
    else if (event.key == 'removeFromSessionStorage') {
      this.removeFromSessionStorageHelper(event.newValue);
    }
    else if (event.key == 'clearAllSessionsStorage' && sessionStorage.length) {
      this.clearInstanceSessionStorage();
    }
    else if (event.key == 'addToSyncKeys') {
      this.addToSyncKeysHelper(event.newValue);
    }
    else if (event.key == 'removeFromSyncKeys') {
      this.removeFromSyncKeysHelper(event.newValue);
    }
  }

  private syncSessionStorage() {

    localStorage.setItem('getSessionStorage', '_dummy');
    localStorage.removeItem('getSessionStorage');
  }

  public clearAllStorage() {

    this.clearAllSessionsStorage();
    this.clearLocalStorage();
  }

  public clearAllSessionsStorage() {
    this.clearInstanceSessionStorage();
    localStorage.removeItem(LocalStoreManagerService.DBKEY_SYNC_KEYS);

    localStorage.setItem('clearAllSessionsStorage', '_dummy');
    localStorage.removeItem('clearAllSessionsStorage');
  }

  public clearInstanceSessionStorage() {
    sessionStorage.clear();
    this.syncKeys = [];
  }

  public clearLocalStorage() {
    localStorage.clear();
  }

  private addToSessionStorageHelper(data: any, key: string) {
    this.addToSyncKeysHelper(key);
    this.sessionStorageSetItem(key, data);
  }

  private removeFromSessionStorage(keyToRemove: string) {

    this.removeFromSessionStorageHelper(keyToRemove);
    this.removeFromSyncKeysBackup(keyToRemove);

    localStorage.setItem('removeFromSessionStorage', keyToRemove);
    localStorage.removeItem('removeFromSessionStorage');
}

  private removeFromSessionStorageHelper(keyToRemove: string) {
    sessionStorage.removeItem(keyToRemove);
    this.removeFromSyncKeysHelper(keyToRemove);
  }

  private removeFromSyncKeysBackup(key: string) {

    let storedSyncKeys = this.getSyncKeysFromStorage();

    let index = storedSyncKeys.indexOf(key);

    if (index > -1) {
        storedSyncKeys.splice(index, 1);
        this.localStorageSetItem(LocalStoreManagerService.DBKEY_SYNC_KEYS, storedSyncKeys);
    }
}

  private testForInvalidKeys(key: string) {
    if (!key)
      throw new Error('key cannot be empty');
    if (this.reservedKeys.some(x => x == key))
      throw new Error(`The storage key "${key}" is reserved and cannot be used. Please use a different key`);
  }

  private syncKeysContains(key: string) {
    return this.syncKeys.some(x => x == key);
  }

  private loadSyncKeys() {
    if (this.syncKeys.length)
      return;
    this.syncKeys = this.getSyncKeysFromStorage();
  }

  private addToSyncKeysHelper(key: string) {
    if (!this.syncKeysContains(key))
      this.syncKeys.push(key);
  }

  private removeFromSyncKeysHelper(key: string) {
    let index = this.syncKeys.indexOf(key);
    if (index > -1)
      this.syncKeys.splice(index, 1);
  }

  private getSyncKeysFromStorage(defaultValue: string[] = []): string[] {
    let data = this.localStorageGetItem(LocalStoreManagerService.DBKEY_SYNC_KEYS);
    if (data == null)
      return defaultValue;
    else
      return <string[]>data;
  }

  public getData(key = LocalStoreManagerService.DBKEY_USER_DATA) {
    this.testForInvalidKeys(key);
    let data = this.sessionStorageGetItem(key);
    if (data == null)
      data = this.localStorageGetItem(key);

    return data;
  }

  public deleteData(key = LocalStoreManagerService.DBKEY_USER_DATA) {
    this.testForInvalidKeys(key);
    this.removeFromSessionStorageHelper(key);
    localStorage.removeItem(key);
  }

  private localStorageSetItem(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  private sessionStorageSetItem(key: string, data: any) {
    sessionStorage.setItem(key, JSON.stringify(data));
  }

  private localStorageGetItem(key: string) {
    return Utilities.JSonTryParse(localStorage.getItem(key));
  }

  private sessionStorageGetItem(key: string) {
    return Utilities.JSonTryParse(sessionStorage.getItem(key));
  }

  private onInit() {
    setTimeout(() => {
      this.initEvent.next();
      this.initEvent.complete();
    });
  }
}
