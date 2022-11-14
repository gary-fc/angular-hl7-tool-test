import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { FileGateway } from "../models/files/gateway/file-gateway";
import { IFileResponse } from "../models/files/IFile";

@Injectable({ providedIn: "root" })
export class GetFileUsecase {
  constructor(private _fileGateway: FileGateway) {}
  
  saveFile(formData: FormData, user_id: string, guest_user: boolean, recaptcha: string): Observable<IFileResponse> {
    return this._fileGateway.saveFile(formData,user_id,guest_user,recaptcha)
  }
}
