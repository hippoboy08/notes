export class Note {
  id: string;
  user: string;
  content: string;
  createdDate: Date;

  constructor(content: string = '', id: string = null, user: string = null, createdDate = new Date()) {
    this.content = content;
    this.createdDate = createdDate;
    this.user = user;
    this.id = id;
    // this.id = id !== null ? id : Math.random().toString(36).substring(2, 7);
  }

  // public get id() {
  //   return this._id;
  // }
  // public set id(value) {
  //   this._id = value;
  // }
}