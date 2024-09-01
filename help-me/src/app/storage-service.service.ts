import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
@Injectable({
  providedIn: 'root'
})
export class StorageServiceService {

  private _storage: Storage | undefined = undefined;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    try{
      const storage = await this.storage.create();
      this._storage = storage;
      return storage
    }catch(ex){
      console.log(ex)
      return null
    }
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);

  }

  // Create and expose methods that users of this service can
  // call, for example:
  public async set(key: string, value: any) {
    if(!this._storage){
      await this.init();
     }
    this._storage?.set(key, value);
  }
  public async get(key: string) {
  
    console.log(key)
    if(!this._storage){
     await this.init();
    }
    console.log(key)
    console.log(this._storage?.get(key))
    // console.log(this._storage?.get(key))
    return this._storage?.get(key);
  }

  public clearAll(){
    this._storage?.clear()
  }
}
