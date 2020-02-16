import { Stitch } from 'mongodb-stitch-browser-sdk';

export class Note {
  id: string;
  user: string;
  content: string;
  createdDate: Date;
  isShared: boolean;

  constructor(content: string = '', id: string = null, user: string = null, createdDate = new Date(), isShared: boolean = false) {
    this.content = content;
    this.createdDate = createdDate;
    this.user = user;
    this.id = id;
    this.isShared = isShared;
    // this.id = id !== null ? id : Math.random().toString(36).substring(2, 7);
  }

  /* Optional getter to show user Name based on userId */
  userName?(): string {
    return `Another user`
    // return Stitch.defaultAppClient.auth.user.profile.email || ''
  }

  // public get id() {
  //   return this._id;
  // }
  // public set id(value) {
  //   this._id = value;
  // }
}